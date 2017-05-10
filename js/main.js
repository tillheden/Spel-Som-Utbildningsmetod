var score;
var scoreText;
var stage;
var scoreGraphics;
var textTooltip;

function loadGame() {
    stage = new createjs.Stage("stageCanvas");
    createjs.Ticker.framerate = 60;
    /*stage.on("click", printXY);*/

    scoreGraphics = new createjs.Bitmap("bitmaps/score.png");
    scoreGraphics.scaleY = scoreGraphics.scaleX = 0.35;
    score = 0;
    scoreText = new createjs.Text(score, "26px Arial", "#0F0");
    textTooltip = new createjs.Text("Klottrare", "20px Arial", "#FFF");
    textTooltip.shadow = new createjs.Shadow("#000", 1, 1, 2);

    window.addEventListener("resize", resizeCanvas);
    window.scrollTo(0, 1);
    createjs.Touch.enable(stage);
    loadStartScreen();
}

function printXY(event) {
  console.log("["+event.stageX+", "+event.stageY+"]");
}

function resizeCanvas() {
    var can = document.getElementById("stageCanvas");
    can.style.width = "100%";
    can.style.height = "90%";
}

function addScore(event, s) {
  if (s >= 0) var animatedText = new createjs.Text("+"+s, "50px Bold Arial", "#0F0");
  else var animatedText = new createjs.Text(s, "50px Bold Arial", "#F00");
  animatedText.shadow = new createjs.Shadow("#000", 1, 1, 2);
  animatedText.x = event.stageX;
  animatedText.y = event.stageY;
  animatedText.speed = -10;
  animatedText.on("tick", textAnimtion);
  stage.addChild(animatedText);
  score += s;
  scoreText.text = score;
}

function textAnimtion() {
   this.y += this.speed;
   this.speed += 0.75;
   if (this.y > stage.canvas.height-30) {
     stage.removeChild(this);
   }
}

function scoreScreen() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
  loadScoreScreen();
}

function placeScore() {
  stage.addChild(scoreGraphics);
  stage.addChild(scoreText);
  scoreText.x = 28;
  scoreText.y = 16;
  stage.addChild(textTooltip);
  textTooltip.x = 23;
  textTooltip.y = 55;
}
