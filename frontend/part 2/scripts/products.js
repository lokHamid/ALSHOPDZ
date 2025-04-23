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
      });
    });
    async function openProductForm() {
        try {
          const response = await fetch('addform.html');
          const htmlText = await response.text();
      
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, 'text/html');
          const mainDiv = doc.querySelector('.Main');
      
          const modalContent = document.getElementById('modalContent');
          if (mainDiv) {
            modalContent.innerHTML = '';
            modalContent.appendChild(mainDiv);
            document.getElementById('productModal').style.display = 'flex';
          } else {
            modalContent.textContent = "Failed to load form.";
          }
        } catch (error) {
          console.error('Error loading form:', error);
          document.getElementById('modalContent').textContent = "Error loading form.";
        }
      }
      
      function closeModal() {
        document.getElementById('productModal').style.display = 'none';
      }
      