var input
function scorescreen() {
  updateListener = createjs.Ticker.on("tick", updateEnd);
  input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.style.width = "100px";
  input.style.position = "absolute";
  input.style.top = "35%";
  input.style.left = stage.canvas.width / 2 - 50;
  document.body.appendChild(input);
  var t = new createjs.Text("Grattis! \nDu samlade ihop "+score+" poäng. \nFyll i ditt namn.", "30px Arial", "#FFF");
  stage.addChild(t);
  t.x = stage.canvas.width/2;
  t.y = stage.canvas.height * 0.20;
  t.textAlign = "center";

  var fort = new createjs.Bitmap("bitmaps/fortsätt.png");
  stage.addChild(fort);
  fort.on("click", addHighscore);
}

function updateEnd() {
  stage.update();
}

function addHighscore() {

  var db = firebase.database();
  db.ref("highscore").once("value").then(function(snapshot) {
      console.log(snapshot.val().Mika);
    });
}
