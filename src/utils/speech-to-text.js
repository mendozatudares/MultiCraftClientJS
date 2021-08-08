import MATERIALS from "./constants.js";

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var grammar = '#JSGF V1.0; grammar materials; public <material> = ' + MATERIALS.map(element => { return /\s/g.test(element) ? '"' + element + '"' : element }).join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var speechDiagnostic = document.getElementById('speech-output');

recognition.start();

recognition.onresult = function (event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var result = event.results[0][0].transcript;
  speechDiagnostic.textContent = result;
  var args = processInstruction(result);
  console.log(args);
}

recognition.onspeechend = function () {
  recognition.stop();
}

recognition.onerror = function (event) {
  speechDiagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  console.log(event);
}

window.onload = function () {
  window.onkeydown = function (key) {
    if (key.keyCode === 188 /* comma */) {
      recognition.start();
    }
  }
}
