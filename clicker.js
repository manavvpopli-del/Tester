let score = 0;
let clickPower = 1;

const scoreText = document.getElementById("score");
const clickBtn = document.getElementById("clickBtn");

clickBtn.onclick = () => {
  score += clickPower;
  scoreText.textContent = score;
};

function buyUpgrade(power) {
  let cost = power * 10;

  if (score >= cost) {
    score -= cost;
    clickPower += power;
    scoreText.textContent = score;
  } else {
    alert("Yetərli score yoxdur!");
  }
}