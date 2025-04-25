function setupColorsAndBarriers() {
    const colors = document.querySelectorAll(".color-1");
    const colorss = ['red', 'green', 'blue', 'yellow', 'purple'];
    
    colors.forEach((color, index) => {
      color.style.backgroundColor = colorss[index] || 'white';
    });
  
    const bariers = document.querySelectorAll('.barier');
  
    bariers.forEach(barier => {
      barier.style.border = 'none';
    });
  
    bariers.forEach((barier) => {
      barier.addEventListener('click', () => {
        bariers.forEach(b => {
          b.style.border = 'none';
        });
        barier.style.display = 'flex';
        barier.style.border = '1px solid black';
      });
    });
  }
  
  // Run automatically if DOM is ready (for standalone use)
  document.addEventListener('DOMContentLoaded', setupColorsAndBarriers);
  