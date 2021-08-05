let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
//Extra Button´s
let next = document.getElementById("next");
let reset = document.getElementById("reset");
let start = document.getElementById("start");
let restart = document.getElementById("restart");
let hintButton = document.getElementById("hintButton");
let progress = document.getElementById("progress");
let questions = document.getElementById("questions");
//Display´s
let first_display = document.getElementById("first_display");
let second_display = document.getElementById("second_display");
let third_display = document.getElementById("third_display");
let footer_display = document.getElementById("footer_display");
let score_display = document.getElementById("score_display");
let hint = document.getElementById("hint");
//Start Options & Inputs
let startInput = document.getElementById("startInput");
let questionNumbers;

//Result (Object)
let randomReturnNumber;
let returnResult;
//Random (Button)
let randomElement;
let randomNumber;
//History
let historyCount = 0;
//Time & TimeStamp
let timeOut;
let timeStamp;
//Score
let onFirstTry = true;
let correctAnswer = 0;

document.getElementById("screenSize").style.height = (screen.height - 170) + "px";

function randomizer() {
	clearTimeout(timeOut);
	resetButtonColors();

	returnResult = randomMethod();
	randomReturnNumber = returnResult.randomNumber;

	//DOM Update
	displayOutput();
	displayFooter();
	progressbar();
	onFirstTry = true;
	
	if(historyCount == questionNumbers) {
		restartHandling();
	}
	historyCount++;
	randomizeOptionBtn(Math.round(returnResult.calc));
}

function displayOutput(result = "") {
	first_display.innerHTML = randomReturnNumber + " " + returnResult.units.from + " =";
	second_display.innerHTML = result;
	third_display.innerHTML = " " + returnResult.units.to;
	hint.innerHTML = "";
}

function displayFooter() {
	footer_display.innerText = "(" + historyCount + "/"+ questionNumbers + ")";
}

function specificRandomNumber(max, min) {
	return Math.round(Math.floor(Math.random() * (max - min) + min) / 10) * 10;
}

function randomMethod() {
	let randomNr = Math.floor(Math.random() * 6) + 1;
	let secondRandomNr = Math.floor(Math.random() * 2) + 1;
	

	if (randomNr == 1) {
		if(secondRandomNr == 1) {
			return calculation.nmToKm();
		} else {
			return calculation.kmToNm();
		}
	} else if(randomNr == 2) {
		if(secondRandomNr == 1) {
			return calculation.feetToMeter();
		} else {
			return calculation.meterToFeet();
		}
	} else if(randomNr == 3) {
		if(secondRandomNr == 1) {
			return calculation.ktToKmh();
		} else {
			return calculation.kmhToKt();
		}
	} else if(randomNr == 4) {
		if(secondRandomNr == 1) {
			return calculation.celciusToFahrenheit();
		} else {
			return calculation.fahrenheitToCelcius();
		}
	} else if(randomNr == 5) {
		if(secondRandomNr == 1) {
			return calculation.poundsToKg();
		} else {
			return calculation.kgToPounds();
		}
	} else {
		if(secondRandomNr == 1) {
			return calculation.galToLiter();
		} else {
			return calculation.literToGal();
		}
	}
}


function randomizeOptionBtn(number) {
	randomNumber = number;
	let numberArray = [];
	for (var i = 0; i < 4; i++) {
		if(i == 0) {
			//Correct Answer
			numberArray.push(number);
		}else {
			numberArray.push(number + Math.floor(Math.random()*10) * 10 - 200);
		}
	}
	
	randomElement = shuffle(numberArray);
	btn1.innerText = randomElement[0];
	btn2.innerText = randomElement[1];
	btn3.innerText = randomElement[2];
	btn4.innerText = randomElement[3];

	btn1.setAttribute("style", "font: black;"); 
	btn2.setAttribute("style", "font: black;"); 
	btn3.setAttribute("style", "font: black;"); 
	btn4.setAttribute("style", "font: black;"); 
}

