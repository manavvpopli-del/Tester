const gameArea = document.getElementById("gameArea");
const heart = document.getElementById("heart");
const message = document.getElementById("message");

const nameLetters = ["N", "U", "R", "A", "N", "Ə"];
let collected = "";
let heartScale = 1;
let heartX = window.innerWidth / 2;

function moveLeft() {
  heartX -= 40;
  updateHeart();
}

function moveRight() {
  heartX += 40;
  updateHeart();
}

function updateHeart() {
  heart.style.left = heartX + "px";
}

function spawnLetter() {
  const letter = document.createElement("div");
  const randomLetter = nameLetters[Math.floor(Math.random() * nameLetters.length)];

  letter.className = "letter";
  letter.textContent = randomLetter;
  letter.style.left = Math.random() * (window.innerWidth - 40) + "px";

  gameArea.appendChild(letter);

  const fallInterval = setInterval(() => {
    const letterRect = letter.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();

    if (
      letterRect.bottom >= heartRect.top &&
      letterRect.left < heartRect.right &&
      letterRect.right > heartRect.left
    ) {
      collectLetter(letter.textContent);
      letter.remove();
      clearInterval(fallInterval);
    }

    if (letterRect.top > window.innerHeight) {
      letter.remove();
      clearInterval(fallInterval);
    }
  }, 50);
}

function collectLetter(char) {
  collected += char;
  heartScale += 0.15;
  heart.style.transform = `translateX(-50%) scale(${heartScale})`;
  message.textContent = collected;

  if (collected === "NURANƏ") {
    explodeHeart();
  }
}

function explodeHeart() {
  heart.textContent = "💥";
  message.textContent = "N ❤️ U R A N Ə";
  clearInterval(spawnTimer);
}

const spawnTimer = setInterval(spawnLetter, 900);