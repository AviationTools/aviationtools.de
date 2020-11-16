const compass = document.getElementById("compass");
const output = document.getElementById("output");
const SidOutput = document.getElementById("SidOutput");
const runwaySelection = document.getElementById("runwaySelection");
const departureSelection = document.getElementById("departureSelection");
const runway = document.getElementById("runway");
const radioSVG = document.getElementsByName("GroupSvg");
const submit = document.getElementById("submit");
const tableConfig = document.getElementById("tableConfig");
const runwayTable = document.getElementById("runwayTable");
const activeRunway = document.getElementById("activeRunway");
const sidbtn = document.getElementById("sid");
const starbtn = document.getElementById("star");
const options = document.getElementsByClassName("options");

const approach = document.getElementById("approach");
const appDiv = document.getElementById("appDiv");
const label = document.getElementById("label");
const h1 = document.getElementById("h1");
h1.innerHTML = "SID Analysis";
label.innerHTML = " Departure Selection";

const icaoInputElement = document.getElementById("icao");

// Snackbar
const snackbarElement = document.getElementById("snackbar");
function showSnackbar(message, duration) {
    snackbarElement.innerText = message;
    console.log(message);

    snackbarElement.classList.add("show");
    setTimeout(function () {
        snackbarElement.classList.remove("show");
    }, duration);
}

// Global variables
let globalArray = {};
let icao = "";
let firstPoint = [];
let layer = null;
let latLngs = [];
let appLatLngs = [];
let marker = [];
let polyline = [];
let appPolyline = [];
let temp = null;
let globalApp = [];
let goAroundMarker = [];
let goAroundLatLngs = [];
let goAroundPolyline = [];
let holding = [];
let showSidsElseStar = true;
let appCondition = false;
createTable();

approach.addEventListener("change", function () {
    if (approach.checked) {
        appCondition = true;
        createTable();
    } else {
        appCondition = false;
        createTable();
    }
})

sidbtn.addEventListener("click", function () {
    clearAll();
    options[0].style.display = "block";
    options[1].style.display = "block";
    showSidsElseStar = true;
    createTable();
    h1.innerText = "SID Analysis";
    label.innerHTML = " Departure Selection";
    appDiv.style.display = "none";
})

starbtn.addEventListener("click", function () {
    clearAll();
    options[0].style.display = "block";
    options[1].style.display = "block";
    showSidsElseStar = false;
    createTable();
    h1.innerText = "STAR Analysis";
    label.innerHTML = " Approach Selection";
    appDiv.style.display = "block";
})

async function checkInputAndGetRunways() {
    if (icaoInputElement.value === "") {
        throw Error("No ICAO!");
    } else {
        if (latLngs.length > 0 || firstPoint.length > 0) {
            deleteMapElements();
            clearAll();
        }
        await changeAirport(icaoInputElement.value);
        clearTable();

        let icao = icaoInputElement.value;
        try {
            const runways = await getRunwayData(icao);

            while (runwayTable.childElementCount > 0) {
                runwayTable.childNodes[0].remove();
            }

            return runways;
        }
        catch {
            throw Error("Could not get runways for ICAO!");
        }
    }
}

runwaySelection.addEventListener("click", async function () {
    try {
        const runways = await checkInputAndGetRunways();

        output.style.display = "block";
        clearElements();

        for (let runway of runways) {
        // for (let i = 0; i < runways.length; i++) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");

            td1.classList.add("align-middle");
            td2.classList.add("align-middle");
            td3.classList.add("align-middle");

            td1.innerText += runway.name;
            td2.innerText += runway.length_m;

            const inputElement = document.createElement("input");
            inputElement.setAttribute("type", "radio");
            inputElement.setAttribute("name", "GroupRadio");
            inputElement.setAttribute("style", "margin-right:10px;");
            inputElement.addEventListener("change", () => {
                clearTable();

                if (inputElement.checked) {
                    if (showSidsElseStar) {
                        sidDeparture(runway.name, icaoInputElement.value);
                    } else {
                        starArrival(runway.name, icaoInputElement.value);
                    }
                }
            });
            td3.appendChild(inputElement);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            runwayTable.appendChild(tr);
        }
    }
    catch (e) {
        showSnackbar(e, 3000);
    }
});

