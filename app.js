const ADMIN_PASSWORD = "123456"; // dəyiş!

let keys = JSON.parse(localStorage.getItem("keys")) || [];
let deviceId = localStorage.getItem("deviceId");

if (!deviceId) {
  deviceId = crypto.randomUUID();
  localStorage.setItem("deviceId", deviceId);
}

/* ========== ADMIN LOGIN ========== */
function adminLogin() {
  let pass = document.getElementById("adminPass").value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Şifrə yanlışdır ❌");
  }
}

/* ========== LOGIN ========== */
function login() {
  let key = document.getElementById("keyInput").value;
  let now = new Date();

  let k = keys.find(k =>
    k.value === key &&
    k.active &&
    new Date(k.expire) > now &&
    (!k.devices || k.devices.includes(deviceId) || k.devices.length < k.deviceLimit)
  );

  if (!k) {
    document.getElementById("msg").innerText = "Giriş mümkün deyil ❌";
    return;
  }

  k.devices = k.devices || [];
  if (!k.devices.includes(deviceId)) k.devices.push(deviceId);

  localStorage.setItem("sessionKey", key);
  save();
  location.href = "game.html";
}

/* ========== SESSION CHECK ========== */
function checkSession() {
  let key = localStorage.getItem("sessionKey");
  if (!key) return;

  let now = new Date();
  let k = keys.find(k => k.value === key);

  if (
    !k ||
    !k.active ||
    new Date(k.expire) < now ||
    !k.devices.includes(deviceId)
  ) {
    logout();
  }
}

/* ========== LOGOUT ========== */
function logout() {
  localStorage.removeItem("sessionKey");
  location.href = "index.html";
}

/* ========== ADMIN KEY CREATE ========== */
function addKey() {
  keys.push({
    value: document.getElementById("newKey").value,
    deviceLimit: Number(document.getElementById("deviceLimit").value),
    expire: document.getElementById("expireDate").value,
    active: true,
    devices: []
  });
  save();
  renderKeys();
}

/* ========== ADMIN ACTIONS ========== */
function toggleKey(i) {
  keys[i].active = !keys[i].active;
  save();
}

function deleteKey(i) {
  keys.splice(i, 1);
  save();
  renderKeys();
}

/* ========== STORAGE ========== */
function save() {
  localStorage.setItem("keys", JSON.stringify(keys));
}

/* ========== ADMIN UI ========== */
function renderKeys() {
  let list = document.getElementById("keyList");
  if (!list) return;

  list.innerHTML = "";
  keys.forEach((k, i) => {
    list.innerHTML += `
      <li>
        <b>${k.value}</b>
        | Cihaz: ${k.devices.length}/${k.deviceLimit}
        | Bitir: ${k.expire}
        | ${k.active ? "🟢" : "🔴"}
        <button onclick="toggleKey(${i})">Aktiv/Stop</button>
        <button onclick="deleteKey(${i})">Sil</button>
      </li>
    `;
  });
}

renderKeys();
checkSession();
