const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

// Menú hamburguesa
menuToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('abierto');
});

// Cerrar menú al hacer clic en un enlace
navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('abierto'));
});

// Efecto al hacer scroll (navbar se achica)
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 30);
});