btn1.addEventListener("click", function() {
		displayOutput(randomElement[0]);
		//Check if  Correct
		if(checkIfCorrect(randomNumber, randomElement[0])) {
			//Color to Green("True")
			btn1.classList.remove("btn-primary");
			btn1.classList.add('btn-success');
			//Set Color to Default
			timeOut = setTimeout(function(){
				btn1.classList.remove("btn-success");
				btn1.classList.add('btn-primary');
				randomizer();
			}, 500);
		} else {
			btn1.classList.remove("btn-primary");
			btn1.classList.add('btn-danger');
		}
	});

	btn2.addEventListener("click", function() {
		displayOutput(randomElement[1]);
		//Check if  Correct
		if(checkIfCorrect(randomNumber, randomElement[1])) {
			//Color to Green("True")
			btn2.classList.remove("btn-primary");
			btn2.classList.add('btn-success');
			//Set Color to Default
			timeOut = setTimeout(function(){
				btn2.classList.remove("btn-success");
				btn2.classList.add('btn-primary');
				randomizer();
			}, 500);
		} else {
			btn2.classList.remove("btn-primary");
			btn2.classList.add('btn-danger');
		}
	});

	btn3.addEventListener("click", function() {
		displayOutput(randomElement[2]);
		//Check if  Correct
		if(checkIfCorrect(randomNumber, randomElement[2])) {
			//Color to Green("True")
			btn3.classList.remove("btn-primary");
			btn3.classList.add('btn-success');
			//Set Color to Default
			timeOut = setTimeout(function(){
				btn3.classList.remove("btn-success");
				btn3.classList.add('btn-primary');
				randomizer();
			}, 500);
		} else {
			btn3.classList.remove("btn-primary");
			btn3.classList.add('btn-danger');
		}
	});

	btn4.addEventListener("click", function() {
		displayOutput(randomElement[3]);
		//Check if  Correct
		if(checkIfCorrect(randomNumber, randomElement[3])) {
			//Color to Green("True")
			btn4.classList.remove("btn-primary");
			btn4.classList.add('btn-success');
			//Set Color to Default
			timeOut = setTimeout(function(){
				btn4.classList.remove("btn-success");
				btn4.classList.add('btn-primary');
				randomizer();
			}, 500);
		} else {
			btn4.classList.remove("btn-primary");
			btn4.classList.add('btn-danger');
		}
	});

	//Extra Buttons
	reset.addEventListener("click", function() {
		restartHandling();
	});

	restart.addEventListener("click", function() {
		historyCount = 0;
		correctAnswer = 0;
		timeStamp = new Date();
		randomizer();
	});

	start.addEventListener("click", function() {
		getMaxCount();
		historyCount = 0;
		correctAnswer = 0;
		timeStamp = new Date();
		randomizer();
	});

	hintButton.addEventListener("click", function() {
		hint.innerHTML = returnResult.help;
	});

	next.addEventListener("click", function() {
		randomizer();
	});

	questions.addEventListener("click", function() {
		$('#startModal').modal('show');
	});


