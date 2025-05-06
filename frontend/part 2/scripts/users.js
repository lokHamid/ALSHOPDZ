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
    const users = await getAllUsers();


    users.forEach(user => {
        row = document.createElement('div');
        row.classList.add('grid-row');
        
        const userId = document.createElement('div');
        userId.classList.add('grid-cell');
        userId.textContent = user['id'];

        const usernameDiv = document.createElement('div');
        const username = document.createElement('span');

        usernameDiv.classList.add('grid-cell');
        username.textContent = user['username'];
        usernameDiv.appendChild(username);

        const userEmail = document.createElement('div');
        userEmail.classList.add('grid-cell');
        userEmail.textContent = user['email'];

        const dateCreated = document.createElement('div');
        dateCreated.classList.add('grid-cell');
        dateCreated.textContent = user['date_created'];

        const status = document.createElement('div');
        status.classList.add('grid-cell');
        const statusBadge = document.createElement('span');
        statusBadge.classList.add('status-badge');
        statusBadge.classList.add(user['status']);
        statusBadge.textContent = user['status'];

        status.appendChild(statusBadge);

        const role = document.createElement('div');
        role.classList.add('grid-cell');
        const roleBade = document.createElement('span');
        roleBade.classList.add('status-badge');
        roleBade.classList.add(user['role']);
        roleBade.textContent = user['status'];

        role.appendChild(roleBade);

        row.appendChild(userId);
        row.appendChild(usernameDiv);
        row.appendChild(userEmail);
        row.appendChild(dateCreated);
        row.appendChild(status);
        row.appendChild(role);

        tableContainer.appendChild(row);
    })
}); 


async function getAllUsers(){
    try{
        const response = await fetch('http://localhost/ALSHOPDZ/backend/part2/users.php');

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