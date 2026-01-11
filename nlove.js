const WORD = ["N","U","R","A","N","Ə"];
let currentIndex = 0;
let gameEnded = false;

const game = document.getElementById("game");
const heart = document.getElementById("heart");
const topWord = document.getElementById("topWord");
const endScreen = document.getElementById("endScreen");

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

/* === HEART DRAG === */
let dragging=false, offsetX=0;
let heartX = innerWidth/2 - heart.offsetWidth/2;
heart.style.left = heartX+"px";

heart.addEventListener("pointerdown",e=>{
    dragging=true;
    offsetX = e.clientX - heartX;
});
addEventListener("pointermove",e=>{
    if(!dragging) return;
    heartX = e.clientX - offsetX;
    heartX = Math.max(0,Math.min(innerWidth-heart.offsetWidth,heartX));
    heart.style.left = heartX+"px";
});
addEventListener("pointerup",()=>dragging=false);

/* === LETTER SPAWN === */
function spawnLetter(){
    if(gameEnded) return;

    const el = document.createElement("div");
    el.className = "letter";
    const letter = WORD[Math.floor(Math.random()*WORD.length)];
    el.textContent = letter;

    el.style.left = Math.random()*(innerWidth-60)+"px";
    el.style.animationDuration = 3 + Math.random()*2 + "s";

    game.appendChild(el);

    const check = setInterval(()=>{
        const lr = el.getBoundingClientRect();
        const hr = heart.getBoundingClientRect();

        if(
            lr.bottom > hr.top &&
            lr.left < hr.right &&
            lr.right > hr.left
        ){
            handleCatch(letter);
            el.remove();
            clearInterval(check);
        }

        if(lr.top > innerHeight){
            el.remove();
            clearInterval(check);
        }
    },16);
}

/* === GAME LOGIC === */
function handleCatch(letter){
    if(gameEnded) return;

    if(letter !== WORD[currentIndex]){
        lose();
        return;
    }

    topWord.textContent += letter;
    currentIndex++;

    if(currentIndex === WORD.length){
        win();
    }
}

/* === LOSE === */
function lose(){
    gameEnded = true;
    setTimeout(()=>location.reload(),700);
}

/* === WIN === */
let particles=[];

function win(){
    gameEnded = true;

    const r = heart.getBoundingClientRect();
    const cx = r.left + r.width/2;
    const cy = r.top + r.height/2;

    for(let i=0;i<200;i++){
        particles.push({
            x:cx,y:cy,
            vx:(Math.random()-0.5)*12,
            vy:(Math.random()-0.5)*12,
            life:70
        });
    }

    heart.style.display="none";
    animateParticles();

    setTimeout(()=>{
        endScreen.style.display="flex";
    },1200);
}

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        ctx.fillStyle="rgba(255,80,200,0.9)";
        ctx.beginPath();
        ctx.arc(p.x,p.y,3,0,Math.PI*2);
        ctx.fill();
        p.x+=p.vx;
        p.y+=p.vy;
        p.life--;
    });

    particles = particles.filter(p=>p.life>0);
    if(particles.length) requestAnimationFrame(animateParticles);
}

/* === CONTROLS === */
function restartGame(){
    location.reload();
}

function closeGame(){
    document.body.innerHTML="";
    document.body.style.background="black";
}

/* === START === */
setInterval(spawnLetter,900);