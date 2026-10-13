const formContacto = document.getElementById('formContacto');

formContacto.addEventListener('submit', e => {
  e.preventDefault();

  // MODIFICÁ: acá podés integrar EmailJS, Formspree o tu backend.
  alert('¡Gracias por tu mensaje! Nos pondremos en contacto a la brevedad.');
  formContacto.reset();
});