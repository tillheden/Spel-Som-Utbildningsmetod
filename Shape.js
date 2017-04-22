var stage;
var image;
var content;
var shapeList = {};
var moveSpeed;

function main() {
  stage = new createjs.Stage("cvs");
  image = new createjs.Bitmap("pic.jpg");
  image.scaleX = 0.25;
  image.scaleY = 0.25;
  image.on("click", slowImage);
  moveSpeed = 1;
  drawShapes(15);
  stage.addChild(image);
  createjs.Ticker.addEventListener("tick", moveImage);
  createjs.Ticker.addEventListener("tick", updateStage);
  console.log(shapeList);
}

function moveImage(event) {
  if (moveSpeed < 1) {
    moveSpeed += 0.1;
  }
  image.x += moveSpeed*5;
  image.y += moveSpeed;

}

function slowImage(event) {
  moveSpeed -= 0.5;
}

function updateStage(event) {
  stage.update();
}

function drawShapes(n) {
  for (var i = 0; i < n; i++) {
    var color = '#'+Math.floor(Math.random()*16777215).toString(16);
    var graphics = new createjs.Graphics().beginFill(color).drawRect(
                            Math.floor(Math.random()*cvs.width),
                            Math.floor(Math.random()*cvs.height),
                            (i+1)*10,
                            (i+1)*10);
    graphics.beginStroke("#000");
    var shape = new createjs.Shape(graphics);
    shape.name = color;
    shapeList[i] = shape;
    stage.addChild(shapeList[i]);
  }
}
