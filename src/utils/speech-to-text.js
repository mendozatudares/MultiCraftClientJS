import { MATERIALS } from "./constants";

function initRecognition(callback) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;

  const grammar =
    "#JSGF V1.0; grammar materials; public <material> = " +
    MATERIALS.map((element) => "'" + element + "'").join(" | ") +
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
    console.error(`[recognition] ERROR: ${event.error}`);
  };

  recognition.start();
  callback(recognition);
  console.log("[recognition] Started speech recognition");
}

export { initRecognition };
