var button = document.getElementById("decode");
var output = document.getElementById("output");
var tableHeader = document.getElementById("tableConfig");
document.getElementById("tableBox").style.height = ((window.innerHeight/3)*1.9)+"px";
var totalPages = 0;
var globalStart = null;
var globalArray = null;
var globalIcao = null;
var arrayToggle = false;
var newArray = [];
var regionToggle = false;			//regionToggle & arrayToggle: true(FAA)/false(EASA)
var topicArray = [];
var activeColor = null;
var globalSorted = false;
var s = document.getElementById("snackbar");


//Enter Button
document.getElementById("icao").addEventListener("keyup",function(event){
	event.preventDefault();
	if(event.keyCode === 13){
		main();
	};
});

//Normal Button
button.addEventListener("click", function(){
	main();
});

//Search Box Entry
document.getElementById("search").addEventListener("keyup",function(event){
	newArray = [];
	event.preventDefault();
	var keySearch = document.getElementById("search").value
	let fuse = new Fuse(globalArray, {
		"shouldSort": true,
		"includeMatches": true,
		"threshold": 0.6,
		"location": 0,
		"distance": 100,
		"maxPatternLength": 32,
		"minMatchCharLength": 1,
		"keys": ['text','qcode.object','qcode.attribute']
	});

	var temp = fuse.search(keySearch).slice(0, 9);
	arrayToggle = false;
	clearTable();
	for(i = 0; i < temp.length; i++){
		newArray.push(temp[i].item);
	}
	if(newArray.length > 0){
		decodeNotams(newArray); 
	}else{
		main();
	}
});


function main(){
	if (document.getElementById("icao").value == "" || document.getElementById("icao").value.length !== 4) {
        s.innerText = "No ICAO or too long!";
		s.className = "show";
		setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
	}else{
		if(document.getElementById("icao").value[0].toUpperCase() == "K"){
			regionToggle = true;
		}else{
			regionToggle = false;
		}
		arrayToggle = true;
		loadingSpinner(false);
		clearTable();
		document.getElementById("table").style.display = "block";
		createTable();
		
		if(globalArray == null || globalIcao != document.getElementById("icao").value){
			getNotamData(document.getElementById("icao").value, function(array){
				if(array.length <= 0){
					s.innerText = "Wrong ICAO!";
					s.className = "show";
					setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
				}else{
					globalArray = array;
					topicArray = [];
					mainSearch(array);
				}
			})
		}else{
			mainSearch(globalArray);
		}
		globalIcao = document.getElementById("icao").value;
	}
}

function mainSearch(input){
	if(regionToggle){
		//FAA
		sortedArray = input.sort(function(a, b){
			let resA1 = a.details.category;
			let resB1 = b.details.category;
			return resA1.localeCompare(resB1);
		});
	}else{
		//EASA
		sortedArray = input.sort(function(a, b){
			let resA1 = a.qcode.category;
			let resB1 = b.qcode.category;
			return resA1.localeCompare(resB1);
		});
	}
	decodeNotams(sortedArray.reverse(), 0, 1, true);
}

