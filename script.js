// 1. Nuestra lista de escenas (Pantalla Negra)
const escenas = [
  { mensaje: "\n \n WENAS WENAAAS!", gif: "saludo.gif" },
  { mensaje: "\n \n Pos weno ya sabes que día es hoy, \nel día de \"🌻las Flores amarillas🌻\" \nXDXDXDDDDDD ", gif: "hablando 2.gif" },
  { mensaje: "\n \n Así que mi querida Eunice \nquise hacer esto para ti", gif: "hablando.gif" },
  { mensaje: "\n \n A pesar de la distancia.., quería hacerte un pequeño regalo. \nespero que te guste! 🌻", gif: "timido.gif" }
];

let pasoActual = 0;
let primerClicHecho = false;
let intervalTyping; 

function iniciarEscritura(textoCompleto, elementoTexto) {
  if (intervalTyping) clearInterval(intervalTyping);
  elementoTexto.textContent = ""; 
  let indice = 0; 
  const sonido = document.getElementById('sonido-tecleo');
  
  if (sonido) {
    sonido.currentTime = 0; 
    sonido.play().catch(() => {});
  }

  intervalTyping = setInterval(() => {
    if (indice < textoCompleto.length) {
      elementoTexto.textContent += textoCompleto.charAt(indice);
      indice++;
    } else {
      clearInterval(intervalTyping);
      intervalTyping = null; 
      if (sonido) sonido.pause();
    }
  }, 40); 
}

