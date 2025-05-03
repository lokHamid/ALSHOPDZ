
const product = JSON.parse(localStorage.getItem('selectedProduct'));


if (!product) {
  
  window.location.href = "index.html"; 
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
  
    // Create dots
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


  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "250px";
  };
  
  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "0";
  };