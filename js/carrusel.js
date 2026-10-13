/* ============================================================
   CARRUSEL — Historia del grupo
   ============================================================ */

const track          = document.getElementById('carruselTrack');
const slides         = track.querySelectorAll('.carrusel__slide');
const dotsContainer  = document.getElementById('carruselDots');
const prevBtn        = document.getElementById('prevBtn');
const nextBtn        = document.getElementById('nextBtn');
const carrusel       = document.getElementById('carrusel');

let currentIndex = 0;
let autoplayInterval;

// --- Crear los dots dinámicamente ---
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  dot.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => irASlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// --- Ir a un slide específico ---
function irASlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  currentIndex = index;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

function siguienteSlide() { irASlide(currentIndex + 1); }
function anteriorSlide()  { irASlide(currentIndex - 1); }

// --- Autoplay ---
function iniciarAutoplay() {
  autoplayInterval = setInterval(siguienteSlide, 4000);
}

function detenerAutoplay() {
  clearInterval(autoplayInterval);
}

// --- Controles ---
prevBtn.addEventListener('click', () => {
  anteriorSlide();
  detenerAutoplay();
  iniciarAutoplay();
});

nextBtn.addEventListener('click', () => {
  siguienteSlide();
  detenerAutoplay();
  iniciarAutoplay();
});

// --- Pausa al pasar el mouse ---
carrusel.addEventListener('mouseenter', detenerAutoplay);
carrusel.addEventListener('mouseleave', iniciarAutoplay);

iniciarAutoplay();