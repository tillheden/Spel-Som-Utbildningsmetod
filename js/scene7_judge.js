function loadJudge() {
  updateListener = createjs.Ticker.on("tick", updateJudge);

  var skadereglerare = new createjs.Bitmap("bitmaps/tryggc.png");
  stage.addChild(skadereglerare);

  stage.addChild(scoreText);
  stage.setChildIndex(scoreText, stage.getNumChildren() - 1);
}

function updateJudge() {
  stage.update();
}

function endJudge() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
  loadMeeting();
}
