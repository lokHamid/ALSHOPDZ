const products=[
  {
   image:'../../assets/images/iphone16.jfif',
   brand:'Apple',
   price:'1000$',
   name:'IPhone 16 pro max',
  },
  {
    image:'../../assets/images/iphone16.jfif',
    brand:'Apple',
    price:'1000$',
    name:'IPhone 16 pro max',
   },
   {
    image:'../../assets/images/iphone16.jfif',
    brand:'Apple',
    price:'1000$',
    name:'IPhone 16 pro max',
   },
];

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("addressModal");
    const openBtn = document.querySelector(".add2");
    const closeBtn = document.querySelector(".close-modal");
    const closepayment = document.querySelector(".close-modal-p");
    const saveBtn = document.querySelector(".Save-address");
    const addpaymentbutton=document.querySelector('.selectcard');
    const cardmodal=document.querySelector('.card-modal');
    const cardsaver=document.querySelector('.card-saver');
    addpaymentbutton.addEventListener('click',()=>{
     cardmodal.style.display="flex";
    });
    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      
    });
    closepayment.addEventListener("click", () => {
      cardmodal.style.display = "none";
      
    });
    cardsaver.addEventListener("click", () => {
      cardmodal.style.display = "none";
    });
  
    saveBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
    const countries = [
      { name: "United States", code: "us" },
      { name: "Algeria", code: "dz" },
      { name: "Germany", code: "de" },
      { name: "France", code: "fr" },
      { name: "Japan", code: "jp" },
      { name: "India", code: "in" }
    ];
  
    const select = document.getElementById("country-select");
    const selectedDisplay = document.getElementById("selected-country");
  
    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      select.appendChild(option);
    });
   
     
     const scrrolable=document.querySelector('.scrollable');
     products.forEach((product)=>{
      const  cardproduct=document.createElement('div');
      cardproduct.classList.add('product');
      cardproduct.innerHTML=`
      
        <div class="img">
            <img src=${product.image} alt="iphone">
        </div>
        <div class="info-device">
        <h2>${product.name}</h2>
        <h6>${product.brand}</h6>
        <p>${product.price}</p>
        </div>
        <div class="quan">
        <div class="quantity">
         <button class="minus">-</button>
         <p class="sum">1</p>
         <button class="add">+</button>
        </div>
        <div class="delete">
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>
       
       
      `;
      scrrolable.appendChild(cardproduct);
     });

     const dels=document.querySelectorAll('.delete');
     const products2=document.querySelectorAll('.product');
      dels.forEach((del,index)=>{
       del.addEventListener('click',()=>{
         products2[index].remove();
       });
      });

    const adds=document.querySelectorAll('.add');
    const minuss=document.querySelectorAll('.minus');
    const sum=document.querySelectorAll('.sum');

    minuss.forEach((minus,index)=>{
      minus.addEventListener("click",()=>{
        let result=sum[index].innerText;
        if(Number(result)>=1){
        sum[index].innerText=String(Number(result)-1); 
        }
  
      });
     
    });
   
    

    adds.forEach((add,index)=>{
      add.addEventListener("click",()=>{
        let result=sum[index].innerText;
        sum[index].innerText=String(Number(result)+1); 
  
      });
    });
    let subtotal=0;
    let quantities=0;
    sum.forEach((quantity)=>{
    quantity.addEventListener(()=>{
     quantities=Number(quantity.innerText);
    });
    
    });
    select.addEventListener("change", () => {
      const selectedCode = select.value;
      const selectedCountry = countries.find(c => c.code === selectedCode);
  
      if (selectedCountry) {
        selectedDisplay.innerHTML = `
          <img src="https://flagcdn.com/48x36/${selectedCode}.png" alt="${selectedCountry.name} Flag">
          <span>${selectedCountry.name}</span>
        `;
      }
    });
  });
  