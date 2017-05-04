function loadJudge() {
  updateListener = createjs.Ticker.on("tick", updateJudge);

  var skadereglerare = new createjs.Bitmap("bitmaps/reglerarebg.png");
  stage.addChild(skadereglerare);


  placeScore();
  textTooltip.text = "Skadereglerare";
}

function updateJudge() {
  stage.update();
}

function endJudge() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
  loadMeeting();
}
