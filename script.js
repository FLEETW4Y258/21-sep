// 1. Nuestra lista de escenas.
const escenas = [
  {
    mensaje: "\n \n WENAS WENAAAS!",
    gif: "saludo.gif"
  },
  {
    mensaje: "\n \n Pos weno ya sabes que día es hoy, \nel día de \"🌻las Flores amarillas🌻\" ",
    gif: "hablando 2.gif"
  },
  {
    mensaje: "\n \n Así que Eunice\n",
    gif: "hablando.gif"
  },
  {
    mensaje: "\n \n A pesar de la distancia.., quería hacerte un pequeño regalo. \nespero que te guste! 🌻",
    gif: "timido.gif"
  }
];

// Nuestro contador que empieza en la escena 0
let pasoActual = 0; 
let intervalTyping; 

// 2. Función para escribir letra por letra
// Función para escribir letra por letra (AHORA CON AUDIO)
function iniciarEscritura(textoCompleto, elementoTexto) {
  if (intervalTyping) clearInterval(intervalTyping);
  elementoTexto.textContent = ""; 
  let indice = 0; 

  // --- NUEVO: Seleccionamos el audio y lo reproducimos ---
  const sonido = document.getElementById('sonido-tecleo');
  sonido.currentTime = 0; // Regresamos el audio al inicio
  // Intentamos reproducirlo (los navegadores a veces bloquean el audio sin un clic previo)
  sonido.play().catch(error => console.log("Esperando clic del usuario para reproducir audio"));

  intervalTyping = setInterval(() => {
    if (indice < textoCompleto.length) {
      elementoTexto.textContent += textoCompleto.charAt(indice);
      indice++;
    } else {
      // Cuando termina de escribir:
      clearInterval(intervalTyping);
      intervalTyping = null; 
      
      // --- NUEVO: Pausamos el audio al terminar ---
      sonido.pause();
    }
  }, 100); // 100 es la velocidad, ajústala si tu audio suena raro con el texto
}

// 3. Ejecutar al cargar la página
window.addEventListener('load', () => {
  const elementoTexto = document.getElementById('texto-animado');
  const elementoGif = document.querySelector('.gif-intro'); 
  const pantalla = document.querySelector('.pantalla-intro'); 

  let primeraVez = true; // Creamos un interruptor para saber si es el primer clic

  // AL CARGAR LA PÁGINA: No iniciamos la animación. Solo ponemos un texto fijo.
  elementoTexto.textContent = "Haz clic en cualquier parte para empezar...";
  elementoGif.src = escenas[0].gif; // Mostramos el primer GIF en silencio

  // Escuchamos el clic
  pantalla.addEventListener('click', () => {
    
    if (primeraVez) {
      // --- NUEVO: Arrancamos la música de fondo ---
      const musica = document.getElementById('musica-fondo');
      musica.volume = 0.4; // 0.4 es el 40% de volumen. Cámbialo si suena muy fuerte o muy bajo.
      musica.play();

      // Arrancamos la primera escena (el tecleo sonará automático)
      iniciarEscritura(escenas[pasoActual].mensaje, elementoTexto);
      primeraVez = false; 
    } 
    else {
      pasoActual++; 

      if (pasoActual < escenas.length) {
        elementoGif.src = escenas[pasoActual].gif;
        iniciarEscritura(escenas[pasoActual].mensaje, elementoTexto);
      } else {
        console.log("¡Terminaron los mensajes! En el siguiente paso quitaremos esta pantalla.");
      }
    }
  });
});