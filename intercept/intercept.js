//Pixi Config
let Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite;
Graphics = PIXI.Graphics;
ticker = PIXI.Ticker.shared;
text = PIXI.Text;
let app;

//Track Labels
let trackLabelIn;
let trackLabelOut;
let styleIn = new PIXI.TextStyle({
    fontSize: 15,
    fill: "red",
    strokeThickness: 4,
});
let styleOut = new PIXI.TextStyle({
    fontSize: 15,
    fill: "green",
    strokeThickness: 4,
});

//Objects
let VOR = new Graphics();
let radialOne = new Graphics();
let radialTwo = new Graphics();
let aircraft = new Graphics();



//Initiailzing Game
function initializeGame() {
    //Create a Pixi Application
    app = new Application({
            width: 800,
            height: 600,
            antialias: true,
            transparent: false,
            resolution: 1
        }
    );
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.getElementById("game").appendChild(app.view);
    //Inbound
    trackLabelIn = new text("- Inbound", styleIn);
    trackLabelIn.position.set(10, 10);
    trackLabelIn.zOrder = 3;
    //Outbound
    trackLabelOut = new text("- Outbound", styleOut);
    trackLabelOut.position.set(10, 25);
    trackLabelOut.zOrder = 3;
    
    setup();
}


function drawScenery() {

    //Sprites
    VOR.lineStyle(2, 0xFFFFFF, 1);
    VOR.drawRect(0, 0, 90, 90);

    VOR.x = 355;
    VOR.y = 255;

    VOR.drawCircle(45, 45, 5);
    VOR.drawCircle(45, 45, 3);
    VOR.drawCircle(45, 45, 1);

    VOR.drawPolygon([
        0, 30, 
        30, 0,
        60, 0,
        90, 30,
        90, 60,
        60, 90,
        30, 90,
        0, 60
    ])

    aircraft.lineStyle(2, 0xFFFFFF, 1);
    aircraft.drawPolygon([
        0, 15,
        40, 15,
        20, 15,
        20, 25,
        30, 25,
        10, 25,
        20, 25,
        20, 30,
        20, 15,
        20, 5,
        20, 15, 
    ])

    radialOne.lineStyle(2, 0xFF0000, 1);

    //Request Radial Coordinates      
    random_Number1 = getRandomInt(1, 360);
    random_Number2 = getRandomInt(1, 360);
    random_Heading = getRandomInt(1, 360);
    
    outerPoints.forEach(element => {

        if(element.i == random_Number1) {

            radialOne.moveTo(400, 300);
            radialOne.lineTo(element.x, element.y);
        }
        if(element.i == random_Number2) {

            radialOne.moveTo(400, 300);
            radialOne.lineTo(element.x, element.y);

            aircraft.x = innterPoints[random_Number2].x;
            aircraft.y = innterPoints[random_Number2].y;
            aircraft.angle = random_Heading;
        }
    });

    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Start the game loop
function start() {
    app.ticker.add(delta => gameLoop(delta));
}

function setup() {
    app.stage.addChild(VOR);
    app.stage.addChild(radialOne);
    app.stage.addChild(trackLabelIn);
    app.stage.addChild(trackLabelOut);
    app.stage.addChild(aircraft);
}

function gameLoop(delta) {
    console.log(delta);
}

document.getElementById("RefreshBtn").addEventListener("click", restartApp);


function getUnitDirectionVectors() {
    const vectors = [];

    for (var i = 0; i < 360; i++) {
        vectors.push({
            "i": i,
            "x": Math.cos(i),
            "y": Math.sin(i)
        });
    }
    
    return vectors;
}

function scaleVectors(vectors, scaleFactor) {
    const scaledVectors = [];
    
    for (var i = 0; i < vectors.length; i++) {
        scaledVectors.push({
            "i": vectors[i]["i"],
            "x": vectors[i]["x"] * scaleFactor,
            "y": vectors[i]["y"] * scaleFactor
        });
    }
    
    return scaledVectors;
}

function translateVectors(vectors, distance_x, distance_y) {
    const translatedVectors = [];
    
    for (var i = 0; i < vectors.length; i++) {
        translatedVectors.push({
            "i": vectors[i]["i"],
            "x": vectors[i]["x"] + distance_x,
            "y": vectors[i]["y"] + distance_y
        });
    }
    
    return translatedVectors;
}


const width = 800;
const height = 600;
const centerX = width / 2;
const centerY = height / 2;
const outerRadius = Math.sqrt((width / 2) * (width / 2) + (height / 2) * (height / 2));

const unitVectors = getUnitDirectionVectors();
const outerPoints = translateVectors(
    scaleVectors(unitVectors, outerRadius),
    centerX,
    centerY
);
const innterPoints = translateVectors(
    scaleVectors(unitVectors, outerRadius / 3),
    centerX,
    centerY
);

function restartApp() {
    initializeGame();
    drawScenery()
}
        
        
initializeGame();
drawScenery()

// async function getCoordinates() {
//     const coordinaten = await getCoordinates();
//     const response = await fetch("./intercept/coordinates.json/");
//     return await response.json();
// }