const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    // Productos
    getProducts: () => ipcRenderer.invoke('get-products'),
    getProductById: (id) => ipcRenderer.invoke('get-product-by-id', id),
    createProduct: (product) => ipcRenderer.invoke('create-product', product),
    updateProduct: (product) => ipcRenderer.invoke('update-product', product),
    deleteProduct: (id) => ipcRenderer.invoke('delete-product', id),
    // Clientes
    getClients: () => ipcRenderer.invoke('get-clients'),
    getClientById: (id) => ipcRenderer.invoke('get-client-by-id', id),
    createClient: (client) => ipcRenderer.invoke('create-client', client),
    updateClient: (client) => ipcRenderer.invoke('update-client', client),
    deleteClient: (id) => ipcRenderer.invoke('delete-client', id),
})