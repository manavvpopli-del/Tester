/* ================= ELEMENTLER ================= */
const passOverlay = document.getElementById("passwordOverlay");
const startOverlay = document.getElementById("startOverlay");
const continueBtn = document.getElementById("continueBtn");
const passBtn = document.getElementById("passwordBtn");
const passInput = document.getElementById("passwordInput");
const passError = document.getElementById("passwordError");
const music = document.getElementById("bgMusic");

/* ================= PAROL ================= */
const PASSWORD = "1234"; // BURANI DEYIŞ

// ilk açılışda
startOverlay.style.display = "none";
passOverlay.style.display = "flex";

/* ================= PAROL YOXLA ================= */
passBtn.addEventListener("click", checkPassword);
passInput.addEventListener("keydown", e => {
    if (e.key === "Enter") checkPassword();
});

function checkPassword(){
    if(passInput.value.trim() === PASSWORD){
        passOverlay.style.display = "none";
        startOverlay.style.display = "flex";
        passError.style.display = "none";
    } else {
        passError.style.display = "block";
    }
}

/* ================= DAVAM ET ================= */
continueBtn.addEventListener("click", () => {
    startOverlay.style.display = "none";
    music.play();
    startGame();
});

/* ================= OYUN DATA ================= */
const WORD = ["N","U","R","A","N","Ə"];
let currentIndex = 0;
let gameEnded = false;

const game = document.getElementById("game");
const heart = document.getElementById("heart");
const topWord = document.getElementById("topWord");
const endScreen = document.getElementById("endScreen");
const loseScreen = document.getElementById("loseScreen");

/* ================= HEART ================= */
let heartX = window.innerWidth / 2 - 65;
heart.style.left = heartX + "px";

window.addEventListener("pointermove", e => {
    if(gameEnded) return;
    heartX = e.clientX - 65;
    heartX = Math.max(0, Math.min(window.innerWidth - 130, heartX));
    heart.style.left = heartX + "px";
});

/* ================= LETTER ================= */
function spawnLetter(){
    if(gameEnded) return;

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
            if(letter !== WORD[currentIndex]){
                lose();
            } else {
                topWord.textContent += letter;
                currentIndex++;
                if(currentIndex === WORD.length) win();
            }
            el.remove();
            clearInterval(check);
        }

        if(lr.top > window.innerHeight){
            el.remove();
            clearInterval(check);
        }
    }, 16);
}

/* ================= START ================= */
function startGame(){
    setInterval(spawnLetter, 900);
}

/* ================= END ================= */
function win(){
    gameEnded = true;
    endScreen.style.display = "flex";
}

function lose(){
    gameEnded = true;
    loseScreen.style.display = "flex";
}

function restartGame(){
    location.reload();
}

function closeGame(){
    document.body.innerHTML = "";
}