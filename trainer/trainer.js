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

document.getElementById("screenSize").style.height = (screen.height * 0.0625) - 18 + "rem";

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
	randomizeOptionBtn(Math.round(returnResult.calc), returnResult.otherNumbers);
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

function randomMethod() {
	let randomNr = Math.floor(Math.random() * 6) + 1;
	let secondRandomNr = Math.floor(Math.random() * 2) + 1;
	
	if (document.getElementById("optionConversion").checked) {
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

	if (document.getElementById("optionHeadings").checked) {
		return calculation.headings();
	}

}

//Randomizes Other Button Options
function randomizeOptionBtn(number, array) {
	randomNumber = number;
	let numberArray = array;
	
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

  getOtherRandomNumbers(startNumber, multiplier = 10) {
  	let otherNumbers = []
  	for (var i = 0; i < 4; i++) {
  		if (i == 0) {
  			otherNumbers.push(Math.floor(startNumber));
  		} else {
  			otherNumbers.push(Math.floor((Math.floor(Math.random() * multiplier) * 11 + 10) + startNumber));
  		}
  	}
  	return otherNumbers;
  }

  getRandomHeadingNumber(max, min) {
  	let heading = Math.round(Math.floor(Math.random() * (max - min) + min) / 10) * 5;
  	if(heading == 0) {
  		return 360;
  	} else {
  		return heading;
  	}
  }

  randomHeadingNumber(startNumber) {
 	let otherNumbers = []
  	
  	otherNumbers.push(startNumber);
  	otherNumbers.push((startNumber + 40) %360);
  	otherNumbers.push((startNumber + 30) %360);
  	otherNumbers.push((startNumber + 90) %360);
  	
  	return otherNumbers;
 }
  //Strecken
  nmToKm() {
    const random = this.getRandomNumberInRange(500, 50);
    const calcNumber = random * 2 * 0.9;     

    return {
        units: {
            from: "nm",
            to: "km"
        },
        help: "nm * 2 * 0.9",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }
  kmToNm() {
  	const random = this.getRandomNumberInRange(500, 50); 
  	const calcNumber = random / 2 * 1.1;    

    return {
        units: {
            from: "km",
            to: "nm"
        },
        help: "km / 2 * 1.1",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }
  
  //Höhen
  feetToMeter() {
  	const random = this.getRandomNumberInRange(30000, 1000);
  	const calcNumber = random / 10 * 3;     

    return {
        units: {
            from: "ft",
            to: "m"
        },
        help: "ft / 10 * 3",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }
  meterToFeet() {
  	const random = this.getRandomNumberInRange(10000, 1000);
  	const calcNumber = random / 3 * 10;     

    return {
        units: {
            from: "m",
            to: "ft"
        },
        help: "m / 3 * 10",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }
  
  //Speeds
  ktToKmh() {
  	const random = this.getRandomNumberInRange(600, 100);
  	const calcNumber = random * 2 * 0.9;     

    return {
        units: {
            from: "kt",
            to: "km/h"
        },
        help: "kt * 2 * 0.9",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }
  kmhToKt() {
  	const random = this.getRandomNumberInRange(300, 100); 
  	const calcNumber = random / 2 * 1.1;     

    return {
        units: {
            from: "km/h",
            to: "kt"
        },
        help: "kmh / 2 * 1.1",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }

  //Temperatur
  celciusToFahrenheit() {
  	const random = this.getRandomNumberInRange(100, 0);
  	const calcNumber = (random * 9 / 5) + 32;       

    return {
        units: {
            from: "C&#176;",
            to: "F&#176;"
        },
        help: "(c * 1.8) + 32",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }
  fahrenheitToCelcius() {
  	const random = this.getRandomNumberInRange(60, -20);
  	const calcNumber = (random - 32) * 5 / 9;     

    return {
        units: {
            from: "F&#176;",
            to: "C&#176"
        },
        help: "(f - 32) * 5 / 9",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }

  //Gewicht
  poundsToKg() {
  	const random = this.getRandomNumberInRange(10000, 100);
  	const calcNumber = random / 2 * 0.9;     

    return {
        units: {
            from: "lb",
            to: "kg"
        },
        help: "p / 2 * 0.9",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }
  kgToPounds() {
  	const random = this.getRandomNumberInRange(10000, 100);
  	const calcNumber = random * 2 * 1.1;      

    return {
        units: {
            from: "kg",
            to: "lb"
        },
        help: "kg * 2 * 1.1",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }

  //Volumen
  galToLiter() {
  	const random = this.getRandomNumberInRange(1000, 50);
  	const calcNumber = random / 4 * 1.05;     

    return {
        units: {
            from: "gal",
            to: "l"
        },
        help: "gal / 4 * 1.05",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }
  literToGal() {
  	const random = this.getRandomNumberInRange(1000, 50);
  	const calcNumber = random * 4 * 0.95;     

    return {
        units: {
            from: "l",
            to: "gal"
        },
        help: "l * 4 * 0.95",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.getOtherRandomNumbers(calcNumber)
    };
  }

  headings() {
  	const random = this.getRandomHeadingNumber(0, 360);
  	const calcNumber = (random + 180) %360;

  	return {
        units: {
            from: "&#176 opposite course",
            to: "&#176"
        },
        help: "add 200 subtract 20",
        calc: calcNumber,
        randomNumber: random,
        otherNumbers: this.randomHeadingNumber(calcNumber)
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
