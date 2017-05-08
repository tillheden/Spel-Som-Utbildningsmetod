function loadMeeting() {
  updateListener = createjs.Ticker.on("tick", updateMeeting);
  /*createjs.Ticker.framerate = 1;*/
  stage.addChild(station);
  station.on("click", skjut);

  placeScore();
}

function updateMeeting() {
  stage.update();
}

function endMeeting() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
}

function skjut(event) {
  var projectile = new createjs.Bitmap("bitmaps/cross.png");
  /*projectile.scaleY = projectile.scaleX = 1/3;*/
  stage.addChild(projectile);
  projectile.x = stage.canvas.width / 2 - 32;
  projectile.y = stage.canvas.height - 32;
  var a = Math.sqrt(Math.pow(stage.canvas.width - event.stageX-32, 2) + Math.pow(stage.canvas.height - event.stageY, 2));
  var b = Math.sqrt(Math.pow(stage.canvas.width/2 - event.stageX-32, 2) + Math.pow(stage.canvas.height - event.stageY, 2));
  var c = stage.canvas.width / 2;
  projectile.alpha = Math.acos((a*a - b*b - c*c)/(-2*b*c));
  projectile.distanceTraveled = 0;
  projectile.listener = createjs.Ticker.on("tick", moveProjectile, null, false, {proj: projectile});
  console.log(projectile);
}

function moveProjectile(event, data) {
  data.proj.distanceTraveled += 5;
  data.proj.x = stage.canvas.width/2 -32 + data.proj.distanceTraveled*Math.cos(data.proj.alpha);
  data.proj.y = stage.canvas.height-32 - data.proj.distanceTraveled*Math.sin(data.proj.alpha);
  console.log("["+data.proj.x+", "+data.proj.y+"]");
  if (data.proj.y < 200) 
}
