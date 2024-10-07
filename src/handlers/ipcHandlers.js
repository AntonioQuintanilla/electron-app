const { ipcMain } = require('electron');
const { createProduct, getProducts, deleteProduct, getProductById, updateProduct } = require('../controllers/productController');
const { createClient, getClients, getClientById, updateClient, deleteClient } = require("../controllers/clientController");

// Inicializa los manejadores IPC
function initializeIpcHandlers() {
    // Productos
    ipcMain.handle('create-product', async (event, product) => {
        return await createProduct(product);
    });

    ipcMain.handle('get-products', async (event) => {
        return await getProducts();
    });

    ipcMain.handle('delete-product', async (event, id) => {
        return await deleteProduct(id);
    });

    ipcMain.handle('get-product-by-id', async (event, id) => {
        return await getProductById(id);
    });

    ipcMain.handle('update-product', async (event, product) => {
        return await updateProduct(product);
    });


    // Clientes
    ipcMain.handle('get-clients', async (event) => {
        return await getClients();
    });

    ipcMain.handle('get-client-by-id', async (event, id) => {
        return await getClientById(id);
    });

    ipcMain.handle('create-client', async (event, client) => {
        return await createClient(client);
    });

    ipcMain.handle('update-client', async (event, client) => {
        return await updateClient(client);
    });

    ipcMain.handle('delete-client', async (event, id) => {
        return await deleteClient(id);
    });
}

module.exports = {
    initializeIpcHandlers,
};
