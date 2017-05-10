var updateRastListener;

function loadRast() {
  updateListener = createjs.Ticker.on("tick", updateRast);
  var t = "Du samlade totalt ihop " + score + " poäng!";
  var rastText = new createjs.Text(t, "40px Arial", "#FFF");
  rastText.x = (stage.canvas.width/2) - (rastText.getMeasuredWidth()/2);
  rastText.y = 270;
  rastText.shadow = new createjs.Shadow("#000", 2, 2, 10);
  stage.addChild(rastText);

  var kaffemug = new createjs.Bitmap("bitmaps/coffee.png");
  kaffemug.x = stage.canvas.width/2-50;
  kaffemug.y = 350;
  stage.addChild(kaffemug);
  kaffemug.on("click", nyttSpel);
  rastText.on("click", nyttSpel);

  db.ref().once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot){
    console.log(childSnapshot.key +", "+childSnapshot.val());
    });
  });
}

function updateRast() {
  stage.update();
}

function nyttSpel() {
  location.reload();
}

function addHighscore() {
playername = {};
playername.name = input.value;
  if (playername.name != "" && playername.name != "amountOfEntries") {
    var db = firebase.database();
    db.ref("amountOfEntries").once("value").then(function(snapshot){
      playername.n = snapshot.val() + 1;
      db.ref("amountOfEntries").set(playername.n);
      var q = playername.n +":||:"+ playername.name;
      db.ref(q).set(Math.random()*1000);
    });

  }
}
