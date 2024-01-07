let products = [];

function renderTable() {
    const table = document.getElementById("productTable");
    table.innerHTML = `<tr><th>Nome</th><th>Código</th><th>Descrição</th><th>Preço</th><th>Ações</th></tr>
        ${products.map(product => `<tr><td>${product.name}</td><td>${product.code}</td><td>${product.description}</td><td>${product.price}</td><td>
        <button onclick="editProduct(${product.code})">Editar</button>
        <button onclick="deleteProduct(${product.code})">Deletar</button></td></tr>`).join('')}`;
}

function saveProduct() {
    const { value: name } = document.getElementById("productName");
    const { value: code } = document.getElementById("productCode");
    const { value: description } = document.getElementById("productDescription");
    const { value: price } = document.getElementById("productPrice");

    const existingProductIndex = products.findIndex(product => product.code === code);

    if (existingProductIndex !== -1) {
        // Atualizar produto existente
        products[existingProductIndex] = { name, code, description, price };
    } else {
        // Adicionar novo produto
        products.push({ name, code, description, price });
    }

    renderTable();
    resetForm();
}

function editProduct(code) {
    const productToEdit = products.find(product => product.code === code);

    if (productToEdit) {
        const form = document.getElementById("productForm");
        for (const key in productToEdit) {
            if (form[key]) {
                form[key].value = productToEdit[key];
            }
        }
    }
}

function deleteProduct(code) {
    products = products.filter(product => product.code !== code);
    renderTable();
    resetForm();
}

function resetForm() {
    document.getElementById("productForm").reset();
}

renderTable();