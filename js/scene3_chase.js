var drawEscapeListener;
var bg1;
var bg2;
var rogueSpeed;
var guard;
var collisionListener;
var guardBounds;
var guardHitbox;

function loadEscape() {
    console.log("loadEscape");
    drawEscapeListener = createjs.Ticker.on("tick", drawEscape);
    bg1 = new createjs.Bitmap("bitmaps/subway.jpg");
    bg2 = bg1.clone();
    // PicWidth * Scale = CanvasWidth => Scale = CanvasWidth / PicWidth
    bg1.scaleX = bg2.scaleX = stage.canvas.width / 1186;
    bg1.scaleY = bg2.scaleY = stage.canvas.height / 512;
    stage.addChild(bg1);
    stage.addChild(bg2);
    bg2.x = 1186 * bg2.scaleX;

    escapeText = new createjs.Text("Fly från vakten!", "25px Arial", "#DDD");
    escapeText.x = (stage.canvas.width / 2) - (graffitiText.getMeasuredWidth() / 2);
    escapeText.y = 15;
    stage.addChild(escapeText);

    stage.addChild(rogue);
    rogue.gotoAndPlay("rogue_run");
    rogue.on("click", escape);
    rogue.y = 360;
    rogue.x = 200;
    rogueSpeed = 0;

    var guardSheet = new createjs.SpriteSheet({
        animations: {
            guard_run: {
                frames: [0, 1, 2, 3],
                speed: 0.4
            }
        },
        images: ["bitmaps/WonderMomo.png"],
        frames: {
            width: 104 / 4,
            height: 60
        }
    });
    guard = new createjs.Sprite(guardSheet);
    guard.gotoAndPlay("guard_run");
    guard.x = -100;
    guard.y = 360;
    guard.scaleX = guard.scaleY = 4;
    stage.addChild(guard);

    collisionListener = createjs.Ticker.on("tick", checkCollision);
    winListener = createjs.Ticker.on("tick", checkWin);

    stage.addChild(scoreText);
    stage.setChildIndex(scoreText, stage.getNumChildren() - 1);
    /*endEscape();*/
}


function escape(event) {
    rogueSpeed += 2;
}

function drawEscape() {
    if (rogueSpeed > 0) {
        rogueSpeed -= 0.5;
    }
    rogue.x += rogueSpeed;
    bg1.x -= rogueSpeed * 2;
    bg2.x -= rogueSpeed * 2;
    if (bg1.x < -1186 * bg1.scaleX) bg1.x = 1186 * bg1.scaleX - rogueSpeed * 2;
    if (bg2.x < -1186 * bg2.scaleX) bg2.x = 1186 * bg2.scaleX - rogueSpeed * 2;
    guard.x += 4;

    stage.update();
}

function checkCollision(event) {
    var collisionPoint = rogue.localToLocal(0, 0, guard);
    if (guard.hitTest(collisionPoint.x, collisionPoint.y)) {
        stage.removeChild(rogue);
        stage.removeChild(guard);
        escapeText.text = "DEAD..."
        escapeText.font = "bold 200px Arial";
        escapeText.color = "red";
        escapeText.y += 200;
        escapeText.x = (stage.canvas.width / 2) - (graffitiText.getMeasuredWidth()) - 50;
        createjs.Ticker.off("tick", collisionListener);
    }
}

function checkWin(event) {
    if (rogue.x + rogue.getBounds().width * 2 > stage.canvas.width - 100) {
        addScore(event, Math.floor((rogue.x - guard.x) * 0.25));
        endEscape();
        createjs.Ticker.off("tick", winListener);
    }
}

function endEscape(event) {
    createjs.Ticker.off("tick", drawEscapeListener);
    stage.removeAllChildren();
    // TODO: play cutscene
    loadTryggC();
}
