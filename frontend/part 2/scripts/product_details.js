
const product = JSON.parse(localStorage.getItem('selectedProduct'));


if (!product) {
  
  window.location.href = "index.html"; 
}
 
function sendCart(product) {
  return fetch("http://localhost/ALSHOPDZ/backend/part1/cart.php", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  });
}  

 
  const mainImage = document.getElementById('main-product-image');
  const leftBtn = document.getElementById('swap-left-btn');
  const rightBtn = document.getElementById('swap-right-btn');
  const dotsContainer = document.getElementById('image-dots');
  const colorButtonsContainer = document.getElementById("colorButtons");
  const optionButtonsContainer = document.getElementById("options-btns-sec");
  const currentColorDisplay = document.querySelector('.current-selected-color');
  const brand=document.getElementById('brand');
  const Name=document.getElementById('product-name');
  const Desc=document.getElementById('grad-text');
  brand.innerText=product.brand;
  Name.innerText=product.name;
  Desc.innerText=product.desc;
  let ind=0;
  function initImageSwapper() {
    dotsContainer.innerHTML = "";
    currentImageIndex = 0; // Reset index when swapping version
    console.log("the ind", ind);
  
    if (product.options[ind].images.length > 0) {
      mainImage.src = product.options[ind].images[0];
      mainImage.alt = product.name;
      console.log("this one", product);
    }
  
   
    product.options[ind].images.forEach((_, index) => {
      const dot = document.createElement("i");
      dot.className = "fa-solid fa-circle";
      if (index === 0) dot.classList.add("active");
  
      dot.addEventListener("click", () => {
        goToImage(index);
      });
  
      dotsContainer.appendChild(dot);
    });
  }
  leftBtn.addEventListener('click', () => {
    const images = product.options[ind].images;
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    goToImage(currentImageIndex);
  });
  
  rightBtn.addEventListener('click', () => {
    const images = product.options[ind].images;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    goToImage(currentImageIndex);
  });
    
  let currentImageIndex = 0;
 
  
  
  function goToImage(index) {
    currentImageIndex = index;
    const images = product.options[ind].images;
    mainImage.src = images[index];
    document.querySelectorAll('.img-dots i').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  product.options.forEach((option,index) => {
    const button = document.createElement("button");
    button.className = "opt-btn";
    button.textContent = option.version;
    
    
    button.addEventListener("click", () => {
      document.querySelectorAll(".opt-btn").forEach(btn => 
        btn.classList.remove("active")
      );
      button.classList.add("active");
      ind=index;
      console.log("index",ind);
      initImageSwapper();
    });
    
    optionButtonsContainer.appendChild(button);
  });
  function smoothNavigate(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      l=console.log("carts3",carts3);
      localStorage.setItem('cart', JSON.stringify(carts3));
      window.location.href = url;
    }, 300);
  }
  product.options.forEach(option => {
    const button = document.createElement("button");
    button.className = "color-btn";
    console.log(option.color)
    button.style.backgroundColor = option.color;
    button.setAttribute("aria-label", `Color ${option.color}`);
    
    // Store color value as data attribute
    button.dataset.color = option.color;
    
    button.addEventListener("click", () => {
      // Remove selection from all buttons
      document.querySelectorAll(".color-btn").forEach(btn => {
          btn.classList.remove("selected");
          btn.style.border = ""; // Reset border
          btn.style.padding = ""; // Reset padding
      });
      
      // Style the clicked button
      button.style.border = "2px solid grey";
      button.style.margin = "8px"; 
      button.classList.add("selected");
      
      updateSelectedColorDisplay(option.color,option.color_name);
  });
    
    colorButtonsContainer.appendChild(button);
  });
  function updateSelectedColorDisplay(color,colorName) {
    // You can customize this to show color names instead of hex values
    
    currentColorDisplay.textContent = `${colorName || color}`;
    
    
    currentColorDisplay.style.color = color;
}


if (product.options.length > 0) {
    const firstColor = product.options[0].color;
    updateSelectedColorDisplay(firstColor);
    colorButtonsContainer.firstChild?.click();
}
  
  
  
  initImageSwapper();


  
  async function getcart(userId ) {
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
    document.addEventListener('DOMContentLoaded', async () => {
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
    if(userid!=="f"){
        carts3= await getcart(userid);
    }
  
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
    
        document.querySelectorAll('.minus').forEach(minusBtn => {
          minusBtn.addEventListener('click', (e) => {
            const i = parseInt(e.target.getAttribute("data-index"));
            const quantityElem = document.querySelectorAll('.sum')[i];
            let qty = parseInt(quantityElem.innerText);
            if (qty > 1) {
              quantityElem.innerText = --qty;
              updateprices(qty, i);
              calculateTotal();
            }
          });
        });
      }
    
     
     
    
     
      
    
     
      rendercart();
  
      calculateTotal();
      const addtocartbtn=document.querySelector(".cart-add-btn");
    addtocartbtn.addEventListener("click",async()=>{
     console.log("product view",product);
     if(userid==="f"){
      window.location.href="login.html";
     }
     
     let product3 = {
      product_id: product.id,
      option_id: product.options[ind].id,
      user_id: userid,
      quantity: "1"
    };
    try {
      
      await sendCart(product3);
      
      
      carts3 = await getcart(userid);
      
      
      rendercart();
      calculateTotal();
      
      
      alert("Item added to cart successfully!");
  } catch (error) {
      console.error('Error adding to cart:', error);
      alert("Failed to add item to cart");
  }
    });
   
      const sidebar = document.getElementById("sidebar");
      const openSidebarBtn = document.getElementById("openSidebar");
      const closeSidebarBtn = document.getElementById("closeSidebar");
    
      // Open sidebar
      openSidebarBtn.addEventListener("click", () => {
       if(userid==="f"){
        window.location.href="login.html";
       }
        sidebar.classList.add("open");
      });
    
      // Close sidebar
      closeSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("open");
      });
    });
    

    
  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "250px";
  };
  
  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "0";
  };

 