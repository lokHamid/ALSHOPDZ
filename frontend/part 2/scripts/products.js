document.addEventListener('DOMContentLoaded', async () => {
    initPageA();
    
    const products = await fetchProducts();
    renderProducts(products);

    document.querySelector(".search-field").addEventListener("input", e => {
        search(e.target.value, products);
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

    const brandBtns = document.querySelectorAll('.brand-btn');
        brandBtns.forEach(btn => {
            btn.addEventListener('click', () => {
            brandBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

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

function search(key, products) {
    const lowerKey = key.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(lowerKey) ||
        product.brand.toLowerCase().includes(lowerKey)
    );
    renderProducts(filteredProducts);
}


async function openProductForm() {
  try {
      const response = await fetch('addform.html');
      const htmlText = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const mainDiv = doc.querySelector('.Main');

      const modalContent = document.getElementById('modalContent');
      if (mainDiv) {
          modalContent.innerHTML = '';
          modalContent.appendChild(mainDiv);
          document.getElementById('productModal').style.display = 'flex';

          initPageA();
      } else {
          modalContent.textContent = "Failed to load form.";
      }
  } catch (error) {
      console.error('Error loading form:', error);
      document.getElementById('modalContent').textContent = "Error loading form.";
  }
}

function initPageA() {
  const colors = document.querySelectorAll(".color-1");
  const colorss = ['red', 'green', 'blue', 'yellow', 'purple'];

  colors.forEach((color, index) => {
      color.style.backgroundColor = colorss[index] || 'white';
  });

  const bariers = document.querySelectorAll('.barier');
  bariers.forEach(barier => {
      barier.style.border = 'none';
  });

  bariers.forEach((barier, index) => {
      barier.addEventListener('click', () => {
          bariers.forEach(b => {
              b.style.border = 'none';
          });
          barier.style.display = 'flex';
          barier.style.border = '1px solid black';
      });
  });
}

function closeModal() {
  document.getElementById('productModal').style.display = 'none';
}

async function deleteProduct(productId) {
    try {
        const response = await fetch(`http://localhost/ALSHOPDZ/backend/part2/products.php?id=${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log(`Product ${productId} deleted successfully.`);
            const products = await fetchProducts();
            renderProducts(products);
        } else {
            console.error(`Failed to delete product ${productId}.`);
        }
    } catch (error) {
        console.log("ERROR OCCURRED BRO: ", error);
    }
}

