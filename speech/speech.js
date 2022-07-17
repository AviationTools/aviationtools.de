var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var diagnostic = document.querySelector('.output');
var hints = document.querySelector('.hints');

var customGrammerList = ['climb', 'flight', 'level', 'lufthansa', 'contact', 'approach','right', 'left', 'descent'];
var recognition = new SpeechRecognition();

if (SpeechGrammarList) {
  // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
  // This code is provided as a demonstration of possible capability. You may choose not to use it.
  var speechRecognitionList = new SpeechGrammarList();
  var grammar = '#JSGF V1.0; grammar commands; public <commands> = ' + customGrammerList.join(' | ') + ' ;'
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
}
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


document.getElementById("start").addEventListener("click", function(){
    recognition.start();
})

document.getElementById("stop").addEventListener("click", function(){
    recognition.stop();
    diagnostic.textContent = "";
})

recognition.onresult = function(event) {
    result = "";
    for(let element of event.results) {
        result += element[0].transcript + ' ';
    }
    diagnostic.textContent = result;
    console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}