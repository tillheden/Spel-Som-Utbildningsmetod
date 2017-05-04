var dator, datorListener, datorTooltip, saneraTooltip
function loadTryggC() {
    updateListener = createjs.Ticker.on("tick", updateTryggC);
    var tryggcBg = new createjs.Bitmap("bitmaps/tryggc.png");
    stage.addChild(tryggcBg);

    var headset = new createjs.Bitmap("bitmaps/headset.png");
    headset.x = 60;
    headset.y = 150;
    stage.addChild(headset);
    saneraTooltip = new createjs.Bitmap("bitmaps/tooltip.png");
    saneraTooltip.x = headset.x + 150;
    saneraTooltip.y = headset.y + 200;
    saneraTooltip.scaleY = saneraTooltip.scaleX = 3/5;
    saneraTooltip.on("click", felVal);
    stage.addChild(saneraTooltip);
    csgTooltip = new createjs.Bitmap("bitmaps/tooltip.png");
    csgTooltip.x = headset.x + 150;
    csgTooltip.y = headset.y - 100;
    csgTooltip.scaleY = csgTooltip.scaleX = 3/5;
    csgTooltip.on("click", endTryggC);
    stage.addChild(csgTooltip);

    dator = new createjs.Bitmap("bitmaps/computer.png");
    dator.x = 680;
    dator.y = 210;
    datorListener = dator.on("click", displaydator);
    stage.addChild(dator);
    datorTooltip = new createjs.Bitmap("bitmaps/kollavtal.png");
    datorTooltip.x = dator.x + 100;
    datorTooltip.y = dator.y - 50;
    datorTooltip.scaleY = datorTooltip.scaleX = 3/5;
    datorTooltip.on("click", displaydator);
    stage.addChild(datorTooltip);

    var kaffemug = new createjs.Bitmap("bitmaps/coffee.png");
    kaffemug.x = 1050;
    kaffemug.y = 480;
    stage.addChild(kaffemug);
    kaffemug.on("click", taRast);
    var kaffeTooltip = new createjs.Bitmap("bitmaps/tarast.png");
    kaffeTooltip.x = kaffemug.x + 50;
    kaffeTooltip.y = kaffemug.y + 100;
    kaffeTooltip.scaleY = kaffeTooltip.scaleX = 2/5;
    kaffeTooltip.on("click", taRast);
    stage.addChild(kaffeTooltip);

    stage.addChild(scoreText);
    stage.setChildIndex(scoreText, stage.getNumChildren() - 1);

    textTooltip.text = "TryggC";
    stage.addChild(textTooltip);
}

function updateTryggC() {
    stage.update();
}

function endTryggC(event) {
    createjs.Ticker.off("tick", updateListener);
    stage.removeAllChildren();
    loadChase();
}

function displaydator(event) {
    addScore(event, 250);
    stage.removeChild(datorTooltip);
    dator.off("click", datorListener);
}

function felVal(event) {
  addScore(event, -250);
  stage.removeChild(saneraTooltip);
}
