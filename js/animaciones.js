const reveals = document.querySelectorAll('.reveal');

if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

const collageItems = document.querySelectorAll('.collage__item');

if (collageItems.length) {
  // Creamos un lightbox básico solo para el collage
  const collageLightbox = document.createElement('div');
  collageLightbox.className = 'lightbox';
  collageLightbox.innerHTML = `
    <button class="lightbox__close" aria-label="Cerrar">&times;</button>
    <figure class="lightbox__figura">
      <img class="lightbox__img" src="" alt="">
      <figcaption class="lightbox__caption"></figcaption>
    </figure>
  `;
  document.body.appendChild(collageLightbox);

  const cImg = collageLightbox.querySelector('.lightbox__img');
  const cCap = collageLightbox.querySelector('.lightbox__caption');
  const cClose = collageLightbox.querySelector('.lightbox__close');

  collageItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const cap = item.querySelector('.collage__caption');
      cImg.src = img.src;
      cImg.alt = img.alt;
      cCap.textContent = cap?.textContent || '';
      collageLightbox.classList.add('activo');
      document.body.style.overflow = 'hidden';
    });
  });

  const cerrar = () => {
    collageLightbox.classList.remove('activo');
    document.body.style.overflow = '';
  };

  cClose.addEventListener('click', cerrar);
  collageLightbox.addEventListener('click', e => {
    if (e.target === collageLightbox) cerrar();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && collageLightbox.classList.contains('activo')) cerrar();
  });
}