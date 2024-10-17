async function loadSection(section) {
    const content = document.getElementById('content');

    // Cargar el archivo HTML de la vista correspondiente
    try {
        const response = await fetch(`./views/${section}.html`);
        content.innerHTML = await response.text();

        // Cargar el script asociado y esperar a que esté completamente listo
        await loadScriptForSection(section);
        await executeSectionLogic(section);
    } catch (error) {
        console.error('Error al cargar la vista:', error);
    }
}


function loadScriptForSection(section) {
    console.log('Cargando script para:', section);

    return new Promise((resolve, reject) => {
        // Verificar si el script ya está cargado
        const existingScript = document.querySelector(`script[src="../scripts/${section}.js"]`);
        if (existingScript) {
            console.log(`El script para ${section} ya está cargado.`);
            resolve(); // Ya está cargado, así que resolvemos la promesa
            return;
        }

        // Crear y cargar el script dinámicamente
        const script = document.createElement('script');
        script.src = `../scripts/${section}.js`;

        script.onload = () => {
            console.log(`Script para ${section} cargado correctamente.`);
            resolve(); // Resolvemos la promesa cuando se carga el script
        };

        script.onerror = () => {
            console.error(`Error al cargar el script para ${section}.`);
            reject(); // Rechazamos la promesa si hay un error
        };

        document.body.appendChild(script);
    });
}

// Ejecutar la lógica correspondiente a cada sección una vez que el script se haya cargado

async function executeSectionLogic(section) {
    if (section === 'productos') {
        if (typeof loadProductosLogic === 'function') {
            loadProductosLogic();  // Solo se llama si está definida
            console.log('Hombre, pero aqui puedo hacer mas cositas si quiero no?');
            console.log('Cargando lógica de productos');
        } else {
            console.error('loadProductosLogic no está definida');
        }
    } else if (section === 'clientes') {
        if (typeof loadClientsLogic === 'function') {
            loadClientsLogic();
        } else {
            console.error('loadClientsLogic no está definida');
        }
    } else if (section === 'facturas') {
        if (typeof loadFacturaLogic === 'function') {
            loadFacturaLogic();
            const tipoDocumentoSelect = document.getElementById('tipoDocumento');
            const numDocumentoInput = document.getElementById('numDocumento');

            // Definir la lógica de validación en función de la elección del select
            tipoDocumentoSelect.addEventListener('change', function() {
                const selectedValue = tipoDocumentoSelect.value;

                // Limpiar el valor del input
                numDocumentoInput.value = '';

                // Ajustar el tamaño máximo permitido según el tipo de documento
                switch (selectedValue) {
                    case "36": // NIT
                        numDocumentoInput.maxLength = 14; // Ejemplo: NIT tiene 14 dígitos
                        break;
                    case "13": // DUI
                        numDocumentoInput.maxLength = 9; // Ejemplo: DUI tiene 9 dígitos
                        break;
                    case "37": // Otro
                        numDocumentoInput.maxLength = 15; // Ejemplo: Otro tipo, 15 dígitos
                        break;
                    case "03": // Pasaporte
                        numDocumentoInput.maxLength = 9; // Ejemplo: Pasaporte tiene 9 dígitos
                        break;
                    case "02": // Carnet de Residente
                        numDocumentoInput.maxLength = 12; // Ejemplo: Carnet de Residente tiene 12 dígitos
                        break;
                    default:
                        numDocumentoInput.maxLength = ""; // Sin límite
                        break;
                }
            });
        } else {
            console.error('loadFacturaLogic no está definida');
        }
    }
}