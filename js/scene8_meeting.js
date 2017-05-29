var meetingText, bossbot, bord, bg, begPlan, begVite, planValText, timerDisplay;
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
  meetingText.y = 450;
  meetingText.x = 50;

  begPlan = new createjs.Bitmap("bitmaps/beg_plan.png");
  begPlan.x = stage.canvas.width*0.65;
  begPlan.y = 570;
  stage.addChild(begPlan);
  begPlan.on("click", function (ev) {
      planValText = new createjs.Bitmap("bitmaps/plan_val_text.png");
      planValText.x = stage.canvas.width*0.30;
      planValText.y = 300;
      stage.addChild(planValText);
      stage.removeChild(ev.target);
  });

  begVite = new createjs.Bitmap("bitmaps/beg_vite.png");
  begVite.x = stage.canvas.width*0.13;
  begVite.y = 570;
  stage.addChild(begVite);
  begVite.on("click", function (event) {
      stage.removeChild(event.target);
      stage.removeChild(begPlan);
      stage.removeChild(planValText);
      continueMeeting(event);
  });

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

var animationListener;
function continueMeeting(event) {
  stage.removeChild(bossbot);
  stage.removeChild(meetingText);
  bossbot = new createjs.Bitmap("bitmaps/bossbot2.png");
  stage.addChild(bossbot);
  stage.setChildIndex(bossbot, 1);
  bossbot.scaleY = bossbot.scaleX = 1.3;
  bossbot.y = 80;
  animationListener = createjs.Ticker.on("tick", bossbotAnimation);
}

var bossT = 100;
var slRobot, robotArmOpen, robotArmClosed;
var timer = 30;
function bossbotAnimation() {
  bossT -= 1;
  if (bossT > 0) {
    bossbot.y -= 1;
  }
  else if (bossT === 0) {
    stage.removeChild(bossbot);
    var bossbotSheet = new createjs.SpriteSheet({
        animations: {
            boss_idle: {
                frames: [0,1,2],
                speed: 0.075
            }
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
  else if (bossT < -20) {
    createjs.Ticker.off("tick", animationListener);
    stage.removeChild(bord);
    stage.removeChild(bg);
    stage.removeChild(begVite);
    stage.removeChild(begPlan);
    stage.removeChild(planValText);
    bg = new createjs.Bitmap("bitmaps/meetingbg.png");
    stage.addChild(bg);
    var hej = new createjs.Bitmap("bitmaps/besegra.png");
    stage.addChild(hej);
    hej.x = 250;
    stage.setChildIndex(bossbot, stage.getNumChildren()-1);
    bossbot.scaleY = bossbot.scaleX = 0.7;
    bossbot.y = 60;
    bossbot.battleListener = createjs.Ticker.on("tick", bossbotBattle);

    slRobot = new createjs.Bitmap("bitmaps/sl_robot.png");
    slRobot.x = stage.canvas.width*0.35;
    slRobot.y = 555;
    stage.addChild(slRobot);
    slRobot.gotMoney = false;
    slRobot.canShoot = true;
    slRobot.speed = 0;
    slRobot.armSpeed = 0;
    slRobot.armX = slRobot.x;
    slRobot.armY = slRobot.y+100;
    slRobot.listenForMovement = createjs.Ticker.on("tick", function (e) {
        slRobot.x += slRobot.speed;
    });

    robotArmOpen = new createjs.Bitmap("bitmaps/robot_open.png");
    robotArmOpen.x = slRobot.armX;
    robotArmOpen.y = slRobot.armY;
    stage.addChild(robotArmOpen);

    robotArmClosed = new createjs.Bitmap("bitmaps/robot_closed.png");
    robotArmClosed.x = slRobot.armX;
    robotArmClosed.y = slRobot.armY;

    slRobot.armMovementListener = createjs.Ticker.on("tick", moveRobotArms);

    var goRight = new createjs.Bitmap("bitmaps/go_right.png");
    goRight.x = stage.canvas.width - 150;
    goRight.y = stage.canvas.height * 0.7;
    stage.addChild(goRight);
    goRight.on("mousedown", function (e) {
        if (slRobot.canShoot && slRobot.x < stage.canvas.width-100) {
            slRobot.speed = 5;
        }
    });
    goRight.on("pressup", function (e) {
        slRobot.speed = 0;
    });

    var goLeft = new createjs.Bitmap("bitmaps/go_right.png");
    goLeft.x = 30;
    goLeft.y = stage.canvas.height * 0.7;
    stage.addChild(goLeft);
    goLeft.on("mousedown", function (e) {
      if (slRobot.canShoot && slRobot.x > -350) {
          slRobot.speed = -5;
      }
    });
    goLeft.on("pressup", function (e) {
          slRobot.speed = 0;
      });

    var robotShoot = new createjs.Bitmap("bitmaps/robot_shoot.png");
    robotShoot.x = 30;
    robotShoot.y = stage.canvas.height *0.83;
    stage.addChild(robotShoot);
    robotShoot.on("click", function (e) {
        if (slRobot.canShoot) {
            slRobot.canShoot = false;
            slRobot.armSpeed = -4;
        }
    });

    timerDisplay = new createjs.Text("Tid kvar: "+timer, "50px Bold Arial", "#ff7288");
    timerDisplay.x = 30;
    timerDisplay.y = stage.canvas.height * 0.20;
    stage.addChild(timerDisplay);
    setTimeout(timerLogic, 1000);

    placeScore();
  }
}

function moveRobotArms(event) {
    slRobot.armX = slRobot.x;
    robotArmOpen.x = robotArmClosed.x = slRobot.armX;

    slRobot.armY += slRobot.armSpeed;
    robotArmOpen.y = robotArmClosed.y = slRobot.armY;

    if (slRobot.armY < 400) {
        slRobot.armSpeed *= -1;
        slRobot.gotMoney = true;
        stage.removeChild(robotArmOpen);
        stage.addChild(robotArmClosed);
    } else if (slRobot.armY > slRobot.y+100) {
        slRobot.armSpeed = 0;
        slRobot.armY = slRobot.y+100;
        slRobot.canShoot = true;
        if (slRobot.gotMoney) {
            stage.removeChild(robotArmClosed);
            stage.addChild(robotArmOpen);
            event.stageX = slRobot.armX;
            event.stageY = slRobot.armY;
            addScore(event, 100);
            slRobot.gotMoney = false;
        }
    } else {
        var intersection1 = ndgmr.checkPixelCollision(bossbot, robotArmOpen, 0, true);
        var intersection2 = ndgmr.checkPixelCollision(bossbot, robotArmClosed, 0, true);
        if (intersection1 || intersection2) {
            if (slRobot.armSpeed < 0) {
                addScore(event, -30);
                slRobot.armSpeed *= -1;
            }
            if (slRobot.gotMoney) {
                stage.removeChild(robotArmClosed);
                stage.addChild(robotArmOpen);
                event.stageX = slRobot.armX;
                event.stageY = slRobot.armY;
            }

        }
    }
}

function timerLogic() {
    if (timer > 0) {
        timer -= 1;
        timerDisplay.text = "Tid kvar: "+timer;
        setTimeout(timerLogic, 1000);
    } else {
        endMeeting();
    }
}


var bossSpeed = 7;
var bossYspeed = 2;
var limit;
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