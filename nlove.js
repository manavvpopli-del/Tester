const gameArea = document.getElementById("gameArea");
const heart = document.getElementById("heart");
const message = document.getElementById("message");

const nameLetters = ["N", "U", "R", "A", "N", "Ə"];
let collected = "";
let scale = 1;

// ==== SÜRÜKLƏMƏ (mouse + touch) ====
let isDragging = false;

heart.addEventListener("pointerdown", () => {
  isDragging = true;
});

document.addEventListener("pointerup", () => {
  isDragging = false;
});

document.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  let x = e.clientX - heart.offsetWidth / 2;
  x = Math.max(0, Math.min(window.innerWidth - heart.offsetWidth, x));
  heart.style.left = x + "px";
});

// ==== HƏRF YARATMA ====
function spawnLetter() {
  const letter = document.createElement("div");
  const char = nameLetters[Math.floor(Math.random() * nameLetters.length)];

  letter.className = "letter";
  letter.textContent = char;
  letter.style.left = Math.random() * (window.innerWidth - 50) + "px";
  letter.style.animationDuration = (3 + Math.random() * 2) + "s";

  gameArea.appendChild(letter);

  const check = setInterval(() => {
    const l = letter.getBoundingClientRect();
    const h = heart.getBoundingClientRect();

    if (
      l.bottom >= h.top &&
      l.left < h.right &&
      l.right > h.left
    ) {
      collect(char);
      letter.remove();
      clearInterval(check);
    }

    if (l.top > window.innerHeight) {
      letter.remove();
      clearInterval(check);
    }
  }, 40);
}

function collect(char) {
  collected += char;
  scale += 0.15;
  heart.style.transform = `translateX(-50%) scale(${scale})`;
  message.textContent = collected;

  if (collected === "NURANƏ") {
    explode();
  }
}

function explode() {
  heart.style.transition = "0.4s";
  heart.style.transform += " rotate(720deg) scale(2)";
  message.textContent = "❤️ N U R A N Ə ❤️";
  clearInterval(spawnTimer);
}

// Start
const spawnTimer = setInterval(spawnLetter, 800);