// 1. Nuestra lista de escenas (Pantalla Negra)
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
    mensaje: "\n \n Así que -------\n",
    gif: "hablando.gif"
  },
  {
    mensaje: "\n \n A pesar de la distancia.., quería hacerte un pequeño regalo. \nespero que te guste! 🌻",
    gif: "timido.gif"
  }
];

let pasoActual = 0;
let primerClicHecho = false;
let intervalTyping; 

// 2. Función para escribir letra por letra
function iniciarEscritura(textoCompleto, elementoTexto) {
  if (intervalTyping) clearInterval(intervalTyping);
  elementoTexto.textContent = ""; 
  let indice = 0; 

  const sonido = document.getElementById('sonido-tecleo');
  
  // ESCUDO: Solo intentamos mover el audio si realmente existe en el HTML
  if (sonido) {
    sonido.currentTime = 0; 
    sonido.play().catch(error => console.log("Esperando clic para audio"));
  }

  intervalTyping = setInterval(() => {
    if (indice < textoCompleto.length) {
      elementoTexto.textContent += textoCompleto.charAt(indice);
      indice++;
    } else {
      clearInterval(intervalTyping);
      intervalTyping = null; 
      if (sonido) sonido.pause(); // ESCUDO: pausamos solo si existe
    }
  }, 50); // Velocidad a 50 para que sea más fluido
}

// 3. Ejecutar al cargar la página
window.addEventListener('load', () => {
  const elementoTexto = document.getElementById('texto-animado');
  const elementoGif = document.querySelector('.gif-intro'); 
  
  // ESCUDO MÁXIMO: Buscamos la pantalla por ID, y si no, por clase. Así no falla.
  const pantalla = document.getElementById('pantalla-intro') || document.querySelector('.pantalla-intro') || document.getElementById('pantalla'); 

  // Texto fijo inicial
  if (elementoTexto) elementoTexto.textContent = "Haz clic en cualquier parte para empezar...";
  if (elementoGif) elementoGif.src = escenas[0].gif; 

  // Lógica de los clics principales (Escenario 1)
  if (pantalla) {
    pantalla.addEventListener('click', () => {
      
      if (primerClicHecho === false) {
        primerClicHecho = true; 
        
        const musicaFondo = document.getElementById('musica-fondo');
        if (musicaFondo) musicaFondo.play().catch(e => console.log("Audio de fondo bloqueado"));
        
        if (elementoGif) {
          elementoGif.style.display = 'block';
          elementoGif.src = escenas[pasoActual].gif;
        }
        if (elementoTexto) iniciarEscritura(escenas[pasoActual].mensaje, elementoTexto);
        
        return; 
      }

      pasoActual++; 

      if (pasoActual < escenas.length) {
        if (elementoGif) elementoGif.src = escenas[pasoActual].gif;
        if (elementoTexto) iniciarEscritura(escenas[pasoActual].mensaje, elementoTexto);
        
        if (pasoActual === escenas.length - 1) {
          const boton = document.getElementById('boton-flores');
          if (boton) boton.style.display = 'block';
        }
      }
    });
  }

  // --- LÓGICA DE LAS CARTAS (ESCENARIO 2) ---
  const datosCartas = [
    { fondo: 'carta1.png', texto: 'Este es el texto de tu PRIMERA carta.\nPodemos poner saltos de línea aquí.' },
    { fondo: 'carta2.png', texto: 'Segunda carta...\nFíjate cómo el fondo cambia suavemente.' },
    { fondo: 'carta3.png', texto: 'Tercera carta...\n¡Ya casi terminamos la sorpresa!' },
    { fondo: 'carta4.png', texto: 'Esta es la CUARTA y última carta.\n¡Espero que te haya encantado!' }
  ];

  let indiceCarta = 0;
  const botonFlores = document.getElementById('boton-flores');
  const pantallaVideo = document.querySelector('.pantalla-video');
  const divCarta = document.getElementById('carta-actual');
  const textoCarta = document.getElementById('texto-carta');
  const btnSiguiente = document.getElementById('btn-siguiente-carta');
  const btnAnterior = document.getElementById('btn-anterior-carta'); // Conectamos el botón nuevo

  // FUNCIÓN MAESTRA: Cambia la carta con efecto fantasma
  function cambiarCarta(nuevoIndice) {
    if (divCarta) divCarta.style.opacity = '0'; // 1. Desvanece
    
    setTimeout(() => {
      indiceCarta = nuevoIndice;
      if (divCarta) divCarta.style.backgroundImage = `url('${datosCartas[indiceCarta].fondo}')`;
      if (textoCarta) textoCarta.innerText = datosCartas[indiceCarta].texto;
      if (divCarta) divCarta.style.opacity = '1'; // 2. Vuelve a aparecer
      
      // 3. Lógica para esconder botones si estamos en el límite
      if (btnAnterior) {
        btnAnterior.style.display = (indiceCarta === 0) ? 'none' : 'flex';
      }
      if (btnSiguiente) {
        btnSiguiente.style.display = (indiceCarta === datosCartas.length - 1) ? 'none' : 'flex';
      }
    }, 1000); // 1 segundo en la oscuridad
  }

  // Clic al botón inicial de flores
  if (botonFlores) {
    botonFlores.addEventListener('click', (evento) => {
      evento.stopPropagation(); 
      if (pantalla) pantalla.style.display = 'none'; 
      
      const gifIntro = document.querySelector('.gif-intro');
      if (gifIntro) gifIntro.style.display = 'none';
      
      if (pantallaVideo) pantallaVideo.style.display = 'block'; 

      const musicaIntro = document.getElementById('musica-fondo');
      const musicaCartas = document.getElementById('musica-cartas');
      if(musicaIntro) musicaIntro.pause();           
      if(musicaCartas) {
        musicaCartas.volume = 0.5;     
        musicaCartas.play();           
      }

      if (textoCarta) textoCarta.innerText = datosCartas[0].texto;
      
      // Muestra la primera carta y asegura que el botón "Anterior" esté oculto
      setTimeout(() => {
        if (divCarta) divCarta.style.opacity = '1';
        if (btnAnterior) btnAnterior.style.display = 'none';
      }, 100); 
    });
  }

  // Clic para AVANZAR
  if (btnSiguiente) {
    btnSiguiente.addEventListener('click', () => {
      if (indiceCarta < datosCartas.length - 1) {
        cambiarCarta(indiceCarta + 1);
      }
    });
  }

  // Clic para RETROCEDER
  if (btnAnterior) {
    btnAnterior.addEventListener('click', () => {
      if (indiceCarta > 0) {
        cambiarCarta(indiceCarta - 1);
      }
    });
  }

}); // <-- Llave que cierra todo el archivo (NO BORRAR)