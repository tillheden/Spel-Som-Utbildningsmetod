var taBild, skjutSaneringListener
function loadSanera() {
    updateListener = createjs.Ticker.on("tick", updateSanera);

    stage.addChild(station);

    stage.addChild(klotter);
    klotter.x = klotter.originalX;
    klotter.y = klotter.originalY;

    sanerare = new createjs.Bitmap("bitmaps/sanerare.png");
    sanerare.scaleX = sanerare.scaleY = 0.5;
    sanerare.y = vandal.y;
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
    taBild.listener = taBild.on("click", taForeBild);

    var saneringsinfo = new createjs.Bitmap("bitmaps/saneringinfo.png");
    stage.addChild(saneringsinfo);
    saneringsinfo.x = 250;
    saneringsinfo.y = 50;
    saneringsinfo.on("click", tabortRuta, null, true);

    placeScore();
    textTooltip.text = "Sanerare";
    /*endSanera();*/
}

function updateSanera() {
    stage.update();
}

function endSanera(event) {
    createjs.Ticker.off("tick", updateSanera);
    stage.removeAllChildren();
    loadJudge();
}

var klotterBlock = {};
function startaSanering(event) {
  taBild.off("click", taBild.listener);
  stage.removeChild(taBild);
  stage.removeChild(sanera);
  klotter.removeAllEventListeners();
  sanerare.y = 600;
  sanerare.x = stage.canvas.width / 2;
  klotterBlock.antalBlock = 0;
  for (var i = 0; i < 5; i++) {
    klotterBlock[i] = new createjs.Bitmap(klotter.splat);
    klotterBlock[i].x = Math.random()*(stage.canvas.width-300) + 100;
    klotterBlock[i].y = Math.random()*100;
    stage.addChild(klotterBlock[i]);
    klotterBlock.antalBlock += 1;
  }
  klotterBlock.moveListener = createjs.Ticker.on("tick", moveKlotterBlock);
  skjutSaneringListener = stage.on("click", skjutSanering);
}

function moveKlotterBlock(event) {
  for (var i = 0; i < klotterBlock.antalBlock; i++) {
    klotterBlock[i].y += 2.1;
    if (klotterBlock[i].y > 740) {
      event.stageX = klotterBlock[i].x;
      event.stageY = klotterBlock[i].y-100;
      addScore(event, -20);
      klotterBlock[i].x = Math.random()*(stage.canvas.width-300) + 100;
      klotterBlock[i].y = Math.random()*100;
    }
  }
}

var fortsatt
function skjutSanering(event) {
  if (klotter.alpha <= 0) {
    stage.off("click", skjutSaneringListener);
    createjs.Ticker.removeAllEventListeners();
    updateListener = createjs.Ticker.on("tick", updateSanera);
    stage.addChild(station);
    placeScore();
    stage.addChild(sanerare);
    sanerare.y = vandal.y;
    klotterBlock = null;
    stage.addChild(taBild);
    taBild.on("click", taEfterbild);
    fortsatt = new createjs.Bitmap("bitmaps/fortsatt.png");
    stage.addChild(fortsatt);
    fortsatt.on("click", visaSanering);
    fortsatt.y = 50;
    fortsatt.x = stage.canvas.width * 0.8
  } else {
    var projectile = new createjs.Bitmap("bitmaps/waterprojectile.png");
    /*projectile.scaleY = projectile.scaleX = 1/3;*/
    stage.addChild(projectile);
    projectile.originalX = projectile.x = (stage.canvas.width / 2);
    projectile.originalY = projectile.y = stage.canvas.height;
    var a = Math.sqrt(Math.pow(stage.canvas.width - event.stageX+32, 2) + Math.pow(projectile.originalY - event.stageY+32, 2));
    var b = Math.sqrt(Math.pow(projectile.originalX - event.stageX+32, 2) + Math.pow(projectile.originalY - event.stageY+32, 2));
    var c = projectile.originalX;
    projectile.angle = Math.acos((Math.pow(a, 2) - Math.pow(b, 2) - Math.pow(c, 2)) / (-2*b*c));
    projectile.distanceTraveled = 0;
    projectile.moveListener = createjs.Ticker.on("tick", moveProjectile, null, false, {proj: projectile});
    projectile.collisionListener = createjs.Ticker.on("tick", collisionCheck, null, false, {proj: projectile});
  }
}

