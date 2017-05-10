var db
function loadScoreScreen() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDSUPpXaUQcPDRyw7G82U9dNNr9R7Hv8bM",
    authDomain: "examensarbete-e8d7e.firebaseapp.com",
    databaseURL: "https://examensarbete-e8d7e.firebaseio.com",
    projectId: "examensarbete-e8d7e",
    storageBucket: "examensarbete-e8d7e.appspot.com",
    messagingSenderId: "1074676276836"
  };
  firebase.initializeApp(config);
  db = firebase.database();

  updateListener = createjs.Ticker.on("tick", updatescoreScreen);

  stage.addChild(gradient);

  var scoreScreenText = new createjs.Bitmap("bitmaps/finalscore.png");
  stage.addChild(scoreScreenText);
  stage.addChild(scoreText);
  scoreText.x = scoreScreenText.x + 250;
  scoreText.y = scoreScreenText.y + 115;
  scoreText.font = "bold 40px Arial";

  var f = new createjs.Bitmap("bitmaps/fortsätt.png");
  stage.addChild(f);
  f.on("click", nyttSpel);
  f.x = 100;
  f.y = 400;

  addHighscore()
  displayScoreboard();
}

function updatescoreScreen() {
  stage.update();
}

function nyttSpel() {
  location.reload();
}

function addHighscore() {
  if (playername.name != "") {
    db.ref("amountOfEntries").once("value").then(function(snapshot){

      playername.n = snapshot.val() + 1;
      db.ref("amountOfEntries").set(playername.n);

      var q = playername.n +":||:"+ playername.name;
      db.ref("scoreboard/"+q).set(Math.floor(Math.random()*1000));
    });
  }
}


function displayScoreboard() {
  var scoreboard = document.createElement("div");
  scoreboard.style.width = "auto";
  scoreboard.style.height = window.innerHeight * 0.8;
  scoreboard.style.position = "absolute";
  scoreboard.style.top = "6.5%";
  scoreboard.style.left = "45%";
  /*scoreboard.style.backgroundColor = "lightgreen";*/
  scoreboard.style.overflow = "scroll";
  scoreboard.style.textAlign = "center";
  scoreboard.style.padding = "25px";
  scoreboard.style.zIndex = "1";
  scoreboard.style.wordSpacing = "25px";
  document.body.appendChild(scoreboard);
  db.ref("scoreboard").orderByValue().on("value", function(snapshot) {
    var scoreboardText = "";
    snapshot.forEach(function(childSnapshot) {
      var k = childSnapshot.key;
      var pattern = ":||:";
      var patIndex = k.lastIndexOf(pattern)+pattern.length;
      scoreboardText = ("<li>"+k.substring(patIndex, k.length) +" "+ childSnapshot.val() + "</li>") + scoreboardText;
      scoreboard.innerHTML = "High-Scores<ol>"+scoreboardText+"</ol>";
    });
  });
}
