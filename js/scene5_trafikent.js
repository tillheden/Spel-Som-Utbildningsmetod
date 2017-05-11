var notifikation, mobil, notListener

function loadTrafikent() {
  updateListener = createjs.Ticker.on("tick", updateTrafikent);

  var kontor = new createjs.Bitmap("bitmaps/trafikent.png");
  stage.addChild(kontor);

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

  /*q = 100*/
var q = 100;
var stotText, stotande, inteStotande
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
    stotText = new createjs.Bitmap("bitmaps/isitstötande.png");
    stotText.x = mobil.x;
    stotText.y = dator.y - 150;
    stotText.scaleX = stotText.scaleY = 0.75;
    stage.addChild(stotText);

    stotande = new createjs.Bitmap("bitmaps/ja.png");
    stage.addChild(stotande);
    stotande.x = dator.x+20;
    stotande.y = dator.y;
    stotande.on("click", stot);

    inteStotande = new createjs.Bitmap("bitmaps/nej.png");
    stage.addChild(inteStotande);
    inteStotande.x = dator.x+100;
    inteStotande.y = dator.y;
    inteStotande.on("click", stot);
    /*endTrafikent();*/
  }
  else
    q -= 1;
}

function stot(event) {
  if ((klotter.stotande == true && event.target == stotande) || (klotter.stotande == false && event.target == inteStotande))
    addScore(event, 150);
  else {
    var j = new createjs.Bitmap("bitmaps/isnotstötande.png");
    j.on("click", tabortRuta, null, true);
    j.x = stotText.x;
    j.y = stotText.y;
    stage.addChild()
    addScore(event, -100);
  }

  stage.removeChild(stotande);
  stage.removeChild(inteStotande);
  stage.removeChild(stotText);
}

function tabortRuta(event) {
  stage.removeChild(event.target);
}
