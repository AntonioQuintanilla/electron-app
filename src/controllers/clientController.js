const { getConnection } = require('../database');
const { Notification } = require('electron');

// Función para insertar un cliente en la base de datos
async function createClient(client) {
    try {
        const conn = await getConnection();
        // client.price = parseFloat(product.price);
        const result = await conn.query('INSERT INTO clientes SET ?', client);

        new Notification({
            title: 'Sistema de Inventarios',
            body: 'Cliente guardado correctamente'
        }).show();

        client.id = result.insertId;
        return client;
    } catch (error) {
        console.error('Error al guardar la informacion del cliente', error);
        throw error;
    }
}

async function getClients() {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM clientes');
    return result;
}

async function deleteClient(id) {
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM clientes WHERE id_cliente = ?', id);
    return result;
}

async function getClientById(id) {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM clientes WHERE id_cliente = ?', id);
    return result[0];
}

async function updateClient(client) {
    const conn = await getConnection();
    const result = await conn.query('UPDATE clientes SET ? WHERE id_cliente = ?', [client, client.id_cliente]);
    return result;
}

module.exports = {
    createClient,
    getClients,
    deleteClient,
    getClientById,
    updateClient
};