function decodeNotams(array, start = 0, id = 1, sorted = false){
	totalPages = Math.ceil(array.length / 10);
	loadingSpinner(true);
	globalStart = start;
	pagination(array.length, id);

	for (var i = start; i < (start+10); i++) {
		//Default Table Elements
		let tr = document.createElement("tr");
		let td = document.createElement("td");
		let td0 = document.createElement("td");
		let td1 = document.createElement("td");
		let td2 = document.createElement("td");
		let td3 = document.createElement("td");
		let td4 = document.createElement("td");
		let td5 = document.createElement("td");
		let td6 = document.createElement("td");
		let td7 = document.createElement("td");
		let td8 = document.createElement("td");
		let headingRow = document.createElement("tr");
		let headingTD = document.createElement("td");
		let headingH3 = document.createElement("h3");

		tr.classList.add("tr-data");
		td.classList.add("align-middle");
		td.classList.add("font-weight-bold");
		td0.classList.add("align-middle");
		td1.classList.add("align-middle");
		td2.classList.add("align-middle");
		td3.classList.add("align-middle");
		td4.classList.add("align-middle");
		td5.classList.add("align-middle");
		td6.classList.add("align-middle");
		td7.classList.add("align-middle");
		td8.classList.add("align-middle");
		headingRow.classList.add("tr-data");
		headingTD.classList.add("text-center");
		
		tr.addEventListener("click", tableEvent);
		tr.setAttribute("id", i);
		headingTD.setAttribute("colspan", "10");
		
		//Checks if ICAO or EASA
		if(regionToggle){
			//FAA Tables
			regionToggle = true;
			
			if(array[i] === undefined){
				// pagination(array.length, id);
				return;
			}
			if(array.length == start){
				break;
			}
			//Color Codes
			// if(colorCodesFAA(array[i]) != null){
			// 	tr.classList.add(colorCodesFAA(array[i]));
			// }
			
			td0.innerHTML += '<i id="toggle" class="fas fa-caret-square-down text-primary"/>';
			td.innerText += i;
			td1.innerText += array[i].accountability;
			td2.innerText += array[i].number;
			td3.innerText += array[i].details.keyword;
			td4.innerText += textCounter(array[i].details.attribute);
			td5.innerText += array[i].details.condition;
			td6.innerText += textCounter(array[i].text);
			td7.innerText += timeFormater(array[i].start);
			td8.innerText += timeFormater(array[i].end);

			//Categorys
			if(sorted){
				globalSorted = true;
				if(newTopicFAA(array[i])){
					tr.classList.add(topicColors());
					headingH3.innerText += array[i].details.category;
					headingTD.appendChild(headingH3);
					headingRow.appendChild(headingTD);
					output.appendChild(headingRow);
				}else{
					tr.classList.add(activeColor);
				}
			}

			tr.appendChild(td0);
			tr.appendChild(td);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);
			tr.appendChild(td7);
			tr.appendChild(td8);			
			output.appendChild(tr);
			output.appendChild(notamDetails(array[i]));
		}else{
			//EASA Tables
			regionToggle = false;
			
			if(array[i] === undefined){
				// pagination(array.length, id);
				return;
			}
			if(array.length == start){
				break;
			}
			
			//Color Codes
			// if(colorCodesEASA(array[i]) != null){
			// 	tr.classList.add(colorCodesEASA(array[i]));
			// }
			
			td0.innerHTML += '<i id="toggle" class="fas fa-caret-square-down text-primary"/>';
			td.innerText += array[i].series + array[i].number + "/" + array[i].year;
			td1.innerText += array[i].fir;
			td2.innerText += array[i].suffix;
			td3.appendChild(addInfoButtons(array[i]));
			td4.innerText += array[i].qcode.attribute;
			td5.innerText += array[i].qcode.object;
			td6.innerText += textCounter(array[i].text);
			td7.innerText += timeFormater(array[i].start);
			td8.innerText += timeFormater(array[i].end);

			//Categorys
			if(sorted){
				globalSorted = true;
				if(newTopicEASA(array[i])){
					tr.classList.add(topicColors());
					headingH3.innerText += array[i].qcode.category;
					headingTD.appendChild(headingH3);
					headingRow.appendChild(headingTD);
					output.appendChild(headingRow);
				}else{
					tr.classList.add(activeColor);
				}
			}

			tr.appendChild(td0);
			tr.appendChild(td);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);
			tr.appendChild(td7);
			tr.appendChild(td8);			
			output.appendChild(tr);
			output.appendChild(notamDetails(array[i]));
		}
	}
}

function newTopicFAA(input){
	if(topicArray.includes(input.details.category)){
		return false;
	}else{
		topicArray.push(input.details.category);
		return true;
	}
}

function newTopicEASA(input){
	if(topicArray.includes(input.qcode.category)){
		return false;
	}else{
		topicArray.push(input.qcode.category);
		return true;
	}
}

