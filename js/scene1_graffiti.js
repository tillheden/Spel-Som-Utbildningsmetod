var rogue, middlefinger, middlefingerListener, drawGraffiti, graffitiText

function loadGraffiti() {
    console.log("loadGraffiti");
    drawGraffiti = createjs.Ticker.on("tick", drawGraffiti);

    var graffitiwall = new createjs.Bitmap("bitmaps/graffitiwall.jpg");
    // PicWidth * Scale = CanvasWidth => Scale = CanvasWidth / PicWidth
    graffitiwall.scaleX = stage.canvas.width / 1920;
    graffitiwall.scaleY = stage.canvas.height / 1080;
    stage.addChild(graffitiwall);

    var rogueSheet = new createjs.SpriteSheet({
        animations: {
            rogue_idle: {
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                speed: 0.4
            },
            rogue_run: {
                frames: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
                speed: 0.4
            }
        },
        images: ["bitmaps/rogue.png"],
        frames: {
            width: 32,
            height: 32
        }
    });
    rogue = new createjs.Sprite(rogueSheet);
    rogue.gotoAndPlay("rogue_idle");
    rogue.scaleX = rogue.scaleY = 8;
    rogue.x = 200;
    rogue.y = 400;
    stage.addChild(rogue);

    middlefinger = new createjs.Bitmap("bitmaps/middlefinger.png");
    middlefinger.alpha = 0.4;
    middlefinger.scaleX = middlefinger.scaleY = 0.65;
    middlefinger.x = 500;
    middlefinger.y = 300;
    middlefingerListener = middlefinger.on("click", changeMiddlefinger);
    stage.addChild(middlefinger);

    graffitiText = new createjs.Text("Click to spray graffiti", "25px Arial", "#DDD");
    console.log(graffitiText.getMeasuredWidth() / 2);
    graffitiText.x = (stage.canvas.width / 2) - (graffitiText.getMeasuredWidth() / 2);
    graffitiText.y = 15;
    graffitiText.shadow = new createjs.Shadow("#000", 2, 2, 10);
    stage.addChild(graffitiText);

    stage.setChildIndex(scoreText, stage.getNumChildren() - 1);
    /*endGraffiti();*/
}

function drawGraffiti() {
    stage.update();
}

function endGraffiti(event) {
    createjs.Ticker.off("tick", drawGraffiti);
    stage.removeAllChildren();
    stage.update();
    // TODO: play cutscene
    /*loadTryggC();*/
    rast();
}

function changeMiddlefinger(event) {
    var spraypaintsound = new Audio("sounds/spraypaint.mp3");
    /*spraypaintsound.play();*/
    middlefinger.alpha += 0.2;
    addScore(event, 100);
    if (middlefinger.alpha == 1) {
        middlefinger.off("click", middlefingerListener);
        graffitiText.text = "CONTINUE"
        graffitiText.x = (stage.canvas.width / 2) - (graffitiText.getMeasuredWidth() / 2);
        graffitiText.on("click", endGraffiti);
    }
}
