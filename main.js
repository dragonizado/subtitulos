var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
let visor = document.querySelector('#visor')
let btnListen = document.querySelector('#escuchar')
let btnNoListen = document.querySelector('#no-escuchar')
let btnClear = document.querySelector('#limpiar-texto')
let msgBox = document.querySelector('#mensajes')
let okBox = msgBox.querySelector('#ok')
let errorBox = msgBox.querySelector('#error')


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
  okBox.classList.remove('hidden')
  errorBox.classList.add('hidden')
})

rec.addEventListener('audioend',function(){
  okBox.classList.add('hidden')
  errorBox.classList.add('hidden')
})

rec.addEventListener('error',function(){
  okBox.classList.add('hidden')
  errorBox.classList.remove('hidden')
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
  let finalText = ''

  for (let index = event.resultIndex; index < event.results.length; index++) {
    finalText += `<p>${event.results[index][0].transcript}</p>`;
  }

  visor.innerHTML = finalText
  visor.scrollTop = visor.scrollHeight;
}