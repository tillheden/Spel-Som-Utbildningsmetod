var stage;

function loadGame() {
  stage = new createjs.Stage("stageCanvas");
  window.addEventListener("resize", resizeCanvas);
  window.scrollTo(0,1);
  createjs.Touch.enable(stage);
  loadGraffiti();
}

function resizeCanvas() {
  console.log("Hej");
  var can = document.getElementById("stageCanvas");
  can.style.width = "100%";
  can.style.height = "90%";
}
