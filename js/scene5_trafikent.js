var notifikation, mobil, notListener

function loadTrafikent() {
  updateListener = createjs.Ticker.on("tick", updateTrafikent);

  var kontor = new createjs.Bitmap("bitmaps/trafikent.png");
  stage.addChild(kontor);

  var kaffemug = new createjs.Bitmap("bitmaps/coffee.png");
  kaffemug.x = 1060;
  kaffemug.y = 560;
  stage.addChild(kaffemug);
  kaffemug.on("click", taRast);
  var kaffeTooltip = new createjs.Bitmap("bitmaps/tarast.png");
  kaffeTooltip.x = kaffemug.x + 50;
  kaffeTooltip.y = kaffemug.y + 100;
  kaffeTooltip.scaleY = kaffeTooltip.scaleX = 2/5;
  kaffeTooltip.on("click", taRast);
  stage.addChild(kaffeTooltip);

  notifikation = new createjs.Bitmap("bitmaps/notification.png");
  notifikation.x = 930;
  notifikation.y = 275;

  notListener = createjs.Ticker.on("tick", not);

  mobil = new createjs.Bitmap("bitmaps/phone.png");
  mobil.x = 465;
  mobil.y = 530;
  stage.addChild(mobil);

  placeScore();
  textTooltip.text = "Trafikentreprenör";
}

function updateTrafikent() {
  stage.update();
}

function endTrafikent() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
  loadSanera();
}

var q = 100;
function not(event) {
  if (q == 0) {
    stage.addChild(notifikation);
    createjs.Ticker.off("tick", notListener);
    mobilTooltip = new createjs.Bitmap("bitmaps/kontaktasanerare.png");
    mobilTooltip.x = mobil.x + 70;
    mobilTooltip.y = mobil.y + 20;
    mobilTooltip.scaleY = mobilTooltip.scaleX = 2/5;
    mobilTooltip.on("click", endTrafikent);
    stage.addChild(mobilTooltip);
    mobil.on("click", endTrafikent);
  }
  else
    q -= 1;
}
