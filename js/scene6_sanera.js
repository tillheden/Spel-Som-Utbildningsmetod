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
    taBild.on("click", taFörebild);

    placeScore();
    textTooltip.text = "Sanerare";
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
  stage.removeChild(taBild);
  stage.removeChild(sanera);
  klotter.removeAllEventListeners();
  sanerare.y = 700;
  sanerare.x = stage.canvas.width / 2;
  klotterBlock.antalBlock = 0;
  for (var i = 0; i < 5; i++) {
    klotterBlock[i] = new createjs.Bitmap("bitmaps/ruta.png");
    klotterBlock[i].x = Math.random()*(stage.canvas.width-200) + 200;
    klotterBlock[i].y = Math.random()*100;
    stage.addChild(klotterBlock[i]);
    klotterBlock.antalBlock += 1;
  }
  klotterBlock.moveListener = createjs.Ticker.on("tick", moveKlotterBlock);
  skjutSaneringListener = stage.on("click", skjutSanering);
}

function moveKlotterBlock(event) {
  for (var i = 0; i < klotterBlock.antalBlock; i++) {
    klotterBlock[i].y += 1;
    if (klotterBlock[i].y > 740) {
      event.stageX = klotterBlock[i].x;
      event.stageY = klotterBlock[i].y-100;
      addScore(event, -100);
      klotterBlock[i].x = Math.random()*(stage.canvas.width-200) + 200;
      klotterBlock[i].y = Math.random()*100;
    }
  }
}

var ammo = 50;
function skjutSanering(event) {
  ammo -= 1;
  if (ammo < 0) {
    stage.off("click", skjutSaneringListener);
    sanerare.y = vandal.y;
    createjs.Ticker.off("tick", klotterBlock.moveListener);
    for (var i = 0; i < klotterBlock.antalBlock; i++) {
      stage.removeChild(klotterBlock[i]);
      stage.setChildIndex(sanerare, stage.getNumChildren()-1);
    }
  } else {
    var projectile = new createjs.Bitmap("bitmaps/camera.png");
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
  data.proj.distanceTraveled += 10;
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
        var san = new createjs.Bitmap("bitmaps/sanerat.png");
        stage.addChild(san);
        san.x = Math.random()*(klotter.getBounds().width-100)+klotter.x;
        san.y = Math.random()*(klotter.getBounds().height-100)+klotter.y;
        stage.setChildIndex(san, 5);
        event.stageX = klotterBlock[i].x;
        event.stageY = klotterBlock[i].y;
        addScore(event, 25);
        klotterBlock[i].x = Math.random()*(stage.canvas.width-200) + 200;
        klotterBlock[i].y = Math.random()*100;
        if (i == 4) {
          klotterBlock[klotterBlock.antalBlock] = new createjs.Bitmap("bitmaps/ruta.png");
          klotterBlock[klotterBlock.antalBlock].x = Math.random()*(stage.canvas.width-200) + 200;
          klotterBlock[klotterBlock.antalBlock].y = Math.random()*100;
          stage.addChild(klotterBlock[klotterBlock.antalBlock]);
          klotterBlock.antalBlock += 1;
        }
        removeProjectile(data.proj);
      }
    }
  }
}

function visaSanering() {
  var sanering = new createjs.Bitmap("bitmaps/sanering.png");
  stage.addChild(sanering);
  sanering.x = tooltipGraphics.x;
  sanering.y = 80;
  sanering.scaleX = sanering.scaleY = 0.25;
  tooltipGraphics.removeAllEventListeners();
  tooltipGraphics.on("click", endSanera);
  var c1, c2, c3;
  if (före == true) c1 = new createjs.Bitmap("bitmaps/checkmark.png");
  else c1 = new createjs.Bitmap("bitmaps/cross.png");
  c2 = new createjs.Bitmap("bitmaps/checkmark.png");
  if (efter == true) c3 = new createjs.Bitmap("bitmaps/checkmark.png");
  else c3 = new createjs.Bitmap("bitmaps/cross.png");
  c1.scaleY = c1.scaleX = c2.scaleY = c2.scaleX = c3.scaleY = c3.scaleX = 0.23;
  c1.x = c2.x = c3.x = sanering.x + 140;
  c1.y = sanering.y + 35;
  c2.y = sanering.y + 65;
  c3.y = sanering.y + 97;
  stage.addChild(c1);
  stage.addChild(c2);
  stage.addChild(c3);
}

var före = false
function taFörebild(event) {
  före = true;
  dokumentera(event);
}

var efter = false
function taEfterbild(event) {
  efter = true;
  dokumentera(event);
}
