// Elements
const sendMetarButtonElement = document.getElementById("sendMetar");
const buttonElement = document.getElementById("alex");
const snackbarElement = document.getElementById("snackbar");

function showSnackbar(message, duration) {
    snackbarElement.innerText = message;

    snackbarElement.classList.add("show");
    setTimeout(function () {
        snackbarElement.classList.remove("show");
    }, duration);
}

// Firebase
const messageListRef = firebase.database().ref('LastIcao');
const messageListRefRep = firebase.database().ref('Reports');

//Live Clock UTC
const timeOutputElement = document.getElementById('time');

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

setInterval(updateTimeOutput, 1000);

// circle svg
function circle(metarHeading, heading, size) {
    if (size === 1) {
        // groß
        let height = 300;
        let width = 300;
        let radius = width / 2.6;
        let center = {
            x: width / 2,
            y: height / 2
        }
        let margin = 0;
    } else {
        // klein
        let height = 150;
        let width = 150;
        let radius = width / 3.5;
        let center = {
            x: width / 2,
            y: height / 2
        }
        let margin = -5;
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
input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        main();
    }
});
buttonElement.addEventListener("click", main);

// main analysis
async function main() {
    clearElements();

    let spinnerElement = document.getElementById("sk-fading-circle");
    let tableElement = document.getElementById("out")
    let metarTableElement = document.getElementById("metar")
    let refreshButtonElement = document.getElementById("RefreshBtn")
    let icaoInputElement = document.getElementById("icao");
    document.getElementById("icao").value = "";
    let icao = icaoInputElement.value.toUpperCase();
    let outputElement = document.getElementById("output");
    let metarOutputElement = document.getElementById("metarOutput");

    loadingSpinner(false);

    if (refreshButtonElement.style.display === "flex") {
        window.location.reload();
    } else {
        if (icao === "") {
            showSnackbar("No ICAO!", 3000);
        } else {
            const runwaysResponse = await fetch(`/api/airports/${icao}/runways`);
            const runwaysResponseJson = await runwaysResponse.json();

            spinnerElement.style.display = "none";

            loadingSpinner(true);

            tableElement.style.display = "flex";
            metarTableElement.style.display = "flex";

            console.log(runwaysResponseJson);
            sendMetarButtonElement.style.display = "block";

            if (runwaysResponseJson.error) {
                showSnackbar("Wrong ICAO!", 3000);

                outputElement.style.display = "none";
                metarOutputElement.style.display = "none";
            } else {
                const weather = runwaysResponseJson.weather;
                metarOutputElement.innerHTML += "<tr><td>" + weather.metar + "</td><td>" + weather.ceiling_ft + "</td><td>" + weather.visibility_statute_mi + "</td></tr>";

                for (let i = 0; i < runwaysResponseJson.runways.length; i++) {
                    const currentRunway = runwaysResponseJson.runways[i];

                    let tr = document.createElement("tr");
                    tr.classList.add("tr-data");
                    tr.innerHTML += "<th class='align-middle'>" + currentRunway.name + "</th><td class='align-middle'>" + currentRunway.length_m + "</td><td class='align-middle'>" + currentRunway.notes + "</td><td class='align-middle'>" + currentRunway.croswind_kt + "KT" + "</td>" + "<td class='align-middle'>" + currentRunway.headwind_kt + "KT" + "</td>" + "<td class='align-middle'>" + currentRunway.ifr + "</td>" + "<td class='align-middle'>" + notamInfo(currentRunway) + "</td>";

                    if (currentRunway.notams.closed) {
                        notamBox(currentRunway);
                        tr.classList.add("text-danger");
                    }

                    if (i === 0) {
                        tr.classList.add("text-success");
                    }

                    let td = document.createElement("td");
                    td.classList.add("compass");
                    td.appendChild(circle(weather.wind_dir_degrees, currentRunway.heading));

                    tr.appendChild(td);
                    outputElement.appendChild(tr);
                }

                let newIcao = messageListRef.push();
                newIcao.set({
                    "Icao": icao
                });
            }

            let metarHeading = runwaysResponseJson.weather.wind_dir_degrees
            let rwy1 = runwaysResponseJson.runways[0].heading;

            let svg = circle(metarHeading, rwy1, 1);
            console.log(svg);
            document.querySelector("#compassrose").appendChild(svg);
        }
    }
}

// aerodrome history
let messageList = firebase.database().ref('LastIcao').limitToLast(3);
messageList.on('value', function (snapshot) {
    //updateNachrichten
    let IcaoOutput = document.getElementById("lasticao");
    let newhtml = "";
    let temp = snapshot.val();
    for (let child in temp) {
        newhtml += "<li>" + temp[child].Icao + "</li>";
    }
    IcaoOutput.innerHTML = newhtml;
});

sendMetarButtonElement.addEventListener("click", function () {
    let icao = document.getElementById("icao").value;

    window.open(`http://aviationtools.de/metar/?icao=${icao}`);
})

function clearElements() {
    while (document.getElementById("output").childElementCount > 0) {
        document.getElementById("output").childNodes[0].remove();
    }
    while (document.getElementById("metarOutput").childElementCount > 0) {
        document.getElementById("metarOutput").childNodes[0].remove();
    }
    while (document.getElementById("compassrose").childElementCount > 0) {
        document.getElementById("compassrose").childNodes[0].remove();
    }
    while (document.getElementById("notamCard").childElementCount > 0) {
        document.getElementById("notamCard").childNodes[0].remove();
    }
}


//Notam Information
function notamInfo(input) {
    return "<ul><font size='2'><li>" + input.notams.specifics + "</li></font><br><font size='2'><li>" + input.notams.countdown + "</li></font></ul>";
}

function notamBox(input) {
    console.log(input);
    let notamOutput = document.getElementById("notamCard");
    notamOutput.innerHTML += "<li><h6>Runway " + input.name + " Closed</h6></li>";

}

function loadingSpinner(ready) {
    if (ready) {
        while (buttonElement.firstChild) {
            buttonElement.removeChild(buttonElement.firstChild);
        }
        buttonElement.removeAttribute("disabled");
        buttonElement.innerText = "Decode";
    } else {
        let span = document.createElement("span");
        buttonElement.setAttribute("disabled", "");
        span.classList.add("spinner-border");
        span.classList.add("spinner-border-sm");
        span.setAttribute("role", "status");
        span.setAttribute("aria-hidden", "true");
        buttonElement.innerText = "Loading...  ";
        buttonElement.appendChild(span);
    }
}
