var notifikation, mobil, notifikationTooltip

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
  /*notifikation.scaleY = notifikation.scaleX = 0.85;*/
  stage.addChild(notifikation);
  notifikation.on("click", kollaSkadeDB);
  notifikationTooltip = new createjs.Bitmap("bitmaps/kollavtal.png");
  notifikationTooltip.x = notifikation.x + 20;
  notifikationTooltip.y = notifikation.y - 20;
  notifikationTooltip.scaleY = notifikationTooltip.scaleX = 2/5;
  notifikationTooltip.on("click", kollaSkadeDB);
  stage.addChild(notifikationTooltip);

  mobil = new createjs.Bitmap("bitmaps/phone.png");
  mobil.x = 465;
  mobil.y = 530;
  stage.addChild(mobil);

  stage.addChild(textTooltip);
  textTooltip.text = "Trafikentreprenör";

  stage.addChild(scoreText);
  stage.setChildIndex(scoreText, stage.getNumChildren() - 1);
}

function updateTrafikent() {
  stage.update();
}

function endTrafikent() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
  loadSanera();
}

function kollaSkadeDB(event) {
  stage.removeChild(notifikation);
  stage.removeChild(notifikationTooltip);
  mobilTooltip = new createjs.Bitmap("bitmaps/kollavtal.png");
  mobilTooltip.x = mobil.x + 20;
  mobilTooltip.y = mobil.y - 20;
  mobilTooltip.scaleY = mobilTooltip.scaleX = 2/5;
  mobilTooltip.on("click", endTrafikent);
  stage.addChild(mobilTooltip);
  mobil.on("click", endTrafikent);
  addScore(event, 150);
}
