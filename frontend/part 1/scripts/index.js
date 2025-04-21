//event listeners for tabs and buttons

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
        tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
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
    })

// Function to handle tab switching

/*
const sections = {
    home: document.getElementById("home-ui"),
    shop: document.getElementById("shop-ui"),
    checkout: document.getElementById("checkout-ui"),
};

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // Remove 'active' class from all tabs
        tabs.forEach((t) => t.classList.remove("active"));

        // Add 'active' class to the clicked tab
        tab.classList.add("active");

        // Hide all sections
        Object.values(sections).forEach((section) => {
            section.style.display = "none";
        });

        // Show the corresponding section
        const tabText = tab.textContent.trim().toLowerCase();
        if (sections[tabText]) {
            sections[tabText].style.display = "block";
        }
    });
});*/

// Function to handle sidebar opening and closing
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
;});

document.getElementById("cart-button").onclick = function () {
  document.getElementById("mySidebar").style.width = "250px";
};

document.getElementById("cart-button").onclick = function () {
  document.getElementById("mySidebar").style.width = "0";
};



/*<div class="product-section">
            <h4>Samsung</h4>
            <div class="product-card">
                <img src="../../assets/GALAXY_S25_ULTRA_IMAGE.jpg" alt="Galaxy S25 Ultra">
                <h5>Product 1</h5>
                <p>$100</p>
                <button>Add to Cart</button>
            </div>
            <div class="product-card">
                <img src="../../assets/GALAXY_S25_ULTRA_IMAGE.jpg" alt="Galaxy S25 Ultra">
                <h5>Product 2</h5>
                <p>$200</p>
                <button>Add to Cart</button>
            </div>
        </div> */