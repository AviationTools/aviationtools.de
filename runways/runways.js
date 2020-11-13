// Elements
const timeOutputElement = document.getElementById('time');

const analyseButtonElement = document.getElementById("alex");
const icaoInputElement = document.getElementById("icao");
const icaoHistoryOutputElement = document.getElementById("lasticao");
const spinnerElement = document.getElementById("sk-fading-circle");
const tableElement = document.getElementById("out")
const runwayOutputElement = document.getElementById("output");

const sendMetarButtonElement = document.getElementById("sendMetar");
const compassRoseOutputElement = document.getElementById("compassrose");
const metarOutputElement = document.getElementById("metarOutput");

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
    if (size === 1) {
        // big
        circleConfig.height = 300;
        circleConfig.width = 300;
        circleConfig.radius = circleConfig.width / 2.6;
        circleConfig.center = {
            x: circleConfig.width / 2,
            y: height / 2
        };
        circleConfig.margin = 0;
    } else {
        // small
        circleConfig.height = 150;
        circleConfig.width = 150;
        circleConfig.radius = circleConfig.width / 3.5;
        circleConfig.center = {
            x: circleConfig.width / 2,
            y: height / 2
        };
        circleConfig.margin = -5;
    }

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
    await updateRunwayHistory();

    clearElements();

    const icao = icaoInputElement.value;
    // icaoInputElement.value = ""; // TODO: Why?

    loadingSpinner(false);

    if (icao === "") {
        showSnackbar("No ICAO!", 3000);
        return;
    }
    else if (icao.length < 3) {
        showSnackbar("ICAO is to short!", 3000);
        return;
    }

    const runwaysResponse = await fetch(`/api/airports/${icao}/runways`);
    const runwaysResponseJson = await runwaysResponse.json();

    spinnerElement.style.display = "none";

    loadingSpinner(true);

    tableElement.style.display = "flex";

    console.log(runwaysResponseJson);
    sendMetarButtonElement.style.display = "block";

    if (runwaysResponseJson.error) {
        showSnackbar("Wrong ICAO!", 3000);

        runwayOutputElement.style.display = "none";
        metarOutputElement.style.display = "none";
    } else {
        const weather = runwaysResponseJson.weather;
        metarOutputElement.innerHTML += "<tr><td>" + weather.metar + "</td><td>" + weather.ceiling_ft + "</td><td>" + weather.visibility_statute_mi + "</td></tr>";

        for (let i = 0; i < runwaysResponseJson.runways.length; i++) {
            const currentRunway = runwaysResponseJson.runways[i];

            let tr = document.createElement("tr");
            tr.classList.add("tr-data");
            tr.innerHTML += "<th class='align-middle'>" + currentRunway.name + "</th><td class='align-middle'>" + currentRunway.length_m + "</td><td class='align-middle'>" + currentRunway.notes + "</td><td class='align-middle'>" + currentRunway.croswind_kt + "KT" + "</td>" + "<td class='align-middle'>" + currentRunway.headwind_kt + "KT" + "</td>" + "<td class='align-middle'>" + currentRunway.ifr + "</td>" + "<td class='align-middle'>TODO: Notam info</td>";

            if (i === 0) {
                tr.classList.add("text-success");
            }

            let td = document.createElement("td");
            td.classList.add("compass");
            td.appendChild(circle(weather.wind_dir_degrees, currentRunway.heading));

            tr.appendChild(td);
            runwayOutputElement.appendChild(tr);
        }
    }

    let metarHeading = runwaysResponseJson.weather.wind_dir_degrees
    let rwy1 = runwaysResponseJson.runways[0].heading;

    let svg = circle(metarHeading, rwy1, 1);
    console.log(svg);
    compassRoseOutputElement.appendChild(svg);
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
    while (runwayOutputElement.childElementCount > 0) {
        runwayOutputElement.childNodes[0].remove();
    }
    while (metarOutputElement.childElementCount > 0) {
        metarOutputElement.childNodes[0].remove();
    }
    while (compassRoseOutputElement.childElementCount > 0) {
        compassRoseOutputElement.childNodes[0].remove();
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
