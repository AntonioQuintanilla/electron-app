const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const { getConnection } = require('./database')
const path = require('path');
const {initializeIpcHandlers} = require("./handlers/ipcHandlers");

let window

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true
    }
  })
  window.maximize();
  window.loadFile('src/ui/index.html');
}

app.whenReady().then(() => {
  createWindow();
  initializeIpcHandlers();
})

app.on('window-all-closed', () => {
  if (process.platform === 'win32' || 'darwin') app.quit();
})

// Función para insertar un producto en la base de datos
// async function createProduct(product) {
//   try {
//     const conn = await getConnection(); // Espera la conexión a la base de datos
//     product.price = parseFloat(product.price); // Convierte el precio a número
//     const result = await conn.query('INSERT INTO product SET ?', product); // Inserta el producto
//     console.log(result);
//
//     new Notification({
//       title: 'Electron MySQL',
//       body: 'New product saved successfully'
//     }).show();
//
//     product.id = result.insertId; // Asigna el ID del producto insertado al objeto
//     return product; // Devuelve el objeto del producto insertado
//
//   //   console.log('Product inserted:', result.insertId); // ID del producto insertado
//   //   return result.insertId; // Devuelve el ID del producto insertado
//   } catch (error) {
//     console.error('Error inserting product:', error);
//     throw error; // Lanza el error para ser manejado en el renderer si es necesario
//   }
// }
//
// async function getProducts() {
//   const conn = await getConnection();
//   const result = await conn.query('SELECT * FROM product');
//   return result;
// }
//
// async function deleteProduct(id) {
//   const conn = await getConnection();
//   const result = await conn.query('DELETE FROM product WHERE id = ?', id);
//   return result;
// }
//
// async function getProductById(id) {
//     const conn = await getConnection();
//     const result = await conn.query('SELECT * FROM product WHERE id = ?', id);
//     return result[0];
// }
//
// async function updateProduct(product) {
//     const conn = await getConnection();
//     const result = await conn.query('UPDATE product SET ? WHERE id = ?', [product, product.id]);
//     return result;
// }
//
//
// // Manejar la solicitud desde el proceso renderer para insertar un producto
// ipcMain.handle('create-product', async (event, product) => {
//   return await createProduct(product);
// });
//
// ipcMain.handle('get-products', async (event) => {
//   return await getProducts();
// });
//
// ipcMain.handle('delete-product', async (event, id) => {
//   return await deleteProduct(id);
// });
//
// ipcMain.handle('get-product-by-id', async (event, id) => {
//   return await getProductById(id);
// });
//
// ipcMain.handle('update-product', async (event, product) => {
//   return await updateProduct(product);
// });
//
//
// module.exports = {
//   createWindow,
// }