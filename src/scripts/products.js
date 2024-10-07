// ipcRenderer: Módulo que permite enviar eventos desde el proceso de renderizado al proceso principal
// const { ipcRenderer } = require('electron');

function loadProductosLogic() {
    // Lógica de la interfaz de usuario
    const productForm = document.getElementById('productForm');
    const productName = document.getElementById('name');
    const productPrice = document.getElementById('price');
    const productDescription = document.getElementById('description');
    const productsTableBody = document.getElementById('products');

    let products = [];
    let editingStatus = false;
    let editProductId = '';

    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newProduct = {
            name: productName.value,
            price: productPrice.value,
            description: productDescription.value
        }

        if (!editingStatus) {
            const result = await window.api.createProduct(newProduct);
            console.log(result);
        } else {
            await window.api.updateProduct({ ...newProduct, id: editProductId });
            editingStatus = false;
            editProductId = '';
        }

        productForm.reset(); // Limpiar el formulario
        productName.focus(); // Enfocar el campo de nombre

        await getProducts(); // Actualizar la lista de productos
    })

    const deleteProduct = async (id) => {
        if (confirm('Está seguro de que desea eliminar este producto?')) {
            await window.api.deleteProduct(id);
            await getProducts();
        }
    }


    const updateProduct = async (id) => {
        const product = await window.api.getProductById(id);
        productName.value = product.name;
        productPrice.value = product.price;
        productDescription.value = product.description;

        editingStatus = true;
        editProductId = product.id;
    }

    const renderProducts = (products) => {
        productsTableBody.innerHTML = '';
        products.forEach(product => {
            const productRow = document.createElement('tr');
            productRow.innerHTML += `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>
                  <button class="btn btn-outline-danger delete-btn">Eliminar</button>  
                  <button class="btn btn-outline-primary update-btn">Editar</button>
                </td>
        `;

            productRow.querySelector('.delete-btn').addEventListener('click', () => {
                deleteProduct(product.id);
            });
            productRow.querySelector('.update-btn').addEventListener('click', () => {
                updateProduct(product.id);
            });
            // Agregar la tarjeta del producto al contenedor de productos
            productsTableBody.appendChild(productRow);
        });
    }

    const getProducts = async () => {
        // products = await ipcRenderer.invoke('get-products');
        products = await window.api.getProducts();
        renderProducts(products);
    }

    async function init() {
        await getProducts();
        console.log('Products:', products);
    }

    init();
}
