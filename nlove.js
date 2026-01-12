/* ================= ELEMENTLƏR ================= */
const passwordOverlay = document.getElementById("passwordOverlay");
const passwordInput = document.getElementById("passwordInput");
const passwordBtn = document.getElementById("passwordBtn");
const passwordError = document.getElementById("passwordError");

const startOverlay = document.getElementById("startOverlay");
const continueBtn = document.getElementById("continueBtn");

const music = document.getElementById("bgMusic");
const game = document.getElementById("game");
const heart = document.getElementById("heart");
const topWord = document.getElementById("topWord");
const endScreen = document.getElementById("endScreen");
const loseScreen = document.getElementById("loseScreen");

/* ================= PAROL ================= */
const PASSWORD = "1234";

passwordOverlay.style.display = "flex";
startOverlay.style.display = "none";

/* ================= PAROL YOXLA ================= */
passwordBtn.onclick = () => {
    if (passwordInput.value === PASSWORD) {
        passwordOverlay.style.display = "none";
        startOverlay.style.display = "flex";
        passwordError.style.display = "none";
    } else {
        passwordError.style.display = "block";
    }
};

/* ================= OYUN DATA ================= */
const WORD = ["N","U","R","A","N","Ə"];
let currentIndex = 0;
let gameEnded = false;
let spawnInterval = null;

/* ================= DAVAM ET ================= */
continueBtn.onclick = () => {
    startOverlay.style.display = "none";
    music.play();
    startGame();
};

/* ================= HEART HƏRƏKƏT ================= */
let heartX = window.innerWidth / 2 - 65;
heart.style.left = heartX + "px";

window.addEventListener("pointermove", e => {
    if (gameEnded) return;
    heartX = e.clientX - 65;
    heartX = Math.max(0, Math.min(window.innerWidth - 130, heartX));
    heart.style.left = heartX + "px";
});

/* ================= OYUNU BAŞLAT ================= */
function startGame() {
    gameEnded = false;
    currentIndex = 0;
    topWord.textContent = "";

    if (spawnInterval) clearInterval(spawnInterval);
    spawnInterval = setInterval(spawnLetter, 900);
}

/* ================= HƏRF YARAT ================= */
function spawnLetter() {
    if (gameEnded) return;

    const el = document.createElement("div");
    el.className = "letter";

    const letter = WORD[Math.floor(Math.random() * WORD.length)];
    el.textContent = letter;

    el.style.left = Math.random() * (window.innerWidth - 60) + "px";
    el.style.animationDuration = "4s";

    game.appendChild(el);

    const check = setInterval(() => {
        const lr = el.getBoundingClientRect();
        const hr = heart.getBoundingClientRect();

        if (
            lr.bottom > hr.top &&
            lr.left < hr.right &&
            lr.right > hr.left
        ) {
            if (letter !== WORD[currentIndex]) {
                lose();
            } else {
                topWord.textContent += letter;
                currentIndex++;
                if (currentIndex === WORD.length) win();
            }
            el.remove();
            clearInterval(check);
        }

        if (lr.top > window.innerHeight) {
            el.remove();
            clearInterval(check);
        }
    }, 16);
}

/* ================= QAZAN / UDUZ ================= */
function win() {
    gameEnded = true;
    clearInterval(spawnInterval);
    endScreen.style.display = "flex";
}

function lose() {
    gameEnded = true;
    clearInterval(spawnInterval);
    loseScreen.style.display = "flex";
}

/* ================= DÜYMƏLƏR ================= */
function restartGame() {
    location.reload();
}

function closeGame() {
    document.body.innerHTML = "";
}