window.addEventListener('load', () => {
  const elementoTexto = document.getElementById('texto-animado');
  const elementoGif = document.querySelector('.gif-intro'); 
  const pantalla = document.getElementById('pantalla-intro') || document.querySelector('.pantalla-intro'); 

  if (elementoTexto) elementoTexto.textContent = "Haz clic en cualquier parte para empezar...";
  if (elementoGif) elementoGif.src = escenas[0].gif; 

  if (pantalla) {
    pantalla.addEventListener('click', () => {
      if (primerClicHecho === false) {
        primerClicHecho = true; 
        const musicaFondo = document.getElementById('musica-fondo');
        if (musicaFondo) musicaFondo.play().catch(() => {});
        
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

  // ==========================================
  // ESCENARIO 2: TUS 4 CARTAS CON SUS 12 GIFS
  // ==========================================
  const datosCartas = [
    { 
      fondo: 'carta2.png', 
      texto: 'Me encantaría poder entregarte un gran ramo\n de flores amarillas en persona \n(créeme que lo haría sin dudarlo),\n pero ya que no es posible, \ntuve que ponerme creativo. \nPreparé este pequeño detalle especialmente para ti,\n para no dejar pasar este día en blanco.',
      clase: 'mover-derecha',
      gifs: ['surprised-brawl-stars.gif', 'legend-of-zelda-zelda.gif', 'deltarune-deltarune-ch5.gif']
    },
    { 
      fondo: 'carta4.png', 
      texto: 'Dicen que regalar flores amarillas hoy\nes una promesa de querer ver siempre feliz\na esa persona especial.\n\nQuería asegurarme de que tú también\ntuvieras las tuyas.', 
      clase: 'mover-arriba',
      gifs: ['yellow-and-blue-yellow-deltarune.gif', 'shiideraii.gif', 'cute-eeveelution-moment.gif']
    },
    { 
      fondo: 'carta3.png', 
      texto: 'Desde que te conocí, te has convertido\nen una parte fundamental de mi vida.\n\nTe aprecio muchísimo, tanto que hoy más que nunca\nquisiera tener la magia de teletransportarme\npara estar ahí y poder acompañarte.', 
      clase: 'mover-arriba',
      gifs: ['doom-doom-guy.gif', 'amy-rose.gif', 'brawl-stars-lily-and-cordelius.gif']
    },
    { 
      fondo: 'carta1.png', 
      texto: 'Espero que este regalo, aunque sea a la distancia,\nlogre acortar un poquito los kilómetros y te recuerde\nlo mucho que me importas.\n\nDisfruta mucho tu día y nunca olvides\nlo especial y brillante que eres.', 
      clase: 'mover-arriba',
      gifs: ['rewrite-amy-rewrite-sonic.gif', 'amy-gives-metal-a-flower-flower.gif', 'among-us-among-us-show.gif']
    }
  ];

  let indiceCarta = 0;
  let intervalTypingCartas; 
  
  const botonFlores = document.getElementById('boton-flores');
  const pantallaVideo = document.querySelector('.pantalla-video');
  const divCarta = document.getElementById('carta-actual');
  const textoCarta = document.getElementById('texto-carta');
  const btnSiguiente = document.getElementById('btn-siguiente-carta');
  const btnAnterior = document.getElementById('btn-anterior-carta');
  const imgFondo = document.getElementById('img-fondo-carta');

  // Elementos de los 3 GIFs decorativos
  const gifDecor1 = document.getElementById('gif-decor-1');
  const gifDecor2 = document.getElementById('gif-decor-2');
  const gifDecor3 = document.getElementById('gif-decor-3');

  // Elementos del gran final
  const btnPorUltimo = document.getElementById('btn-por-ultimo');
  const videoFinal = document.getElementById('video-final');

  function actualizarGifs(indice) {
    if (datosCartas[indice] && datosCartas[indice].gifs) {
      if (gifDecor1) gifDecor1.src = datosCartas[indice].gifs[0];
      if (gifDecor2) gifDecor2.src = datosCartas[indice].gifs[1];
      if (gifDecor3) gifDecor3.src = datosCartas[indice].gifs[2];
    }
  }

  if (imgFondo) {
    imgFondo.onerror = () => {
      alert(`⚠️ ERROR: No encuentro la imagen "${imgFondo.getAttribute('src')}". Revisa las mayúsculas o la extensión (.jpg/.png) en tu carpeta.`);
    };
  }

  function escribirCarta(textoCompleto, elemento) {
    if (intervalTypingCartas) clearInterval(intervalTypingCartas);
    elemento.textContent = ""; 
    let i = 0;
    intervalTypingCartas = setInterval(() => {
      if (i < textoCompleto.length) {
        elemento.textContent += textoCompleto.charAt(i);
        i++;
      } else {
        clearInterval(intervalTypingCartas);
        intervalTypingCartas = null;

        // 🌟 Al terminar de escribirse la carta 4, aparece el botón "Por último"
        if (indiceCarta === datosCartas.length - 1) {
          if (btnPorUltimo) btnPorUltimo.style.display = 'block';
        }
      }
    }, 40); 
  }

  function cambiarCarta(nuevoIndice) {
    if (divCarta) divCarta.style.opacity = '0'; 
    if (intervalTypingCartas) clearInterval(intervalTypingCartas); 
    
    // Ocultar botón si retrocede
    if (btnPorUltimo) btnPorUltimo.style.display = 'none';

    setTimeout(() => {
      indiceCarta = nuevoIndice;
      if (imgFondo) imgFondo.src = datosCartas[indiceCarta].fondo;
      if (textoCarta) textoCarta.className = datosCartas[indiceCarta].clase;
      
      actualizarGifs(indiceCarta);

      if (divCarta) divCarta.style.opacity = '1'; 
      if (textoCarta) escribirCarta(datosCartas[indiceCarta].texto, textoCarta);
      
      if (btnAnterior) btnAnterior.style.display = (indiceCarta === 0) ? 'none' : 'flex';
      if (btnSiguiente) btnSiguiente.style.display = (indiceCarta === datosCartas.length - 1) ? 'none' : 'flex';
    }, 1000); 
  }

  if (botonFlores) {
    botonFlores.addEventListener('click', (evento) => {
      evento.stopPropagation(); 
      const pantallaIntro = document.getElementById('pantalla-intro');
      if (pantallaIntro) pantallaIntro.style.display = 'none'; 
      
      if (pantallaVideo) pantallaVideo.style.display = 'block'; 

      const musicaIntro = document.getElementById('musica-fondo');
      const musicaCartas = document.getElementById('musica-cartas');
      if(musicaIntro) musicaIntro.pause();           
      if(musicaCartas) {
        musicaCartas.volume = 0.5;     
        musicaCartas.play().catch(() => {});           
      }

      setTimeout(() => {
        if (imgFondo) imgFondo.src = datosCartas[0].fondo;
        if (textoCarta) textoCarta.className = datosCartas[0].clase;
        
        actualizarGifs(0);

        if (divCarta) divCarta.style.opacity = '1';
        if (btnAnterior) btnAnterior.style.display = 'none';
        
        if (textoCarta) escribirCarta(datosCartas[0].texto, textoCarta);
      }, 100); 
    });
  }

  if (btnSiguiente) {
    btnSiguiente.addEventListener('click', () => {
      if (indiceCarta < datosCartas.length - 1) cambiarCarta(indiceCarta + 1);
    });
  }

  if (btnAnterior) {
    btnAnterior.addEventListener('click', () => {
      if (indiceCarta > 0) cambiarCarta(indiceCarta - 1);
    });
  }

  // ==========================================
  // 🎬 CLIC EN "POR ÚLTIMO": EL GRAN FINAL
  // ==========================================
  const btnVolverCartas = document.getElementById('btn-volver-cartas');

  if (btnPorUltimo) {
    btnPorUltimo.addEventListener('click', () => {
      // 1. Pausa la música de las cartas
      const musicaCartas = document.getElementById('musica-cartas');
      if (musicaCartas) musicaCartas.pause();

      // 2. Oculta la carta (incluyendo los 3 GIFs) y los botones
      if (divCarta) divCarta.style.display = 'none';
      if (btnAnterior) btnAnterior.style.display = 'none';
      if (btnSiguiente) btnSiguiente.style.display = 'none';
      btnPorUltimo.style.display = 'none';

      // 3. Muestra el video final y el botón de volver
      if (videoFinal) {
        videoFinal.style.display = 'block';
        videoFinal.play().catch(() => console.log("Se requiere interacción para reproducir el video"));
      }
      if (btnVolverCartas) {
        btnVolverCartas.style.display = 'block';
      }
    });
  }

  // ==========================================
  // 🔙 CLIC EN "VOLVER": REGRESA A LAS CARTAS
  // ==========================================
  if (btnVolverCartas) {
    btnVolverCartas.addEventListener('click', () => {
      // 1. Pausa y oculta el video
      if (videoFinal) {
        videoFinal.pause();
        videoFinal.style.display = 'none';
      }
      
      // 2. Oculta el botón de volver
      btnVolverCartas.style.display = 'none';

      // 3. Reaparece la carta 4 y sus botones correspondientes
      if (divCarta) divCarta.style.display = ''; // Le quita el "none" para que CSS lo acomode normal
      if (btnAnterior) btnAnterior.style.display = 'flex'; // Vuelve la flecha de la izquierda
      if (btnPorUltimo) btnPorUltimo.style.display = 'block'; // Vuelve a salir el botón "Por último"

      // 4. Reanuda la música de las cartas
      const musicaCartas = document.getElementById('musica-cartas');
      if (musicaCartas) musicaCartas.play().catch(() => {});
    });
  }
});