departureSelection.addEventListener("click", async function () {
    output.style.display = "none";

    const runways = await checkInputAndGetRunways();

    clearElements();
    circleSvg();
    for (let i = 0; i < radioSVG.length; i++) {
        radioSVG[i].addEventListener("change", function () {
            for (i = 0; i < runways.length; i++) {
                if (showSidsElseStar) {
                    departureSelectionSid(runways[i].name, icaoInputElement.value);
                } else {
                    departureSelectionStar(runways[i].name, icaoInputElement.value);
                }
            }
        })
    }
});

runway.addEventListener("click", async function () {
    output.style.display = "none";

    if (showSidsElseStar) {
        const runways = await checkInputAndGetRunways();
        clearElements()
        activeRunwayh3(runways[0]);
        sidDeparture(runways[0].name, icaoInputElement.value);
    } else {
        const runways = await checkInputAndGetRunways();

        clearElements();
        activeRunwayh3(runways[0]);
        starArrival(runways[0].name, icaoInputElement.value);
    }
});

async function departureSelectionSid(runway, icao) {
    clearTable();
    let north = document.getElementById("north");
    let west = document.getElementById("west");
    let south = document.getElementById("south");
    let southeast = document.getElementById("southeast");
    let southwest = document.getElementById("southwest");
    let northwest = document.getElementById("northwest");
    let northeast = document.getElementById("northeast");
    let east = document.getElementById("east");

    const sids = await getSidData(runway, icao);

    for (let sid in sids) {
        globalArray[sid] = sids[sid];
    }

    for (let sid in sids) {
        if (north.checked && sids[sid].track === "North Departure") {
            compassLine(360);
            departureCompass(sid, sids[sid].runway, sids[sid].fight_level, sids[sid].track_heading, sids[sid].track, sids[sid].waypoints);
        } else if (west.checked && sids[sid].track === "West Departure") {
            compassLine(270);
            departureCompass(sid, sids[sid].runway, sids[sid].fight_level, sids[sid].track_heading, sids[sid].track, sids[sid].waypoints);
        } else if (south.checked && sids[sid].track === "South Departure") {
            compassLine(180);
            departureCompass(sid, sids[sid].runway, sids[sid].fight_level, sids[sid].track_heading, sids[sid].track, sids[sid].waypoints);
        } else if (southeast.checked && sids[sid].track === "South East Departure") {
            compassLine(135);
            departureCompass(sid, sids[sid].runway, sids[sid].fight_level, sids[sid].track_heading, sids[sid].track, sids[sid].waypoints);
        } else if (southwest.checked && sids[sid].track === "South West Departure") {
            compassLine(225);
            departureCompass(sid, sids[sid].runway, sids[sid].fight_level, sids[sid].track_heading, sids[sid].track, sids[sid].waypoints);
        } else if (northwest.checked && sids[sid].track === "North West Departure") {
            compassLine(315);
            departureCompass(sid, sids[sid].runway, sids[sid].fight_level, sids[sid].track_heading, sids[sid].track, sids[sid].waypoints);
        } else if (northeast.checked && sids[sid].track === "North East Departure") {
            compassLine(45);
            departureCompass(sid, sids[sid].runway, sids[sid].fight_level, sids[sid].track_heading, sids[sid].track, sids[sid].waypoints);
        } else if (east.checked && sids[sid].track === "East Departure") {
            compassLine(90);
            departureCompass(sid, sids[sid].runway, sids[sid].fight_level, sids[sid].track_heading, sids[sid].track, sids[sid].waypoints);
        } else {
            // console.log("Looping!");
        }
    }

    if (document.getElementsByClassName("tr-data").length <= 0) {
        showSnackbar("This Runway Does Not Have A SID Departure!", 3000);
    }
}

