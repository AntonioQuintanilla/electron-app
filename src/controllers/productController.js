const { getConnection } = require('../database');
const { Notification } = require('electron');

// Función para insertar un producto en la base de datos
async function createProduct(producto) {
    try {
        const conn = await getConnection();
        // producto.precio = parseFloat(producto.price);
        const result = await conn.query('INSERT INTO productos SET ?', producto);

        new Notification({
            title: 'Sistema de Inventarios',
            body: 'Producto guardado exitosamente'
        }).show();

        producto.id = result.insertId;
        return producto;
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        throw error;
    }
}

async function getProducts() {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM productos');
    return result;
}

async function deleteProduct(id) {
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM productos WHERE id_producto = ?', id);
    return result;
}

async function getProductById(id) {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM productos WHERE id_producto = ?', id);
    return result[0];
}

async function updateProduct(producto) {
    const conn = await getConnection();
    const result = await conn.query('UPDATE productos SET ? WHERE id_producto = ?', [producto, producto.id_producto]);
    return result;
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct
};
