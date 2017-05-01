var drawTryggCListener;

function loadTryggC() {
    drawTryggCListener = createjs.Ticker.on("tick", drawTryggC);
    var tryggcBg = new createjs.Bitmap("bitmaps/tryggcbg.png");
    // PicWidth * Scale = CanvasWidth => Scale = CanvasWidth / PicWidth
    tryggcBg.scaleX = stage.canvas.width / 960;
    tryggcBg.scaleY = stage.canvas.height / 610;
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

    var rast = new createjs.Bitmap("bitmaps/rast.png");
    rast.x = 50;
    rast.y = 400;
    stage.addChild(rast);
    rast.on("click", ringBevakningsbolag);

    stage.addChild(scoreText);
    stage.setChildIndex(scoreText, stage.getNumChildren() - 1);
    /*endTryggC();*/
}

function drawTryggC() {
    stage.update();
}

function endTryggC(event) {
    createjs.Ticker.off("tick", drawTryggC);
    stage.removeAllChildren();
    // TODO: play cutscene
    loadSanera();
}

function displayAvtal(event) {
    addScore(event, 250);
    alert("AVTAL");
}

function displaySkadeDB(event) {
    alert("SkadeDB är tom just nu");
}

function ringBevakningsbolag(event) {
    endTryggC();
}
