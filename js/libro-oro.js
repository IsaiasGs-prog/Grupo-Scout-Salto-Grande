const muro           = document.getElementById('muro');
const ramaTitulo     = document.getElementById('ramaTitulo');
const ramaDescripcion = document.getElementById('ramaDescripcion');
const botonesRama    = document.querySelectorAll('.rama-btn');

// Descripciones por rama
const descripcionesRama = {
  manada:     'Los más pequeños del grupo, aprendiendo jugando y descubriendo la selva.',
  unidad:     'La patrulla es protagonista. Aventura, especialidades y vida al aire libre.',
  caminantes: 'Travesías, proyectos y desafíos. Se empieza a elegir el propio camino.',
  rovers:     'Servicio, vocación y comunidad. Devolver todo lo aprendido.'
};

/* ------------------------------------------------------------
   Render del muro de álbumes
   ------------------------------------------------------------ */
function renderMuro(rama) {
  const datos = datosRamas[rama];

  // Título dinámico
  ramaTitulo.textContent = datos.nombre;
  ramaDescripcion.textContent = descripcionesRama[rama] || '';

  // Animación de salida
  muro.classList.add('fade-out');

  setTimeout(() => {
    if (!datos.eventos || datos.eventos.length === 0) {
      muro.innerHTML = `
        <div class="muro-vacio">
          <i class="fas fa-campground"></i>
          <p>Todavía no hay recuerdos cargados para esta rama.</p>
        </div>
      `;
    } else {
      muro.innerHTML = datos.eventos.map((evento, i) => {
        const portada = evento.fotos?.[0]?.src || '';
        const cantFotos = evento.fotos?.length || 0;

        return `
          <article class="album-card" data-rama="${rama}" data-index="${i}">
            <div class="album-card__cover">
              <span class="album-card__fecha">${evento.fecha}</span>
              <span class="album-card__badge">
                <i class="fas fa-camera"></i> ${cantFotos}
              </span>
              ${portada ? `<img src="${portada}" alt="${evento.nombre}" loading="lazy">` : ''}
            </div>
            <div class="album-card__body">
              <h3 class="album-card__titulo">${evento.nombre}</h3>
              <p class="album-card__lugar">
                <i class="fas fa-map-marker-alt"></i> ${evento.lugar}
              </p>
              <span class="album-card__cta">
                Ver álbum <i class="fas fa-arrow-right"></i>
              </span>
            </div>
          </article>
        `;
      }).join('');

      // Click en cada tarjeta → abrir modal
      muro.querySelectorAll('.album-card').forEach(card => {
        card.addEventListener('click', () => {
          const r = card.dataset.rama;
          const idx = parseInt(card.dataset.index, 10);
          abrirModal(r, idx);   // definido en modal.js
        });
      });
    }

    // Animación de entrada
    muro.classList.remove('fade-out');
  }, 200);
}

/* ------------------------------------------------------------
   Inicialización
   ------------------------------------------------------------ */
renderMuro('manada');

botonesRama.forEach(btn => {
  btn.addEventListener('click', function () {
    botonesRama.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderMuro(this.dataset.rama);
  });
});