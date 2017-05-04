function loadSanera() {
    updateListener = createjs.Ticker.on("tick", updateSanera);

    stage.addChild(station);

    stage.addChild(klotter);
    klotter.x = klotter.originalX;
    klotter.y = klotter.originalY;
    klotter.on("click", startaSanering);

    sanerare = new createjs.Bitmap("bitmaps/sanerare.png");
    sanerare.scaleX = sanerare.scaleY = 0.5;
    sanerare.y = csg.y;
    stage.addChild(sanerare);

    if (klotter.x < stage.canvas.width / 2) sanerare.x = klotter.x + 200;
    else sanerare.x = klotter.x - 200;

    stage.addChild(kamera);
    kamera.y = sanerare.y;
    kamera.x = sanerare.x;
    kamera.on("click", dokumentera);
    stage.addChild(kameraTooltip);
    kameraTooltip.x = kamera.x-25;
    kameraTooltip.y = kamera.y-25;

    stage.addChild(textTooltip);
    textTooltip.text = "Sanera klottret.";

    stage.addChild(scoreText);
    stage.setChildIndex(scoreText, stage.getNumChildren()-1);
}

function updateSanera() {
    stage.update();
}

function endSanera(event) {
    createjs.Ticker.off("tick", updateSanera);
    stage.removeAllChildren();
    loadJudge();
}

var san, sanListener
function startaSanering(event) {
  stage.removeChild(kamera);
  stage.removeChild(kameraTooltip);
  san = new createjs.Bitmap("bitmaps/sanerat.png");
  san.alpha = 0.8;
  san.x = klotter.x;
  san.y = klotter.y;
  stage.addChild(san);
  sanListener = san.on("click", saneraKlotter);
  addScore(event, 100)
}

function saneraKlotter(event) {
  san.alpha += 0.1;
  addScore(event, 100);
  if (san.alpha >= 1) {
    san.off("click", sanListener);
    stage.addChild(kamera);
    var mobil = new createjs.Bitmap("bitmaps/phone.png");
    mobil.x = sanerare.x;
    mobil.y = kamera.y+100;
    mobil.scaleY = mobil.scaleX = 0.33;
    stage.addChild(kameraTooltip);
    stage.addChild(mobil);
    mobilTooltip = new createjs.Bitmap("bitmaps/kollavtal.png");
    mobilTooltip.x = mobil.x + 20;
    mobilTooltip.y = mobil.y - 20;
    mobilTooltip.scaleY = mobilTooltip.scaleX = 2/5;
    mobilTooltip.on("click", endSanera);
    stage.addChild(mobilTooltip);
    mobil.on("click", endSanera);
  }
}
