//Aliases
let Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite;
    Graphics = PIXI.Graphics;
    ticker = PIXI.Ticker.shared;
    text = PIXI.Text;
//Variables
let rawTime = 0;
let time = 0;
let velocitySpeed = 2;
//Time Label
let style = new PIXI.TextStyle({
  fontSize: 20,
  fill: "white",
  strokeThickness: 4,
});
let timeLabel;
let tickerToggle = true;
let hit;
let gameOver;
let app;
let highScoreTime;
//Firebase
var messageListRef = firebase.database().ref('HighScore');
//Tries(Steps)
let tries = 0;
//Initiailzing Game
function initializeGame(){
	//Create a Pixi Application
	app = new Application({ 
	    width: 600, 
	    height: 400,                       
	    antialias: true, 
	    transparent: false, 
	    resolution: 1
	  }
	);
	//Add the canvas that Pixi automatically created for you to the HTML document
	document.getElementById("game").appendChild(app.view);

	timeLabel = new text("0 sec", style);
	timeLabel.position.set(530, 20);
	timeLabel.zOrder  = 3;
	app.stage.addChild(timeLabel);
	setup();
}



//Sprites
let mausBlock = new Graphics();
mausBlock.lineStyle(4, 0xFF3300, 1);
mausBlock.beginFill(0xFF0000);
mausBlock.drawRect(0, 0, 50, 50);
mausBlock.endFill();
mausBlock.x = 275;
mausBlock.y = 175;
mausBlock.interactive = true;

let autoBlockOne = new Graphics();
autoBlockOne.beginFill(0xFFFFFF);
autoBlockOne.drawRect(0, 0, 70, 60);
autoBlockOne.endFill();
autoBlockOne.x = 530;
autoBlockOne.y = 59;
autoBlockOne.vx = 2;
autoBlockOne.vy = 2;

let autoBlockTwo = new Graphics();
autoBlockTwo.beginFill(0xFFFFFF);
autoBlockTwo.drawRect(0, 0, 70, 70);
autoBlockTwo.endFill();
autoBlockTwo.x = 66;
autoBlockTwo.y = 64;
autoBlockTwo.vx = 2;
autoBlockTwo.vy = 2;

let autoBlockThree = new Graphics();
autoBlockThree.beginFill(0xFFFFFF);
autoBlockThree.drawRect(0, 0, 40, 70);
autoBlockThree.endFill();
autoBlockThree.x = 71;
autoBlockThree.y = 333;
autoBlockThree.vx = 2;
autoBlockThree.vy = 2;

let autoBlockFour = new Graphics();
autoBlockFour.beginFill(0xFFFFFF);
autoBlockFour.drawRect(0, 0, 110, 30);
autoBlockFour.endFill();
autoBlockFour.x = 535;
autoBlockFour.y = 328;
autoBlockFour.vx = 2;
autoBlockFour.vy = 2;

//Start the game loop
function start(){
  app.ticker.add(delta => gameLoop(delta, mausBlock));
}

function setup(){
	//Add the cat to the stage
	app.stage.addChild(mausBlock);
	app.stage.addChild(autoBlockOne);
	app.stage.addChild(autoBlockTwo);
	app.stage.addChild(autoBlockThree);
	app.stage.addChild(autoBlockFour);
}

function gameLoop(delta, mausBlock){
  //Time
  rawTime = rawTime + 1
  if(Math.floor(rawTime/60) == rawTime/60){
    time = time + 1;
    // console.log(time);
    if(!hit){
	    timeLabel.text = time + " sec";
	    increaseSpeed();
    }
  }

  //Update the autoBlock's velocity
  autoBlockOne.x += autoBlockOne.vx;
  autoBlockOne.y += autoBlockOne.vy;

  autoBlockTwo.x += autoBlockTwo.vx;
  autoBlockTwo.y += autoBlockTwo.vy;

  autoBlockThree.x += autoBlockThree.vx;
  autoBlockThree.y += autoBlockThree.vy;

  autoBlockFour.x += autoBlockFour.vx;
  autoBlockFour.y += autoBlockFour.vy;

  contain(mausBlock, {x: 0, y: 0, width: 600, height: 400});
  isAtEdge(autoBlockOne, {x: 0, y: 0, width: 600, height: 400});
  isAtEdge(autoBlockTwo, {x: 0, y: 0, width: 600, height: 400});
  isAtEdge(autoBlockThree, {x: 0, y: 0, width: 600, height: 400});
  isAtEdge(autoBlockFour, {x: 0, y: 0, width: 600, height: 400});

  hitTestRectangle(autoBlockOne, mausBlock);
  hitTestRectangle(autoBlockTwo, mausBlock);
  hitTestRectangle(autoBlockThree, mausBlock);
  hitTestRectangle(autoBlockFour, mausBlock);
}


//Mouse Events (MoveBlock)
mausBlock
.on('mousedown', onDragStart)
.on('mouseup', onDragEnd)
.on('mouseupoutside', onDragEnd)
.on('mousemove', onDragMove)

