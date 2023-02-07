const snackbarElement = document.getElementById("snackbar");
const icaoInputElement = document.getElementById("icao");
const decodeButtonElement = document.getElementById("decode-button");
const clearButtonElement = document.getElementById("clear-button");
const reportOutputElement = document.getElementById("report-output");


//Activate Tooltipps by Default
function enableTooltip() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}


// load icao from url parameter on initial page load
function findGetParameter(parameterName) {
    let result = null,
        tmp = [];
    const items = location.search.substr(1).split("&");
    for (let index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

if (location.search) {
    const urlIcaoParameter = findGetParameter("icao")

    if (urlIcaoParameter) {
        icaoInputElement.value = urlIcaoParameter;
        fetchMetarAndDecode();
    }
}

// initialize metar examples
for (let exampleButtonElement of document.getElementsByClassName("metar-example")) {
    exampleButtonElement.addEventListener("click", () => {
        icaoInputElement.value = exampleButtonElement.dataset["metar"];

        reportOutputElement.value = metarDecode(exampleButtonElement.dataset["metar"]);
    });
}

clearButtonElement.addEventListener("click", function () {
   icaoInputElement.value = "";
   reportOutputElement.innerHTML = "";
});

// main analysis
decodeButtonElement.addEventListener("click", function () {
    fetchMetarAndDecode();
});

icaoInputElement.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        fetchMetarAndDecode();
    }
});

function showSnackbar(message, duration) {
    snackbarElement.innerText = message;

    snackbarElement.classList.add("show");
    setTimeout(function () {
        snackbarElement.classList.remove("show");
    }, duration);
}

async function fetchMetarAndDecode() {
    reportOutputElement.innerHTML = "";
    let icao = icaoInputElement.value.split(" ")[0];

    if (icao === "") {
        showSnackbar("No ICAO!", 3000);
        return;
    }

    try {
        //Debug URL
        //const metarResponse = await fetch(`http://127.0.0.1:5000/airports/${icao}/metar`);
        
        const metarResponse = await fetch(`/api/airports/${icao}/metar`);
        const metarResponseJson = await metarResponse.json();

        if (metarResponseJson.error) {
            reportOutputElement.value = "";
            showSnackbar("Could not get metar for ICAO!", 3000);
        } else {
            
            let metarElements = metarDecode(metarResponseJson.metar);
            let sortedMetar = metarElements.split('\n');
            let toolElements = [];
            let i = 0;
            
            sortedMetar.forEach(element => {
                toolElements.push(element.split(':'));
            });

            console.log(sortedMetar)
            console.log(toolElements)
            
            const metarArray = metarResponseJson.metar.split(' ');
            metarArray.forEach(value => {
                reportOutputElement.innerHTML += '<abbr id="tool" data-toggle="tooltip" data-html="true">' + value + '</abbr>' + " " ;
            });

            reportOutputElement.querySelectorAll("#tool").forEach(element => {
                //Append Tooltipps as long as Data available !
                //TODO Delete @ FAA ICAO after "RMK"
                //TODO Optimise the tooltip Data ":" for "/"
                if(toolElements.length != i) {
                    queryString = "<strong>"+ toolElements[i][0] + "</strong><br>" + toolElements[i][1];
                    element.setAttribute("title", queryString);
                    i++;
                }
            });
        
            enableTooltip();
        }
    }
    catch (e) {
        reportOutputElement.value = "";
        console.error("error while fetching metar", e);
        showSnackbar("Could not get metar for ICAO!", 3000);
    }
}

function isNumericDigit(ch) {
    return ((ch === '0') || (ch === '1') || (ch === '2') || (ch === '3') ||
        (ch === '4') || (ch === '5') || (ch === '6') || (ch === '7') ||
        (ch === '8') || (ch === '9'));
}

function isAlphabeticChar(ch) {
    return ((ch >= 'A') && (ch <= 'Z'));
}

