// ipcRenderer: Módulo que permite enviar eventos desde el proceso de renderizado al proceso principal
const { ipcRenderer } = require('electron');

function loadProductosLogic() {
    // Lógica de la interfaz de usuario
    const productForm = document.getElementById('productForm');
    const productName = document.getElementById('name');
    const productPrice = document.getElementById('price');
    const productDescription = document.getElementById('description');
    const productsList = document.getElementById('products');

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
            const result = await ipcRenderer.invoke('create-product', newProduct);
            console.log(result);
        } else {
            await ipcRenderer.invoke('update-product', { ...newProduct, id: editProductId });
            editingStatus = false;
            editProductId = '';
        }

        productForm.reset(); // Limpiar el formulario
        productName.focus(); // Enfocar el campo de nombre

        await getProducts(); // Actualizar la lista de productos
    })

    const deleteProduct = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await ipcRenderer.invoke('delete-product', id);
            await getProducts();
        }
    }


    const updateProduct = async (id) => {
        const product = await ipcRenderer.invoke('get-product-by-id', id);
        productName.value = product.name;
        productPrice.value = product.price;
        productDescription.value = product.description;

        editingStatus = true;
        editProductId = product.id;
    }

    const renderProducts = (products) => {
        productsList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('card', 'card-body', 'my-2', 'animate__animated', 'animate__fadeInLeft');

            productCard.innerHTML += `
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <h3>${product.price}</h3>
                <p>
                  <button class="btn btn-danger delete-btn">DELETE</button>  
                  <button class="btn btn-secondary update-btn">EDIT</button>
                </p>
        `;

            productCard.querySelector('.delete-btn').addEventListener('click', () => {
                deleteProduct(product.id);
            });
            productCard.querySelector('.update-btn').addEventListener('click', () => {
                updateProduct(product.id);
            });
            // Agregar la tarjeta del producto al contenedor de productos
            productsList.appendChild(productCard);
        });
    }

    const getProducts = async () => {
        products = await ipcRenderer.invoke('get-products');
        renderProducts(products);
    }

    async function init() {
        await getProducts();
        console.log('Products:', products);
    }

    init();
}

function loadFacturacionLogic() {
  // Aquí carga la lógica para la facturación...
}