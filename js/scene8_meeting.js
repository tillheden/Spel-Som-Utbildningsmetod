function loadMeeting() {
  updateListener = createjs.Ticker.on("tick", updateMeeting);
  stage.addChild(station);
  station.on("click", skjut);

  placeScore();
  /*endMeeting();*/
}

function updateMeeting() {
  stage.update();
}

function endMeeting() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
  loadScoreScreen();
}

function skjut(event) {
  var projectile = new createjs.Bitmap("bitmaps/ruta.png");
  /*projectile.scaleY = projectile.scaleX = 1/3;*/
  stage.addChild(projectile);
  projectile.originalX = projectile.x = (stage.canvas.width / 2);
  projectile.originalY = projectile.y = stage.canvas.height;
  var a = Math.sqrt(Math.pow(stage.canvas.width - event.stageX+32, 2) + Math.pow(projectile.originalY - event.stageY+32, 2));
  var b = Math.sqrt(Math.pow(projectile.originalX - event.stageX+32, 2) + Math.pow(projectile.originalY - event.stageY+32, 2));
  var c = projectile.originalX;
  projectile.angle = Math.acos((Math.pow(a, 2) - Math.pow(b, 2) - Math.pow(c, 2)) / (-2*b*c));
  projectile.distanceTraveled = 0;
  projectile.listener = createjs.Ticker.on("tick", moveProjectile, null, false, {proj: projectile});
}
