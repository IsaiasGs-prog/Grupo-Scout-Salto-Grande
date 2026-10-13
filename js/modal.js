/* ============================================================
   MODAL — Álbum de fotos del evento + Lightbox con zoom
   ============================================================ */

const modalOverlay     = document.getElementById('modalOverlay');
const modalClose       = document.getElementById('modalClose');
const modalTitulo      = document.getElementById('modalTitulo');
const modalFecha       = document.getElementById('modalFecha');
const modalGaleria     = document.getElementById('modalGaleria');
const modalDescripcion = document.getElementById('modalDescripcion');

// --- Estado del lightbox ---
let fotosActuales = [];       // array de fotos del álbum abierto
let indiceLightbox = 0;       // índice de la foto ampliada

/* ============================================================
   1. ABRIR MODAL DEL ÁLBUM
   ============================================================ */
function abrirModal(rama, index) {
  const evento = datosRamas[rama]?.eventos[index];
  if (!evento) return;

  modalTitulo.textContent = evento.nombre;
  modalFecha.textContent  = evento.fecha;

  // Guardamos las fotos para que el lightbox las use
  fotosActuales = evento.fotos;

  // Render de la galería (cada foto con data-index para el lightbox)
  modalGaleria.innerHTML = evento.fotos
    .map((foto, i) => `
      <div class="foto" data-index="${i}" title="Ampliar: ${foto.alt}">
        <img src="${foto.src}" alt="${foto.alt}" loading="lazy">
        <div class="foto__zoom-icon">
          <i class="fas fa-expand"></i>
        </div>
      </div>
    `)
    .join('');

  // Click en cada foto → abrir lightbox
  modalGaleria.querySelectorAll('.foto').forEach(el => {
    el.addEventListener('click', () => {
      const i = parseInt(el.dataset.index, 10);
      abrirLightbox(i);
    });
  });

  // Descripción
  modalDescripcion.innerHTML = `
    <p><strong>📍 Lugar:</strong> ${evento.lugar}</p>
    <p>${evento.descripcion}</p>
  `;

  modalOverlay.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

/* ============================================================
   2. CERRAR MODAL DEL ÁLBUM
   ============================================================ */
function cerrarModal() {
  modalOverlay.classList.remove('activo');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', cerrarModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) cerrarModal();
});

/* ============================================================
   3. LIGHTBOX — Zoom de foto individual (estilo Instagram)
   ============================================================ */

// Creamos el lightbox una sola vez y lo reutilizamos
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <button class="lightbox__close" aria-label="Cerrar">&times;</button>
  <button class="lightbox__nav lightbox__nav--prev" aria-label="Anterior">
    <i class="fas fa-chevron-left"></i>
  </button>
  <button class="lightbox__nav lightbox__nav--next" aria-label="Siguiente">
    <i class="fas fa-chevron-right"></i>
  </button>
  <div class="lightbox__contador"></div>
  <figure class="lightbox__figura">
    <img class="lightbox__img" src="" alt="">
    <figcaption class="lightbox__caption"></figcaption>
  </figure>
`;
document.body.appendChild(lightbox);

const lightboxImg      = lightbox.querySelector('.lightbox__img');
const lightboxCaption  = lightbox.querySelector('.lightbox__caption');
const lightboxContador = lightbox.querySelector('.lightbox__contador');
const lightboxClose    = lightbox.querySelector('.lightbox__close');
const lightboxPrev     = lightbox.querySelector('.lightbox__nav--prev');
const lightboxNext     = lightbox.querySelector('.lightbox__nav--next');

/**
 * Abre el lightbox con la foto en la posición `index`.
 */
function abrirLightbox(index) {
  indiceLightbox = index;
  mostrarFotoLightbox();
  lightbox.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

/**
 * Cierra el lightbox (no cierra el modal de fondo).
 */
function cerrarLightbox() {
  lightbox.classList.remove('activo');
  // Mantenemos el scroll bloqueado porque el modal sigue abierto
  document.body.style.overflow = 'hidden';
}

/**
 * Muestra la foto actual en el lightbox.
 */
function mostrarFotoLightbox() {
  const foto = fotosActuales[indiceLightbox];
  if (!foto) return;

  lightboxImg.src = foto.src;
  lightboxImg.alt = foto.alt;
  lightboxCaption.textContent = foto.alt || '';
  lightboxContador.textContent = `${indiceLightbox + 1} / ${fotosActuales.length}`;

  // Ocultamos las flechas si hay una sola foto
  const mostrarNav = fotosActuales.length > 1;
  lightboxPrev.style.display = mostrarNav ? 'flex' : 'none';
  lightboxNext.style.display = mostrarNav ? 'flex' : 'none';

  // Reiniciamos la animación
  lightboxImg.style.animation = 'none';
  void lightboxImg.offsetWidth; // reflow
  lightboxImg.style.animation = '';
}

function lightboxSiguiente() {
  indiceLightbox = (indiceLightbox + 1) % fotosActuales.length;
  mostrarFotoLightbox();
}

function lightboxAnterior() {
  indiceLightbox = (indiceLightbox - 1 + fotosActuales.length) % fotosActuales.length;
  mostrarFotoLightbox();
}

// --- Eventos del lightbox ---
lightboxClose.addEventListener('click', cerrarLightbox);
lightboxNext.addEventListener('click', lightboxSiguiente);
lightboxPrev.addEventListener('click', lightboxAnterior);

// Click fuera de la imagen → cerrar
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target.classList.contains('lightbox__figura')) {
    cerrarLightbox();
  }
});

/* ============================================================
   4. TECLADO — Manejo global (ESC, ←, →)
   ============================================================ */
document.addEventListener('keydown', e => {
  // Si el lightbox está abierto, priorizamos sus controles
  if (lightbox.classList.contains('activo')) {
    if (e.key === 'Escape')     cerrarLightbox();
    if (e.key === 'ArrowRight') lightboxSiguiente();
    if (e.key === 'ArrowLeft')  lightboxAnterior();
    return;
  }

  // Si sólo el modal del álbum está abierto, ESC lo cierra
  if (e.key === 'Escape' && modalOverlay.classList.contains('activo')) {
    cerrarModal();
  }
});