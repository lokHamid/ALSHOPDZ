

const carts= [
  {
    brand: "Apple",
    name: "iphone 16 pro",
    desc: "Build For Apple Intelligence",
    category:"phones",
    imgSrc: "../../assets/images/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
    instalment: "Starting At $30/month for 24 Months",
    price: "$1,099.00"
    ,colors: ["#0000ff", "#ffff00", "#ff00ff"],
    images: ["../../assets/images/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
      "../../assets/images/images.jpg"
    ],
options: ["6GB/128GB", "8GB/128GB"]
  },
  {
      brand: "Samsung",
      category:"tablets",
      name: "Samsung Galaxy S25 Ultra",
      desc: "Build For Apple Intelligence",
      imgSrc: "../../assets/images/GALAXY_S25_ULTRA_IMAGE.jpg",
      instalment: "Starting At $30/month for 24 Months",
      price: "$1,099.00"
      ,colors: ["#0000ff", "#ffff00", "#ff00ff"],
    images: ["../../assets/images/GALAXY_S25_ULTRA_IMAGE.jpg",
      "../../assets/images/images.jpg"
    ],
options: ["6GB/128GB", "8GB/128GB"]
    },
];

async function getcart(userId) {
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
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
          return decodeURIComponent(value);
      }
  }
  return null;
}

document.addEventListener('DOMContentLoaded', async() => {
 

  window.addEventListener("pageshow", function (event) {
    if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
      location.reload();
    }
  });
  
  const userCookie = getCookie('user');
   let userid="f";
    if (userCookie) {
        try {
            const user = JSON.parse(userCookie);
            console.log("User found:", user);
                  userid=user.id;
          
          
        } catch (e) {
            console.error("Error parsing user cookie:", e);
        }
    } else {
        console.log("No user cookie found. Redirecting to login...");
       
    }
    const signin=document.querySelector(".sign-in");
    if(userid!=="f"){
        carts3= await getcart(userid);
        signin.innerHTML=`<img class="lad" src="../../../icon-nobg.png"> `
        signin.style.width="50px";
        signin.style.height="50px";
        signin.style.border="0.5px solid gray"
        signin.style.backgroundColor = "red";

        signin.style.borderRadius = "50%";


    }else{

    }
    

      console.log("carts3",carts3);
  fetch(`http://localhost/ALSHOPDZ/backend/part1/products.php`)
      .then(res => res.json())
      .then(data => {
       
      
       const products=data;       
  
     
      
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
        
          
       const cartitem=document.querySelector(".carted-products-col");
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
            </div>          `;
          cartitem.appendChild(cartitems);
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
                  carts3 = await getcart(userid);
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
      
       
        document.querySelectorAll('.add').forEach((addBtn,index) => {
          addBtn.addEventListener('click',async (e) => {
            const i = parseInt(e.target.getAttribute("data-index"));
            const quantityElem = document.querySelectorAll('.sum')[i];
            let qty = parseInt(quantityElem.innerText);
            quantityElem.innerText = ++qty;
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
      
      function updateprices(quantity, index) {
        const priceElement = document.querySelectorAll(".cart-item-total")[index];
        const priceString = carts[index].price; 
        const cleaned = priceString.replace(/[^0-9.]/g, ''); 
        const numericPrice = parseFloat(cleaned);
        const quan=document.querySelectorAll(".quan-cart")[index];
      
      
        if (!isNaN(numericPrice)) {
          const total = (numericPrice * quantity).toFixed(2);
          priceElement.innerText = `${total}$`;
          quan.innerText=String(quantity);
          return parseFloat(total);
        } else {
          console.warn("Price couldn't be parsed for index", index, "with price:", priceString);
        }
      }
      


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
    
    const sidebar = document.getElementById("sidebar");
    const openSidebarBtn = document.getElementById("openSidebar");
    const closeSidebarBtn = document.getElementById("closeSidebar");

  
    openSidebarBtn.addEventListener("click", () => {
      if(userid==="f"){
        window.location.href="login.html"
      }
        sidebar.classList.add("open");
    });

   
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

  
  
  
  