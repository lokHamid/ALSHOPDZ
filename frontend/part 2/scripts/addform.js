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
  
  
  document.addEventListener("DOMContentLoaded", () => {

    const categoryBtns = document.querySelectorAll('.choice');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const status = btn.dataset.status;
            filterListItems(status);
        });
    });

    
  
  const brandButtons = document.querySelectorAll(".bchoice");
  const versionOptions = document.querySelectorAll(".ram-rom");

versionOptions.forEach(option => {
  option.addEventListener("click", () => {
    versionOptions.forEach(v => {
      v.style.backgroundColor = "";
      v.style.color = "";
    });

    option.style.backgroundColor = "black";
    option.style.color = "white";
  });
});
  
  brandButtons.forEach(button => {
    button.addEventListener("click", () => {
      brandButtons.forEach(btn => {
        btn.style.backgroundColor = "";
        btn.style.color = "";
      });
      button.style.backgroundColor = "black";
      button.style.color = "white";
    });
  });
    const addColorBtn = document.querySelector(".add-color");
  
   
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.style.position = "absolute";
    colorPicker.style.opacity = "0";
    colorPicker.style.width = "1px";
    colorPicker.style.height = "1px";
    colorPicker.style.border = "none";
    colorPicker.style.padding = "0";
    colorPicker.style.zIndex = "9999";
    document.body.appendChild(colorPicker);
  
    addColorBtn.addEventListener("click", () => {
      // Position it right beside the button
      const rect = addColorBtn.getBoundingClientRect();
      colorPicker.style.left = `${rect.right + window.scrollX}px`;
      colorPicker.style.top = `${rect.top + window.scrollY}px`;
  
      colorPicker.click();
    });
  
    colorPicker.addEventListener("input", (e) => {
      const selectedColor = e.target.value;
      console.log("Selected color:", selectedColor);
    });
  });
  
  
  function createProduct(){
    const prodId = document.querySelector('.ID-input').value;
    const prodName = document.querySelector('.Name-input').value;
    const prodDesc = document.querySelector('.Desc-input').value;


  }