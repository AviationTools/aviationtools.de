var sendMetarbtn = document.getElementById("sendMetar");
var button = document.getElementById("alex");
var messageListRef = firebase.database().ref('LastIcao');
var messageListRefRep = firebase.database().ref('Reports');

//Live Clock UTC
var span = document.getElementById('time');
function time() {
  var d = new Date();
  var s = d.getUTCSeconds();
  var m = d.getUTCMinutes();
  var h = d.getUTCHours();
  if(s < 10){
  	s = "0"+s;
  }
  if(m < 10){
  	m = "0"+m;
  }
  if(h < 10){
  	h = "0"+h;
  }
  span.textContent = "UTC " + h + ":" + m + ":" + s;
}
setInterval(time, 1000);

// circle svg
function circle(metarHeading, heading, size) {
	if (size == 1) {
		// groß
		var height = 300;
		var width = 300;
		var radius = width / 2.6;
		var center = {
			x: width / 2,
			y: height / 2
		}
		var margin = 0;
	}
	else {
		// klein
		var height = 150;
		var width = 150;
		var radius = width / 3.5;
		var center = {
			x: width / 2,
			y: height / 2
		}
		var margin = -5;
	}
	
	
	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.classList.add("circle");
	svg.setAttribute("height", height);
	svg.setAttribute("width", width);
	
	svg.innerHTML += '<circle r="' + radius + '" cx="' + center.x + '" cy="' + center.y + '" stroke="black" stroke-width="1" fill="white" />';
	
	svg.innerHTML += '<text x="' + (center.x - 15) + '" y="' + (center.y - radius - 8 - margin) + '" fill="black">360°</text>';
	svg.innerHTML += '<text x="' + (center.x + radius + 10 + margin) + '" y="' + (center.y + 8) + '" fill="black">90°</text>';
	svg.innerHTML += '<text x="' + (center.x - radius - 35 - margin) + '" y="' + (center.y + 8) + '" fill="black">270°</text>';
	svg.innerHTML += '<text x="' + (center.x - 15) + '" y="' + (center.y + radius + 16 + margin) + '" fill="black">180°</text>';
	
	//Wind
	let windX = center.x + (radius * Math.sin(0.01745329251 * metarHeading));
	let windY = center.y + (radius * -Math.cos(0.01745329251 * metarHeading));
	svg.innerHTML += "<line x1=" + center.x + " y1=" + center.y + " x2=" + windX + " y2=" + windY + " style=stroke:blue;stroke-width:2 ></line>";
	
	//Runways
	let reverseHeading = heading + 180;
	
	let x1 = center.x + (radius * Math.sin(0.01745329251 * heading));
	let y1 = center.y + (radius * -Math.cos(0.01745329251 * heading));
	
	let x2 = center.x + (radius * Math.sin(0.01745329251 * reverseHeading));
	let y2 = center.y + (radius * -Math.cos(0.01745329251 * reverseHeading));
	
	svg.innerHTML += "<line x1=" + x1 + " y1=" + y1 + " x2=" + x2 + " y2=" + y2 + " style=stroke:black;stroke-width:2 ></line>";

	return svg;
}

let input = document.getElementById("icao");
input.addEventListener("keyup",function(event){
	event.preventDefault();
	if(event.keyCode === 13){
		main();
	};
});
button.addEventListener("click", main);

