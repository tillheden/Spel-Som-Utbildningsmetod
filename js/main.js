var score;
var scoreText;
var stage;

function loadGame() {
    stage = new createjs.Stage("stageCanvas");
    createjs.Ticker.framerate = 60;
    stage.on("click", printXY);

    score = 0;
    scoreText = new createjs.Text(score, "32px Arial", "#0F0");
    scoreText.x = 10;
    scoreText.y = 10;
    stage.addChild(scoreText);

    window.addEventListener("resize", resizeCanvas);
    window.scrollTo(0, 1);
    createjs.Touch.enable(stage);
    loadGraffiti();
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
  if (s >= 0) var animatedText = new createjs.Text("+"+s, "50px Arial", "#0F0");
  else var animatedText = new createjs.Text(s, "50px Arial", "#F00");
  animatedText.x = event.stageX;
  animatedText.y = event.stageY;
  animatedText.speed = -0.5;
  animatedText.on("tick", textAnimtion);
  stage.addChild(animatedText);
  score += s;
  scoreText.text = score;
}

function textAnimtion() {
   this.x += this.speed;
   this.y += (this.speed*this.speed)-this.speed-15;
   this.speed += 0.25;
   if (this.y > stage.canvas.height-30) {
     stage.removeChild(this);
   }
}

function taRast() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
  loadRast();
}