function decodeToken(token) {
    let result = "";

    // Check if token is "calm wind"
    if (token === "00000KT") {
        return result + "Calm wind\n";
    }

    // Check if token is Wind indication
    const regexWindKT = /^(\d{3}|VRB)(\d{2,3})(G\d{2,3})?(KT|MPS|KMH)$/;

    if (regexWindKT.test(token)) {
        // Wind token: dddss(s){Gss(s)}KT -- ddd is true direction, ss(s) speed in knots

        let myArray = regexWindKT.exec(token);
        let units = myArray[4];
        result += "Wind: ";

        if (myArray[1] === "VRB") {
            result += " Variable in direction";
        }
        else {
            result += " True direction = " + myArray[1] + " degrees";
        }

        result += ", Speed " + parseInt(myArray[2], 10);

        if (units === "KT") result += " knots";
        else if (units === "KMH") result += " km/h";
        else if (units === "MPS") result += " m/s";

        if (myArray[3] != null) {
            // Quick hack to detect if myArray[3] is not a number.

            if (myArray[3] !== "") {
                result += ", with Gusts of maximum speed " + parseInt(myArray[3].substr(1, myArray[3].length), 10);

                if (units === "KT") result += " knots";
                else if (units === "KMH") result += " km/h";
                else if (units === "MPS") result += " m/s";
            }
        }

        return result + "\n";
    }

    // Check if token is "letiable wind direction"
    let regexVariableWind = /^(\d{3})V(\d{3})$/;

    if (regexVariableWind.test(token)) {
        // Variable wind direction: aaaVbbb, aaa and bbb are directions in clockwise order

        return result + "Wind: direction is variable between " + token.substr(0, 3) + " and " + token.substr(4, 3) + "\n";
    }

    // Check if token is visibility
    let regexVis = /^(\d{4})([NS])?([EW])?$/;

    if (regexVis.test(token)) {
        let myArray = regexVis.exec(token);
        result += "Visibility: ";

        if (myArray[1] === "9999") {
            result += "10 km or more";
        }
        else if (myArray[1] === "0000") {
            result += "less than 50 m";
        }
        else {
            result += parseInt(myArray[1], 10) + " m";
        }

        let dir = "";
        if (typeof myArray[2] != "undefined") {
            dir = dir + myArray[2];
        }

        if (typeof myArray[3] != "undefined") {
            dir = dir + myArray[3];
        }

        if (dir !== "") {
            result += " direction ";

            if (dir === "N") result += "North";
            else if (dir === "NE") result += "North East";
            else if (dir === "E") result += "East";
            else if (dir === "SE") result += "South East";
            else if (dir === "S") result += "South";
            else if (dir === "SW") result += "South West";
            else if (dir === "W") result += "West";
            else if (dir === "NW") result += "North West";
        }

        return result + "\n";
    }

    // Check if token is Statute-Miles visibility
    let reVisUS = /(SM)$/;

    if (reVisUS.test(token)) {
        let myVisArray = token.split("S");

        result += "Visibility: " + myVisArray[0] + " Statute Miles\n";
    }

    // Check if token is QNH indication in mmHg or hPa
    let regexQNHhPa = /Q\d{3,4}/;
    if (regexQNHhPa.test(token)) {
        // QNH token: Qpppp -- pppp is pressure hPa

        return result + "QNH (Sea-level pressure): " + parseInt(token.substr(1, 4), 10) + " hPa\n";
    }

    // Check if token is QNH indication in mmHg: Annnn
    let regexINHg = /A\d{4}/;
    if (regexINHg.test(token)) {
        return result + "QNH: " + token.substr(1, 2) + "." + token.substr(3, 4) + " inHg\n";
    }

    // Check if token is runway visual range (RVR) indication
    let regexRVR = /^R(\d{2})([RCL])?\/([MP])?(\d{4})(V\d{4})?([UDN])?$/;

    if (regexRVR.test(token)) {
        const myArray = regexRVR.exec(token);

        result += "Runway " + myArray[1];

        if (typeof myArray[2] != "undefined") {
            if (myArray[2] === "L") result += " Left";
            else if (myArray[2] === "R") result += " Right";
            else if (myArray[2] === "C") result += " Central";
        }

        result += ", touchdown zone visual range is ";
        if (typeof myArray[5] != "undefined") {
            // Variable range
            result += "letiable from a minimum of ";

            if (myArray[3] === "P") {
                result += "more than ";
            } else if (myArray[3] === "M") {
                result += "less than ";
            }

            result += myArray[4] + " meters until a maximum of " + myArray[5].substr(1, myArray[5].length) + " meters";
        } else {
            // Single value
            if ((typeof myArray[3] != "undefined") &&
                (typeof myArray[4] != "undefined")) {

                if (myArray[3] === "P") result += "more than ";
                else if (myArray[3] === "M") result += "less than ";

                result += myArray[4] + " meters";
            }
        }

        if ((myArray.length > 5) && (typeof myArray[6] != "undefined")) {
            if (myArray[6] === "U") result += ", and increasing";
            else if (myArray[6] === "D") result += ", and decreasing";
        }

        return result + "\n";
    }

    // Check if token is CAVOK
    if (token === "CAVOK") {
        return result + "CAVOK conditions: Visibility 10 km or more, no cloud below 5.000 feet or below the MSA (whichever is greater), no cumulonimbus, and no significant weather fenomena in the aerodrome or its vicinity\n";
    }

    // Check if token is NOSIG
    if (token === "NOSIG") {
        return result + "No significant changes expected in the near future\n";
    }

    // Check if token is NCD
    if (token === "NCD") {
        return result + "No Clouds\n";
    }

    // Check if token is CLR
    if (token === "CLR") {
        return result + "No Clouds under 12.000ft\n";
    }

    // Check if token is a present weather code - The regular expression is a bit
    // long, because several precipitation types can be joined in a token, and I
    // don't see a better way to get all the codes.
    let reWX = /^([-+])?(VC)?(MI|BC|BL|SH|TS|FZ|PR)?(DZ|RA|SN|SG|IC|PL|GR|GS)?(DZ|RA|SN|SG|IC|PL|GR|GS)?(DZ|RA|SN|SG|IC|PL|GR|GS)?(DZ|RA|SN|SG|IC|PL|GR|GS)?(DZ|RA|SN|SG|IC|PL|GR|GS|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS)$/;

    if (reWX.test(token)) {
        result += "Weather: ";

        let myArray = reWX.exec(token);
        for (let i = 1; i < myArray.length; i++) {
            if (myArray[i] === "-") result += "Light ";
            if (myArray[i] === "+") result += "Strong ";
            if (myArray[i] === "VC") result += "In the vicinity, ";
            if (myArray[i] === "MI") result += "Shallow ";
            if (myArray[i] === "BC") result += "Patches of ";
            if (myArray[i] === "SH") result += "Showers of ";
            if (myArray[i] === "TS") result += "Thunderstorms ";
            if (myArray[i] === "FZ") result += "Freezing (or super-cooled) ";
            if (myArray[i] === "PR") result += "Partial ";
            if (myArray[i] === "DZ") result += "Drizzle ";
            if (myArray[i] === "RA") result += "Rain ";
            if (myArray[i] === "SN") result += "Snow ";
            if (myArray[i] === "SG") result += "Snow grains ";
            if (myArray[i] === "IC") result += "Ice Crystals ";
            if (myArray[i] === "PL") result += "Ice Pellets ";
            if (myArray[i] === "GR") result += "Hail ";
            if (myArray[i] === "GS") result += "Small hail (< 5 mm diameter) and/or snow pellets ";
            if (myArray[i] === "BR") result += "Mist ";
            if (myArray[i] === "FG") result += "Fog ";
            if (myArray[i] === "FU") result += "Smoke ";
            if (myArray[i] === "VA") result += "Volcanic Ash ";
            if (myArray[i] === "DU") result += "Widespread dust ";
            if (myArray[i] === "SA") result += "Sand ";
            if (myArray[i] === "HZ") result += "Haze ";
            if (myArray[i] === "PO") result += "Dust/Sand whirls ";
            if (myArray[i] === "SQ") result += "Squall ";
            if (myArray[i] === "FC") result += "Funnel clouds ";
            if (myArray[i] === "SS") result += "Sandstorm ";
            if (myArray[i] === "DS") result += "Duststorm ";
        }

        return result + "\n";
    }

    // Check if token is recent weather observation
    let regexREWX = /^RE([-+])?(VC)?(MI|BC|BL|SH|TS|FZ|PR)?(DZ|RA|SN|SG|IC|PL|GR|GS)?(DZ|RA|SN|SG|IC|PL|GR|GS)?(DZ|RA|SN|SG|IC|PL|GR|GS)?(DZ|RA|SN|SG|IC|PL|GR|GS)?(DZ|RA|SN|SG|IC|PL|GR|GS|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS)?$/;

    if (regexREWX.test(token)) {
        result += "Since the previous observation (but not at present), the following\nmeteorological phenomena were observed: ";
        let myArray = regexREWX.exec(token);

        for (let i = 1; i < myArray.length; i++) {
            if (myArray[i] === "-") result += "Light ";
            if (myArray[i] === "+") result += "Strong ";
            if (myArray[i] === "VC") result += "In the vicinity, ";
            if (myArray[i] === "MI") result += "Shallow ";
            if (myArray[i] === "BC") result += "Patches of ";
            if (myArray[i] === "SH") result += "Showers of ";
            if (myArray[i] === "TS") result += "Thunderstorms ";
            if (myArray[i] === "FZ") result += "Freezing (or super-cooled) ";
            if (myArray[i] === "PR") result += "Partial ";
            if (myArray[i] === "DZ") result += "Drizzle ";
            if (myArray[i] === "RA") result += "Rain ";
            if (myArray[i] === "SN") result += "Snow ";
            if (myArray[i] === "SG") result += "Snow grains ";
            if (myArray[i] === "IC") result += "Ice Crystals ";
            if (myArray[i] === "PL") result += "Ice Pellets ";
            if (myArray[i] === "GR") result += "Hail ";
            if (myArray[i] === "GS") result += "Small hail (< 5 mm diameter) and/or snow pellets ";
            if (myArray[i] === "BR") result += "Mist ";
            if (myArray[i] === "FG") result += "Fog ";
            if (myArray[i] === "FU") result += "Smoke ";
            if (myArray[i] === "VA") result += "Volcanic Ash ";
            if (myArray[i] === "DU") result += "Widespread dust ";
            if (myArray[i] === "SA") result += "Sand ";
            if (myArray[i] === "HZ") result += "Haze ";
            if (myArray[i] === "PO") result += "Dust/Sand whirls ";
            if (myArray[i] === "SQ") result += "Squall ";
            if (myArray[i] === "FC") result += "Funnel clouds ";
            if (myArray[i] === "SS") result += "Sandstorm ";
            if (myArray[i] === "DS") result += "Duststorm ";
        }

        return result + "\n";
    }

    // Check if token is temperature / dewpoint pair
    let regexTempDew = /^(M?\d\d|\/\/)\/(M?\d\d)?$/;

    if (regexTempDew.test(token)) {
        let myArray = regexTempDew.exec(token);

        if (myArray[1].charAt(0) === 'M') {
            result += "Temperature: -" + myArray[1].substr(1, 2) + " degrees Celsius ";
        } else {
            result += "Temperature: " + myArray[1].substr(0, 2) + " degrees Celsius ";
        }

        if (myArray[2] !== "") {
            if (myArray[2].charAt(0) === 'M') {
                result += "Dewpoint -" + myArray[2].substr(1, 2) + " degrees Celsius\n";
            } else {
                result += "Dewpoint " + myArray[2].substr(0, 2) + " degrees Celsius\n";
            }
        }

        return result;
    }

    // Check if token is "sky clear" indication
    if (token === "SKC") {
        return result + "Clear sky\n";
    }

    // Check if token is "vertical visibility" indication
    let regexVV = /^VV(\d{3}|\/{3})$/;

    if (regexVV.test(token)) {
        // VVddd -- ddd is vertical distance, or /// if unspecified

        const myArray = regexVV.exec(token);
        result += "Sky is obscured -- vertical visibility";

        if (myArray[1] === "///") {
            result += " cannot be assessed\n";
        } else {
            result += ": " + (100 * parseInt(myArray[1], 10)) + " feet\n";
        }

        return result;
    }

    // Check if token is cloud indication
    let regexCloud = /^(FEW|SCT|BKN|OVC)(\d{3})(CB|TCU)?$/;

    if (regexCloud.test(token)) {
        // Clouds: aaadddkk -- aaa indicates amount of sky covered, ddd distance over
        //                     aerodrome level, and kk the type of cloud.

        const myArray = regexCloud.exec(token);
        result += "Clouds: ";

        if (myArray[1] === "FEW") result += "A few ";
        else if (myArray[1] === "SCT") result += "Scattered ";
        else if (myArray[1] === "BKN") result += "Broken sky ";
        else if (myArray[1] === "OVC") result += "Overcast sky ";

        result += ", at " + (100 * parseInt(myArray[2], 10)) + " feet above aerodrome level";

        if (myArray[3] === "CB") result += ", cumulonimbus";
        else if (myArray[3] === "TCU") result += ", towering cumulus";

        return result + "\n";
    }

    // Check if token is part of a wind-shear indication
    let regexRWY = /^RWY(\d{2})([LCR])?$/;

    if (token === "WS") {
        return result + "There is wind-shear in ";
    } else if (token === "ALL") {
        return result + "all ";
    } else if (token === "RWY") {
        return result + "runways\n";
    } else if (regexRWY.test(token)) {
        const myArray = regexRWY.exec(token);
        result += "runway " + myArray[1];

        if (myArray[2] === "L") result += " Left";
        else if (myArray[2] === "C") result += " Central";
        else if (myArray[2] === "R") result += " Right";

        return result + "\n";
    }

    // Check if token is no-significant-weather indication
    if (token === "NSW") {
        return result + "No significant weather phenomena are observed at present\n";
    }

    // Check if token is no-significant-clouds indication
    if (token === "NSC") {
        return result + "No significant clouds are observed below 5000 feet or below the minimum sector altitude (whichever is higher)\n";
    }

    // Check if token is part of trend indication
    if (token === "BECMG") {
        return result + "The following weather phenomena are expected to arise soon:\n";
    }

    if (token === "TEMPO") {
        return result + "The following weather phenomena are expected to arise temporarily:\n";
    }

    let regexFM = /^FM(\d{2})(\d{2})Z?$/;
    if (regexFM.test(token)) {
        let myArray = regexFM.exec(token);
        return result + "    From " + myArray[1] + ":" + myArray[2] + " UTC, ";
    }

    let regexTL = /^TL(\d{2})(\d{2})Z?$/;
    if (regexTL.test(token)) {
        let myArray = regexTL.exec(token);
        return result + "Until " + myArray[1] + ":" + myArray[2] + " UTC, ";
    }

    let regexAT = /^AT(\d{2})(\d{2})Z?$/;
    if (regexAT.test(token)) {
        let myArray = regexAT.exec(token);
        return result + "At " + myArray[1] + ":" + myArray[2] + " UTC, ";
    }

    // Check if item is runway state group
    let regexRSG = /^(\d\d)(\d|C|\/)(\d|L|\/)(\d\d|RD|\/)(\d\d)$/;

    if (regexRSG.test(token)) {
        let myArray = regexRSG.exec(token);
        result += "Runway state:\n";

        // Runway designator (first 2 digits)
        const r = parseInt(myArray[1], 10);

        if (r < 50) result += "    Runway " + myArray[1] + " (or " + myArray[1] + " Left): ";
        else if (r < 88) result += "    Runway " + (r - 50) + " Right: ";
        else if (r === 88) result += "    All runways: ";

        // Check if "CLRD" occurs in digits 3-6
        if (token.substr(2, 4) === "CLRD") {
            result += "clear, ";
        } else {
            // Runway deposits (third digit)
            if (myArray[2] === "0") result += "clear and dry, ";
            else if (myArray[2] === "1") result += "damp, ";
            else if (myArray[2] === "2") result += "wet or water patches, ";
            else if (myArray[2] === "3") result += "rime or frost covered, ";
            else if (myArray[2] === "4") result += "dry snow, ";
            else if (myArray[2] === "5") result += "wet snow, ";
            else if (myArray[2] === "6") result += "slush, ";
            else if (myArray[2] === "7") result += "ice, ";
            else if (myArray[2] === "8") result += "compacted or rolled snow, ";
            else if (myArray[2] === "9") result += "frozen ruts or ridges, ";
            else if (myArray[2] === "/") result += "deposit not reported, ";

            // Extent of runway contamination (fourth digit)
            if (myArray[3] === "1") result += "contamination 10% or less, ";
            else if (myArray[3] === "2") result += "contamination 11% to 25%, ";
            else if (myArray[3] === "5") result += "contamination 26% to 50%, ";
            else if (myArray[3] === "9") result += "contamination 51% to 100%, ";
            else if (myArray[3] === "/") result += "contamination not reported, ";

            // Depth of deposit (fifth and sixth digits)
            if (myArray[4] === "//") {
                result += "depth of deposit not reported, ";
            } else {
                let deposit = parseInt(myArray[4], 10);

                if (deposit === 0) result += "deposit less than 1 mm deep, ";
                else if ((deposit > 0) && (deposit < 91)) result += "deposit is " + deposit + " mm deep, ";
                else if (deposit === 92) result += "deposit is 10 cm deep, ";
                else if (deposit === 93) result += "deposit is 15 cm deep, ";
                else if (deposit === 94) result += "deposit is 20 cm deep, ";
                else if (deposit === 95) result += "deposit is 25 cm deep, ";
                else if (deposit === 96) result += "deposit is 30 cm deep, ";
                else if (deposit === 97) result += "deposit is 35 cm deep, ";
                else if (deposit === 98) result += "deposit is 40 cm or more deep, ";
                else if (deposit === 99) result += "runway(s) is/are non-operational due to snow, slush, ice, large drifts or runway clearance, but depth of deposit is not reported, ";
            }
        }

        // Friction coefficient or braking action (seventh and eighth digit)
        if (myArray[5] === "//") {
            result += "braking action not reported";
        } else {
            const b = parseInt(myArray[5], 10);
            if (b < 91) {
                result += "friction coefficient 0." + myArray[5];
            } else {
                if (b === 91) result += "braking action is poor";
                else if (b === 92) result += "braking action is medium/poor";
                else if (b === 93) result += "braking action is medium";
                else if (b === 94) result += "braking action is medium/good";
                else if (b === 95) result += "braking action is good";
                else if (b === 99) result += "braking action figures are unreliable";
            }
        }

        return result + "\n";
    }

    if (token === "SNOCLO") {
        return result + "Aerodrome is closed due to snow on runways\n";
    }

    // Check if item is sea status indication
    const regexSea = /^W(M)?(\d\d)\/S(\d)/;
    if (regexSea.test(token)) {
        let myArray = regexSea.exec(token);
        result += "Sea surface temperature: ";

        if (myArray[1] === "M") {
            result += "-";
        }

        result += parseInt(myArray[2], 10) + " degrees Celsius\n";

        result += "Sea waves have height: ";
        if (myArray[3] === "0") result += "0 m (calm)\n";
        else if (myArray[3] === "1") result += "0-0,1 m\n";
        else if (myArray[3] === "2") result += "0,1-0,5 m\n";
        else if (myArray[3] === "3") result += "0,5-1,25 m\n";
        else if (myArray[3] === "4") result += "1,25-2,5 m\n";
        else if (myArray[3] === "5") result += "2,5-4 m\n";
        else if (myArray[3] === "6") result += "4-6 m\n";
        else if (myArray[3] === "7") result += "6-9 m\n";
        else if (myArray[3] === "8") result += "9-14 m\n";
        else if (myArray[3] === "9") result += "more than 14 m (huge!)\n";
    }

    return result
}

