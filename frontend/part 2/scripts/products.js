document.addEventListener('DOMContentLoaded', () => {
  initPageA(); // Call the function when the page first loads
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

          // Re-run the JS for Page A after the content is injected
          initPageA();
      } else {
          modalContent.textContent = "Failed to load form.";
      }
  } catch (error) {
      console.error('Error loading form:', error);
      document.getElementById('modalContent').textContent = "Error loading form.";
  }
}

function initPageA() {
  const colors = document.querySelectorAll(".color-1");
  const colorss = ['red', 'green', 'blue', 'yellow', 'purple'];

  colors.forEach((color, index) => {
      color.style.backgroundColor = colorss[index] || 'white';
  });

  const bariers = document.querySelectorAll('.barier');
  bariers.forEach(barier => {
      barier.style.border = 'none';
  });

  bariers.forEach((barier, index) => {
      barier.addEventListener('click', () => {
          bariers.forEach(b => {
              b.style.border = 'none';
          });
          barier.style.display = 'flex';
          barier.style.border = '1px solid black';
      });
  });
}

function closeModal() {
  document.getElementById('productModal').style.display = 'none';
}
