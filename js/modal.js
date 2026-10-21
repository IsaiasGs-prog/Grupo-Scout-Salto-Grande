const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitulo = document.getElementById('modalTitulo');
const modalFecha = document.getElementById('modalFecha');
const modalGaleria = document.getElementById('modalGaleria');
const modalDescripcion = document.getElementById('modalDescripcion');

let fotosActuales = [];
let indiceLightbox = 0;

function abrirModal(rama, index) {
  const evento = datosRamas[rama]?.eventos[index];
  if (!evento) return;

  modalTitulo.textContent = evento.nombre;
  modalFecha.textContent = evento.fecha;

  fotosActuales = evento.fotos;

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

  modalGaleria.querySelectorAll('.foto').forEach(el => {
    el.addEventListener('click', () => {
      const i = parseInt(el.dataset.index, 10);
      abrirLightbox(i);
    });
  });

  modalDescripcion.innerHTML = `
    <p><strong>📍 Lugar:</strong> ${evento.lugar}</p>
    <p>${evento.descripcion}</p>
  `;

  modalOverlay.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  modalOverlay.classList.remove('activo');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', cerrarModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) cerrarModal();
});

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

const lightboxImg = lightbox.querySelector('.lightbox__img');
const lightboxCaption = lightbox.querySelector('.lightbox__caption');
const lightboxContador = lightbox.querySelector('.lightbox__contador');
const lightboxClose = lightbox.querySelector('.lightbox__close');
const lightboxPrev = lightbox.querySelector('.lightbox__nav--prev');
const lightboxNext = lightbox.querySelector('.lightbox__nav--next');

function abrirLightbox(index) {
  indiceLightbox = index;
  mostrarFotoLightbox();
  lightbox.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

function cerrarLightbox() {
  lightbox.classList.remove('activo');
  document.body.style.overflow = 'hidden';
}

function mostrarFotoLightbox() {
  const foto = fotosActuales[indiceLightbox];
  if (!foto) return;

  lightboxImg.src = foto.src;
  lightboxImg.alt = foto.alt;
  lightboxCaption.textContent = foto.alt || '';
  lightboxContador.textContent = `${indiceLightbox + 1} / ${fotosActuales.length}`;

  const mostrarNav = fotosActuales.length > 1;
  lightboxPrev.style.display = mostrarNav ? 'flex' : 'none';
  lightboxNext.style.display = mostrarNav ? 'flex' : 'none';

  lightboxImg.style.animation = 'none';
  void lightboxImg.offsetWidth;
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

lightboxClose.addEventListener('click', cerrarLightbox);
lightboxNext.addEventListener('click', lightboxSiguiente);
lightboxPrev.addEventListener('click', lightboxAnterior);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target.classList.contains('lightbox__figura')) {
    cerrarLightbox();
  }
});

document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('activo')) {
    if (e.key === 'Escape') cerrarLightbox();
    if (e.key === 'ArrowRight') lightboxSiguiente();
    if (e.key === 'ArrowLeft') lightboxAnterior();
    return;
  }
  if (e.key === 'Escape' && modalOverlay.classList.contains('activo')) {
    cerrarModal();
  }
});