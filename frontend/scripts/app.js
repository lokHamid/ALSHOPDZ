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
});});



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