function createTable(){
	while(document.getElementById("tableConfig").childElementCount > 0){
		document.getElementById("tableConfig").childNodes[0].remove();
	}
	
	let arrayEASA = ["","Number","FIR", "Suffix", "Valid for", "Condition", "Object", "Details", "Start", "End"];
	let arrayFAA = ["","Item ID","Notam Type", "Number", "Keyword", "Object", "Condition", "Details", "Start", "End"];
	
	
	for(i = 0; i < 10; i++){
		if(regionToggle){
			let th = document.createElement("th");
			th.classList.add("align-middle");
			th.innerText += arrayFAA[i];
			th.setAttribute("style", "white-space: nowrap;");
			th.setAttribute("id", arrayFAA[i]);
			th.addEventListener("click", sortTable); 
			if(i == 3 || i == 8 || i == 9){
				th.innerHTML += ' <i class="fas fa-sort"></i>';
			}
			tableHeader.appendChild(th);
		}else{
			let th = document.createElement("th");
			th.classList.add("align-middle");
			th.innerText += arrayEASA[i];
			th.setAttribute("style", "white-space: nowrap;");
			th.setAttribute("id", arrayEASA[i]);
			th.addEventListener("click", sortTable); 
			if(i == 3 || i == 8 || i == 9){
				th.innerHTML += ' <i class="fas fa-sort"></i>';
			}
			tableHeader.appendChild(th);
		}
		
	}
}
var toggle = true;
function tableEvent(x){
	var i = x.currentTarget.id;
	let icon = document.createElement("i");
	if(i[1]){
		i = i[1];
	}else{
		i = i;
	}
	
	if(toggle){
		document.querySelectorAll("#collapse")[i].classList.remove("hide");
		document.querySelectorAll("#collapse")[i].classList.add("show");

		icon.innerHTML += '<i id="toggle" class="fas fa-caret-square-up text-primary"/>';
		document.querySelectorAll("#toggle")[i].replaceWith(icon);

		toggle = false;
	}else{
		document.querySelectorAll("#collapse")[i].classList.remove("show");
		document.querySelectorAll("#collapse")[i].classList.add("hide");
		
		icon.innerHTML += '<i id="toggle" class="fas fa-caret-square-down text-primary"/>';
		document.querySelectorAll("#toggle")[i].replaceWith(icon);
		
		toggle = true;
	}
}

function notamDetails(array){
	//Card 1
	let tr = document.createElement("tr");
	let td1 = document.createElement("td");
	let card1 = document.createElement("div");
	let header1 = document.createElement("div");
	let p1 = document.createElement("p");
	//Card 2
	let td2 = document.createElement("td");
	let card2 = document.createElement("div");
	let header2 = document.createElement("div");
	let p2 = document.createElement("p");
	//Card 3
	let td3 = document.createElement("td");
	let card3 = document.createElement("div");
	let header3 = document.createElement("div");
	let p3 = document.createElement("p");
	//Card 1 Details
	tr.classList.add("collapse");
	tr.setAttribute("id", "collapse");
	card1.classList.add("card");
	header1.classList.add("card-header");
	td1.setAttribute("colspan", "4");
	card1.setAttribute("style", "height: 20rem;");
	//Card 2 Details
	card2.classList.add("card");
	header2.classList.add("card-header");
	td2.setAttribute("colspan", "4");
	//Card 3 Details
	card3.classList.add("card");
	header3.classList.add("card-header");
	td3.setAttribute("colspan", "4");
	card3.setAttribute("style", "height: 20rem;");
	//Raw Notam Information(Card 1)
	if(regionToggle){
		//FAA
		p1.innerText += array.rawNotam;
		p1.classList.add("overflow-auto");
		header1.innerText += "Raw Notam";
	}else{
		//EASA
		p1.innerText += array.notam;
		p1.classList.add("overflow-auto");
		header1.innerText += "Raw Notam";
	}
	//Purpose(Card 2)
	if(regionToggle){
		//FAA
		p2.innerText += array.created;
		header2.innerText += "Created";
	}else{
		//EASA
		p2.innerText += array.purpose[0];
		header2.innerText += "Purpose";
	}
	//Text(Card 3)
	if(array.text == null){
		p3.innerText += "Check raw notam for detailed information!";
	}else{
		p3.innerText += array.text;
	}
	p3.classList.add("overflow-auto");
	header3.innerText += "Full Details";
	//Output Card 1
	card1.appendChild(header1);
	card1.appendChild(p1);
	td1.appendChild(card1);
	tr.appendChild(td1);
	//Output Card 3
	card3.appendChild(header3);
	card3.appendChild(p3);
	td3.appendChild(card3);
	tr.appendChild(td3);
	//Output Card 2
	card2.appendChild(header2);
	card2.appendChild(p2);
	td2.appendChild(card2);
	tr.appendChild(td2);

	return tr;
}