function departureCompass(sid, runways, fight_level, track_heading, track, waypoints) {
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
    td2.innerText += fight_level;
    td3.innerText += track_heading;
    td4.innerText += track;
    if (showSidsElseStar) {
        for (let i = 0; i < waypoints.length; i++) {
            if (waypoints.length - 1 === i) {
                td5.innerText += waypoints[i].name;
            } else {
                td5.innerText += waypoints[i].name + "=>";
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

function arrivalCompass(sid, runways, track_heading, track, waypoints) {
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
    td2.innerText += track_heading;
    td3.innerText += track;

    if (!appCondition) {
        for (let i = 0; i < waypoints.length; i++) {
            if (waypoints.length - 1 === i) {
                td4.innerText += waypoints[i].name;
            } else {
                td4.innerText += waypoints[i].name + "=>";
            }
        }
    }

    if (appCondition) {
        getAppData(runways, icaoInputElement.value, function (appArray) {
            globalApp = appArray;
            for (let app in appArray) {
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


async function sidDeparture(runway, icao) {
    const sids = await getSidData(runway, icao);

    if (sids === 400) {
        showSnackbar("This Runway Does Not Have A SID Departure!", 3000);
    }
    globalArray = sids;
    for (let sid in sids) {
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
        td1.innerText += sids[sid].runway;
        td2.innerText += sids[sid].fight_level;
        td3.innerText += sids[sid].track_heading;
        td4.innerText += sids[sid].track;
        for (let i = 0; i < sids[sid].waypoints.length; i++) {
            if (i === 5 || i === 10) {
                td5.innerHTML += "<br>";
            }
            if (sids[sid].waypoints.length - 1 === i) {
                td5.innerHTML += sids[sid].waypoints[i].name;
            } else {
                td5.innerHTML += sids[sid].waypoints[i].name + "=>";
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
}

function starArrival(runway, icao) {
    getStarData(runway, icao, function (starArray) {
        if (starArray === 400) {
            showSnackbar("This Runway Does Not Have A STAR Departure!", 3000);
        }
        globalArray = starArray;
        getAppData(runway, icao, function (appArray) {
            globalApp = appArray;
            for (let star in globalArray) {
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
                td1.innerText += globalArray[star].runway;
                td2.innerText += globalArray[star].track_heading;
                td3.innerText += globalArray[star].track;
                if (!appCondition) {
                    for (let i = 0; i < globalArray[star].waypoints.length; i++) {
                        if (i === 5 || i === 10) {
                            td4.innerHTML += "<br>";
                        }
                        if (globalArray[star].waypoints.length - 1 === i) {
                            td4.innerHTML += globalArray[star].waypoints[i].name;
                        } else {
                            td4.innerHTML += globalArray[star].waypoints[i].name + "=>";
                        }
                    }
                }
                if (appCondition) {
                    for (let app in appArray) {
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
}

function departureSelectionStar(runway, icao) {
    clearTable();
    let north = document.getElementById("north");
    let west = document.getElementById("west");
    let south = document.getElementById("south");
    let southeast = document.getElementById("southeast");
    let southwest = document.getElementById("southwest");
    let northwest = document.getElementById("northwest");
    let northeast = document.getElementById("northeast");
    let east = document.getElementById("east");

    getStarData(runway, icao, function (array) {

        for (let sid in array) {
            globalArray[sid] = array[sid];
        }
        for (let sid in array) {
            if (north.checked && array[sid].track == "North Arrival") {
                compassLine(360);
                arrivalCompass(sid, array[sid].runway, array[sid].track_heading, array[sid].track, array[sid].waypoints);
            } else if (west.checked && array[sid].track == "West Arrival") {
                compassLine(270);
                arrivalCompass(sid, array[sid].runway, array[sid].track_heading, array[sid].track, array[sid].waypoints);
            } else if (south.checked && array[sid].track == "South Arrival") {
                compassLine(180);
                arrivalCompass(sid, array[sid].runway, array[sid].track_heading, array[sid].track, array[sid].waypoints);
            } else if (southeast.checked && array[sid].track == "South East Arrival") {
                compassLine(135);
                arrivalCompass(sid, array[sid].runway, array[sid].track_heading, array[sid].track, array[sid].waypoints);
            } else if (southwest.checked && array[sid].track == "South West Arrival") {
                compassLine(225);
                arrivalCompass(sid, array[sid].runway, array[sid].track_heading, array[sid].track, array[sid].waypoints);
            } else if (northwest.checked && array[sid].track == "North West Arrival") {
                compassLine(315);
                arrivalCompass(sid, array[sid].runway, array[sid].track_heading, array[sid].track, array[sid].waypoints);
            } else if (northeast.checked && array[sid].track == "North East Arrival") {
                compassLine(45);
                arrivalCompass(sid, array[sid].runway, array[sid].track_heading, array[sid].track, array[sid].waypoints);
            } else if (east.checked && array[sid].track == "East Arrival") {
                compassLine(90);
                arrivalCompass(sid, array[sid].runway, array[sid].track_heading, array[sid].track, array[sid].waypoints);
            } else {
                // console.log("Looping!");
            }
        }
        if (document.getElementsByClassName("tr-data").length <= 0) {
            showSnackbar("This Runway Does Not Have A SID Arrival!", 3000);
        }
    });
}


function compassLine(heading) {
    for (let line of document.getElementsByClassName("compass-line")) {
        line.remove();
    }
    let svg = document.getElementById("compassCircle");

    // Line
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const windX = 150 + (75 * Math.sin(0.01745329251 * heading));
    const windY = 150 + (75 * -Math.cos(0.01745329251 * heading));
    element.classList.add("compass-line");
    element.setAttribute("x1", String(150));
    element.setAttribute("y1", String(150));
    element.setAttribute("x2", String(windX));
    element.setAttribute("y2", String(windY));
    element.setAttribute("style", "stroke:blue; stroke-width:2;");
    svg.appendChild(element);
}

// MAP Leaflet
let mymap = L.map('mapid');
initMap();

function initMap() {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 14,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYm5jNGsiLCJhIjoiY2pwcmhnNzF2MDFlejN4bjdjamR2cHJnNCJ9.mZMpSXrNgjTPU0dky1cfvA'
    }).addTo(mymap);
    mymap.locate({setView: true, maxZoom: 8});

    $("#mapid").height($(window).height() / 1.5).width($(window).width() / 2.5);
    mymap.invalidateSize();
    addLegendToMap();
}

async function changeAirport(icao) {
    const runways = await getRunwayData(icao);

    for (let i = 0; i < runways.length; i++) {
        if (runways[i].name !== "") {
            const resultSid = await getSidData(runways[i].name, icao);

            for (let sid in resultSid) {
                changeMap(resultSid[sid].airport.lat, resultSid[sid].airport.lon, icao)
                firstPoint.push([resultSid[sid].airport.lat, resultSid[sid].airport.lon]);
                return; // TODO: Why?
            }
        }
        return; // TODO: Why?
    }
}

function changeMap(lat, lon, icao) {
    let greenIcon = L.icon({
        iconUrl: '/assets/icon/airport_icon.svg',

        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    });
    mymap.setView(new L.LatLng(lat, lon), 12);
    layer = new L.Marker([lat, lon], {icon: greenIcon});
    layer.addTo(mymap).bindPopup(icao).openPopup();
}

let bgColor = null;

function tableEvent(x) {
    mapActivate();
    if (latLngs.length > 1) {
        deleteMapElements();
        clearApp();
        bgColor.removeAttribute("bgcolor");
    }

    const tempArray = globalArray[x.currentTarget.attributes[1].nodeValue];
    console.log(tempArray);
    bgColor = x.currentTarget;
    x.currentTarget.setAttribute("bgcolor", "green");

    for (let i = 0; i < tempArray.waypoints.length; i++) {
        if (showSidsElseStar) {
            if (i === 0) {
                latLngs.push([firstPoint[0][0], firstPoint[0][1]]);
            }
        }
        if (tempArray.waypoints[i].lat !== 0) {
            let allMarkers = new L.Marker([tempArray.waypoints[i].lat, tempArray.waypoints[i].lon]);
            marker.push(allMarkers);
            allMarkers.addTo(mymap).bindPopup(tempArray.waypoints[i].name).openPopup();
            latLngs.push([tempArray.waypoints[i].lat, tempArray.waypoints[i].lon]);
        }
    }

    polyline = L.polyline(latLngs, {color: 'black'});
    mymap.fitBounds(polyline.getBounds());
    polyline.addTo(mymap);
}

async function getRunwayData(icao) {
    const runwayResponse = await fetch(`/api/airports/${icao}/runways`);
    const runwayResponseJson = await runwayResponse.json();

    if (runwayResponse.ok) {
        return runwayResponseJson.runways;
    }
    else {
        throw new Error(runwayResponseJson.error);
    }
}

async function getSidData(runway, icao) {
    const sidResponse = await fetch(`/api/airports/${icao}/runways/${runway}/sids`);
    const sidResponseJson = await sidResponse.json();

    if (sidResponse.ok) {
        return sidResponseJson;
    }
    else {
        throw new Error(sidResponseJson.error);
    }
}

async function getStarData(runway, icao) {
    const starResponse = await fetch(`/api/airports/${icao}/runways/${runway}/stars`);
    const starResponseJson = await starResponse.json();

    if (starResponse.ok) {
        return starResponseJson;
    }
    else {
        throw new Error(starResponseJson.error);
    }
}

async function getAppData(runway, icao) {
    const approachResponse = await fetch(`/api/airports/${icao}/runways/${runway}/approaches`);
    const approachResponseJson = await approachResponse.json();

    if (approachResponse.ok) {
        return approachResponseJson;
    }
    else {
        throw new Error(approachResponseJson.error);
    }
}

function createTable() {
    while (document.getElementById("tableConfig").childElementCount > 0) {
        document.getElementById("tableConfig").childNodes[0].remove();
    }
    if (showSidsElseStar) {
        let array = ["Sid Name", "Runway", "Flight Level", "Track", "Track HDG", "Waypoints"];
        for (i = 0; i < array.length; i++) {
            let th = document.createElement("th");
            th.classList.add("align-middle");
            th.innerText += array[i];
            tableConfig.appendChild(th);
        }
    } else {
        if (appCondition) {
            let array = ["Star Name", "Runway", "Track", "Track HDG", "Approach"];
            for (i = 0; i < array.length; i++) {
                let th = document.createElement("th");
                th.classList.add("align-middle");
                th.innerText += array[i];
                tableConfig.appendChild(th);
            }
        } else {
            let array = ["Star Name", "Runway", "Track", "Track HDG", "Waypoints"];
            for (i = 0; i < array.length; i++) {
                let th = document.createElement("th");
                th.classList.add("align-middle");
                th.innerText += array[i];
                tableConfig.appendChild(th);
            }
        }
    }

}

function clearAll() {
    if (latLngs.length > 0 || firstPoint.length > 0) {
        deleteMapElements();
        mymap.removeLayer(layer);
        firstPoint = [];
        layer = [];
    }
    clearTable();
    clearApp();
}

function deleteMapElements() {
    mymap.removeLayer(polyline);
    mymap.removeLayer(appPolyline);
    latLngs = [];
    appLatLngs = [];
    polyline = [];
    appPolyline = []
    for (let i = 0; i < marker.length; i++) {
        mymap.removeLayer(marker[i]);
    }
    marker = [];
}

function circleSvg() {
    // groß
    const height = 300;
    const width = 300;
    const radius = width / 4;
    const center = {
        x: width / 2,
        y: height / 2
    }
    const margin = 0;


    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height", height);
    svg.setAttribute("width", width);
    svg.setAttribute("id", "compassCircle");

    svg.innerHTML += '<image x="0" y="0" width="300" height="300"  xlink:href="/assets/img/compass_nils.svg" />';

    svg.innerHTML += '<foreignObject width="100" height="100" x="' + (center.x - 7) + '" y="' + (center.y - radius - 20 - margin) + '"><input type="radio" name="GroupSvg" id="north"></foreignObject>';
    svg.innerHTML += '<foreignObject width="100" height="100" x="' + (center.x - radius - 17 - margin) + '" y="' + (center.y + -11) + '"><input type="radio" name="GroupSvg" id="west"></foreignObject>';
    svg.innerHTML += '<foreignObject width="100" height="100" x="' + (205) + '" y="' + (82) + '"><input type="radio" name="GroupSvg" id="northeast"></foreignObject>';
    svg.innerHTML += '<foreignObject width="100" height="100" x="' + (205) + '" y="' + (200) + '"><input type="radio" name="GroupSvg" id="southeast"></foreignObject>';
    svg.innerHTML += '<foreignObject width="100" height="100" x="' + (85) + '" y="' + (200) + '"><input type="radio" name="GroupSvg" id="southwest"></foreignObject>';
    svg.innerHTML += '<foreignObject width="100" height="100" x="' + (83) + '" y="' + (82) + '"><input type="radio" name="GroupSvg" id="northwest"></foreignObject>';
    svg.innerHTML += '<foreignObject width="100" height="100" x="' + (center.x - 5) + '" y="' + (center.y + radius + -2 + margin) + '"><input type="radio" name="GroupSvg" id="south"></foreignObject>';
    svg.innerHTML += '<foreignObject width="50" height="50" x="' + (center.x + radius + 2 + margin) + '" y="' + (center.y + -10) + '"><input type="radio" name="GroupSvg" id="east"></foreignObject>';

    let div = document.createElement("div");
    div.appendChild(svg);
    compass.appendChild(div);
}

function activeRunwayh3(runway) {
    let h3 = document.createElement("h3");
    h3.classList.add("mt-5");
    h3.classList.add("bg-dark");
    h3.classList.add("text-white");
    h3.classList.add("rounded-circle");
    h3.classList.add("text-center");

    h3.innerHTML += "<u>Active Runway</u><br>" + runway.name + "  " + runway.length_m + "m";
    activeRunway.appendChild(h3);
}

function clearElements() {
    while (document.getElementById("compass").childElementCount > 0) {
        document.getElementById("compass").childNodes[0].remove();
    }

    while (document.getElementById("activeRunway").childElementCount > 0) {
        document.getElementById("activeRunway").childNodes[0].remove();
    }
}

function clearTable() {
    while (SidOutput.childElementCount > 0) {
        SidOutput.childNodes[0].remove();
    }
}

function clearApp() {
    mymap.removeLayer(goAroundLatLngs);
    mymap.removeLayer(goAroundPolyline);
    mymap.removeLayer(holding);
    for (let i = 0; i < goAroundMarker.length; i++) {
        mymap.removeLayer(goAroundMarker[i]);
    }
    holding = [];
    goAroundLatLngs = [];
    goAroundMarker = [];
    goAroundPolyline = [];
}

async function appEvent(x) {
    const approaches = await getAppData(x.currentTarget.value, icaoInputElement.value);

    const waypoints = approaches[x.target.id].waypoints;
    for (let i = 0; i < waypoints.length; i++) {
        if (i === 0) {
            appLatLngs.push([latLngs[latLngs.length - 1][0], latLngs[latLngs.length - 1][1]]);
        }

        if ((waypoints[i].type === "Runway") && (waypoints.length - 1 !== i)) {
            for (let j = i; j < waypoints.length; j++) {
                if (waypoints[j].lat !== 0) {
                    const tempMarker = new L.Marker([waypoints[j].lat, waypoints[j].lon]);
                    goAroundMarker.push(tempMarker);
                    tempMarker.addTo(mymap);
                    goAroundLatLngs.push([waypoints[j].lat, waypoints[j].lon]);
                    if (waypoints[j].type === "Hold") {
                        holding = L.ellipse([waypoints[j].lat, waypoints[j].lon], [1500, 750], 0, {
                            color: "yellow",
                            weight: 8
                        });
                    }
                }
            }

            appLatLngs.push([waypoints[i].lat, waypoints[i].lon]);
            break;
        }

        if (waypoints[i].lat !== 0) {
            const allMarkers = new L.Marker([waypoints[i].lat, waypoints[i].lon]);
            marker.push(allMarkers);
            allMarkers.addTo(mymap);
            appLatLngs.push([waypoints[i].lat, waypoints[i].lon]);
        }
    }

    appPolyline = L.polyline(appLatLngs, {color: 'DodgerBlue'});
    mymap.fitBounds(appPolyline.getBounds());
    goAroundPolyline = L.polyline(goAroundLatLngs, {className: 'my_polyline'}).addTo(mymap);
    appPolyline.addTo(mymap);
    holding.addTo(mymap);
}

let help1 = document.getElementById("helpBox1");
let help2 = document.getElementById("helpBox2");

let extraHelp = document.getElementById("map");
extraHelp.addEventListener("click", function () {
    mapActivate();
})

let normalHelp = document.getElementById("help");
normalHelp.addEventListener("click", function () {
    help1.style.display = "none";
    help2.style.display = "block";
})

function mapActivate() {
    help1.style.display = "block";
    help2.style.display = "none";

}

function addLegendToMap() {
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
        const mapLegendElement = L.DomUtil.create('div', 'info legend');

        mapLegendElement.innerHTML += '<i style="background:black"></i>Star/Sid Route <br>';
        mapLegendElement.innerHTML += '<i style="background:DodgerBlue"></i>Approach Route <br>';
        mapLegendElement.innerHTML += '<i style="background:green"></i>Missed Approach <br>';
        mapLegendElement.innerHTML += '<i style="background:yellow"></i>Holding Pattern';

        return mapLegendElement;
    };

    legend.addTo(mymap);
}
