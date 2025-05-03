
const product = JSON.parse(localStorage.getItem('selectedProduct'));


if (!product) {
  
  window.location.href = "index.html"; 
}
 
function sendCart(product) {
  fetch("http://localhost/ALSHOPDZ/backend/part1/cart.php", {
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
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
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
  
  let carts3=[];
    document.addEventListener('DOMContentLoaded', async () => {
      carts3= await getcart(2);
     console.log("carts",carts3);
      const cartitem = document.querySelector(".carted-products-col");
    
      function rendercart() {
        cartitem.innerHTML = "";  
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
                <p class="sum">1</p>
                <button class="add" data-index="${index}">+</button>
              </div>
              <label class="cart-item-total">${cart.price}$</label>
            </div>
          `;
          cartitem.appendChild(cartitems);
        });
    
        
        document.querySelectorAll('.fa-trash').forEach(del => {
          del.addEventListener('click', (e) => {
            const i = parseInt(e.target.getAttribute("data-index"));
            carts3.splice(i, 1);
            rendercart(); 
            calculateTotal();
          });
        });
    
        document.querySelectorAll('.add').forEach(addBtn => {
          addBtn.addEventListener('click', (e) => {
            const i = parseInt(e.target.getAttribute("data-index"));
            const quantityElem = document.querySelectorAll('.sum')[i];
            let qty = parseInt(quantityElem.innerText);
            quantityElem.innerText = ++qty;
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
    
      // Update the prices based on quantity changes
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
    
      // Initially render the cart and calculate the total
      rendercart();
      calculateTotal();
    
      // Sidebar toggle behavior
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
    });
    

    const addtocartbtn=document.querySelector(".cart-add-btn");
    addtocartbtn.addEventListener("click",()=>{
     console.log("product view",product);
     let product3 = {
      product_id: product.id,
      option_id: product.options[ind].id,
      user_id: "2",
      quantity: "1"
    };
     console.log("item cart",product3);
     sendCart(product3);
    });
  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "250px";
  };
  
  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "0";
  };

 