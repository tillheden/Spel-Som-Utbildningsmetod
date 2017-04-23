var drawTryggCListener;

function loadTryggC() {
  drawEscapeListener = createjs.Ticker.on("tick", drawTryggC);

}

function drawTryggC() {
  stage.update();
}

function endTryggC(event) {
  createjs.Ticker.off("tick", drawGraffitiListener);
  stage.removeAllChildren();
  // TODO: play cutscene
}
