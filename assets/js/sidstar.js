var compass = document.getElementById("compass");
var output = document.getElementById("output");
var SidOutput = document.getElementById("SidOutput");
let runwaySelection = document.getElementById("runwaySelection");
let departureSelection = document.getElementById("departureSelection");
let runway = document.getElementById("runway");
var radioSVG = document.getElementsByName("GroupSvg");
var snackbar = document.getElementById("snackbar");
var submit = document.getElementById("submit");
var tableConfig = document.getElementById("tableConfig");
var runwayTable = document.getElementById("runwayTable");
var activeRunway = document.getElementById("activeRunway");
var sidbtn = document.getElementById("sid");
var starbtn = document.getElementById("star");
var options = document.getElementsByName("options");

var toggle = document.getElementById("toggle");
var approach = document.getElementById("approach");
var appDiv = document.getElementById("appDiv");
var condition = true;
var appCondition = false;
var label = document.getElementById("label");
var h1 = document.getElementById("h1");
h1.innerHTML = "SID Analysis";
label.innerHTML = " Departure Selection";


var globalArray = {};
var icao = "";
var firstPoint = [];
var layer = null;
var latlngs = [];
var appLatlngs = [];
var marker = [];
var polyline = [];
var appPolyline = [];
var temp = null;
var globalApp = [];
var goAroundMarker = [];
var goAroundLatlngs = [];
var goAroundPolyline = [];
var holding = [];
createTable();

$('#approach').change(function() {
	if(approach.checked){
		appCondition = true;
		createTable();
	}else{
		appCondition = false;
		createTable();
	}
});

sidbtn.addEventListener("click", function(){
	clearAll();
	options[0].style.display = "block";
	options[1].style.display = "block";
	condition = true;
	createTable();
	h1.innerText = "SID Analysis";
	label.innerHTML = " Departure Selection";
	appDiv.style.display = "none";
})

starbtn.addEventListener("click", function(){
	clearAll();
	options[0].style.display = "block";
	options[1].style.display = "block";
	condition = false;
	createTable();
	h1.innerText = "STAR Analysis";
	label.innerHTML = " Approach Selection";
	appDiv.style.display = "block";
})


function inputCheck(callback){
	if(document.getElementById("icao").value == ""){
		snackbar.innerHTML = "No ICAO!";
		snackbar.className = "show";
		setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
	}else{
		if(latlngs.length > 0 || firstPoint.length > 0){
			deleteMapElements();
			clearAll();
		}
		changeAirport(document.getElementById("icao").value);
		clearTable();
		let icao = document.getElementById("icao").value;
		getRunwayData(icao, function(resultRwy){
			temp = resultRwy;
	    	if (temp.error) {
				snackbar.innerHTML = "Wrong ICAO!";
				snackbar.className = "show";
				setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
        	}
        	while(runwayTable.childElementCount > 0){
				runwayTable.childNodes[0].remove();
			}
			callback(resultRwy);
		})
	}
}

runwaySelection.addEventListener("click", function(){
	inputCheck(function(temp){
		output.style.display = "block";
		clearElements();
		for(i=0; i < temp.runways.length; i++){
			let tr = document.createElement("tr");
			let td1 = document.createElement("td");
			let td2 = document.createElement("td");
			let td3 = document.createElement("td");

			td1.classList.add("align-middle");
			td2.classList.add("align-middle");
			td3.classList.add("align-middle");

			td1.innerText += temp.runways[i].name;
			td2.innerText += temp.runways[i].length_m;
			td3.innerHTML += '<input type="radio" name="GroupRadio" style="margin-right:10px;" id="' + i + '">';

			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			
			runwayTable.appendChild(tr);
		}
		var radioBtns = document.getElementsByName('GroupRadio');
		for(var i = 0; i < radioBtns.length; i++) {
			radioBtns[i].addEventListener("change", function(){
				clearTable();
				for(var j = 0; radioBtns.length; j++){
					if(document.getElementById(j).checked){
						if(condition){
							sidDeparture(temp.runways[j].name, document.getElementById("icao").value);
						}else{
							starArrival(temp.runways[j].name, document.getElementById("icao").value);
						}
					}
				}
			})
		}
	})
}); 

