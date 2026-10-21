(function () {
  const STORAGE_KEY = 'grupo-scout-theme';
  const html = document.documentElement;
  const toggles = document.querySelectorAll('#themeToggle');

  function aplicarTema(tema) {
    if (tema === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
  }

  function temaInicial() {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) return guardado;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const temaActual = temaInicial();
  aplicarTema(temaActual);

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const esOscuro = html.getAttribute('data-theme') === 'dark';
      const nuevoTema = esOscuro ? 'light' : 'dark';
      aplicarTema(nuevoTema);
      localStorage.setItem(STORAGE_KEY, nuevoTema);
    });
  });
})();