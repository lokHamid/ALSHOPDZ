document.addEventListener('DOMContentLoaded', async () => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
          tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          });
    });
    const products = await fetchProducts();
    renderProducts(products);

    document.querySelector(".search-field").addEventListener("input", e => {
        search(e.target.value, products);
    });

    const brandBtns = document.querySelectorAll('.brand-btn');
        brandBtns.forEach(btn => {
            btn.addEventListener('click', () => {
            brandBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const status = btn.dataset.status;
            filterListItems(status);
        });
    });
    

    const response = await fetch("http://localhost/ALSHOPDZ/backend/part2/dashboard.php");
    const stats = await response.json();

    const product_count = document.querySelector('.products-count');
    const user_count = document.querySelector('.users-count');
    const order_count = document.querySelector('.orders-count');

    product_count.textContent = stats.data['total_products'];
    user_count.textContent = stats.data['active_users'];
    order_count.textContent = stats.data['total_orders'];
});


function search(key, products) {
    const lowerKey = key.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(lowerKey) ||
        product.brand.toLowerCase().includes(lowerKey)
    );
    renderProducts(filteredProducts);
}

function renderProducts(products) {
    const grid = document.querySelector(".products-grid");
    grid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.imgSrc}" alt="${product.name}" class="product-image">
            <p class="product-brand">${product.brand}</p>
            <label class="product-name">${product.name}</label>
            <label class="product-desc">${product.desc}</label>
            <hr class="card-divider">
            <p class="product-instal-price">${product.instalment}</p>
            <p class="product-price">Full price: ${product.options[0].price}$</p>
            <div class="manage-btns-section">
                <button class="delete-product-btn"><i class="fa-solid fa-trash"></i></button>
                <button class="edit-product-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            </div>
        `;

        card.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = "../../part 1/pages/product_details.html";
        });

        const deleteButton = card.querySelector('.delete-product-btn');

        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteProduct(product.id);
        });

        const editButton = card.querySelector('.edit-product-btn');
        editButton.addEventListener('click',(e)=>{
            e.stopPropagation();
            //akram start here , implement editing product HERE 
        })

        grid.appendChild(card);
    });
}


async function fetchProducts() {
    try {
        const response = await fetch("http://localhost/ALSHOPDZ/backend/part1/products.php");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}