document.addEventListener('DOMContentLoaded', async () => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

        });
    });

    const categoryBtns = document.querySelectorAll('.filter-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterListItems(btn.textContent);
        });
    });

    const tableContainer = document.querySelector(".grid-table");
    const orders = await getAllOrders();

    console.log(orders);

    orders.forEach(order => {
        row = document.createElement('div');
        row.classList.add('grid-row');
        
        const orderId = document.createElement('div');
        orderId.classList.add('grid-cell');
        orderId.textContent = order['id'];

        const img = document.createElement('img');
        img.src = order['image'];
        img.alt = "Image not loaded";
        const orderImage = document.createElement('div');
        orderImage.classList.add('grid-cell');
        orderImage.appendChild(img);

        const orderVersion = document.createElement('div');
        orderVersion.classList.add('grid-cell');
        orderVersion.textContent = order['descrip'];

        const orderDate = document.createElement('div');
        orderDate.classList.add('grid-cell');
        orderDate.textContent = order['date_order'];

        const orderStatus = document.createElement('div');
        orderStatus.classList.add('grid-cell');
        const statusBadge = document.createElement('span');
        statusBadge.classList.add('status-badge');
        statusBadge.classList.add(order['statu'])
        statusBadge.textContent = fetchLabelForStatus(order['statu']);
        orderStatus.appendChild(statusBadge);

        const orderOwner = document.createElement('div');
        orderOwner.classList.add('grid-cell');
        orderOwner.textContent = order['username'];

        const orderQuantity = document.createElement('div');
        orderQuantity.classList.add('grid-cell');
        orderQuantity.textContent = order['quantity'];

        const price = document.createElement('div');
        price.classList.add('grid-cell');
        price.textContent = (order.price || 0) * (order.quantity || 0);

        row.appendChild(orderId);
        row.appendChild(orderImage);
        row.appendChild(orderVersion);
        row.appendChild(orderDate);
        row.appendChild(orderStatus);
        row.appendChild(orderOwner);
        row.appendChild(orderQuantity);
        row.appendChild(price);

        tableContainer.appendChild(row);
    })
}); 


async function getAllOrders(){
    try{
        const response = await fetch('http://localhost/ALSHOPDZ/backend/part2/orders.php');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log("ERROR OCCURRED: ",error);
        return [];
    }
}

function fetchLabelForStatus(status){
    switch(status){
        case 'pending':
            return "Pending";
        case 'canceled':
            return "Cancelled";
        case 'completed':
            return "Completed";
        default:
            return "pending";
    }
}

function filterListItems(statusToFilter) {
    const items = document.querySelectorAll('.grid-row');
  
    items.forEach(item => {
      const badge = item.querySelector('.status-badge');
  
      if (badge && badge.textContent.toLowerCase().includes(statusToFilter.toLowerCase())) {
        item.style.display = '';
      }else if (statusToFilter.includes("All Orders")) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
  