/* ===== PAROL SISTEMI ===== */
const PASSWORD = "nurane"; // 🔒 BURADAN DEYIŞ
const passOverlay = document.getElementById("passwordOverlay");
const passBtn = document.getElementById("passwordBtn");
const passInput = document.getElementById("passwordInput");
const passError = document.getElementById("passwordError");
const startOverlay = document.getElementById("startOverlay");

passBtn.onclick = () => {
    if(passInput.value === PASSWORD){
        passOverlay.style.display = "none";
        startOverlay.style.display = "flex";
    } else {
        passError.style.display = "block";
    }
};

/* ===== MUSIQI ===== */
const continueBtn = document.getElementById("continueBtn");
const music = document.getElementById("bgMusic");

continueBtn.onclick = () => {
    music.play();
    startOverlay.style.display = "none";
    startGame();
};

/* ===== OYUN ===== */
const WORD = ["N","U","R","A","N","Ə"];
let currentIndex = 0;
let gameEnded = false;

const game = document.getElementById("game");
const heart = document.getElementById("heart");
const topWord = document.getElementById("topWord");
const endScreen = document.getElementById("endScreen");
const loseScreen = document.getElementById("loseScreen");

let heartX = innerWidth/2;
heart.style.left = heartX+"px";

/* DRAG */
addEventListener("pointermove", e=>{
    if(gameEnded) return;
    heartX = e.clientX - 65;
    heartX = Math.max(0, Math.min(innerWidth-130, heartX));
    heart.style.left = heartX+"px";
});

/* LETTER */
function spawnLetter(){
    if(gameEnded) return;

    const el = document.createElement("div");
    el.className = "letter";
    const letter = WORD[Math.floor(Math.random()*WORD.length)];
    el.textContent = letter;
    el.style.left = Math.random()*(innerWidth-60)+"px";
    el.style.animationDuration = "4s";
    game.appendChild(el);

    const check = setInterval(()=>{
        const lr = el.getBoundingClientRect();
        const hr = heart.getBoundingClientRect();

        if(lr.bottom > hr.top && lr.left < hr.right && lr.right > hr.left){
            if(letter !== WORD[currentIndex]) lose();
            else{
                topWord.textContent += letter;
                currentIndex++;
                if(currentIndex === WORD.length) win();
            }
            el.remove();
            clearInterval(check);
        }

        if(lr.top > innerHeight){
            el.remove();
            clearInterval(check);
        }
    },16);
}

/* WIN / LOSE */
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
    document.body.innerHTML="";
}

/* START */
function startGame(){
    setInterval(spawnLetter, 900);
}