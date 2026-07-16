let products = JSON.parse(localStorage.getItem("products"));

if (!products || products.length === 0) {
    products = [
        {
            id: 101,
            name: "Dell Laptop",
            category: "Laptop",
            price: 55000,
            stock: 15
        },
        {
            id: 102,
            name: "HP Laptop",
            category: "Laptop",
            price: 62000,
            stock: 8
        },
        {
            id: 103,
            name: "Wireless Mouse",
            category: "Accessories",
            price: 1200,
            stock: 42
        }
    ];

    localStorage.setItem("products", JSON.stringify(products));
}

let editIndex = -1;

function openModal() {
    document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";

    document.getElementById("pname").value = "";
    document.getElementById("pcategory").value = "";
    document.getElementById("pprice").value = "";
    document.getElementById("pstock").value = "";

    editIndex = -1;
}

function saveProduct() {

    const name = document.getElementById("pname").value.trim();
    const category = document.getElementById("pcategory").value.trim();
    const price = Number(document.getElementById("pprice").value);
    const stock = Number(document.getElementById("pstock").value);

    if (!name || !category || isNaN(price) || isNaN(stock)) {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === -1) {

        products.push({
            id: products.length + 101,
            name: name,
            category: category,
            price: price,
            stock: stock
        });

    } else {

        products[editIndex].name = name;
        products[editIndex].category = category;
        products[editIndex].price = price;
        products[editIndex].stock = stock;

    }

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();

    closeModal();
}
function displayProducts() {

    const table = document.getElementById("productTable");

    // Remove old rows except header
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    `;

    products.forEach((product,index)=>{

        const status = product.stock <= 10
            ? '<span class="low">Low Stock</span>'
            : '<span class="available">Available</span>';

        table.innerHTML += `
        <tr>

            <td>${product.id}</td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>₹${product.price}</td>

            <td>${product.stock}</td>

            <td>${status}</td>

            <td>

                <button class="edit-btn" onclick="editProduct(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete-btn" onclick="deleteProduct(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </td>

        </tr>
        `;

    });

}

function deleteProduct(index){

    if(confirm("Delete this product?")){

        products.splice(index,1);

        localStorage.setItem("products",JSON.stringify(products));

        displayProducts();

    }

}

function editProduct(index){

    let newStock = prompt("Enter new stock quantity:", products[index].stock);

    if(newStock === null) return;

    newStock = parseInt(newStock);

    if(isNaN(newStock) || newStock < 0){
        alert("Invalid stock value");
        return;
    }

    products[index].stock = newStock;

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();

    alert("Stock updated successfully!");

}
displayProducts();
function searchProduct(value){

    value = value.toLowerCase();

    const rows = document.querySelectorAll("#productTable tr");

    rows.forEach((row,index)=>{

        if(index===0) return;

        if(row.innerText.toLowerCase().includes(value))
            row.style.display="";
        else
            row.style.display="none";

    });

}