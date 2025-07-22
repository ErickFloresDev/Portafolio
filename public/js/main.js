import page from "//unpkg.com/page/page.mjs";

function render(path) {
  fetch(`/html/${path}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('app').innerHTML = html;
      // Cargar módulo JS dinámicamente si existe
      import(`/js/${path}.js`).then(module => {
        if (module.init) module.init();
      }).catch(() => {});
    });
}

// Definir rutas
page('/', () => render('home'));
page('/about', () => render('about'));
page('/proyect', () => render('proyect'));
page('/study', () => render('study'));
page('/certifications', () => render('certifications'));
page('/contact', () => render('contact'));

page('*', () => render('home'));

// Iniciar enrutamiento
page();

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const href = link.getAttribute('href');
    page.show(href);
  });
});
