var klotterListener, stationListener, updateListener, station, spraypaintsound, station2, tooltipGraphics;

function loadGraffiti() {
    updateListener = createjs.Ticker.on("tick", updateGraffiti);
    /*spraypaintsound = new Audio("sounds/spraypaint.mp3");*/

    station = new createjs.Bitmap("bitmaps/station.png");
    stationListener = station.on("click", placeraGraffiti);
    stage.addChild(station);

    stage.addChild(vandal);

    tooltipGraphics = new createjs.Bitmap("bitmaps/klottra.png");
    stage.addChild(tooltipGraphics);
    tooltipGraphics.x = stage.canvas.width/4;
    tooltipGraphics.y = 600;

    station2 = new createjs.Bitmap("bitmaps/stationbg.png");
    stage.addChild(station2);
    station2.x = -1*stage.canvas.width;
    var trafikant = new createjs.Bitmap("bitmaps/trafikant.png");
    stage.addChild(trafikant);
    trafikant.y = vandal.y-50;
    trafikant.x = -500;

    placeScore();
}

function updateGraffiti() {
    stage.update();
}

function endGraffiti(event) {
    stage.x = 0;
    scoreText.x = textTooltip.x = 10;
    scoreGraphics.x = 0;
    createjs.Ticker.off("tick", updateListener);
    stage.removeAllChildren();
    stage.update();

    loadTryggC();

    /*scorescreen();*/
    /*loadMeeting();*/
    // loadSanera();
}

var sprayburk, paneraListener
function placeraGraffiti(event) {
    klotter.originalX = klotter.x = event.stageX - (254 / 2);
    klotter.originalY = klotter.y = event.stageY - (320 / 2);
    stage.addChild(klotter);
    sprayburk = new createjs.Bitmap(klotter.bevis);
    sprayburk.x = klotter.x;
    sprayburk.y = 600;
    stage.addChild(sprayburk);
    stage.removeChild(tooltipGraphics);
    station.off("click", stationListener);
    paneraListener = createjs.Ticker.on("tick", paneraScenen);
    // endGraffiti();
}

var s = 5;
var m = 200;
var p = s*m;
var fadeListener;
function paneraScenen() {
  p -= s;
  if (p > 0 && p < s*m-300) {
    stage.x += s;
    scoreText.x -= s;
    textTooltip.x -= s;
    scoreGraphics.x -= s;
  }
  else if (p < -0.5*s*m) {
    createjs.Ticker.off("tick", paneraListener);
    fadeListener = createjs.Ticker.on("tick", fadeStage);
  }
}

function fadeStage() {
  if (stage.alpha > 0) {
    stage.alpha -= 0.025;
  }
  else {
    createjs.Ticker.off("tick", fadeListener);
    stage.alpha = 1;
    endGraffiti();
  }
}
