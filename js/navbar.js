const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

menuToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('abierto');
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('abierto'));
});

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 30);
});