function checkIfCorrect(correctNumber, testNumber) {

	if(correctNumber == testNumber) {
		if(onFirstTry) {
			correctAnswer++;
			console.log(correctAnswer);
		}
		return true;
	} else {
		onFirstTry = false;
		return false;
	}
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function resetButtonColors() {
	btn1.classList.remove("btn-danger");
	btn1.classList.add('btn-primary');

	btn2.classList.remove("btn-danger");
	btn2.classList.add('btn-primary');

	btn3.classList.remove("btn-danger");
	btn3.classList.add('btn-primary');

	btn4.classList.remove("btn-danger");
	btn4.classList.add('btn-primary');
}

function progressbar() {
	progress.style.width = (historyCount / questionNumbers) * 100 + "%";
}

//Modal´s
function restartHandling() {
	var timeUsed = (new Date - timeStamp) / 1000

	$('#restartModal').modal('show');

	score_display.innerText = "You got " + correctAnswer + " right answers (" + Math.floor(timeUsed) + " sec)";
}

function startupHandling() {
	$('#startModal').modal('show');
}

//Radio Buttons
var radioBtns = document.getElementsByName('GroupRadio');
for (var i = 0; i < radioBtns.length; i++) {
    radioBtns[i].addEventListener("change", function () {
      getMaxCount();
    });
}

function getMaxCount() {
	if(radioBtns[0].checked) {
	   	startInput.setAttribute("disabled", "");
	   	questionNumbers = radioBtns[0].value;
   }
   if(radioBtns[1].checked) {
	   	startInput.setAttribute("disabled", "");
	   	questionNumbers = radioBtns[1].value;
   }
   if(radioBtns[2].checked) {
	   	startInput.removeAttribute("disabled");
	   	questionNumbers = startInput.value;
   }
}

class MassystemIcao {
  getRandomNumberInRange(max, min) {
  	return Math.round(Math.floor(Math.random() * (max - min) + min) / 10) * 10;
  }
  //Strecken
  nmToKm() {
    const random = this.getRandomNumberInRange(500, 50);     

    return {
        units: {
            from: "nm",
            to: "km"
        },
        help: "nm * 2 * 0.9",
        calc: random * 2 * 0.9,
        randomNumber: random
    };
  }
  kmToNm() {
  	const random = this.getRandomNumberInRange(500, 50);     

    return {
        units: {
            from: "km",
            to: "nm"
        },
        help: "km / 2 * 1.1",
        calc: random / 2 * 1.1,
        randomNumber: random
    };
  }
  
  //Höhen
  feetToMeter() {
  	const random = this.getRandomNumberInRange(30000, 1000);     

    return {
        units: {
            from: "ft",
            to: "m"
        },
        help: "ft / 10 * 3",
        calc: random / 10 * 3,
        randomNumber: random
    };
  }
  meterToFeet() {
  	const random = this.getRandomNumberInRange(10000, 1000);     

    return {
        units: {
            from: "m",
            to: "ft"
        },
        help: "m / 3 * 10",
        calc: random / 3 * 10,
        randomNumber: random
    };
  }
  
  //Speeds
  ktToKmh() {
  	const random = this.getRandomNumberInRange(600, 100);     

    return {
        units: {
            from: "kt",
            to: "km/h"
        },
        help: "kt * 2 * 0.9",
        calc: random * 2 * 0.9,
        randomNumber: random
    };
  }
  kmhToKt() {
  	const random = this.getRandomNumberInRange(300, 100);     

    return {
        units: {
            from: "km/h",
            to: "kt"
        },
        help: "kmh / 2 * 1.1",
        calc: random / 2 * 1.1,
        randomNumber: random
    };
  }

  //Temperatur
  celciusToFahrenheit() {
  	const random = this.getRandomNumberInRange(100, 0);     

    return {
        units: {
            from: "C&#176;",
            to: "F&#176;"
        },
        help: "(c * 9 / 5) + 32",
        calc: (random * 9 / 5) + 32,
        randomNumber: random
    };
  }
  fahrenheitToCelcius() {
  	const random = this.getRandomNumberInRange(60, -20);     

    return {
        units: {
            from: "F&#176;",
            to: "C&#176"
        },
        help: "(f - 32) * 5 / 9",
        calc: (random - 32) * 5 / 9,
        randomNumber: random
    };
  }

  //Gewicht
  poundsToKg() {
  	const random = this.getRandomNumberInRange(10000, 100);     

    return {
        units: {
            from: "lb",
            to: "kg"
        },
        help: "p / 2 * 0.9",
        calc: random / 2 * 0.9,
        randomNumber: random
    };
  }
  kgToPounds() {
  	const random = this.getRandomNumberInRange(10000, 100);     

    return {
        units: {
            from: "kg",
            to: "lb"
        },
        help: "kg * 2 * 1.1",
        calc: random * 2 * 1.1,
        randomNumber: random
    };
  }

  //Volumen
  galToLiter() {
  	const random = this.getRandomNumberInRange(1000, 50);     

    return {
        units: {
            from: "gal",
            to: "l"
        },
        help: "gal / 4 * 1.05",
        calc: random / 4 * 1.05,
        randomNumber: random
    };
  }
  literToGal() {
  	const random = this.getRandomNumberInRange(1000, 50);     

    return {
        units: {
            from: "l",
            to: "gal"
        },
        help: "l * 4 * 0.95",
        calc: random * 4 * 0.95,
        randomNumber: random
    };
  }
 }

 let calculation = new MassystemIcao();
 randomizer();
 startupHandling();








//  var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

// function success(pos) {
//   var crd = pos.coords;

//   console.log('Your current position is:');
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);