// main analysis
function main() {
	clearElements();
    /* =+ konvertiert string zu int*/
    var x = document.getElementById("sk-fading-circle");
    var table = document.getElementById("out")
    var mtable = document.getElementById("metar")
	var refbtn = document.getElementById("RefreshBtn")
	let geticao = document.getElementById("icao").value;
    document.getElementById("icao").value = "";
    let icao = geticao.toUpperCase();
    var output = document.getElementById("output");
    var metarOutput = document.getElementById("metarOutput");
    let usableInfo = {};
    let Metar = {};
	var s = document.getElementById("snackbar");

	loadingSpinner(false);

	if(refbtn.style.display == "flex"){
		window.location.reload();
	} else {
	if (icao == "" || icao.length !== 4) {
        s.innerText = "No ICAO or too long!";
		s.className = "show";
		setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
		

    } else {
        var Info = new XMLHttpRequest();
        Info.open("GET", "/api/runways/" + icao, true);
        Info.onreadystatechange = function () {
            if (Info.readyState != 4) return;
            x.style.display = "none";

            loadingSpinner(true);

            table.style.display = "flex";
            mtable.style.display = "flex";
            usableInfo = JSON.parse(Info.responseText);

            console.log(usableInfo);
            sendMetarbtn.style.display = "block";



            if (usableInfo.error) {
				s.innerText = "Wrong ICAO!";
				s.className = "show";
				setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
                output.style.display = "none";
                metarOutput.style.display = "none";
            } else {

                Metar = usableInfo.weather;
                metarOutput.innerHTML += "<tr>" + "<td>" + Metar.metar + "</td>" + "<td>" + Metar.ceiling_ft + "</td>" + "<td>" + Metar.visibility_statute_mi + "</td></tr>";

                // let temp = "";
                for (i = 0; i < usableInfo.runways.length; i++) {
					let tr = document.createElement("tr");
					tr.classList.add("tr-data");
					tr.innerHTML += "<th class='align-middle'>" + usableInfo.runways[i].name + "</th><td class='align-middle'>" + usableInfo.runways[i].length_m + "</td><td class='align-middle'>" + usableInfo.runways[i].notes + "</td><td class='align-middle'>" + usableInfo.runways[i].croswind_kt + "KT" + "</td>" + "<td class='align-middle'>" + usableInfo.runways[i].headwind_kt + "KT" + "</td>" + "<td class='align-middle'>" + usableInfo.runways[i].ifr + "</td>" + "<td class='align-middle'>" + notamInfo(usableInfo.runways[i]) + "</td>";
					
					if(usableInfo.runways[i].notams.closed){
						notamBox(usableInfo.runways[i]);
						tr.className += " text-danger";
					}

					if(i == 0){
						tr.className += " text-success";
					}
					
					let td = document.createElement("td");
					td.classList.add("compass");
					td.appendChild(circle(Metar.wind_dir_degrees, usableInfo.runways[i].heading));
					
					tr.appendChild(td);
					output.appendChild(tr);
                }

                var newIcao = messageListRef.push();
                newIcao.set({
                    "Icao": icao
                });
            }
            let runways = [];
            let id1 = usableInfo.runways[0].id;
            for (i = 0; i < usableInfo.runways.length; i++) {
                runways.push(usableInfo.runways[i].id);
                if (usableInfo.runways.length - 1 === i) {
                    runways.shift();
                }
            } 
			let id2 = runways.indexOf(id1) + 1;
			let metarHeading = Metar.wind_dir_degrees
			let rwy1 = usableInfo.runways[0].heading;
			let rwy2 = usableInfo.runways[id2].heading;
			
			let svg = circle(metarHeading, rwy1, 1);
			console.log(svg);
			document.querySelector("#compassrose").appendChild(svg);
        }
    }
	}
	Info.send();
};

// aerodrome history
var messageList = firebase.database().ref('LastIcao').limitToLast(3);
messageList.on('value', function(snapshot) {
    //updateNachrichten	
    var IcaoOutput = document.getElementById("lasticao");
    var newhtml = "";
    var temp = snapshot.val();
    for (var child in temp) {
        newhtml += "<li>" + temp[child].Icao + "</li>";
    }
    IcaoOutput.innerHTML = newhtml;
});

sendMetarbtn.addEventListener("click",function(){
	let geticao = document.getElementById("icao").value;
	/*window.location.href = "http://atccom.de/metar/index.php?icao=" + geticao;*/
	window.open("http://atccom.de/metar/index.php?icao=" + geticao);

})

function clearElements() {
	while(document.getElementById("output").childElementCount > 0){
		document.getElementById("output").childNodes[0].remove();
	}
	while(document.getElementById("metarOutput").childElementCount > 0){
		document.getElementById("metarOutput").childNodes[0].remove();
	}
	while(document.getElementById("compassrose").childElementCount > 0){
		document.getElementById("compassrose").childNodes[0].remove();
	}
	while(document.getElementById("notamCard").childElementCount > 0){
		document.getElementById("notamCard").childNodes[0].remove();
	}
}


//Notam Information
function notamInfo(input){
	return "<ul><font size='2'><li>" + input.notams.specifics + "</li></font><br><font size='2'><li>" + input.notams.countdown + "</li></font></ul>";
}

function notamBox(input){
	console.log(input);
	var notamOutput = document.getElementById("notamCard");
	notamOutput.innerHTML += "<li><h6>Runway "+ input.name +" Closed</h6></li>";

}

function loadingSpinner(ready){
	if(ready){
		while (button.firstChild) {
		  button.removeChild(button.firstChild);
		}
		button.removeAttribute("disabled");
		button.innerText = "Decode";
	}else{
		let span = document.createElement("span");
		let p = document.createElement("p");
		button.setAttribute("disabled", "");
		span.classList.add("spinner-border");
		span.classList.add("spinner-border-sm");
		span.setAttribute("role", "status");
		span.setAttribute("aria-hidden", "true");
		button.innerText = "Loading...  ";
		button.appendChild(span);
	}
}
