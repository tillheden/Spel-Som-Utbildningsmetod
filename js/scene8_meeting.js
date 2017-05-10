var meetingText, bossbot, fortMeet
function loadMeeting() {
  updateListener = createjs.Ticker.on("tick", updateMeeting);

  var bg = new createjs.Bitmap("bitmaps/meeting.png");
  stage.addChild(bg);

  bossbot = new createjs.Bitmap("bitmaps/bossbot.png");
  stage.addChild(bossbot);
  bossbot.y = 80;
  bossbot.scaleY = bossbot.scaleX = 1.3;

  var bord = new createjs.Bitmap("bitmaps/table.png");
  stage.addChild(bord);
  bord.y = 400;

  meetingText = new createjs.Bitmap("bitmaps/meetingtext.png");
  stage.addChild(meetingText);
  meetingText.y = 600;
  meetingText.x = 50;

  fortMeet = new createjs.Bitmap("bitmaps/fortsätt.png");
  stage.addChild(fortMeet);
  fortMeet.x = 1050;
  fortMeet.y = 10;
  fortMeet.scaleY = fortMeet.scaleX = 1.25;
  fortMeet.on("click", continueMeeting, null, true);

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

function continueMeeting(event) {
  stage.removeChild(bossbot);
  stage.removeChild(meetingText);
  stage.removeChild(fortMeet);
  bossbot = new createjs.Bitmap("bitmaps/bossbot2.png");
  stage.addChild(bossbot);
  stage.setChildIndex(bossbot, 1);
  bossbot.scaleY = bossbot.scaleX = 1.3;
  bossbot.y = 80;
  bossbot.animationListener = createjs.Ticker.on("tick", bossbotAnimation);
}

var bossT = 100;
function bossbotAnimation() {
  bossT -= 1;
  if (bossT > 0) {
    bossbot.y -= 1;
  } else {
    createjs.Ticker.off("tick", bossbot.animationListener);
    stage.removeChild(bossbot);
    var bossbotSheet = new createjs.SpriteSheet({
        animations: {
            boss_idle: {
                frames: [0,1,2],
                speed: 0.075
            },
        },
        images: ["bitmaps/bossanim.png"],
        frames: {
            width: 1530/3,
            height: 690
        }
    });
    console.log(bossbotSheet);
    bossbot = new createjs.Sprite(bossbotSheet);
    bossbot.gotoAndPlay("boss_idle");
    stage.addChild(bossbot);
    stage.setChildIndex(bossbot, 1);
    bossbot.scaleY = bossbot.scaleX = 1.3;
  }
}