departureSelection.addEventListener("click", function(){
	output.style.display = "none";
	inputCheck(function(temp){
		clearElements()
		circleSvg();
		for(var i = 0; i < radioSVG.length; i++){
			radioSVG[i].addEventListener("change", function(){
			    for(i = 0; i < temp.runways.length; i++){
			    	if(condition){
			   			departureSelectionSid(temp.runways[i].name, document.getElementById("icao").value);
			    	}else{
			    		departureSelectionStar(temp.runways[i].name, document.getElementById("icao").value);
			    	}
				}
			})
		}
	})
}); 

runway.addEventListener("click", function(){
	output.style.display = "none";
	if(condition){
		inputCheck(function(temp){
			clearElements()
			activeRunwayh3(temp);
			sidDeparture(temp.runways[0].name, document.getElementById("icao").value);
		})
	}else{
		inputCheck(function(temp){
			clearElements()
			activeRunwayh3(temp)
			starArrival(temp.runways[0].name, document.getElementById("icao").value);
		})
	}
});
	
function departureSelectionSid(runway, icao) {
	clearTable();
	var north = document.getElementById("north");
	var west = document.getElementById("west");
	var south = document.getElementById("south");
	var southeast = document.getElementById("southeast");
	var southwest = document.getElementById("southwest");
	var northwest = document.getElementById("northwest");
	var northeast = document.getElementById("northeast");
	var east = document.getElementById("east");
	
	getSidData(runway, icao, function(array){
		for(let sid in array){
			globalArray[sid] = array[sid];
		}
		for (var sid in array){
			if(north.checked && array[sid].track == "North Departure"){
				compassLine(360);
				departureCompass(sid, array[sid].runways, array[sid].flevel, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
			}else if(west.checked && array[sid].track == "West Departure"){
				compassLine(270);
				departureCompass(sid, array[sid].runways, array[sid].flevel, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
			}else if(south.checked && array[sid].track == "South Departure"){
				compassLine(180);
				departureCompass(sid, array[sid].runways, array[sid].flevel, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
			}else if(southeast.checked && array[sid].track == "South East Departure"){
				compassLine(135);
				departureCompass(sid, array[sid].runways, array[sid].flevel, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
			}else if(southwest.checked && array[sid].track == "South West Departure"){
				compassLine(225);
				departureCompass(sid, array[sid].runways, array[sid].flevel, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
			}else if(northwest.checked && array[sid].track == "North West Departure"){
				compassLine(315);
				departureCompass(sid, array[sid].runways, array[sid].flevel, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
			}else if(northeast.checked && array[sid].track == "North East Departure"){
				compassLine(45);
				departureCompass(sid, array[sid].runways, array[sid].flevel, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
			}else if(east.checked && array[sid].track == "East Departure"){
				compassLine(90);
				departureCompass(sid, array[sid].runways, array[sid].flevel, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
			}else{
				// console.log("Looping!");
			}
		}
		if(document.getElementsByClassName("tr-data").length <= 0){
			snackbar.innerHTML = "This Runway Does Not Have A SID Departure!";
			snackbar.className = "show";
			setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
		}
	});
}
	
function departureCompass(sid, runways, flevel, trackHdg, track, waypoints){
	let tr = document.createElement("tr");
	let th = document.createElement("th");
	let td1 = document.createElement("td");
	let td2 = document.createElement("td");
	let td3 = document.createElement("td");
	let td4 = document.createElement("td");
	let td5 = document.createElement("td");
	let td6 = document.createElement("td");

	tr.classList.add("tr-data");
	th.classList.add("align-middle");
	td1.classList.add("align-middle");
	td2.classList.add("align-middle");
	td3.classList.add("align-middle");
	td4.classList.add("align-middle");
	td5.classList.add("align-middle");
	td6.classList.add("align-middle");	

	tr.addEventListener("click", tableEvent);
	tr.id = sid;		


	th.innerText += sid;
	td1.innerText += runways;
	td2.innerText += flevel;
	td3.innerText += trackHdg;
	td4.innerText += track;
	if(condition){
		for(var i = 0; i < waypoints.length; i++){
			if(waypoints.length -1 == i){
				td5.innerText += waypoints[i].wypname;
			}else{
				td5.innerText += waypoints[i].wypname + "=>" ;
			}
		}
	}
	tr.appendChild(th);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);			
	SidOutput.appendChild(tr);
}

function arrivalCompass(sid, runways, trackHdg, track, waypoints){
	let tr = document.createElement("tr");
	let th = document.createElement("th");
	let td1 = document.createElement("td");
	let td2 = document.createElement("td");
	let td3 = document.createElement("td");
	let td4 = document.createElement("td");

	tr.classList.add("tr-data");
	th.classList.add("align-middle");
	td1.classList.add("align-middle");
	td2.classList.add("align-middle");
	td3.classList.add("align-middle");
	td4.classList.add("align-middle");

	tr.addEventListener("click", tableEvent);
	tr.id = sid;		

	th.innerText += sid;
	td1.innerText += runways;
	td2.innerText += trackHdg;
	td3.innerText += track;

	if(!appCondition){
		for(var i = 0; i < waypoints.length; i++){
			if(waypoints.length -1 == i){
				td4.innerText += waypoints[i].wypname;
			}else{
				td4.innerText += waypoints[i].wypname + "=>" ;
			}
		}
	}

	if(appCondition){
		getAppData(runways, document.getElementById("icao").value, function(appArray){
			globalApp = appArray;
			for(var app in appArray){
				let tr = document.createElement("tr");
				let td1 = document.createElement("td");
				let td2 = document.createElement("td");

				tr.setAttribute("id", app);

				tr.classList.add("tr-data");
				td1.classList.add("align-middle");
				td2.classList.add("align-middle");

				td1.innerText += app;

				let radioButton = document.createElement("input");
				radioButton.setAttribute("type", "radio");
				radioButton.setAttribute("name", "GroupApp");
				radioButton.setAttribute("value", runways);
				radioButton.classList.add("mx-2");
				radioButton.id = app;
				radioButton.addEventListener("change", appEvent);
				td2.appendChild(radioButton);

				tr.appendChild(td1);
				tr.appendChild(td2);
				td4.appendChild(tr);
			}
		});
	}

	tr.appendChild(th);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);		
	SidOutput.appendChild(tr);
}
	

function sidDeparture(runway, icao){
	getSidData(runway, icao, function(array){
		if(array == 400){
			snackbar.innerHTML = "This Runway Does Not Have A SID Departure!";
			snackbar.className = "show";
			setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
		}
		globalArray = array;
		for (var sid in array){
			let tr = document.createElement("tr");
			let th = document.createElement("th");
			let td1 = document.createElement("td");
			let td2 = document.createElement("td");
			let td3 = document.createElement("td");
			let td4 = document.createElement("td");
			let td5 = document.createElement("td");
			
			tr.classList.add("tr-data");
			th.classList.add("align-middle");
			td1.classList.add("align-middle");
			td2.classList.add("align-middle");
			td3.classList.add("align-middle");
			td4.classList.add("align-middle");
			td5.classList.add("align-middle");

			tr.addEventListener("click", tableEvent);
			tr.setAttribute("id", sid);
			
			th.innerText += sid;
			td1.innerText += array[sid].runways;
			td2.innerText += array[sid].flevel;
			td3.innerText += array[sid].trackHdg;
			td4.innerText += array[sid].track;
			for(var i = 0; i < array[sid].waypoints.length; i++){
				if(i == 5 || i == 10){
					td5.innerHTML += "<br>";
				}
				if(array[sid].waypoints.length -1 == i){
					td5.innerHTML += array[sid].waypoints[i].wypname;
				}else{
					td5.innerHTML += array[sid].waypoints[i].wypname + "=>" ;
				}
			}
			
			
			tr.appendChild(th);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);				
			SidOutput.appendChild(tr);
			}
		});
	};

	function starArrival(runway, icao){
	getStarData(runway, icao, function(starArray){
		if(starArray == 400){
			snackbar.innerHTML = "This Runway Does Not Have A STAR Departure!";
			snackbar.className = "show";
			setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
		}
		globalArray = starArray;
		getAppData(runway, icao, function(appArray){
			globalApp = appArray;
			for (var star in globalArray){
				let tr = document.createElement("tr");
				let th = document.createElement("th");
				let td1 = document.createElement("td");
				let td2 = document.createElement("td");
				let td3 = document.createElement("td");
				let td4 = document.createElement("td");
				
				tr.classList.add("tr-data");
				th.classList.add("align-middle");
				td1.classList.add("align-middle");
				td2.classList.add("align-middle");
				td3.classList.add("align-middle");
				td4.classList.add("align-middle");

				tr.addEventListener("click", tableEvent);
				tr.setAttribute("id", star);
				
				th.innerText += star;
				td1.innerText += globalArray[star].runways;
				td2.innerText += globalArray[star].trackHdg;
				td3.innerText += globalArray[star].track;
				if(!appCondition){
					for(var i = 0; i < globalArray[star].waypoints.length; i++){
						if(i == 5 || i == 10){
							td4.innerHTML += "<br>";
						}
						if(globalArray[star].waypoints.length -1 == i){
							td4.innerHTML += globalArray[star].waypoints[i].wypname;
						}else{
							td4.innerHTML += globalArray[star].waypoints[i].wypname + "=>" ;
						}
					}
				}
				if(appCondition){
					for(var app in appArray){
						let tr = document.createElement("tr");
						let td1 = document.createElement("td");
						let td2 = document.createElement("td");

						tr.setAttribute("id", app);

						tr.classList.add("tr-data");
						td1.classList.add("align-middle");
						td2.classList.add("align-middle");

						td1.innerText += app;

						let radioButton = document.createElement("input");
						radioButton.setAttribute("type", "radio");
						radioButton.setAttribute("name", "GroupApp");
						radioButton.setAttribute("value", runway);
						radioButton.classList.add("mx-2");
						radioButton.id = app;
						radioButton.addEventListener("change", appEvent);
						td2.appendChild(radioButton);

						tr.appendChild(td1);
						tr.appendChild(td2);
						td4.appendChild(tr);
					}
				}
				
				
				tr.appendChild(th);
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);						
				SidOutput.appendChild(tr);
				}
			});
		});
	};

	function departureSelectionStar(runway, icao){
		clearTable();
		var north = document.getElementById("north");
		var west = document.getElementById("west");
		var south = document.getElementById("south");
		var southeast = document.getElementById("southeast");
		var southwest = document.getElementById("southwest");
		var northwest = document.getElementById("northwest");
		var northeast = document.getElementById("northeast");
		var east = document.getElementById("east");
		
		getStarData(runway, icao, function(array){

			for(let sid in array){
				globalArray[sid] = array[sid];
			}
			for (var sid in array){
				if (north.checked && array[sid].track == "North Arrival"){
					compassLine(360);
					arrivalCompass(sid, array[sid].runways, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
				} else if(west.checked && array[sid].track == "West Arrival"){
					compassLine(270);
					arrivalCompass(sid, array[sid].runways, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
				} else if(south.checked && array[sid].track == "South Arrival"){
					compassLine(180);
					arrivalCompass(sid, array[sid].runways, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
				} else if(southeast.checked && array[sid].track == "South East Arrival"){
					compassLine(135);
					arrivalCompass(sid, array[sid].runways, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
				} else if(southwest.checked && array[sid].track == "South West Arrival"){
					compassLine(225);
					arrivalCompass(sid, array[sid].runways, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
				} else if(northwest.checked && array[sid].track == "North West Arrival"){
					compassLine(315);
					arrivalCompass(sid, array[sid].runways, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
				} else if(northeast.checked && array[sid].track == "North East Arrival"){
					compassLine(45);
					arrivalCompass(sid, array[sid].runways, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
				} else if(east.checked && array[sid].track == "East Arrival"){
					compassLine(90);
					arrivalCompass(sid, array[sid].runways, array[sid].trackHdg, array[sid].track, array[sid].waypoints);
				} else {
					// console.log("Looping!");
				}
			}
			if(document.getElementsByClassName("tr-data").length <= 0){
				snackbar.innerHTML = "This Runway Does Not Have A SID Arrival!";
				snackbar.className = "show";
				setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
			}
		});
	}

	
function compassLine(heading){
	if($("#line").length > 0){
		for(i=0; i < $("#line").length; i++){
			document.querySelector("#line").remove();
		}
	}
	let svg = document.getElementById("compassCircle");
	
	//Line
	var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	let windX = 150 + (75 * Math.sin(0.01745329251 * heading));
	let windY = 150 + (75 * -Math.cos(0.01745329251 * heading));
	element.setAttribute("id", "line");
	element.setAttribute("x1", 150);
	element.setAttribute("y1", 150);
	element.setAttribute("x2", windX);
	element.setAttribute("y2", windY);
	element.setAttribute("style", "stroke:blue;stroke-width:2");
	svg.appendChild(element);
}


//MAP Leaflet
var mymap = L.map('mapid');
map();
function map(){
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 14,
	    id: 'mapbox.streets',
	    accessToken: 'pk.eyJ1IjoiYm5jNGsiLCJhIjoiY2pwcmhnNzF2MDFlejN4bjdjamR2cHJnNCJ9.mZMpSXrNgjTPU0dky1cfvA'
	}).addTo(mymap);
	mymap.locate({setView: true, maxZoom: 8});

	$("#mapid").height($(window).height()/1.5).width($(window).width()/2.5);
	mymap.invalidateSize();
	mapLegende();
}

function changeAirport(icao){
	getRunwayData(icao, function(resultRwy){
		for(var i=0;i < resultRwy.runways.length; i++){
			if(resultRwy.runways[i].name != ""){
				getSidData(resultRwy.runways[i].name, icao, function(resultSid){
					for(var sid in resultSid){
						changeMap(resultSid[sid].aerodome.lat, resultSid[sid].aerodome.lon, icao)
						firstPoint.push([resultSid[sid].aerodome.lat, resultSid[sid].aerodome.lon]);
						return;
					}
				});
			}
			return;
		}
	});
}


function changeMap(lat, lon, icao) {
	var greenIcon = L.icon({
	    iconUrl: 'http://werbungbnc.bplaced.net/assets/icon/airport_icon.svg',

	    iconSize:     [38, 95], 
	    iconAnchor:   [22, 94],
	    popupAnchor:  [-3, -76]
	});
	mymap.setView(new L.LatLng(lat, lon), 12);
	layer = new L.Marker([lat, lon], {icon: greenIcon});
	layer.addTo(mymap).bindPopup(icao).openPopup();
}
var bgColor = null;
function tableEvent(x) {
	mapActivate();
	if(latlngs.length > 1){
		deleteMapElements();
		clearApp();
		bgColor.removeAttribute("bgcolor");
	}
	var tempArray = globalArray[x.currentTarget.attributes[1].nodeValue];
	console.log(tempArray);
	bgColor = x.currentTarget;
	x.currentTarget.setAttribute("bgcolor","green");
	for(i=0; i < tempArray.waypoints.length; i++){
		if(condition){
			if(i == 0){
				latlngs.push([firstPoint[0][0], firstPoint[0][1]]);
			}
		}
		if(tempArray.waypoints[i].lat != 0){
			var allMarkers = new L.Marker([tempArray.waypoints[i].lat, tempArray.waypoints[i].lon]);
	        marker.push(allMarkers);
	        allMarkers.addTo(mymap).bindPopup(tempArray.waypoints[i].wypname).openPopup();
			latlngs.push([tempArray.waypoints[i].lat, tempArray.waypoints[i].lon]);
		}
	}
	polyline = L.polyline(latlngs, {color: 'black'});
	mymap.fitBounds(polyline.getBounds());
	polyline.addTo(mymap);
}


function getRunwayData(icao, callback){
	var Info = new XMLHttpRequest();
	Info.open("GET", "https://superananas.de/runways/?icao=" + icao, true);
	Info.onreadystatechange = function() {
	    if (Info.readyState != 4) return;
	    	callback(JSON.parse(Info.responseText));
	    }
    Info.send(); 
}

function getSidData(runway, icao, callback ){
	var coordinates = new XMLHttpRequest();
	coordinates.open("GET", "../assets/php/sid.php/?icao=" + icao + "&runway=" + runway ,true);
	coordinates.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	coordinates.onreadystatechange = function () {
		if (coordinates.readyState != 4 ) return;
			if(coordinates.status != 400){
				callback(JSON.parse(coordinates.responseText));
				return;
			}
			callback(coordinates.status);
	}
    coordinates.send(); 
}

function getStarData(runway, icao, callback ){
	var coordinates = new XMLHttpRequest();
	coordinates.open("GET", "../assets/php/star.php/?icao=" + icao + "&runway=" + runway ,true);
	coordinates.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	coordinates.onreadystatechange = function () {
		if (coordinates.readyState != 4 ) return;
		if(coordinates.status != 400){
			callback(JSON.parse(coordinates.responseText));
			return;
		}
		callback(coordinates.status);
	}
    coordinates.send(); 
}

function getAppData(runway, icao, callback ){
	var coordinates = new XMLHttpRequest();
	coordinates.open("GET", "../assets/php/app.php/?icao=" + icao + "&runway=" + runway ,true);
	coordinates.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	coordinates.onreadystatechange = function () {
		if (coordinates.readyState != 4 ) {
			return;
		}
		if(coordinates.status != 400){
			callback(JSON.parse(coordinates.responseText));
			return;
		}
		callback(coordinates.status);
	}
    coordinates.send(); 
}


function createTable(){
	while(document.getElementById("tableConfig").childElementCount > 0){
		document.getElementById("tableConfig").childNodes[0].remove();
	}
	if(condition){
		let array = ["Sid Name", "Runway", "Flight Level", "Track", "Track HDG", "Waypoints"];
		for(i = 0; i < array.length; i++){
			let th = document.createElement("th");
			th.classList.add("align-middle");
			th.innerText += array[i];
			tableConfig.appendChild(th);
		}
	}else{
		if(appCondition){
			let array = ["Star Name", "Runway", "Track", "Track HDG", "Approach"];
			for(i = 0; i < array.length; i++){
				let th = document.createElement("th");
				th.classList.add("align-middle");
				th.innerText += array[i];
				tableConfig.appendChild(th);
			}
		}else{
			let array = ["Star Name", "Runway", "Track", "Track HDG", "Waypoints"];
			for(i = 0; i < array.length; i++){
				let th = document.createElement("th");
				th.classList.add("align-middle");
				th.innerText += array[i];
				tableConfig.appendChild(th);
			}
		}
	}
	
}

function clearAll(){
	if(latlngs.length > 0 || firstPoint.length > 0){
		deleteMapElements();
		mymap.removeLayer(layer);
		firstPoint = [];
		layer = [];
	}
	clearTable();
	clearApp();
	return;
}

function deleteMapElements(){
	mymap.removeLayer(polyline);
	mymap.removeLayer(appPolyline);
	latlngs = [];
	appLatlngs = [];
	polyline = [];
	appPolyline = []
	for(i = 0; i < marker.length; i++) {
	   mymap.removeLayer(marker[i]);
	}
	marker = [];
	return;
}

function circleSvg(){
	// groß
	var height = 300;
	var width = 300;
	var radius = width / 4;
	var center = {
		x: width / 2,
		y: height / 2
	}
	var margin = 0;
	
	
	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("height", height);
	svg.setAttribute("width", width);
	svg.setAttribute("id", "compassCircle");

	svg.innerHTML += '<image x="0" y="0" width="300" height="300"  xlink:href="http://werbungbnc.bplaced.net/assets/img/compass_nils.svg" />';
	
	svg.innerHTML += '<foreignObject width="100" height="100" x="'+ (center.x - 7) +'" y="'+ (center.y - radius - 20 - margin) +'"><input type="radio" name="GroupSvg" id="north"></foreignObject>';
	svg.innerHTML += '<foreignObject width="100" height="100" x="'+ (center.x - radius - 17 - margin) +'" y="'+ (center.y + -11) +'"><input type="radio" name="GroupSvg" id="west"></foreignObject>';
	svg.innerHTML += '<foreignObject width="100" height="100" x="'+ (205) +'" y="'+ (82)  +'"><input type="radio" name="GroupSvg" id="northeast"></foreignObject>';
	svg.innerHTML += '<foreignObject width="100" height="100" x="'+ (205) +'" y="'+ (200)  +'"><input type="radio" name="GroupSvg" id="southeast"></foreignObject>';
	svg.innerHTML += '<foreignObject width="100" height="100" x="'+ (85) +'" y="'+ (200)  +'"><input type="radio" name="GroupSvg" id="southwest"></foreignObject>';
	svg.innerHTML += '<foreignObject width="100" height="100" x="'+ (83) +'" y="'+ (82)  +'"><input type="radio" name="GroupSvg" id="northwest"></foreignObject>';
	svg.innerHTML += '<foreignObject width="100" height="100" x="'+ (center.x - 5) +'" y="'+ (center.y + radius + -2 + margin)  +'"><input type="radio" name="GroupSvg" id="south"></foreignObject>';
	svg.innerHTML += '<foreignObject width="50" height="50" x="'+ (center.x + radius + 2 + margin) +'" y="'+ (center.y + -10) +'"><input type="radio" name="GroupSvg" id="east"></foreignObject>';

	let div = document.createElement("div");
	div.appendChild(svg);
	compass.appendChild(div);	
}

function activeRunwayh3(temp){
	let h3 = document.createElement("h3");
	h3.classList.add("mt-5");
	h3.classList.add("bg-dark");
	h3.classList.add("text-white");
	h3.classList.add("rounded-circle");
	h3.classList.add("text-center");
	h3.innerHTML += "<u>Active Runway</u><br>" + temp.runways[0].name + "  " + temp.runways[0].length_m + "m";
	activeRunway.appendChild(h3);

}

function clearElements() {
	while(document.getElementById("compass").childElementCount > 0){
		document.getElementById("compass").childNodes[0].remove();
	}
	while(document.getElementById("activeRunway").childElementCount > 0){
		document.getElementById("activeRunway").childNodes[0].remove();
	}

}

function clearTable() {
	while(SidOutput.childElementCount > 0){
		SidOutput.childNodes[0].remove();
	}
}

function clearApp(){
	mymap.removeLayer(goAroundLatlngs);
	mymap.removeLayer(goAroundPolyline);
	mymap.removeLayer(holding);
	for(i = 0; i < goAroundMarker.length; i++) {
	   mymap.removeLayer(goAroundMarker[i]);
	}
	holding = [];
	goAroundLatlngs = [];
	goAroundMarker = [];
	goAroundPolyline = [];
}

function appEvent(x) {
	getAppData(x.currentTarget.value, document.getElementById("icao").value, function(tempApp){
		var appData = tempApp[x.target.id].waypoints;
		for(i = 0; i < appData.length; i++){
			if(i == 0){
				appLatlngs.push([latlngs[latlngs.length-1][0], latlngs[latlngs.length-1][1]]);
			}
			if((appData[i].type == "Runway") && (appData.length-1 != i)){
				// console.log(appData[i].type + ", " + appData[i].lat +", " + appData[i].lon);
				for(var j = (i); j < appData.length; j++){
					if(appData[j].lat != 0) {
						var tempMarker= new L.Marker([appData[j].lat, appData[j].lon]);
						goAroundMarker.push(tempMarker);
						tempMarker.addTo(mymap);
						goAroundLatlngs.push([appData[j].lat, appData[j].lon]);
						if(appData[j].type == "Hold"){
							holding = L.ellipse([appData[j].lat, appData[j].lon], [1500, 750], 0 , {color:"yellow", weight:8});
						}
					}
				}
				appLatlngs.push([appData[i].lat, appData[i].lon]);
				break;
			}
			if(appData[i].lat != 0) {
				var allMarkers = new L.Marker([appData[i].lat, appData[i].lon]);
		        marker.push(allMarkers);
		        allMarkers.addTo(mymap);
				appLatlngs.push([appData[i].lat, appData[i].lon]);
			}
		}
		appPolyline = L.polyline(appLatlngs, {color: 'DodgerBlue'});
		mymap.fitBounds(appPolyline.getBounds());
		goAroundPolyline = L.polyline(goAroundLatlngs, {className: 'my_polyline'}).addTo(mymap);
		appPolyline.addTo(mymap);
		holding.addTo(mymap);
	})
}
var help1 = document.getElementById("helpBox1");
var help2 = document.getElementById("helpBox2");

var extraHelp = document.getElementById("map");
extraHelp.addEventListener("click", function () {
	mapActivate();
})

var normalHelp = document.getElementById("help");
normalHelp.addEventListener("click", function () {
	help1.style.display = "none";
	help2.style.display = "block";
})

function mapActivate(){
	help1.style.display = "block";
	help2.style.display = "none";

}

function mapLegende(){
	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (mymap) {

	    var div = L.DomUtil.create('div', 'info legend');
	        div.innerHTML += '<i style="background:black"></i>Star/Sid Route <br>';
			div.innerHTML += '<i style="background:DodgerBlue"></i>Approach Route <br>';
			div.innerHTML += '<i style="background:green"></i>Missed Approach <br>';
			div.innerHTML += '<i style="background:yellow"></i>Holding Pattern';
	    

	    return div;
	};

	legend.addTo(mymap);
}