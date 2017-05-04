var vandal, klotter, klotterListener, stationListener, updateListener, textTooltip, station, spraypaintsound, station2;

function loadGraffiti() {
    updateListener = createjs.Ticker.on("tick", updateGraffiti);

    station = new createjs.Bitmap("bitmaps/station.png");
    stationListener = station.on("click", placeraGraffiti);
    stage.addChild(station);

    var vandalSheet = new createjs.SpriteSheet({
        animations: {
            vandal_idle: {
                frames: [0]
            },
            vandal_run: {
                frames: [1, 2, 3, 4, 5, 6, 7, 8],
                speed: 0.25
            },
        },
        images: ["bitmaps/vandal.png"],
        frames: {
            width: 200,
            height: 300
        }
    });
    vandal = new createjs.Sprite(vandalSheet);
    vandal.x = 800;
    vandal.y = 260;
    vandal.scaleY = 1.5;
    stage.addChild(vandal);



    spraypaintsound = new Audio("sounds/spraypaint.mp3");

    station2 = new createjs.Bitmap("bitmaps/stationbg.png");
    stage.addChild(station2);
    station2.x = -1*stage.canvas.width;
    var trafikant = new createjs.Bitmap("bitmaps/trafikant.png");
    stage.addChild(trafikant);
    trafikant.y = vandal.y-50;
    trafikant.x = -500;

    textTooltip = new createjs.Text("Klicka var som helst\nför att placera klotter.", "28px Arial", "#0ff");
    textTooltip.x = 10;
    textTooltip.y = 50;
    textTooltip.shadow = new createjs.Shadow("#000", 2, 2, 10);
    stage.addChild(textTooltip);
    stage.setChildIndex(scoreText, stage.getNumChildren() - 1);
}

function updateGraffiti() {
    stage.update();
}

function endGraffiti(event) {
    stage.x = 0;
    scoreText.x = textTooltip.x = 10;
    createjs.Ticker.off("tick", updateListener);
    stage.removeAllChildren();
    stage.update();
    // TODO: play cutscene
    loadTryggC();
}

var sprayburk
function placeraGraffiti(event) {
    spraypaintsound.play();
    klotter = new createjs.Bitmap("bitmaps/graffiti.png");
    klotter.alpha = 0.4;
    klotter.originalX = klotter.x = event.stageX - (254 / 2);
    klotter.originalY = klotter.y = event.stageY - (320 / 2);
    klotterListener = klotter.on("click", changeklotter);
    stage.addChild(klotter);
    sprayburk = new createjs.Bitmap("bitmaps/bevis.png");
    sprayburk.x = klotter.x;
    sprayburk.y = 600;
    stage.addChild(sprayburk);
    textTooltip.text = "Fyll nu i klottret."
    station.off("click", stationListener);
}

var paneraListener
function changeklotter(event) {
    spraypaintsound.play();
    klotter.alpha += 0.2;
    addScore(event, 100);
    if (klotter.alpha == 1) {
        klotter.off("click", klotterListener);
        paneraListener = createjs.Ticker.on("tick", paneraScenen);
    }
}


var s = 15;
var m = 1;
var p = s*m;
var fadeListener;
function paneraScenen() {
  p -= s;
  if (p > 0) {
    stage.x += s;
    scoreText.x -= s;
    textTooltip.x -= s;
  }
  else if (p < -0.5*s*m) {
    createjs.Ticker.off("tick", paneraListener);
    fadeListener = createjs.Ticker.on("tick", fadeStage);
  }
}

function fadeStage() {
  if (stage.alpha > 0) {
    stage.alpha -= 0.055;
  }
  else {
    createjs.Ticker.off("tick", fadeListener);
    stage.alpha = 1;
    endGraffiti();
  }
}
