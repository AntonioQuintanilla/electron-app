function loadSection(section) {
    const content = document.getElementById('content');

    // Cargar el archivo HTML de la vista correspondiente
    fetch(`./views/${section}.html`)
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;

            // Después de cargar la vista, asegúrate de ejecutar su lógica

            setTimeout(() => {
                if (section === 'productos') {
                    loadProductosLogic();
                } else if (section === 'clientes') {
                    loadClientsLogic();
                }
            }, 0)
        })
        .catch(error => {
            console.error('Error al cargar la vista:', error);
        });
}
