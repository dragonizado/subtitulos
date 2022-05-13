var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
let visor = document.querySelector('#visor')
let btnListen = document.querySelector('#escuchar')
let btnNoListen = document.querySelector('#no-escuchar')
let btnClear = document.querySelector('#limpiar-texto')
let msgBox = document.querySelector('#mensajes')

if ('serviceWorker' in navigator) {
  navigator
    .serviceWorker
    .register(
      './sw.js'
    )
    .then(function (reg) {
      console.log('App instalada correctamente');
    });
}

var rec = new SpeechRecognition();
rec.lang = "es-CO";
rec.continuous = true;
rec.interim = true;
rec.addEventListener("result", start)

rec.addEventListener('audiostart',function(){
  msgBox.classList.remove('hidden')
})

rec.addEventListener('audioend',function(){
  msgBox.classList.add('hidden')
})

btnListen.onclick = function() {
  rec.start()
}

btnNoListen.onclick = function() {
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