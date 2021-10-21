import { SPEECH_MATERIALS } from "./constants";

function initRecognition(callback) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;

  const grammar =
    "#JSGF V1.0; grammar materials; public <material> = " +
    SPEECH_MATERIALS.map((element) => "'" + element + "'").join(" | ") +
    " ;";

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onspeechend = function () {
    recognition.stop();
    console.log("[recognition] Stopped speech recognition");
  };

  recognition.onerror = function (event) {
    console.error(`[recognition] Received error ${event.error}, ending speech recognition`);
  };

  recognition.onend = function() {
    recognition.start();
    console.log("[recognition] Started speech recognition again");
  }

  recognition.start();
  callback(recognition);
  console.log("[recognition] Started speech recognition");
}

export { initRecognition };
