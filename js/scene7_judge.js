var ruta, pass, fail
function loadJudge() {
    updateListener = createjs.Ticker.on("tick", updateJudge);

    var skadereglerare = new createjs.Bitmap("bitmaps/reglerarebg.png");
    stage.addChild(skadereglerare);

    var skadeRuta = new createjs.Bitmap("bitmaps/kollaärende.png");
    stage.addChild(skadeRuta);
    skadeRuta.x = 680;
    skadeRuta.y = 170;
    skadeRuta.on("click", klarmarkera, null, true);

    var kaffemug = new createjs.Bitmap("bitmaps/coffee.png");
    kaffemug.x = 1060;
    kaffemug.y = 560;
    stage.addChild(kaffemug);
    kaffemug.on("click", loadScoreScreen);
    var kaffeTooltip = new createjs.Bitmap("bitmaps/tarast.png");
    kaffeTooltip.x = kaffemug.x + 50;
    kaffeTooltip.y = kaffemug.y + 100;
    kaffeTooltip.scaleY = kaffeTooltip.scaleX = 2/5;
    kaffeTooltip.on("click", scoreScreen);
    stage.addChild(kaffeTooltip);

  placeScore();
  textTooltip.text = "Skadereglerare";
  /*endJudge();*/
}

function klarmarkera(event) {
  tabortRuta(event);
  ruta = new createjs.Bitmap(klotter.skade);
  stage.addChild(ruta);

  pass = new createjs.Bitmap("bitmaps/ja.png");
  stage.addChild(pass);
  pass.x = 750;
  pass.y = 550;
  pass.on("click", passF, null, true);

  fail = new createjs.Bitmap("bitmaps/nej.png");
  stage.addChild(fail);
  fail.x = 925;
  fail.y = 550;
  fail.on("click", failF, null, true);
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

var tt = 100;
var meetList;
function meet() {
  if (tt==100) {
    meetList = createjs.Ticker.on("tick", meet);
    stage.removeChild(pass);
    stage.removeChild(fail);
    stage.removeChild(ruta);
    tt -= 1;
  }
  else if (tt > 0) {
    tt -= 1;
  }
  else if (tt == 0) {
    createjs.Ticker.off("tick", meetList);
    ruta = new createjs.Bitmap("bitmaps/möteinfo.png");
    stage.addChild(ruta);
    ruta.x = 150;
    ruta.y = 50;
    ruta.on("click", endJudge);
  }
}
