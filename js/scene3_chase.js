var bg1, bg2, csg, collisionListener, vandalRymtListener

function loadChase() {
    updateListener = createjs.Ticker.on("tick", updateChase);
    bg1 = station.clone();
    bg2 = new createjs.Bitmap("bitmaps/stationbg.png");
    bg2.x = stage.canvas.width;
    stage.addChild(bg1);
    stage.addChild(bg2);
    stage.addChild(klotter);
    stage.addChild(sprayburk);

    stage.addChild(textTooltip);
    textTooltip.text = "Ta fast klottraren!";

    stage.addChild(vandal);
    vandal.gotoAndPlay("vandal_run");

    var csgSheet = new createjs.SpriteSheet({
        animations: {
            csg_idle: {
                frames: [8]
            },
            csg_run: {
                frames: [0, 1, 2, 3, 4, 5, 6, 7],
                speed: 0.25
            },
        },
        images: ["bitmaps/runningcsg.png"],
        frames: {
            width: 200,
            height: 300
        }
    });
    csg = new createjs.Sprite(csgSheet);
    csg.scalex = 1.4;
    csg.scaleY = 1.6;
    csg.gotoAndPlay("csg_idle");
    csg.x = 0;
    csg.y = vandal.y-50;
    csg.on("click", jaga);
    csg.speed = 0;
    stage.addChild(csg);

    var run = new createjs.Bitmap("bitmaps/run.png");
    stage.addChild(run);
    run.x = 15;
    run.y = 600;
    run.on("click", jaga);

    tooltipGraphics = new createjs.Bitmap("bitmaps/gripklottraren.png");
    stage.addChild(tooltipGraphics);
    tooltipGraphics.y = 20;
    tooltipGraphics.x = 3*stage.canvas.width/8;
    tooltipGraphics.scaleY = tooltipGraphics.scaleX = 0.5;

    placeScore();
    textTooltip.text = "CSG";
}

function jaga(event) {
    if (csg.currentAnimation === "csg_idle") csg.gotoAndPlay("csg_run");
    csg.speed += 3.4;
    /*csg.speed += 30.4;*/
}

var c = 0;
function updateChase() {
  stage.update();
  c += 1;
  if (vandal.x - csg.x < 75) {
    score += Math.floor(100000/c);
    scoreText.text = score;
    endChase(1);
  }
  else if (vandal.x - csg.x > 2250)
    endChase(0);

  if (csg.x > 1300) {
    csg.x = -50;
    vandal.x = stage.canvas.width / 2 - 150;
  }
  if (csg.speed >= 0.2) { csg.speed -= 0.2; }
  else csg.gotoAndPlay("csg_idle");

  if (bg1.x < -stage.canvas.width) bg1.x = bg2.x+stage.canvas.width;
  if (bg2.x < -stage.canvas.width) bg2.x = bg1.x+stage.canvas.width;

  bg1.x -= csg.speed * 2;
  klotter.x -= csg.speed * 2;
  sprayburk.x -= csg.speed * 2;
  bg2.x -= csg.speed * 2;
  csg.x += csg.speed;
  vandal.x += 6;
}

function endChase(msg) {
    createjs.Ticker.off("tick", updateListener);
    csg.removeAllEventListeners();
    stage.removeAllChildren();
    loadCSG(msg);
}
