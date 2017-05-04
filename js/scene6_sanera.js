var taBild
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

    if (klotter.x < stage.canvas.width / 2) sanerare.x = klotter.x + 300;
    else sanerare.x = klotter.x - 200;

    sanera = new createjs.Bitmap("bitmaps/sanera.png");
    stage.addChild(sanera);
    sanera.y = klotter.y+60;
    sanera.x = klotter.x-200;
    sanera.scaleY = sanera.scaleX = 2/5;
    sanera.on("click", startaSanering);

    taBild = new createjs.Bitmap("bitmaps/tabild.png");
    stage.addChild(taBild);
    taBild.y = klotter.y;
    taBild.x = klotter.x-200;
    taBild.scaleY = taBild.scaleX = 2/5;
    taBild.on("click", taFörebild);

    placeScore();
    textTooltip.text = "Sanerare";
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
  stage.removeChild(taBild);
  san = new createjs.Bitmap("bitmaps/sanerat.png");
  san.alpha = 0.8;
  san.x = klotter.x;
  san.y = klotter.y;
  klotter.removeAllEventListeners();
  sanera.removeAllEventListeners();
  sanera.on("click", saneraKlotter);
  stage.addChild(san);
  sanListener = san.on("click", saneraKlotter);
  addScore(event, 100);
}

function saneraKlotter(event) {
  san.alpha += 0.1;
  addScore(event, 100);
  if (san.alpha >= 1) {
    san.off("click", sanListener);
    stage.addChild(taBild);
    taBild.removeAllEventListeners();
    taBild.on("click", taEfterbild);
    stage.removeChild(sanera);
    stage.addChild(tooltipGraphics);
    tooltipGraphics.removeAllEventListeners();
    tooltipGraphics.on("click", visaSanering);
  }
}

function visaSanering() {
  var sanering = new createjs.Bitmap("bitmaps/sanering.png");
  stage.addChild(sanering);
  sanering.x = tooltipGraphics.x;
  sanering.y = 80;
  sanering.scaleX = sanering.scaleY = 0.25;
  tooltipGraphics.removeAllEventListeners();
  tooltipGraphics.on("click", endSanera);
  var c1, c2, c3;
  if (före == true) c1 = new createjs.Bitmap("bitmaps/checkmark.png");
  else c1 = new createjs.Bitmap("bitmaps/cross.png");
  c2 = new createjs.Bitmap("bitmaps/checkmark.png");
  if (efter == true) c3 = new createjs.Bitmap("bitmaps/checkmark.png");
  else c3 = new createjs.Bitmap("bitmaps/cross.png");
  c1.scaleY = c1.scaleX = c2.scaleY = c2.scaleX = c3.scaleY = c3.scaleX = 0.23;
  c1.x = c2.x = c3.x = sanering.x + 140;
  c1.y = sanering.y + 35;
  c2.y = sanering.y + 65;
  c3.y = sanering.y + 97;
  stage.addChild(c1);
  stage.addChild(c2);
  stage.addChild(c3);
}

var före = false
function taFörebild(event) {
  före = true;
  dokumentera(event);
}

var efter = false
function taEfterbild(event) {
  efter = true;
  dokumentera(event);
}
