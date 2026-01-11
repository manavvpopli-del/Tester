// Local key bazası
let keys = JSON.parse(localStorage.getItem("keys")) || [];

/* ================= LOGIN ================= */
function login() {
  let key = document.getElementById("keyInput").value;
  let valid = keys.find(k => k.value === key && k.active);

  if (valid) {
    localStorage.setItem("sessionKey", key);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText = "Key etibarsızdır ❌";
  }
}

/* ================= SESSION CHECK ================= */
function checkSession() {
  let sessionKey = localStorage.getItem("sessionKey");
  if (!sessionKey) return;

  let valid = keys.find(k => k.value === sessionKey && k.active);
  if (!valid) {
    localStorage.removeItem("sessionKey");
    window.location.href = "index.html";
  }
}

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("sessionKey");
  window.location.href = "index.html";
}

/* ================= ADMIN ================= */
function addKey() {
  let value = document.getElementById("newKey").value;
  if (!value) return;

  keys.push({ value: value, active: true });
  saveKeys();
  renderKeys();
  document.getElementById("newKey").value = "";
}

function toggleKey(index) {
  keys[index].active = !keys[index].active;
  saveKeys();
}

function deleteKey(index) {
  keys.splice(index, 1);
  saveKeys();
  renderKeys();
}

/* ================= STORAGE ================= */
function saveKeys() {
  localStorage.setItem("keys", JSON.stringify(keys));
}

/* ================= ADMIN UI ================= */
function renderKeys() {
  let list = document.getElementById("keyList");
  if (!list) return;

  list.innerHTML = "";
  keys.forEach((k, i) => {
    list.innerHTML += `
      <li>
        <b>${k.value}</b> — ${k.active ? "🟢 Aktiv" : "🔴 Dayandırılıb"}
        <button onclick="toggleKey(${i})">Aktiv / Dayandır</button>
        <button onclick="deleteKey(${i})">Sil</button>
      </li>
    `;
  });
}

renderKeys();
checkSession();
