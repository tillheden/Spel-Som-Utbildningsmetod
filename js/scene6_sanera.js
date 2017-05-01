var drawSaneraListener;
var camera;

function loadSanera() {
    drawSaneraListener = createjs.Ticker.on("tick", drawSanera);

    var graffitiwall = new createjs.Bitmap("bitmaps/graffitiwall.jpg");
    // PicWidth * Scale = CanvasWidth => Scale = CanvasWidth / PicWidth
    graffitiwall.scaleX = stage.canvas.width / 1920;
    graffitiwall.scaleY = stage.canvas.height / 1080;
    stage.addChild(graffitiwall);


    middlefinger = new createjs.Bitmap("bitmaps/middlefinger.png");
    middlefinger.alpha = 1;
    middlefinger.scaleX = middlefinger.scaleY = 0.65;
    middlefinger.x = 500;
    middlefinger.y = 300;
    middlefingerListener = middlefinger.on("click", saneraKlotter);
    stage.addChild(middlefinger);

    var sanerareSheet = new createjs.SpriteSheet({
        animations: {
            sanerare_idle: {
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                speed: 0.4
            },
            sanerare_sanera: {
                frames: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
                speed: 0.4,
                next: "sanerare_idle"
            }
        },
        images: ["bitmaps/sanerare.png"],
        frames: {
            width: 32,
            height: 32
        }
    });
    sanerare = new createjs.Sprite(sanerareSheet);
    sanerare.gotoAndPlay("sanerare_idle");
    sanerare.scaleX = sanerare.scaleY = 8;
    sanerare.x = 330;
    sanerare.y = 350;
    stage.addChild(sanerare);

    camera = new createjs.Bitmap("bitmaps/camera.png");
    camera.x = 550;
    camera.y = 200;
    camera.on("click", taBild);
    stage.addChild(camera);

    var klar = new createjs.Text("Sanering klar", "30px Arial", "#FFF");
    klar.x = 830;
    klar.y = 15;
    klar.on("click", endSanera);
    stage.addChild(klar);

    stage.addChild(scoreText);
    stage.setChildIndex(scoreText, stage.getNumChildren()-1);
}

function drawSanera() {
    stage.update();
}

function endSanera(event) {
    createjs.Ticker.off("tick", drawTryggC);
    stage.removeAllChildren();
    // TODO: play cutscene

}

function saneraKlotter(event) {
  stage.removeChild(camera);
  sanerare.gotoAndPlay("sanerare_sanera");
  middlefinger.alpha -= 0.33;
  addScore(event, 100);
  if (middlefinger.alpha < 0.1) {
      stage.removeChild(middlefinger);
      stage.addChild(camera);
  }
}

function taBild(event) {
  var cameraSound = new Audio("sounds/camera_shutter.mp3");
  cameraSound.play();
  addScore(event, 150);
  stage.removeChild(camera);
}
