// ipcRenderer: Módulo que permite enviar eventos desde el proceso de renderizado al proceso principal
// const { ipcRenderer } = require('electron');

function loadClientsLogic() {
    console.log('estoy aqui');
    // Lógica de la interfaz de usuario
    const clientForm = document.getElementById('clientForm');
    const clientName = document.getElementById('nombre');
    const phoneNumber = document.getElementById('telefono');
    const email = document.getElementById('correo_electronico');
    const nit = document.getElementById('nit');
    const location = document.getElementById('direccion');
    const registerDate = document.getElementById('fecha_registro');
    const clientTableBody = document.getElementById('clientes');

    let clients = [];
    let editingStatus = false;
    let editClientId = '';


    clientForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newClient = {
            nombre: clientName.value,
            telefono: phoneNumber.value,
            correo_electronico: email.value,
            nit: nit.value,
            direccion: location.value,
            fecha_registro: formatDate(registerDate.value)
        }

        console.log(newClient);

        console.log(window.api);

        if (!editingStatus) {
            // const result = await ipcRenderer.invoke('create-product', newClient);
            const result = await window.api.createClient(newClient);
            console.log(result);
        } else {
            await window.api.updateClient({ ...newClient, id_cliente: editClientId });
            // await ipcRenderer.invoke('update-product', { ...newClient, id: editClientId });
            editingStatus = false;
            editClientId = '';
        }

        console.log('Cliente guardado correctamente');
        clientForm.reset(); // Limpiar el formulario
        clientName.focus(); // Enfocar el campo de nombre

        await getClients(); // Actualizar la lista de productos
    })

    const deleteClient = async (id) => {
        if (confirm('Está seguro de que desea eliminar este cliente?')) {
            await window.api.deleteClient(id);
            await getClients();
        }
    }

    const updateClient = async (id_cliente) => {
        console.log('Editando cliente con id:', id_cliente);
        const client =  await window.api.getClientById(id_cliente);
        console.log(client);

        clientName.value = client.nombre;
        phoneNumber.value = client.telefono;
        email.value = client.correo_electronico;
        location.value = client.direccion;
        nit.value = client.nit;
        registerDate.value = formatDate(client.fecha_registro);

        editingStatus = true;
        editClientId = client.id_cliente;
    }

    const renderClients = (clients) => {

        clientTableBody.innerHTML = '';
        clients.forEach(client => {
            const clientRow = document.createElement('tr');
            clientRow.innerHTML += `
                <td>${client.nombre}</td>
                <td>${client.telefono}</td>
                <td>${client.correo_electronico}</td>
                <td>${client.nit}</td>
                <td>${client.direccion}</td>
                <td>${ formatDate(client.fecha_registro)}</td>
                <td>
                  <button class="btn btn-outline-danger delete-btn">Eliminar</button>  
                  <button class="btn btn-outline-primary update-btn">Editar</button>
                </td>
        `;

            clientRow.querySelector('.delete-btn').addEventListener('click', () => {
                deleteClient(client.id_cliente);
            });
            clientRow.querySelector('.update-btn').addEventListener('click', () => {
                updateClient(client.id_cliente);
            });
            // Agregar la tarjeta del producto al contenedor de productos
            clientTableBody.appendChild(clientRow);

            // clientCard.classList.add('col-auto', 'mx-2', 'p-2', 'card', 'card-body', 'my-2', 'animate__animated', 'animate__fadeInLeft');

        });
    }

    const getClients = async () => {
        clients = await window.api.getClients();
        renderClients(clients);
    }

    async function init() {
        await getClients();
        console.log('Clientes:', clients);
        console.log('Lógica de clientes cargada.');
    }

    init();
}


function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
