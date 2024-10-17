function loadFacturaLogic() {
    console.log('Cargando lógica de facturas');

    const btnGenerarUUID = document.getElementById('generarUUID');
    const codigoGeneracionInput = document.getElementById('codigoGeneracion');

    // Función que genera el UUID y lo coloca en el campo del formulario
    async function generarUUID() {
        const uuid = await window.api.generateUUID(); // Llama a la función de Node.js para generar el UUID
        const formatedUUID = uuid.toUpperCase(); // Formatear el UUID en mayúsculas
        codigoGeneracionInput.value = formatedUUID; // Colocar el UUID en el input
    }

    // Asignar evento al botón para generar el UUID
    if (btnGenerarUUID) {
        btnGenerarUUID.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir el comportamiento por defecto si es necesario
            generarUUID(); // Generar y colocar el UUID
        });
    }
}

