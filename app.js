const music = document.getElementById("globalMusic");
const frame = document.getElementById("appFrame");

window.addEventListener("message", (e) => {
  switch (e.data) {
    case "PLAY_MUSIC":
      music.play();
      break;

    case "STOP_MUSIC":
      music.pause();
      break;

    case "OPEN_XOXO":
      frame.src = "xoxo.html";
      break;

    case "OPEN_NLOVE":
      frame.src = "nlove.html";
      break;

    case "BACK_TO_SELECT":
      frame.src = "select.html";
      break;
  }
});