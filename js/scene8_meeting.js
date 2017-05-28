var meetingText, bossbot, fortMeet, bord, bg
function loadMeeting() {
  updateListener = createjs.Ticker.on("tick", updateMeeting);

  bg = new createjs.Bitmap("bitmaps/meeting.png");
  stage.addChild(bg);

  bossbot = new createjs.Bitmap("bitmaps/bossbot.png");
  stage.addChild(bossbot);
  bossbot.y = 80;
  bossbot.x = 25;
  bossbot.scaleY = bossbot.scaleX = 1.3;

  bord = new createjs.Bitmap("bitmaps/table.png");
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
  textTooltip.text = "Affärsförvaltare";
  /*endMeeting();*/
}

function updateMeeting() {
  stage.update();
}

function endMeeting() {
  stage.removeAllEventListeners();
  createjs.Ticker.removeAllEventListeners();
  stage.removeAllChildren();
  loadScoreScreen();
}

var animationListener
function continueMeeting(event) {
  stage.removeChild(bossbot);
  stage.removeChild(meetingText);
  stage.removeChild(fortMeet);
  bossbot = new createjs.Bitmap("bitmaps/bossbot2.png");
  stage.addChild(bossbot);
  stage.setChildIndex(bossbot, 1);
  bossbot.scaleY = bossbot.scaleX = 1.3;
  bossbot.y = 80;
  animationListener = createjs.Ticker.on("tick", bossbotAnimation);
}

var bossT = 100;
var ammoText;
function bossbotAnimation() {
  bossT -= 1;
  if (bossT > 0) {
    bossbot.y -= 1;
  }
  else if (bossT == 0) {
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
    bossbot = new createjs.Sprite(bossbotSheet);
    bossbot.gotoAndPlay("boss_idle");
    stage.addChild(bossbot);
    stage.setChildIndex(bossbot, 1);
    bossbot.scaleY = bossbot.scaleX = 1.3;
  }
  else if (bossT < -10) {
    createjs.Ticker.off("tick", animationListener);
    stage.removeChild(bord);
    stage.removeChild(bg);
    bg = new createjs.Bitmap("bitmaps/meetingbg.png");
    stage.addChild(bg);
    var hej = new createjs.Bitmap("bitmaps/besegra.png");
    stage.addChild(hej);
    hej.x = 250;
    stage.setChildIndex(bossbot, stage.getNumChildren()-1);
    bossbot.scaleY = bossbot.scaleX = 0.7;
    bossbot.y = 60;
    bossbot.battleListener = createjs.Ticker.on("tick", bossbotBattle);
    var ammoPic = new createjs.Bitmap("bitmaps/paperprojectile.png");
    stage.addChild(ammoPic);
    ammoPic.x = 20;
    ammoPic.y = 660;
    ammoPic.scaleY = ammoPic.scaleX = 2;
    ammoText = new createjs.Text("10", "Bold 50px Arial", "#FFF");
    ammoText.shadow = new createjs.Shadow("#000", 1, 1, 2);
    stage.addChild(ammoText);
    ammoText.y = ammoPic.y + 12.5;
    ammoText.x = ammoPic.x + 100;
    stage.on("click", kastaPapper);
    limit = Math.random()*stage.canvas.width+500;

    placeScore();
  }
}

var bossSpeed = 10;
var bossYspeed = 2;
var limit
function bossbotBattle(event) {
  bossbot.x += bossSpeed;
  if (bossbot.x - limit < 20 && bossbot.x - limit > 0 || bossbot.x+360 > stage.canvas.width || bossbot.x < 0) {
    bossSpeed *= -1;
    limit = Math.random()*(stage.canvas.width-500);
  }
  bossbot.y += bossYspeed;
  if (bossbot.y > 150 || bossbot.y < 0) {
    bossYspeed *= -1;
  }
}

function kastaPapper(event) {
  ammoText.text = ammoText.text - 1;
  var projectile = new createjs.Bitmap("bitmaps/paperprojectile.png");
  stage.addChild(projectile);
  projectile.originalX = projectile.x = (stage.canvas.width / 2);
  projectile.originalY = projectile.y = stage.canvas.height;
  var a = Math.sqrt(Math.pow(stage.canvas.width - event.stageX+32, 2) + Math.pow(projectile.originalY - event.stageY+32, 2));
  var b = Math.sqrt(Math.pow(projectile.originalX - event.stageX+32, 2) + Math.pow(projectile.originalY - event.stageY+32, 2));
  var c = projectile.originalX;
  projectile.angle = Math.acos((Math.pow(a, 2) - Math.pow(b, 2) - Math.pow(c, 2)) / (-2*b*c));
  projectile.distanceTraveled = 0;
  projectile.listener = createjs.Ticker.on("tick", movePaper, null, false, {proj: projectile});
  projectile.collisionListener = createjs.Ticker.on("tick", bossCollision, null, false, {proj: projectile});
  if (ammoText.text == -1) endMeeting();
}

function movePaper(event, data) {
  data.proj.x = data.proj.originalX + data.proj.distanceTraveled*Math.cos(data.proj.angle);
  data.proj.y = data.proj.originalY - data.proj.distanceTraveled*Math.sin(data.proj.angle);
  data.proj.distanceTraveled += 20;
  if (data.proj.y < 0-64 || data.proj.x > 1334-64 || data.proj.x < 0-64) {
    removeProjectile(data.proj);
  }
}

function bossCollision(event, data) {
  var intersection = ndgmr.checkPixelCollision(bossbot, data.proj, 0, true);
  if (intersection) {
    removeProjectile(data.proj);
    event.stageX = data.proj.x;
    event.stageY = data.proj.y;
    addScore(event, 50);
  }
}
