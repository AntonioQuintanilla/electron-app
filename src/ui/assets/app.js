function loadSection(section) {
  const content = document.getElementById('content');

  // Cargar el archivo HTML de la vista correspondiente
  fetch(`./views/${section}.html`)
    .then(response => response.text())
    .then(html => {
      content.innerHTML = html;

      // Después de cargar la vista, asegúrate de ejecutar su lógica
      if (section === 'productos') {
        loadProductosLogic();
      } else if (section === 'facturacion') {
        loadFacturacionLogic();
      }

    })
    .catch(error => {
      console.error('Error al cargar la vista:', error);
    });
}
