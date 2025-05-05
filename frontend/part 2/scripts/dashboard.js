document.addEventListener('DOMContentLoaded', async () => {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
          tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          });
    });

    const brandBtns = document.querySelectorAll('.brand-btn');
        brandBtns.forEach(btn => {
            btn.addEventListener('click', () => {
            brandBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const cetegoryBtns = document.querySelectorAll('.category-btn');
    cetegoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
        cetegoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    

    const response = await fetch("http://localhost/ALSHOPDZ/backend/part2/dashboard.php");
    const stats = await response.json();

    const product_count = document.querySelector('.products-count');
    const user_count = document.querySelector('.users-count');
    const order_count = document.querySelector('.orders-count');

    product_count.textContent = stats.data['total_products'];
    user_count.textContent = stats.data['active_users'];
    order_count.textContent = stats.data['total_orders'];
});