var drawEscapeListener;
var bg1;
var bg2;
var rogueSpeed;

function loadEscape() {
  console.log("loadEscape");
  drawEscapeListener = createjs.Ticker.on("tick", drawEscape);
  bg1 = new createjs.Bitmap("bitmaps/subway.jpg");
  bg2 = new createjs.Bitmap("bitmaps/subway.jpg");
  // PicWidth * Scale = CanvasWidth => Scale = CanvasWidth / PicWidth
  bg1.scaleX = bg2.scaleX = stage.canvas.width / 1186;
  bg1.scaleY = bg2.scaleY = stage.canvas.height / 512;
  stage.addChild(bg1);
  stage.addChild(bg2);
  bg2.x = 1186 * bg2.scaleX;

  escapeText = new createjs.Text("Fly från vakten!", "25px Arial", "#DDD");
  escapeText.x = (stage.canvas.width/2) - (graffitiText.getMeasuredWidth()/2);
  escapeText.y = 15;
  stage.addChild(escapeText);

  stage.addChild(rogue);
  rogue.gotoAndPlay("rogue_run");
  rogue.on("click", escape);
  rogueSpeed = 0;

  var guardSheet = new createjs.SpriteSheet({
    "animations": {
      "guard_run": {
        "frames": [1,2,3,4,5],
        "speed": 0.4
      }
    },
    "images": ["bitmaps/guard.png"],
    "frames": {
      "width": 544/7,
      "height": 104
    }
  });
  var guard = new createjs.Sprite(guardSheet);
  guard.gotoAndPlay("guard_run");
  guard.x = 15;
  guard.y = 400;
  stage.addChild(guard);
}


function escape(event) {
  rogueSpeed += 2;
}

function drawEscape() {
  if (rogueSpeed > 0) {
    rogueSpeed -= 0.5;
  }
  rogue.x += rogueSpeed;
  bg1.x -= rogueSpeed*2;
  bg2.x -= rogueSpeed*2;
  if (bg1.x < -1186*bg1.scaleX) bg1.x = 1186*bg1.scaleX-rogueSpeed*2;
  if (bg2.x < -1186*bg2.scaleX) bg2.x = 1186*bg2.scaleX-rogueSpeed*2;
  stage.update();
}

function endEscape(event) {
  createjs.Ticker.off("tick", drawGraffitiListener);
  stage.removeAllChildren();
  // TODO: play cutscene
}
