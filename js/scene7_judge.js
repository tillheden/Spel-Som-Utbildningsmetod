var ruta, pass, fail
function loadJudge() {
  updateListener = createjs.Ticker.on("tick", updateJudge);

  var skadereglerare = new createjs.Bitmap("bitmaps/reglerarebg.png");
  stage.addChild(skadereglerare);

  ruta = new createjs.Bitmap("bitmaps/ruta.png");
  stage.addChild(ruta);
  ruta.scaleY = ruta.scaleX = 3;
  ruta.x = 585;
  ruta.y = 340;

  pass = new createjs.Bitmap("bitmaps/checkmark.png");
  stage.addChild(pass);
  pass.x = 700;
  pass.y = 400;
  pass.on("click", passF, null, true);

  fail = new createjs.Bitmap("bitmaps/cross.png");
  stage.addChild(fail);
  fail.x = 600;
  fail.y = 400;
  fail.on("click", failF, null, true);

  placeScore();
  textTooltip.text = "Skadereglerare";
  /*endJudge();*/
}

function updateJudge() {
  stage.update();
}

function endJudge() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
  loadMeeting();
}

function passF(event) {
  addScore(event, 100);
  meet();
}

function failF(event) {
  addScore(event, -100);
  meet();
}

function meet() {
  stage.removeChild(pass);
  stage.removeChild(fail);
  stage.removeChild(ruta);
  ruta = new createjs.Bitmap("bitmaps/tooltip.png");
  stage.addChild(ruta);
  ruta.x = fail.x;
  ruta.y = fail.y;
  ruta.on("click", endJudge);
}
