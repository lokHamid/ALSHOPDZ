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
            const status = btn.dataset.status;
            filterListItems(status);
        });
    });

    const tableContainer = document.querySelector(".grid-table");
    const users = await getAllUsers();

    renderUsers(users,tableContainer);
});

function renderUsers(users,tableContainer){
    users.forEach(user => {
        const row = document.createElement('div');
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

        // STATUS
        const statusCell = document.createElement('div');
        statusCell.classList.add('grid-cell');
        const statusSelect = document.createElement('select');
        statusSelect.classList.add('status-dropdown');

        ['active', 'inactive'].forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option.charAt(0).toUpperCase() + option.slice(1);
            if (user['status'] === option) opt.selected = true;
            statusSelect.appendChild(opt);
        });

        updateStatusColor(statusSelect);

        statusSelect.addEventListener('change', () => {
            updateUserStatus(user['id'], statusSelect.value);
            updateStatusColor(statusSelect);
            filterListItems(document.querySelector('.filter-btn.active')?.dataset.status || 'all');
        });

        statusCell.appendChild(statusSelect);

        // ROLE
        const roleCell = document.createElement('div');
        roleCell.classList.add('grid-cell');
        const roleSelect = document.createElement('select');
        roleSelect.classList.add('role-dropdown');

        ['user', 'admin'].forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option.charAt(0).toUpperCase() + option.slice(1);
            if (user['role'] === option) opt.selected = true;
            roleSelect.appendChild(opt);
        });

        updateRoleColor(roleSelect);

        roleSelect.addEventListener('change', () => {
            updateUserRole(user['id'], roleSelect.value);
            updateRoleColor(roleSelect);
        });

        roleCell.appendChild(roleSelect);

        row.appendChild(userId);
        row.appendChild(usernameDiv);
        row.appendChild(userEmail);
        row.appendChild(dateCreated);
        row.appendChild(statusCell);
        row.appendChild(roleCell);

        const delIcon = document.createElement('i');
        delIcon.classList.add('fa-solid', 'fa-trash');

        const editIcon = document.createElement('i');
        editIcon.classList.add('fa-solid', 'fa-pen-to-square');

        const delBtn = document.createElement('button');
        delBtn.classList.add('delete-product-btn');
        delBtn.addEventListener('click',() => {
            deleteUser(user['id']);
        });
        delBtn.appendChild(delIcon);

        const manageBtnsSection = document.createElement('div');
        manageBtnsSection.classList.add('manage-btns-section');

        manageBtnsSection.appendChild(delBtn);

        row.appendChild(manageBtnsSection);
        tableContainer.appendChild(row);
    });
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost/ALSHOPDZ/backend/part2/users.php?id=${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        alert("User deleted successfully");
        location.reload();
    } catch (error) {
        console.error("ERROR OCCURRED:", error);
    }
}

function filterListItems(statusToFilter) {
    const rows = document.querySelectorAll('.grid-row');

    rows.forEach(row => {
        const statusSelect = row.querySelector('.status-dropdown');
        if (statusToFilter === 'all') {
            row.style.display = '';
        } else if (
            statusSelect &&
            statusSelect.value.toLowerCase().trim() === statusToFilter
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

async function getAllUsers() {
    try {
        const response = await fetch('http://localhost/ALSHOPDZ/backend/part2/users.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("ERROR OCCURRED: ", error);
        return [];
    }
}
async function updateUserStatus(id, newStatus) {
    await fetch(`http://localhost/ALSHOPDZ/backend/part2/users.php?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });
}

async function updateUserRole(id, newRole) {
    await fetch(`http://localhost/ALSHOPDZ/backend/part2/users.php?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
    });
}


function updateStatusColor(select) {
    if (select.value === 'active') {
        select.style.backgroundColor = '#f0fff0';  // lightgreen
        select.style.color = 'green';
    } else {
        select.style.backgroundColor = '#ffe5e5';  // lightred
        select.style.color = 'red';
    }
    select.style.border = 'none';
}

function updateRoleColor(select) {
    if (select.value === 'admin') {
        select.style.backgroundColor = '#e5f1ff';  // lightblue
        select.style.color = 'blue';
    } else {
        select.style.backgroundColor = '#fff4e5';  // lightorange
        select.style.color = 'orange';
    }
    select.style.border = 'none';
}