function moveProjectile(event, data) {
  data.proj.x = data.proj.originalX + data.proj.distanceTraveled*Math.cos(data.proj.angle);
  data.proj.y = data.proj.originalY - data.proj.distanceTraveled*Math.sin(data.proj.angle);
  data.proj.distanceTraveled += 15;
  if (data.proj.y < 0-64 || data.proj.x > 1334-64 || data.proj.x < 0-64) {
    removeProjectile(data.proj);
  }
}

function removeProjectile(p) {
  createjs.Ticker.off("tick", p.moveListener);
  createjs.Ticker.off("tick", p.collisionListener);
  stage.removeChild(p);
}

function collisionCheck(event, data) {
  for (var i = 0; i < klotterBlock.antalBlock; i++) {
    if (data.proj.y - klotterBlock[i].y < 5) {
      var intersection = ndgmr.checkRectCollision(klotterBlock[i], data.proj);
      if (intersection) {
        event.stageX = klotterBlock[i].x;
        event.stageY = klotterBlock[i].y;
        addScore(event, 25);
        klotterBlock[i].x = Math.random()*(stage.canvas.width-300) + 100;
        klotterBlock[i].y = Math.random()*100;
        if (i % 4 == 0) {
          klotterBlock[klotterBlock.antalBlock] = new createjs.Bitmap(klotter.splat);
          klotterBlock[klotterBlock.antalBlock].x = Math.random()*(stage.canvas.width-200) + 200;
          klotterBlock[klotterBlock.antalBlock].y = Math.random()*100;
          stage.addChild(klotterBlock[klotterBlock.antalBlock]);
          klotterBlock.antalBlock += 1;
        }
        klotter.alpha -= 1/30;
        removeProjectile(data.proj);
      }
    }
  }
}

var meter;
function visaSanering() {
  var sanering = new createjs.Bitmap("bitmaps/sanering.png");
  stage.removeChild(taBild);
  stage.addChild(sanering);
  sanering.x = stage.canvas.width/2 - 250;
  sanering.y = stage.canvas.height*0.3;
  sanering.scaleX = sanering.scaleY = 0.75;
  stage.removeChild(fortsatt);
  stage.addChild(fortsatt);
  fortsatt.on("click", endSanera);
  fortsatt.x = stage.canvas.width/2 - 220;
  fortsatt.y = 680;
  tooltipGraphics.removeAllEventListeners();
  tooltipGraphics.on("click", endSanera);
  var c1, c2, c3;
  if (fore == true) c1 = new createjs.Bitmap("bitmaps/checkmark.png");
  else c1 = new createjs.Bitmap("bitmaps/cross.png");
  c2 = new createjs.Bitmap("bitmaps/checkmark.png");
  if (efter == true) c3 = new createjs.Bitmap("bitmaps/checkmark.png");
  else c3 = new createjs.Bitmap("bitmaps/cross.png");
  c1.scaleY = c1.scaleX = c2.scaleY = c2.scaleX = c3.scaleY = c3.scaleX = 0.60;
  c1.x = c2.x = c3.x = sanering.x + 422;
  c1.y = sanering.y + 105;
  c2.y = sanering.y + 193;
  c3.y = sanering.y + 295;
  stage.addChild(c1);
  stage.addChild(c2);
  stage.addChild(c3);

}

var fore = false;
function taForeBild(event) {
  fore = true;
  dokumentera(event);
}

var efter = false;
function taEfterbild(event) {
  efter = true;
  dokumentera(event);
}
