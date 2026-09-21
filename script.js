// 1. Nuestra lista de escenas (Pantalla Negra)
const escenas = [
  {
    mensaje: "\n \n WENAS WENAAAS!",
    gif: "saludo.gif"
  },
  {
    mensaje: "\n \n Pos weno ya sabes que día es hoy, \nel día de \"🌻las Flores amarillas🌻\" \nXDXDXDDDDDD ",
    gif: "hablando 2.gif"
  },
  {
    mensaje: "\n \n Así que mi querida Eunice \nquise hacer esto para ti",
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
    { fondo: 'carta1.png', texto: 'Me encantaría poder entregarte un gran \n ramo de flores amarillas en persona \n(créeme que lo haría sin dudarlo), \npero ya que no es posible,\n tuve que ponerme creativo. \nPreparé este pequeño detalle especialmente \npara ti, para no dejar pasar este día en blanco.' },
    { fondo: 'carta2.png', texto: 'Dicen que regalar flores amarillas hoy \nes una promesa de querer ver siempre feliz \na esa persona especial. Quería asegurarme \nde que tú también tuvieras las tuyas,\n porque tu sonrisa es algo que siempre\n vale la pena cuidar.' },
    { fondo: 'carta3.png', texto: 'Desde que te conocí, te has convertido \nen una parte fundamental de mi vida. \nTe aprecio muchísimo, tanto que hoy más que nunca\n quisiera tener la magia \nde teletransportarme para estar ahí \ny poder acompañarte.' },
    { fondo: 'carta4.png', texto: 'Espero que este regalo, aunque sea a la distancia,\n logre acortar un poquito los kilómetros y te recuerde\n lo mucho que me importas. Disfruta mucho tu día\n y nunca olvides lo especial y brillante que eres.' }
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