function timeFormater(time){
	if(time == "Permanent Valid" || time == "Not Established yet"){
		return time;
	}
	else{
		return time.day + "/" + time.month + "/" + time.year + " (d/m/y)";
	}
}

function pagination(count,id){
	clearPagination();
    let paginationContainers = document.querySelectorAll(".pagination");

    let notamTotalElement = document.getElementById("notamTotal");
    notamTotalElement.innerText = count-1 + " Notams";

    for(i=1; i <= totalPages; i++){
        for (let paginationContainer of paginationContainers) {

            let pageItem = document.createElement("li");
            let pageLink = document.createElement("a");

            pageLink.addEventListener("click", pageEvent); 
            
            pageItem.classList.add("page-item");
            
            pageLink.classList.add("page-link");
            pageLink.setAttribute("href", "");
            pageLink.setAttribute("id", i);
            pageLink.innerText += i;
            
            pageItem.appendChild(pageLink);
            
            paginationContainer.appendChild(pageItem);
        }
    }
    for (let paginationContainer of paginationContainers) {
        paginationContainer.childNodes[id].classList.add("active");
    }
}

function pageEvent(x){
	x.preventDefault();
	let id = x.currentTarget.id;
	clearTable();
	topicArray = [];
	if(arrayToggle){
		decodeNotams(globalArray, ((id*10)-10), id, globalSorted);
	}else{
		decodeNotams(newArray, ((id*10)-10), id, globalSorted);
	}
}

function clearTable(){
	while(document.getElementById("output").childElementCount > 0){
		document.getElementById("output").childNodes[0].remove();
	}
}
function clearPagination(){
	for (let paginationContainer of document.getElementsByClassName("pagination")) {
		while(paginationContainer.childElementCount > 0){
			paginationContainer.childNodes[1].remove();
		}
    }
}

function textCounter(text){
	if(text == null){
		return "Check Notam Raw below!";
	}
	if(text.length > 50){
		return text.slice(0, 50) + "...";
	}else{
		return text
	}
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

function sortTable(x){
	var id = x.currentTarget.id;
	globalSorted = false;
	getNotamData(document.getElementById("icao").value, function(array){
		sorting(globalArray, id);
	})
}

function sorting(input, id){
	if(id == "Start"){
		sortedArray = input.sort(function(a, b){
			let tempA = a.start.rawTime;
			let tempB = b.start.rawTime;
			return tempA - tempB;
		});
	}
	if(id =="End"){
		sortedArray = input.sort(function(a, b){
			let tempA = a.end.rawTime;
			let tempB = b.end.rawTime;
			if(typeof tempA === "undefined"){
				tempA = 2000000000;
			}
			if(typeof tempB === "undefined"){
				tempB = 2000000000;
			}
			return tempA - tempB;
		});
	}
	if(id =="Suffix"){
		sortedArray = input.sort(function(a, b){
			return a.suffix.localeCompare(b.suffix) * -1;
		});
	}
	if(id =="Number"){
		sortedArray = input.sort(function(a, b){
			let resA1 = a.number.split("/");
			let resB1 = b.number.split("/");

			if(resA1[0] == resB1[0]){
				return parseInt(resA1[1]) - parseInt(resB1[1]);
			}else{
				return parseInt(resA1[0]) - parseInt(resB1[0]);
			}
		});
	}
	if(id =="Object"){
		sortedArray = input.sort(function(a, b){
			let resA1 = a.qcode.object;
			let resB1 = b.qcode.object;
			return ('' + resA1).localeCompare(resB1);
		});
	}
	clearTable();
	decodeNotams(sortedArray.reverse());
}

function getNotamData(icao, callback){
	var notams = new XMLHttpRequest();
	notams.open("GET", "https://superananas.de/runways/retrieveNotam.php?icao=" + icao ,true);
	notams.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	notams.onreadystatechange = function () {
		if (notams.readyState != 4 ) {
			return;
		}
		console.log(notams.responseText);
		if(notams.status != 400){
			callback(JSON.parse(notams.responseText));
			return;
		}
		callback(notams.status);
	}
    notams.send(); 
}

function topicColors(){
	let colorArray = ["text-primary", "text-success", "text-danger", "text-warning", "text-info"];
	let newColor = colorArray[Math.floor(Math.random()*colorArray.length)];
	
	if(activeColor == newColor){
		newColor = colorArray[Math.floor(Math.random()*colorArray.length)];
		activeColor = newColor;
	}else{
		activeColor = newColor;
	}
	return activeColor;
}

function addInfoButtons(array){
	let mainDiv = document.createElement("div");
	let divR = document.createElement("div");
	let divL = document.createElement("div");
	
	let button1 = document.createElement("button");
	let button2 = document.createElement("button");
	let button3 = document.createElement("button");
	let button4 = document.createElement("button");
	
	mainDiv.classList.add("row");
	mainDiv.setAttribute("style", "width:8em;");

	divR.classList.add("btn-group-vertical");
	divR.setAttribute("role", "group");
	divL.classList.add("btn-group-vertical");
	divL.setAttribute("role", "group");
	
	button1.setAttribute("type", "button");
	button1.setAttribute("disabled", "");
	button1.classList.add("btn");
	button1.classList.add("btn-sm");

	button2.setAttribute("type", "button");
	button2.setAttribute("disabled", "");
	button2.classList.add("btn");
	button2.classList.add("btn-sm");

	button3.setAttribute("type", "button");
	button3.setAttribute("disabled", "");
	button3.classList.add("btn");
	button3.classList.add("btn-sm");

	button4.setAttribute("type", "button");
	button4.setAttribute("disabled", "");
	button4.classList.add("btn");
	button4.classList.add("btn-sm");

	button1.setAttribute("data-toggle", "tooltip");
	button1.setAttribute("data-placement", "top");

	button2.setAttribute("data-toggle", "tooltip");
	button2.setAttribute("data-placement", "top");

	button3.setAttribute("data-toggle", "tooltip");
	button3.setAttribute("data-placement", "top");

	button4.setAttribute("data-toggle", "tooltip");
	button4.setAttribute("data-placement", "top");
	

	var res = array.codes.split("/");
	
	//SCOPE
	if(res[0] == "I"){
		button1.classList.add("btn-danger");
		button1.innerText += "IFR";
		button1.setAttribute("title", "Instrument Flight Rules");
	}else if(res[0] == "V"){
		button1.classList.add("btn-success");
		button1.innerText += "VFR";
		button1.setAttribute("title", "Visual Flight Rules");
	}else if(res[0] == "IV"){
		button1.classList.add("btn-danger");
		button1.innerText += "IFR";
		button2.classList.add("btn-success");
		button2.innerText += "VFR";
		button1.setAttribute("title", "Instrument Flight Rules");
		button2.setAttribute("title", "Visual Flight Rules");
		divL.appendChild(button2);
	}else{
		button1.classList.add("btn-danger");
		button1.innerText += "K";
		button1.setAttribute("title", "For the NOTAM Checklist");
	}

	//WHERE
	if(res[1] == "A"){
		button3.classList.add("btn-primary");
		button3.innerText += "A";
		button3.setAttribute("data-html", "true");
		button3.setAttribute("title", "Aerodrome");
	}
	else if(res[1] == "E"){
		button3.classList.add("btn-primary");
		button3.innerText += "E";
		button3.setAttribute("data-html", "true");
		button3.setAttribute("title", "En-route information");
	}
	else{
		button3.classList.add("btn-primary");
		button3.innerText += "W";
		button3.setAttribute("data-html", "true");
		button3.setAttribute("title", "Navigational warnings");
	}

	//Purpose
	button4.classList.add("btn-secondary");
	button4.innerText += res[2];
	button4.setAttribute("data-html", "true");
	button4.setAttribute("title", purposeCombine(array.purpose));


	divL.appendChild(button1);
	divR.appendChild(button3);
	divR.appendChild(button4);

	mainDiv.appendChild(divL);
	mainDiv.appendChild(divR);

	return mainDiv;
}

function purposeCombine(input){
	let temp = "";
	for (let i = 0; i < input.length; i++) {
		temp += input[i];
	}
	return temp;
}