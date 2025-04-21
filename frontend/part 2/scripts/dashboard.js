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