function metarDecode(text) {
    let result = "";

    // Join newline-separated pieces...
    let newlineJoined = text.replace(/(\x0d\x0a)|\x0D|\x0A/, " ");

    // An '=' finishes the report
    let equalPosition = newlineJoined.indexOf("=");

    if (equalPosition > -1) {
        alert("End of a METAR report is indicated by '='. We only decode until the first '='!!");
        newlineJoined = newlineJoined.substr(0, equalPosition);
    }

    let arrayOfTokens;

    arrayOfTokens = newlineJoined.split(" ");

    let numToken = 0;

    // Check if initial token is non-METAR date

    let reDate = /^\d\d\d\d\/\d\d\/\d\d/;

    if (reDate.test(arrayOfTokens[numToken])) {
        numToken++;
    }


    // Check if initial token is non-METAR time

    let reTime = /^\d\d:\d\d/;

    if (reTime.test(arrayOfTokens[numToken])) {
        numToken++;
    }

    // Check if initial token indicates type of report
    if (arrayOfTokens[numToken] === "METAR") {
        numToken++;
    }
    else if (arrayOfTokens[numToken] === "SPECI") {
        result += "Report is a SPECIAL report\n";
        numToken++;
    }

    // Parse location token
    if (arrayOfTokens[numToken].length === 4) {
        result += "Location: " + arrayOfTokens[numToken] + "\n";
        numToken++;
    } else {
        return result + "Invalid report: malformed location token '" + arrayOfTokens[numToken] + "' \n-- it should be 4 characters long!";
    }

    // Parse date-time token -- we allow time specifications without final 'Z'
    if (((arrayOfTokens[numToken].length === 7 && arrayOfTokens[numToken].charAt(6) === 'Z') || arrayOfTokens[numToken].length === 6) &&
        isNumericDigit(arrayOfTokens[numToken].charAt(0)) &&
        isNumericDigit(arrayOfTokens[numToken].charAt(1)) &&
        isNumericDigit(arrayOfTokens[numToken].charAt(2)) &&
        isNumericDigit(arrayOfTokens[numToken].charAt(3)) &&
        isNumericDigit(arrayOfTokens[numToken].charAt(4)) &&
        isNumericDigit(arrayOfTokens[numToken].charAt(5))) {

        result += "Day of month: " + arrayOfTokens[numToken].substr(0, 2) + " ";
        result += "Time " + arrayOfTokens[numToken].substr(2, 2) + ":" + arrayOfTokens[numToken].substr(4, 2) + " UTC";

        if (arrayOfTokens[numToken].length === 6) {
            result += " (Time specification is non-compliant!)";
        }

        result += "\n";
        numToken++;
    } else {
        return result + "Time token not found or with wrong format!";
    }

    // Check if "AUTO" or "COR" token comes next.
    if (arrayOfTokens[numToken] === "AUTO") {
        result += "Report is fully automated, with no human intervention or oversight\n";
        numToken++;
    } else if (arrayOfTokens[numToken] === "COR") {
        result += "Report is a correction over a METAR or SPECI report\n";
        numToken++;
    }

    // Parse remaining tokens
    for (let i = numToken; i < arrayOfTokens.length; i++) {
        if (arrayOfTokens[i].length > 0) {
            result += decodeToken(arrayOfTokens[i].toUpperCase());
        } else {
            result += "Next token has 0 length\n";
        }
    }

    return result;
}
