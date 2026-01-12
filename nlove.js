document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTLƏR ================= */
    const passwordOverlay = document.getElementById("passwordOverlay");
    const passwordInput   = document.getElementById("passwordInput");
    const passwordBtn     = document.getElementById("passwordBtn");
    const passwordError   = document.getElementById("passwordError");

    const startOverlay = document.getElementById("startOverlay");
    const continueBtn = document.getElementById("continueBtn");

    const music = document.getElementById("bgMusic");
    const game  = document.getElementById("game");
    const heart = document.getElementById("heart");
    const topWord = document.getElementById("topWord");
    const endScreen = document.getElementById("endScreen");
    const loseScreen = document.getElementById("loseScreen");

    /* ================= PAROL ================= */
    const PASSWORD = "1234";

    passwordBtn.addEventListener("click", () => {
        if (passwordInput.value.trim() === PASSWORD) {
            passwordOverlay.style.display = "none";
            startOverlay.style.display = "flex";
        } else {
            passwordError.style.display = "block";
        }
    });

    /* ================= DAVAM ET ================= */
    continueBtn.addEventListener("click", () => {
        startOverlay.style.display = "none";
        music.play().catch(()=>{});
        startGame();
    });

    /* ================= OYUN DATA ================= */
    const WORD = ["N","U","R","A","N","Ə"];
    let index = 0;
    let interval = null;
    let ended = false;

    /* ================= ÜRƏK ================= */
    window.addEventListener("pointermove", e => {
        if (ended) return;
        heart.style.left = (e.clientX - heart.offsetWidth/2) + "px";
    });

    /* ================= BAŞLAT ================= */
    function startGame(){
        index = 0;
        ended = false;
        topWord.textContent = "";

        if(interval) clearInterval(interval);
        interval = setInterval(spawnLetter, 900);
    }

    /* ================= HƏRF ================= */
    function spawnLetter(){
        if(ended) return;

        const el = document.createElement("div");
        el.className = "letter";
        const letter = WORD[Math.floor(Math.random()*WORD.length)];
        el.textContent = letter;
        el.style.left = Math.random()*(innerWidth-60) + "px";
        game.appendChild(el);

        const check = setInterval(()=>{
            const l = el.getBoundingClientRect();
            const h = heart.getBoundingClientRect();

            if(l.bottom>h.top && l.left<h.right && l.right>h.left){
                if(letter !== WORD[index]){
                    lose();
                }else{
                    topWord.textContent += letter;
                    index++;
                    if(index === WORD.length) win();
                }
                el.remove();
                clearInterval(check);
            }
            if(l.top > innerHeight){
                el.remove();
                clearInterval(check);
            }
        },16);
    }

    /* ================= QAZAN / UDUZ ================= */
    function win(){
        ended = true;
        clearInterval(interval);
        endScreen.style.display = "flex";
    }

    function lose(){
        ended = true;
        clearInterval(interval);
        loseScreen.style.display = "flex";
    }

    window.restartGame = () => location.reload();
    window.closeGame = () => document.body.innerHTML = "";

});