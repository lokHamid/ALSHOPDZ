document.addEventListener('DOMContentLoaded',async () => {
  
  async function getproduct() {
    const res = await fetch(`http://localhost/ALSHOPDZ/backend/part1/products.php`);
    const data = await res.json();
    return data;
  }
  
  let products= await getproduct();
  console.log("this",products);
  
  async function getcart(userId = 2) {
    try {
  
        const response = await fetch(`http://localhost/ALSHOPDZ/backend/part1/cart.php/${userId}`);
        
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null;
    }
}

// Usage

  
  let carts3=[];
  async function updateCartItemQuantity(cartItemId, newQuantity) {
    try {
        const response = await fetch(`http://localhost/ALSHOPDZ/backend/part1/cart.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart_item_id: cartItemId,
                quantity: newQuantity
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Quantity updated:', data);
        return data;
    } catch (error) {
        console.error('Error updating quantity:', error);
        return null;
    }
}
async function deleteCartItem(cartItemId) {
  try {
      const response = await fetch(`http://localhost/ALSHOPDZ/backend/part1/cart.php`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              cart_item_id: cartItemId
          })
      });
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Item deleted:', data);
      return data;
  } catch (error) {
      console.error('Error deleting item:', error);
      return null;
  }
}
   
      carts3= await getcart(2);
     console.log("carts",carts3);
      const cartitem = document.querySelector(".carted-products-col");
      function calculateTotal() {
        let total = 0;
        const quantities = document.querySelectorAll(".sum");
        const priceElements = document.querySelectorAll(".cart-item-total");
    
        quantities.forEach((q, i) => {
          const priceText = priceElements[i].innerText;
          const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
          if (!isNaN(price)) {
            total += price;
          }
        });
    
        const totalprice1 = document.querySelector(".price");
        totalprice1.innerText = `${total.toFixed(2)}$`;
      }
      function rendercart() {
        cartitem.innerHTML = "";  
        if(carts3.length===0){
          cartitem.style.maxHeight = "none";
          cartitem.style.overflowY = "hidden";
          const emptycart=document.createElement("div");
          emptycart.classList.add("cart-empty");
          emptycart.innerHTML=`
          <img class="empty" src="../../assets/images/4555971.png" alt="empty">
          <p class="text1">Your cart is empty</p>
          <p class="text2">Add items to start a new order</p>
          `;
          cartitem.appendChild(emptycart);
        }else{
          cartitem.style.maxHeight = "70vh"; 
          cartitem.style.overflowY = "auto";
        carts3.forEach((cart, index) => {
          const cartitems = document.createElement("div");
          cartitems.classList.add("cart-item");
          cartitems.innerHTML = `
            <img src="${cart.product_image}" alt="${cart.product_name}" class="cart-image">
            <div class="cart-item-details">
              <div class="name-delete">
                <label class="cart-item-name">${cart.product_name}</label>
                <i class="fa-solid fa-trash" data-index="${index}"></i>
              </div>
              <label class="cart-item-quant">${cart.price}$<i class="fa-solid fa-xmark"></i> <span class="quan-cart">1</span></label>
              <div class="quantity">
                <button class="minus" data-index="${index}">-</button>
                <p class="sum">${cart.quantity}</p>
                <button class="add" data-index="${index}">+</button>
              </div>
              <label class="cart-item-total">${cart.price}$</label>
            </div>
          `;
          cartitem.appendChild(cartitems);
          updateprices(cart.quantity,index);
        });
      }
       
        
        document.querySelectorAll('.fa-trash').forEach(del => {
          del.addEventListener('click', async (e) => {
              const i = parseInt(e.target.getAttribute("data-index"));
              const cartItemId = carts3[i].cart_item_id;
              
              
              e.target.classList.add('fa-spinner', 'fa-spin');
              e.target.classList.remove('fa-trash');
              
              try {
                  await deleteCartItem(cartItemId);
                  carts3 = await getcart(2);
                  rendercart();
                  calculateTotal();
              } catch (error) {
                  console.error('Delete failed:', error);
                 
                  e.target.classList.remove('fa-spinner', 'fa-spin');
                  e.target.classList.add('fa-trash');
                  alert("Failed to delete item. Please try again.");
              }
          });
      });
      function updateprices(quantity, index) {
        const priceElement = document.querySelectorAll(".cart-item-total")[index];
        const priceString = carts3[index].price; 
        const cleaned = priceString.replace(/[^0-9.]/g, ''); 
        const numericPrice = parseFloat(cleaned);
        const quan = document.querySelectorAll(".quan-cart")[index];
    
        if (!isNaN(numericPrice)) {
          const total = (numericPrice * quantity).toFixed(2);
          priceElement.innerText = `${total}$`;
          quan.innerText = String(quantity);
          return parseFloat(total);
        } else {
          console.warn("Price couldn't be parsed for index", index, "with price:", priceString);
        }
      }
        document.querySelectorAll('.add').forEach((addBtn,index) => {
          addBtn.addEventListener('click', async(e) => {
            const i = parseInt(e.target.getAttribute("data-index"));
            const quantityElem = document.querySelectorAll('.sum')[i];
            let qty = parseInt(quantityElem.innerText);
            quantityElem.innerText = ++qty;
            console.log('cart id',carts3[index].cart_item_id)
            await updateCartItemQuantity(carts3[index].cart_item_id, qty);
            updateprices(qty, i);
            calculateTotal();
          });
        });
    
        document.querySelectorAll('.minus').forEach((minusBtn,index) => {
          minusBtn.addEventListener('click', async (e) => {
            const i = parseInt(e.target.getAttribute("data-index"));
            const quantityElem = document.querySelectorAll('.sum')[i];
            let qty = parseInt(quantityElem.innerText);
            if (qty > 1) {
              quantityElem.innerText = --qty;
              await updateCartItemQuantity(carts3[index].cart_item_id, qty);
              updateprices(qty, i);
              calculateTotal();
            }
          });
        });
      }
    
     
     
    
     
      
    
     
      rendercart();
  
      calculateTotal();


  let selectedCategory = null;
