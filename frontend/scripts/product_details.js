// product color list retrieval logic:
const product = {
    name: "IPhone 16 pro max",
    colors: ["#0000ff", "#ffff00", "#ff00ff"],
    images: ["../../assets/images/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
      "../../assets/images/images.jpg"
    ]
  };
  
  const colorButtonsContainer = document.getElementById("colorButtons");
  
  // Generate color buttons dynamically
  product.colors.forEach(color => {
    const button = document.createElement("button");
    button.className = "color-btn";
    button.style.backgroundColor = color;
    button.setAttribute("aria-label", `Color ${color}`);
    
    // Add click event to select/deselect
    button.addEventListener("click", () => {
      document.querySelectorAll(".color-btn").forEach(btn => 
        btn.classList.remove("selected")
      );
      button.classList.add("selected");
    });
    
    colorButtonsContainer.appendChild(button);
  });

  // my stuff things here
  const mainImage = document.getElementById('main-product-image');
  const leftBtn = document.getElementById('swap-left-btn');
  const rightBtn = document.getElementById('swap-right-btn');
  const dotsContainer = document.getElementById('image-dots');
  
  let currentImageIndex = 0;
  
  function initImageSwapper() {
    // Set first image
    if (product.images.length > 0) {
      mainImage.src = product.images[0];
      mainImage.alt = product.name;
    }
  
    // Create FA icon dots
    product.images.forEach((_, index) => {
      const dot = document.createElement('i');
      dot.className = 'fa-solid fa-circle';
      if (index === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        goToImage(index);
      });
      
      dotsContainer.appendChild(dot);
    });
  
    // Button events
    leftBtn.addEventListener('click', () => {
      goToImage((currentImageIndex - 1 + product.images.length) % product.images.length);
    });
  
    rightBtn.addEventListener('click', () => {
      goToImage((currentImageIndex + 1) % product.images.length);
    });
  }
  
  // Change image function
  function goToImage(index) {
    currentImageIndex = index;
    mainImage.src = product.images[index];
    
    // Update FA dots
    document.querySelectorAll('.img-dots i').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Initialize
  initImageSwapper();