/* ============================================================
   1. REVEAL ON SCROLL (Aparecer al scrollear)
   ============================================================ */
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

/* ============================================================
   2. LIGHTBOX PARA EL COLLAGE (Ver fotos grandes)
   ============================================================ */
const collageItems = document.querySelectorAll('.collage__item');

if (collageItems.length) {
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

/* ============================================================
   3. CONTADOR ANIMADO (Sección Stats)
   ============================================================ */
const contadores = document.querySelectorAll('.contador');

if (contadores.length) {
  const animarContador = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 segundos
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(target / 50); // Incremento suave
      if (current >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = current + '+';
      }
    }, stepTime);
  };

  const observerStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animarContador(entry.target);
        observerStats.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  contadores.forEach(c => observerStats.observe(c));
}

/* ============================================================
   4. ACORDEÓN FAQ (Preguntas Frecuentes)
   ============================================================ */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-question');
  
  btn.addEventListener('click', () => {
    // Cerrar otros abiertos (opcional)
    faqItems.forEach(other => {
      if (other !== item) other.classList.remove('activo');
    });
    
    // Alternar el actual
    item.classList.toggle('activo');
  });
});