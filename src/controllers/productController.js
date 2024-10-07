const { getConnection } = require('../database');
const { Notification } = require('electron');

// Función para insertar un producto en la base de datos
async function createProduct(product) {
    try {
        const conn = await getConnection();
        product.price = parseFloat(product.price);
        const result = await conn.query('INSERT INTO product SET ?', product);

        new Notification({
            title: 'Sistema de Inventarios',
            body: 'Producto guardado exitosamente'
        }).show();

        product.id = result.insertId;
        return product;
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        throw error;
    }
}

async function getProducts() {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM product');
    return result;
}

async function deleteProduct(id) {
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM product WHERE id = ?', id);
    return result;
}

async function getProductById(id) {
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM product WHERE id = ?', id);
    return result[0];
}

async function updateProduct(product) {
    const conn = await getConnection();
    const result = await conn.query('UPDATE product SET ? WHERE id = ?', [product, product.id]);
    return result;
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct
};