let selectedBrand = null;

  document.querySelector(".search-field").addEventListener("input", e => {
    search(e.target.value);
  });
  const grid = document.querySelector(".products-grid");
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
          <p class="product-price">Full price:${product.options[0].price}$</p>
    `;
  
    card.addEventListener('click', () => {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = "product_details.html";
    });
  
    grid.appendChild(card);
  });
  

  
  
  
  const tabs = document.querySelectorAll('.tab');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const targetPage = tab.getAttribute('data-target'); 

        if (targetPage) {
            window.location.href = targetPage; 
        }
      });
      const cards=document.querySelectorAll(".product-card");
      cards.forEach((card)=>{
      card.addEventListener('click',()=>{
       window.location.href="product_details.html";
      });
      });
      const cetegoryBtns = document.querySelectorAll('.category-btn');
      cetegoryBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            cetegoryBtns.forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              selectedCategory = btn.innerText.trim();
             applyFilters();
          });
      });
  
      const brandBtns = document.querySelectorAll('.brand-btn');
      brandBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            brandBtns.forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              selectedBrand = btn.innerText.trim();
              applyFilters();
          });
      });
    
  })

  //handle sidebar open:
  const sidebar = document.getElementById("sidebar");
    const openSidebarBtn = document.getElementById("openSidebar");
    const closeSidebarBtn = document.getElementById("closeSidebar");

    // Open sidebar
    openSidebarBtn.addEventListener("click", () => {
        sidebar.classList.add("open");
    });

    // Close sidebar
    closeSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });
    function search(key) {
      const lowerKey = key.toLowerCase();
    
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(lowerKey) ||
        product.brand.toLowerCase().includes(lowerKey)
      );
    
      renderProducts(filtered);
    }
    
    function applyFilters() {
      console.log(products,"test");
      let filtered = products;
      if (selectedCategory) {
        filtered = filtered.filter(product =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
      console.log(filtered,"file")
      if (selectedBrand) {
        filtered = filtered.filter(product =>
          product.brand.toLowerCase() === selectedBrand.toLowerCase()
        );
      }
      
      renderProducts(filtered);
      filtered.forEach((filters)=>{
        const card2=document.querySelectorAll(".product-card");
        card2.forEach((card1)=>{
          card1.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify(filters));
            console.log(card1.innerText);
            window.location.href = "product_details.html";
          });
        });
      });
    }
    
    
function renderProducts(filteredProducts) {
  grid.innerHTML = "";

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.imgSrc}" class="product-image" alt="${product.name}">
      <p class="product-brand">${product.brand}</p>
      <label class="product-name">${product.name}</label>
      <label class="product-desc">${product.desc}</label>
      <hr class="card-divider">
      <p class="product-instal-price">${product.instalment}</p>
      <p class="product-price">${product.price}</p>
    `;
    grid.appendChild(card);
  });
}

});

 
  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "250px";
  };
  
  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "0";
  };

  function smoothNavigate(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }

