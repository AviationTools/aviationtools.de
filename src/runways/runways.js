//Leaflet Map
var map = new L.map('map', {zoomControl: false, attributionControl: false });
//map.dragging.disable();
//map.scrollWheelZoom.disable();
//map.boxZoom.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.keyboard.disable();

//Global Variables
let latlon = [];
let closedRunway = [];
let badgeType = "badge-primary";

// Elements
const timeOutputElement = document.getElementById('time');

const analyseButtonElement = document.getElementById("alex");
const icaoInputElement = document.getElementById("icao");
const icaoHistoryOutputElement = document.getElementById("lasticao");
const notamCardElement = document.getElementById("notamCard");
const tableElement = document.getElementById("out")
const runwayOutputElement = document.getElementById("output");

const sendMetarButtonElement = document.getElementById("sendMetar");
const metarTextElement = document.getElementById("metarText");
const weatherTypeElement = document.getElementById("weatherType");

const svgWindDirectionElement = document.getElementById("svgWindDirection"); 
const windInformationElement = document.getElementById("windInformation"); 

// Refresh button
const refreshButtonElement = document.getElementById("refreshBtn");
refreshButtonElement.addEventListener("click", () => {
    window.location.reload();
});

// Snackbar
const snackbarElement = document.getElementById("snackbar");
function showSnackbar(message, duration) {
    snackbarElement.innerText = message;

    snackbarElement.classList.add("show");
    setTimeout(function () {
        snackbarElement.classList.remove("show");
    }, duration);
}

// Live Clock UTC
function updateTimeOutput() {
    let d = new Date();
    let s = d.getUTCSeconds();
    let m = d.getUTCMinutes();
    let h = d.getUTCHours();
    if (s < 10) {
        s = "0" + s;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (h < 10) {
        h = "0" + h;
    }
    timeOutputElement.textContent = "UTC " + h + ":" + m + ":" + s;
}
updateTimeOutput();
setInterval(updateTimeOutput, 1000);

// circle svg
function circle(metarHeading, heading, size) {
    let circleConfig = {};
   
    // small
    circleConfig.height = 150;
    circleConfig.width = 150;
    circleConfig.radius = circleConfig.width / 3.5;
    circleConfig.center = {
        x: circleConfig.width / 2,
        y: circleConfig.height / 2
    };
    circleConfig.margin = -5;
    

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("circle");
    svg.setAttribute("height", circleConfig.height);
    svg.setAttribute("width", circleConfig.width);

    svg.innerHTML += '<circle r="' + circleConfig.radius + '" cx="' + circleConfig.center.x + '" cy="' + circleConfig.center.y + '" stroke="black" stroke-width="1" fill="white" />';

    svg.innerHTML += '<text x="' + (circleConfig.center.x - 15) + '" y="' + (circleConfig.center.y - circleConfig.radius - 8 - circleConfig.margin) + '" fill="black">360°</text>';
    svg.innerHTML += '<text x="' + (circleConfig.center.x + circleConfig.radius + 10 + circleConfig.margin) + '" y="' + (circleConfig.center.y + 8) + '" fill="black">90°</text>';
    svg.innerHTML += '<text x="' + (circleConfig.center.x - circleConfig.radius - 35 - circleConfig.margin) + '" y="' + (circleConfig.center.y + 8) + '" fill="black">270°</text>';
    svg.innerHTML += '<text x="' + (circleConfig.center.x - 15) + '" y="' + (circleConfig.center.y + circleConfig.radius + 16 + circleConfig.margin) + '" fill="black">180°</text>';

    // Wind
    let windX = circleConfig.center.x + (circleConfig.radius * Math.sin(0.01745329251 * metarHeading));
    let windY = circleConfig.center.y + (circleConfig.radius * -Math.cos(0.01745329251 * metarHeading));
    svg.innerHTML += "<line x1=" + circleConfig.center.x + " y1=" + circleConfig.center.y + " x2=" + windX + " y2=" + windY + " style=stroke:blue;stroke-width:2 ></line>";

    // Runways
    let reverseHeading = heading + 180;

    let x1 = circleConfig.center.x + (circleConfig.radius * Math.sin(0.01745329251 * heading));
    let y1 = circleConfig.center.y + (circleConfig.radius * -Math.cos(0.01745329251 * heading));

    let x2 = circleConfig.center.x + (circleConfig.radius * Math.sin(0.01745329251 * reverseHeading));
    let y2 = circleConfig.center.y + (circleConfig.radius * -Math.cos(0.01745329251 * reverseHeading));

    svg.innerHTML += "<line x1=" + x1 + " y1=" + y1 + " x2=" + x2 + " y2=" + y2 + " style=stroke:black;stroke-width:2 ></line>";

    return svg;
}

icaoInputElement.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.code === "Enter") {
        main();
    }
});
analyseButtonElement.addEventListener("click", main);

// main analysis
async function main() {
    clearElements();

    const icao = icaoInputElement.value;

    loadingSpinner(false);

    if (icao === "") {
        showSnackbar("No ICAO!", 3000);
        return;
    }
    else if (icao.length < 3) {
        showSnackbar("ICAO is to short!", 3000);
        return;
    }
    //Debug URL
    //const runwaysResponse = await fetch(`http://127.0.0.1:5000/airports/${icao}/runways`);
    const runwaysResponse = await fetch(`/api/airports/${icao}/runways`);

    await updateRunwayHistory();
    loadingSpinner(true);

    tableElement.style.display = "flex";
    sendMetarButtonElement.style.display = "block";

    if (runwaysResponse.ok) {
        runwayOutputElement.style.display = "table-row-group";

        const runwaysResponseJson = await runwaysResponse.json();
        const weather = runwaysResponseJson.weather;

        for (let i = 0; i < runwaysResponseJson.runways.length; i++) {

            const currentRunway = runwaysResponseJson.runways[i];
            
            //Check if Runway Closed
            if (currentRunway.closed == 1) {
                closedRunway.push(currentRunway.name);
                notamCardElement.innerText += currentRunway.name + " Closed!";
            }
            if (runwaysResponseJson.runways.length == i+1 && closedRunway.length == 0) {
                notamCardElement.innerText = "No Runway Closed!";
            }

            //Append Coordinates for Map
            if(currentRunway.runwayCoordinates != null) {
                let polyline = L.polyline(currentRunway.runwayCoordinates, {color: 'black'});
                latlon.push(currentRunway.runwayCoordinates);
                polyline.addTo(map);
                createMap(currentRunway.runwayCoordinates[0], currentRunway.runwayNames[0]);
                createMap(currentRunway.runwayCoordinates[1], currentRunway.runwayNames[1]);
            }

            let tr = document.createElement("tr");
            tr.classList.add("tr-data");
            tr.innerHTML += "<th class='align-middle'>" + currentRunway.name + "</th><td class='align-middle'>" + currentRunway.length_ft + "</td><td class='align-middle'>" + currentRunway.surface + "</td><td class='align-middle'>" + currentRunway.croswind_kt + "KT" + "</td>" + "<td class='align-middle'>" + currentRunway.headwind_kt + "KT" + "</td>" + "<td class='align-middle'>" + currentRunway.ifr + "</td>" + "<td class='align-middle'>" + currentRunway.lighted+ "</td>";

            if (i === 0) {
                tr.classList.add("text-success");
            }

            let td = document.createElement("td");
            td.classList.add("compass");
            td.appendChild(circle(weather.wind_dir_degrees, currentRunway.heading));
            
            //Metar & Type
            setWeatherType(weather);
            setWindInformation(weather);

            tr.appendChild(td);
            runwayOutputElement.appendChild(tr);
        }

        centerMap();

    } else {
        showSnackbar("Could not load runway information for ICAO", 3000);

        runwayOutputElement.style.display = "none";
    }
}

// Aerodrome history
async function updateRunwayHistory() {
    const historyResponse = await fetch("/api/airports/runways/history");
    const historyResponseJson = await historyResponse.json();

    let icaoHistoryOutputHtml = "";
    for (let entry of historyResponseJson) {
        icaoHistoryOutputHtml += "<li>" + entry.icao + "</li>";
    }

    icaoHistoryOutputElement.innerHTML = icaoHistoryOutputHtml;
}
updateRunwayHistory();

sendMetarButtonElement.addEventListener("click", function () {
    const icao = icaoInputElement.value;

    window.open(`https://aviationtools.de/metar/?icao=${icao}`);
});

function clearElements() {
    latlon = [];
    weatherTypeElement.classList.remove(badgeType);
    while (runwayOutputElement.childElementCount > 0) {
        runwayOutputElement.childNodes[0].remove();
    }
}

function loadingSpinner(ready) {
    if (ready) {
        while (analyseButtonElement.firstChild) {
            analyseButtonElement.removeChild(analyseButtonElement.firstChild);
        }
        analyseButtonElement.removeAttribute("disabled");
        analyseButtonElement.innerText = "Decode";
    } else {
        let span = document.createElement("span");
        analyseButtonElement.setAttribute("disabled", "");
        span.classList.add("spinner-border");
        span.classList.add("spinner-border-sm");
        span.setAttribute("role", "status");
        span.setAttribute("aria-hidden", "true");
        analyseButtonElement.innerText = "Loading...  ";
        analyseButtonElement.appendChild(span);
    }
}

function centerMap() {
    center = L.polyline(latlon, {color: 'black'});
    map.fitBounds(center.getBounds());
}

function createMap(coordinates, rwy) {
    L.tooltip({
        permanent: true,
        opacity: 0.50,
    })
        .setLatLng(coordinates)
        .setContent(rwy)
        .addTo(map);
}

function setWeatherType(weather) {
    metarTextElement.innerText = weather.metar;
    weatherTypeElement.innerText = weather.flight_category;
    if (weather.flight_category == "MVFR") {
        badgeType = "badge-primary";
        weatherTypeElement.classList.add("badge-primary");
    } else if (weather.flight_category == "IFR") {
        badgeType = "badge-danger";
        weatherTypeElement.classList.add("badge-danger");
    } else if (weather.flight_category == "LIFR") {
        badgeType = "badge-warning";
        weatherTypeElement.classList.add("badge-warning");
    } else if (weather.flight_category == "VFR") {
        badgeType = "badge-success";
        weatherTypeElement.classList.add("badge-success");
    } else {
        console.log(weather.flight_category);
    }
    
}

function setWindInformation(weather) {
    if (!isNaN(weather.wind_dir_degrees) || !isNaN(weather.wind_speed_kt) ) {
        svgWindDirectionElement.setAttribute("transform", "rotate("+ weather.wind_dir_degrees +")");
        windInformationElement.innerText = weather.wind_dir_degrees + "/" + weather.wind_speed_kt;
    } else {
        svgWindDirectionElement.setAttribute("transform", "rotate("+ 360 +")");
        windInformationElement.innerText = "Check Metar!";
    }
}

//Disable Tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})