document.addEventListener('DOMContentLoaded', () => {
    function positionDropdown(dropdown, statusCell) {
        const rect = statusCell.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();
        
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = Math.min(200, dropdown.scrollHeight);
        
        dropdown.style.top = '';
        dropdown.style.bottom = '';
        dropdown.style.left = '16px';
        dropdown.classList.remove('dropdown-above');
        
        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
            dropdown.style.bottom = '100%';
            dropdown.style.top = 'auto';
            dropdown.classList.add('dropdown-above');
        }
        
        const containerRect = dropdown.parentElement.getBoundingClientRect();
        const rightEdge = containerRect.left + parseInt(dropdown.style.left || 16) + dropdown.offsetWidth;
        const windowWidth = window.innerWidth;
        
        if (rightEdge > windowWidth) {
            const overflowAmount = rightEdge - windowWidth;
            dropdown.style.left = `${Math.max(5, parseInt(dropdown.style.left || 16) - overflowAmount - 10)}px`;
        }
    }
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
        });
    });

    const statusCells = document.querySelectorAll('.grid-cell .status-badge');
    statusCells.forEach(statusCell => {
        statusCell.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const existingDropdown = document.querySelector('.status-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
            }
            
            const dropdown = document.createElement('div');
            dropdown.className = 'status-dropdown';
            
            const statuses = [
                { value: 'pending', label: 'Pending', class: 'pending' },
                { value: 'completed', label: 'Completed', class: 'completed' },
                { value: 'cancelled', label: 'Cancelled', class: 'cancelled' }
            ];
            
            statuses.forEach(status => {
                const option = document.createElement('div');
                option.className = `dropdown-option ${status.class}`;
                option.textContent = status.label;
                option.dataset.value = status.value;
                
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    statusCell.textContent = status.label;
                    statusCell.className = `status-badge ${status.class}`;
                    dropdown.remove();
                    
                    console.log(`Status updated to: ${status.value}`);
                });
                
                dropdown.appendChild(option);
            });
            
            const parentCell = statusCell.closest('.grid-cell');
            parentCell.appendChild(dropdown);
            
            positionDropdown(dropdown, statusCell);
            
            const repositionHandler = () => positionDropdown(dropdown, statusCell);
            window.addEventListener('resize', repositionHandler);
            
            dropdown.addEventListener('remove', () => {
                window.removeEventListener('resize', repositionHandler);
            });
        });
    });
    
    document.addEventListener('click', () => {
        const dropdown = document.querySelector('.status-dropdown');
        if (dropdown) {
            dropdown.remove();
        }
    });
});