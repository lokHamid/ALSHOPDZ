// product color list retrieval logic:
const product = {
    name: "IPhone 16 pro max",
    colors: ["#0000ff", "#ffff00", "#ff00ff"],
    images: ["../../assets/images/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
      "../../assets/images/images.jpg"
    ],
    options:["6GBRAM-128GB","6GBRAM-128GB","6GBRAM-128GB"]
  };
  

  // my stuff things here
  const mainImage = document.getElementById('main-product-image');
  const leftBtn = document.getElementById('swap-left-btn');
  const rightBtn = document.getElementById('swap-right-btn');
  const dotsContainer = document.getElementById('image-dots');
  const colorButtonsContainer = document.getElementById("colorButtons");
  const optionButtonsContainer = document.getElementById("options-btns-sec");
  const currentColorDisplay = document.querySelector('.current-selected-color');
  
  product.colors.forEach(color => {
    const button = document.createElement("button");
    button.className = "color-btn";
    button.style.backgroundColor = color;
    button.setAttribute("aria-label", `Color ${color}`);
    
    // Store color value as data attribute
    button.dataset.color = color;
    
    button.addEventListener("click", () => {
        document.querySelectorAll(".color-btn").forEach(btn => {
            btn.classList.remove("selected");
        });
        
        button.classList.add("selected");
        updateSelectedColorDisplay(color);
    });
    
    colorButtonsContainer.appendChild(button);
  });
  function updateSelectedColorDisplay(color) {
    // You can customize this to show color names instead of hex values
    const colorName = getColorName(color); // Implement this function if needed
    currentColorDisplay.textContent = `${colorName || color}`;
    
    // Optional: Change text color for better visibility
    currentColorDisplay.style.color = color;
}

function getColorName(hex) {
    const colorMap = {
        '#0000ff': 'Blue',
        '#ffff00': 'Yellow',
        '#ff00ff': 'Magenta'
    };
    return colorMap[hex.toLowerCase()];
}

if (product.colors.length > 0) {
    const firstColor = product.colors[0];
    updateSelectedColorDisplay(firstColor);
    colorButtonsContainer.firstChild?.click();
}
  
  let currentImageIndex = 0;
  
  function initImageSwapper() {
    // set first img
    if (product.images.length > 0) {
      mainImage.src = product.images[0];
      mainImage.alt = product.name;
    }
  
    product.images.forEach((_, index) => {
      const dot = document.createElement('i');
      dot.className = 'fa-solid fa-circle';
      if (index === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        goToImage(index);
      });
      
      dotsContainer.appendChild(dot);
    });
  
    leftBtn.addEventListener('click', () => {
      goToImage((currentImageIndex - 1 + product.images.length) % product.images.length);
    });
  
    rightBtn.addEventListener('click', () => {
      goToImage((currentImageIndex + 1) % product.images.length);
    });
  }
  
  function goToImage(index) {
    currentImageIndex = index;
    mainImage.src = product.images[index];
    
    document.querySelectorAll('.img-dots i').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  initImageSwapper();


  document.addEventListener('DOMContentLoaded', () => {
    product.options.forEach(option => {
      const button = document.createElement("button");
      button.className = "opt-btn";
      button.textContent = option

      button.addEventListener("click", () => {
        document.querySelectorAll(".opt-btn").forEach(btn => 
          btn.classList.remove("active")
        );
        button.classList.add("active");
      });
      
      optionButtonsContainer.appendChild(button);
    });

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
  });

  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "250px";
  };
  
  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "0";
  };