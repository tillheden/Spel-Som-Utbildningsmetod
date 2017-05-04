function loadMeeting() {
  updateListener = createjs.Ticker.on("tick", updateMeeting);

  var tryggcBg = new createjs.Bitmap("bitmaps/tryggcbg.png");
  // PicWidth * Scale = CanvasWidth => Scale = CanvasWidth / PicWidth
  tryggcBg.scaleX = stage.canvas.width / 960;
  tryggcBg.scaleY = stage.canvas.height / 610;
  stage.addChild(tryggcBg);

  stage.addChild(scoreText);
  stage.setChildIndex(scoreText, stage.getNumChildren() - 1);
}

function updateMeeting() {
  stage.update();
}

function endMeeting() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
}
