var drawTryggCListener;

function loadTryggC() {
    drawEscapeListener = createjs.Ticker.on("tick", drawTryggC);
    var tryggcBg = new createjs.Bitmap("bitmaps/tyggcbg.png");
    // PicWidth * Scale = CanvasWidth => Scale = CanvasWidth / PicWidth
    tryggcBg.scaleX = stage.canvas.width / 960;
    bg1.scaleY = bg2.scaleY = stage.canvas.height / 610;
    stage.addChild(tryggcBg);

    var avtal = new createjs.Bitmap("bitmaps/avtal.png");
    avtal.x = 800;
    avtal.y = 265;
    avtal.on("click", displayAvtal);
    stage.addChild(avtal);

    var dator = new createjs.Bitmap("bitmaps/dator.png");
    dator.x = 265;
    dator.y = 5;
    dator.on("click", displaySkadeDB);
    stage.addChild(dator);
}

function drawTryggC() {
    stage.update();
}

function endTryggC(event) {
    createjs.Ticker.off("tick", drawGraffitiListener);
    stage.removeAllChildren();
    // TODO: play cutscene
}

function displayAvtal() {
  alert("AVTAL");
}


function displaySkadeDB() {
  alert("SKADEDB");
}
