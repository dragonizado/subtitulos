var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
let visor = document.querySelector('#visor');
let btnListen = document.querySelector('#escuchar');
let btnNoListen = document.querySelector('#no-escuchar');
let btnClear = document.querySelector('#limpiar-texto');

var rec = new SpeechRecognition();
rec.lang = "es-CO";
rec.continuous = true;
rec.interim = true;
rec.addEventListener("result", start)

btnListen.onclick = function() {
  // btnListen.disabled =  true;
  // btnListen.classList.add('hidden')
  // btnClear.classList.remove('hidden')
  rec.start()
}

btnNoListen.onclick = function() {
  // btnListen.disabled = false
  // btnListen.classList.remove('hidden')
  // btnClear.classList.add('hidden')
  rec.stop()
}

btnClear.onclick = function() {
  visor.innerHTML = '';
}



function start(event){
  for (let index = event.resultIndex; index < event.results.length; index++) {
    visor.innerHTML += `<p>${event.results[index][0].transcript}</p>`;
  }
  visor.scrollTop = visor.scrollHeight;
}