var vandal, vandal2, klotter
function loadCharacterSelection() {
    updateListener = createjs.Ticker.on("tick", updateCharacterSelection);
    stage.addChild(gradient);
    var t = new createjs.Text("Välj en klottrare", "60px Arial", "#FFF");
    stage.addChild(t);
    t.x = stage.canvas.width/2;
    t.y = 100;
    t.textAlign = "center";

    var vandalSheet = new createjs.SpriteSheet({
        animations: {
            vandal_idle: {
                frames: [0]
            },
            vandal_run: {
                frames: [1, 2, 3, 4, 5, 6, 7, 8],
                speed: 0.25
            },
        },
        images: ["bitmaps/vandal.png"],
        frames: {
            width: 200,
            height: 300
        }
    });
    vandal = new createjs.Sprite(vandalSheet);
    vandal.x = 800;
    vandal.y = 260;
    vandal.scaleY = 1.5;
    vandal.on("click", endCharacterSelection, null, true);
    klotter = new createjs.Bitmap("bitmaps/graffiti.png");
    klotter.stotande = false;
    klotter.splat = "bitmaps/purplesplat.png";
    stage.addChild(vandal);

    var vandal2Sheet = new createjs.SpriteSheet({
        animations: {
            vandal_idle: {
                frames: [0]
            },
            vandal_run: {
                frames: [1, 2, 3, 4, 5, 6, 7, 8],
                speed: 0.25
            },
        },
        images: ["bitmaps/runningvandal2.png"],
        frames: {
            width: 200,
            height: 300
        }
    });
    vandal2 = new createjs.Sprite(vandal2Sheet);
    stage.addChild(vandal2);
    vandal2.y = vandal.y - 40;
    vandal2.x = vandal.x - 570;
    vandal2.scaleY = 1.65;
    vandal2.scaleX = 1.45;
    vandal2.on("click", v2, null, true);
}

function updateCharacterSelection() {
  stage.update();
}

function endCharacterSelection() {
  createjs.Ticker.off("tick", updateListener);
  stage.removeAllChildren();
  loadGraffiti();
}

function v2() {
  vandal = vandal2;
  vandal.x = 800;
  vandal.y = 220;
  klotter = new createjs.Bitmap("bitmaps/graffiti2.png");
  klotter.stotande = true;
  klotter.splat = "bitmaps/redsplat.png";
  vandal.removeAllEventListeners();
  endCharacterSelection();
}
