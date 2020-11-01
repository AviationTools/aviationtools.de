var h1 = document.getElementById("h1");
var toggle = document.getElementById("toggle");
var conditionFAA = true;
var conditionICAO = false;
h1.innerHTML = "ATC Communications FAA region";

var extraHelp = document.getElementById("extraHelp");
extraHelp.addEventListener("click", function () {
	var help1 = document.getElementById("helpBox1");
	var help2 = document.getElementById("helpBox2");

	help1.style.display = "none";
	help2.style.display = "block";
})

var normalHelp = document.getElementById("normalHelp");
normalHelp.addEventListener("click", function () {
	var help1 = document.getElementById("helpBox1");
	var help2 = document.getElementById("helpBox2");

	help1.style.display = "block";
	help2.style.display = "none";
})

$('#toggle').change(function() {
	document.getElementById("output").value = "";
	document.getElementById("outputAtc").value = "";
	if (toggle.checked) {
		conditionFAA = true;
		conditionICAO = false;
		h1.innerText = "ATC Communications FAA region";
		/*h1.style.color = "red";*/
		$('#toggle').bootstrapToggle('on');
	} else {
		conditionICAO = true;
		conditionFAA = false;
		h1.innerText = "ATC Communications EASA region";
		/*h1.style.color = "red";*/
		$('#toggle').bootstrapToggle('off');
	}
})

var button = document.getElementById("button");
button.addEventListener("click", function () {
	pilotGen();
})
	function pilotGen() {
	var s = document.getElementById("snackbar");
	let Output = document.getElementById("output");
	let OutputAtc = document.getElementById("outputAtc");
	let CallSign = document.getElementById("CallSign").value;
	let Airport = document.getElementById("Airport").value;
	let Atis = document.getElementById("ATIS").value;
	let Destination = document.getElementById("Destination").value;

	let Step1 = document.getElementById("Step1").checked;
	let Step2 = document.getElementById("Step2").checked;
	let Step3 = document.getElementById("Step3").checked;
	let Step4 = document.getElementById("Step4").checked;

	if (conditionFAA == true) {
		if (!Airport||!Atis ||!CallSign ||!Destination) {
			document.getElementById("output").value = "";
			document.getElementById("outputAtc").value = "";
			s.innerHTML = "No Values!";
			s.className = "show";
			setTimeout(function () {
				s.className = s.className.replace("show", "");
			}, 3000);
		} else {
			if (Step1) {
				Output.value = "Clearance Delivery good day, " + CallSign + " with information " + Atis + ", request IFR clearance to " + Destination + " International airport.";
				OutputAtc.value = CallSign + ", " + Airport + " clearance Delivery, Cleared to " + Destination + " International Airport as filed, maintain Example:[6000],expect FL220 one zero minutes after departure, Departure frequency Example:[126.05], Squawk Example[1200].";
			} else if (Step2) {
				Output.value = Airport + " Ground, " + CallSign + " request pushback ";
				OutputAtc.value = CallSign + ", " + Airport + " ground pushback approved facing [East,West;North;South].";
			} else if (Step3) {
				Output.value = Airport + " Ground, " + CallSign + " with information " + Atis + ", ready to Taxi.";
				OutputAtc.value = CallSign + ", " + Airport + " ground, runway Example:[15L] taxi via Example:[A1,B4,N].";
			} else if (Step4) {
				Output.value = Airport + " Tower, " + CallSign + " , holding short runway 15L at Example:[Kilo].";
				OutputAtc.value = CallSign + ", " + Airport + " tower winds Example[222 degrees, 5 knots], runway Example[15L] cleared for Takeoff."
			} else {
				s.innerHTML = "Unchecked Box!";
				s.className = "show";
				setTimeout(function () {
					s.className = s.className.replace("show", "");
				}, 3000);
			}
		}
	}
	if (conditionICAO == true) {
		if (!Airport || !Atis || !CallSign|| !Destination) {
			document.getElementById("output").value = "";
			document.getElementById("outputAtc").value = "";
			s.innerHTML = "No Values!";
			s.className = "show";
			setTimeout(function () {
				s.className = s.className.replace("show", "");
			}, 3000);
		} else {
			if (Step1) {
				Output.value = Airport + " Ground ,Good Day, " + CallSign + ", Gate.. ," + " Information " + Atis + ", requesting start-up to " + Destination;
				OutputAtc.value = CallSign + ", " + Airport + " Ground, check Information " + Atis + ", start-up approved, cleared to " + Destination + " via Example:[POVEL2H] departure route, flight planned route, climb Example:[5000], squawk Example[1200].";
			} else if (Step2) {
				Output.value = CallSign + " request Pushback ";
				OutputAtc.value = CallSign + " pushback approved facing [East,West;North;South].";
			} else if (Step3) {
				Output.value = CallSign + " requesting Taxi ";
				OutputAtc.value = CallSign + " taxi to holding point runway Example:[15L], via Example:[A1,B4,N] and hold short.";
			} else if (Step4) {
				Output.value = CallSign + " ready for departure ";
				OutputAtc.value = CallSign + " wind Example[222 degrees, 5 knots], runway Example[15L] cleared for Takeoff."
			// } else if(Step5){
			// 	Output.value = "Example[Langen Radar] " + CallSign + " Example[2000ft], climbing [5000ft]. ";
			// 	OutputAtc.value = CallSign + " Example[Langen Radar], hello, identified, climb Example[FL110]. "
			// } 
			// https://ivao.de/mediawiki/index.php/IFR-Funkbeispiel#Nach_dem_Start
			}else {
				s.innerHTML = "Unchecked Box!";
				s.className = "show";
				setTimeout(function () {
					s.className = s.className.replace("show", "");
				}, 3000);
			}
		}
	}

};

var exampleButton = document.getElementById("exampbtn");
exampleButton.addEventListener("click", function () {
	let Output = document.getElementById("output");
	let Step1 = document.getElementById("Step1").checked;
	let Step2 = document.getElementById("Step2").checked;
	let Step3 = document.getElementById("Step3").checked;
	let Step4 = document.getElementById("Step4").checked;
	// Test
	// let Step5 = document.getElementById("Step5").checked;
	// let Step6 = document.getElementById("Step6").checked;
	// let Step7 = document.getElementById("Step7").checked;
	// let Step8 = document.getElementById("Step8").checked;
	// let Step9 = document.getElementById("Step9").checked;
	


	document.getElementById("CallSign").value = "Delta59";
	document.getElementById("Airport").value = "Frankfurt";
	document.getElementById("ATIS").value = "Bravo";
	document.getElementById("Destination").value = "Amsterdam";

	pilotGen();
	
});

var radioBtns = document.getElementsByName('GroupRadio');
for (var i = 0; i < radioBtns.length; i++) {
    radioBtns[i].addEventListener("change", function(){
    	pilotGen();
	});  
}