//Drag & Drop
function onDragStart(event){
  if (tickerToggle) {
    start();
    tickerToggle = false;
  }
  this.data = event.data;
  this.dragging = true;
}

function onDragEnd(){
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove(){
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x - 25;
        this.position.y = newPosition.y - 25;
    }
}

function contain(sprite, container) {

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    stop();
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    stop();
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    stop();
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    stop();
  }
}

function isAtEdge(sprite, container) {
  //Left(x)
  if (sprite.x < container.x) {
    sprite.x = container.x;
    sprite.vx = sprite.vx * (-1);
    sprite.vy = sprite.vy * (+1);
  }

  //Top(y)
  if (sprite.y < container.y) {
    sprite.y = container.y;
    sprite.vx = sprite.vx * (+1);
    sprite.vy = sprite.vy * (-1);
  }

  //Right(x)
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    sprite.vx = sprite.vx * (-1);
    sprite.vy = sprite.vy * (+1);
  }

  //Bottom(y)
  if (sprite.y + sprite.height > container.height) {
    sprite.y = (container.height - sprite.height);
    sprite.vx = sprite.vx * (+1);
    sprite.vy = sprite.vy * (-1);
  }
}

function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  if(hit){
    stop();
	// app.ticker.stop();
  }
};

function increaseSpeed(time){
  //Increase AutoBlocks Velocity
  autoBlockOne.vx = autoBlockOne.vx * 1.1;
  autoBlockOne.vy = autoBlockOne.vy * 1.1;
  autoBlockTwo.vx = autoBlockTwo.vx * 1.1;
  autoBlockTwo.vy = autoBlockTwo.vy * 1.1;
  autoBlockThree.vx = autoBlockThree.vx * 1.1;
  autoBlockThree.vy = autoBlockThree.vy * 1.1;
  autoBlockFour.vx = autoBlockFour.vx * 1.1;
  autoBlockFour.vy = autoBlockFour.vy * 1.1;
}

function stop(){
  //Stop All Sprites
  autoBlockOne.vx = 0
  autoBlockOne.vy = 0
  autoBlockTwo.vx = 0
  autoBlockTwo.vy = 0
  autoBlockThree.vx = 0
  autoBlockThree.vy = 0
  autoBlockFour.vx = 0
  autoBlockFour.vy = 0
  gameOver = new text("Game Over!", style);
  gameOver.position.set(275, 175);
  app.stage.addChild(gameOver);
  app.ticker.stop();
  setHighScore();
}

function reset(){
	mausBlock.x = 275;
	mausBlock.y = 175;
	autoBlockOne.x = 530;
	autoBlockOne.y = 59;
	autoBlockOne.vx = 2;
	autoBlockOne.vy = 2;
	autoBlockTwo.x = 66;
	autoBlockTwo.y = 64;
	autoBlockTwo.vx = 2;
	autoBlockTwo.vy = 2;
	autoBlockThree.x = 71;
	autoBlockThree.y = 333;
	autoBlockThree.vx = 2;
	autoBlockThree.vy = 2;
	autoBlockFour.x = 535;
	autoBlockFour.y = 328;
	autoBlockFour.vx = 2;
	autoBlockFour.vy = 2;
	rawTime = 0;
	time = 0;
	document.getElementById("entryBox").style.display = "none";
}

document.getElementById("RefreshBtn").addEventListener("click", restartApp);
function restartApp(){
	app.destroy(true);
	reset();
	initializeGame();
	tickerToggle = true;
	tries++;
	console.log(tries);
}
initializeGame();

function setHighScore(){
	if(highScoreTime < time){
		document.getElementById("entryBox").style.display = "block";
	}
}

document.getElementById("submit").addEventListener("click", function(){
	let input = document.getElementById("highScoreUser").value;
  	let name = input.slice(0, 10);
	let rawDate = new Date();
	let date = rawDate.getDate() + "/" + (rawDate.getMonth()+1) + "/" + rawDate.getFullYear();
		var highScore = messageListRef.push();
		highScore.set({
		    "Score": time,
		    "User" : name,
		    "Date" : date
		});
	tries = 0;
	restartApp();
});

var messageList = firebase.database().ref('HighScore').orderByChild('Score').limitToLast(1);
messageList.on('value', function(snapshot) {
    //updateNachrichten	
    var highScoreValue = document.getElementById("highScoreValue");
    var highScoreName = document.getElementById("highScoreName");
    var highScoreDate = document.getElementById("highScoreDate");
    var newScoreName;
    var newHighScoreDate;
    var temp = snapshot.val();

    for (var child in temp) {
        newHighScore = temp[child].Score + " sec";
        newScoreName = temp[child].User;
        newHighScoreDate = temp[child].Date;
        highScoreTime = temp[child].Score
    }
    highScoreValue.innerText = newHighScore;
    highScoreName.innerText = newScoreName;
    highScoreDate.innerText = newHighScoreDate;
});
