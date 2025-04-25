
const products = [
    {
      brand: "Apple",
      name: "iphone 16 pro",
      desc: "Build For Apple Intelligence",
      
      imgSrc: "../../assets/images/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
      instalment: "Starting At $30/month for 24 Months",
      price: "Full Price: $1,099.00"
    },
    {
        brand: "Samsung",
        name: "Samsung Galaxy S25 Ultra",
        desc: "Build For Apple Intelligence",
        imgSrc: "../../assets/images/GALAXY_S25_ULTRA_IMAGE.jpg",
        instalment: "Starting At $30/month for 24 Months",
        price: "Full Price: $1,099.00"
      },
      {
        brand: "Apple",
        name: "iPhone 16 pro max",
        desc: "Build For Apple Intelligence",
        imgSrc: "../../assets/images/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
        instalment: "Starting At $30/month for 24 Months",
        price: "Full Price: $1,099.00"
      },
      {
        brand: "Apple",
        name: "iPhone 16 pro max",
        desc: "Build For Apple Intelligence",
        imgSrc: "../../assets/images/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
        instalment: "Starting At $30/month for 24 Months",
        price: "Full Price: $1,099.00"
      },
      {
        brand: "Apple",
        name: "iPhone 16 pro max",
        desc: "Build For Apple Intelligence",
        imgSrc: "../../assets/images/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
        instalment: "Starting At $30/month for 24 Months",
        price: "Full Price: $1,099.00"
      },
      {
        brand: "Apple",
        name: "iPhone 16 pro max",
        desc: "Build For Apple Intelligence",
        imgSrc: "../../assets/images/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg",
        instalment: "Starting At $30/month for 24 Months",
        price: "Full Price: $1,099.00"
      },
   
  ];


document.addEventListener('DOMContentLoaded', () => {
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
          <p class="product-price">${product.price}</p>
        `;
    
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

  
  
  
  