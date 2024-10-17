// ipcRenderer: Módulo que permite enviar eventos desde el proceso de renderizado al proceso principal
// const { ipcRenderer } = require('electron');

function loadProductosLogic() {

    // Lógica de la interfaz de usuario
    const productForm = document.getElementById('productForm');
    const productName = document.getElementById('nombre');
    const productDescription = document.getElementById('descripcion');
    const productPrice = document.getElementById('precio');
    const productActualStock = document.getElementById('stock_actual');
    const productMinStock = document.getElementById('stock_minimo');
    const productCategory = document.getElementById('categoria');
    const productRegisterDate = document.getElementById('fecha_registro');
    const productsTableBody = document.getElementById('productsBody');

    const number = document.querySelectorAll('.number');

    let products = [];
    let editingStatus = false;
    let editProductId = '';

    // Validar que el campo de precio solo acepte números y hasta dos decimales
    number.forEach((element) => {
        element.addEventListener('keypress', (e) => {
            if (e.key === 'e' || e.key === '+' || e.key === '-') {
                e.preventDefault(); // Prevenir caracteres no deseados
            }
        });

        element.addEventListener('input', (e) => {
            let value = e.target.value;
            // Permitir solo números y hasta dos decimales
            if (!/^\d*\.?\d{0,2}$/.test(value)) {
                e.target.value = value.slice(0, -1); // Elimina el último carácter inválido
            }
        });
    });


    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        console.log(productPrice.value);

        const newProduct = {
            nombre: productName.value,
            descripcion: productDescription.value,
            precio: productPrice.value,
            stock_actual: productActualStock.value,
            stock_minimo: productMinStock.value,
            categoria: productCategory.value,
            fecha_registro: productRegisterDate.value
        }

        if (!editingStatus) {
            const result = await window.api.createProduct(newProduct);
            console.log(result);
        } else {
            await window.api.updateProduct({...newProduct, id_producto: editProductId});
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


    const updateProduct = async (id_producto) => {
        console.log('Editando producto con id:', id_producto);
        const product = await window.api.getProductById(id_producto);
        productName.value = product.nombre;
        productDescription.value = product.descripcion;
        productPrice.value = product.precio;
        productActualStock.value = product.stock_actual;
        productMinStock.value = product.stock_minimo;
        productCategory.value = product.categoria;
        productRegisterDate.value = formatDate(product.fecha_registro);

        editingStatus = true;
        editProductId = product.id_producto;
    }

    const renderProducts = (products) => {
        productsTableBody.innerHTML = '';
        products.forEach(product => {
            const productRow = document.createElement('tr');
            productRow.innerHTML += `
                <td>${product.nombre}</td>
                <td>${product.descripcion}</td>
                <td>${product.precio}</td>
                <td>${product.stock_actual}</td>
                <td>${product.stock_minimo}</td>
                <td>${product.categoria}</td>
                <td>${ formatDate(product.fecha_registro) }</td>
                
                <td>
                  <button class="btn btn-outline-danger delete-btn">Eliminar</button>  
                  <button class="btn btn-outline-primary update-btn">Editar</button>
                </td>
        `;

            productRow.querySelector('.delete-btn').addEventListener('click', () => {
                deleteProduct(product.id_producto);
            });
            productRow.querySelector('.update-btn').addEventListener('click', () => {
                updateProduct(product.id_producto);
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


function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
