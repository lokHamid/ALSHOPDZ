



async function getcart(userId = 2) {
  try {

      const response = await fetch(`http://localhost/ALSHOPDZ/backend/part1/cart.php/${userId}`);
      
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      return data;
  } catch (error) {
      console.error('Error fetching cart data:', error);
      return null;
  }
}
const products2=[
  {
   image:'../../assets/images/iphone16.jfif',
   brand:'Apple',
   price:'100$',
   name:'IPhone 16 pro max',
  },
  {
    image:'../../assets/images/iphone16.jfif',
    brand:'Apple',
    price:'300$',
    name:'IPhone 16 pro max',
   },
   {
    image:'../../assets/images/iphone16.jfif',
    brand:'Apple',
    price:'1000$',
    name:'IPhone 16 pro max',
   },
];

async function updateCartItemQuantity(cartItemId, newQuantity) {
  try {
      const response = await fetch(`http://localhost/ALSHOPDZ/backend/part1/cart.php`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              cart_item_id: cartItemId,
              quantity: newQuantity
          })
      });
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Quantity updated:', data);
      return data;
  } catch (error) {
      console.error('Error updating quantity:', error);
      return null;
  }
}
async function deleteCartItem(cartItemId) {
try {
    const response = await fetch(`http://localhost/ALSHOPDZ/backend/part1/cart.php`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cart_item_id: cartItemId
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Item deleted:', data);
    return data;
} catch (error) {
    console.error('Error deleting item:', error);
    return null;
}
}
function getaddress() {
  const country = document.getElementById("country-select").value;
  const name = document.querySelector(".name").value;
  const number = document.querySelector(".phone-number").value;
  const street = document.querySelector(".City").value;
  const apt = document.querySelector(".Provinence").value;
  const state = document.querySelector(".State").value;
  const city = document.querySelector(".Residence").value;
  const zip = document.querySelector(".Postal").value;

  const user_id = 2; // Replace this with actual logged-in user's ID

  const addressData = {
      user_id: user_id,
      full_name: name,
      phone: number,
      street: street,
      apt: apt,
      city: city,
      state: state,
      country: country,
      zip: zip
  };

  fetch('http://localhost/ALSHOPDZ/backend/part1/address.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(addressData)
  })
  .then(res => res.json())
  .then(data => {
      if (data.message) {
          alert("Address saved successfully");
      } else {
          alert("Error: " + data.error);
      }
  })
  .catch(error => {
      console.error("Network error:", error);
      alert("❌Network error");
  });
}
function updateAddress() {
  const country = document.getElementById("country-select").value;
  const name = document.querySelector(".name").value;
  const number = document.querySelector(".phone-number").value;
  const street = document.querySelector(".City").value;
  const apt = document.querySelector(".Provinence").value;
  const state = document.querySelector(".State").value;
  const city = document.querySelector(".Residence").value;
  const zip = document.querySelector(".Postal").value;

  const user_id = 2; 

  const addressData = {
    user_id,
    full_name: name,
    phone: number,
    street,
    apt,
    city,
    state,
    country,
    zip
  };

  return fetch('http://localhost/ALSHOPDZ/backend/part1/address.php', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(addressData)
  })
  .then(res => {
    if (!res.ok) throw new Error("Server error");
    return res.json();
  })
  .then(data => {
    if (data.message) {
      alert("Address saved successfully");
      return addressData; // ✅ Return address data here
    } else {
      alert(" Error: " + (data.error || "Unknown error"));
      return null;
    }
  })
  .catch(error => {
    console.error(" Network error:", error);
    alert(" Network error");
    return null;
  });
}

async function fetchAddress(userId) {
  try {
    const res = await fetch(`http://localhost/ALSHOPDZ/backend/part1/address.php?user_id=${userId}`);
    const data = await res.json();
    
    if (data.message === "No address found") {
        alert("No address saved.");
    } else if (data.error) {
        alert("Error: " + data.error);
    } else {
        console.log("User address:", data);
        return data;      }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function getcard(){
  const cardnumber=document.querySelector(".number-card");
  const namecard=document.querySelector(".name-card");
  const mm=document.querySelector("");
  const yy=document.querySelector("");
  const CVV=document.querySelector(".CVV");
}

function addaddress(addres){
  const container=document.querySelector(".address-text");
  container.innerHTML="";
  container.innerHTML=`
  <span>${addres.full_name},</span>
  <span>${addres.phone}</span>
  <p> ${addres.street}</p>
  <p>${addres.state} </p>
  <span>${addres.apt},</span>
  <span>${addres.city},</span>
  <span>${addres.country},</span>
  <span>${addres.zip},</span>
  `
 
}
document.addEventListener("DOMContentLoaded", async() => {
  let addres=await fetchAddress(2);
  
   if(addres!==null){
   addaddress(addres);
   console.log("this address",addres);
   }
  const products = await getcart(2);
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
  
    saveBtn.addEventListener("click", async() => {
      if(addres!==null){
        addres=await updateAddress();
        console.log("new address",addres)
          addaddress(addres);
      }else{
      getaddress();
      }
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
            <img src=${product.product_image} alt="iphone">
        </div>
        <div class="info-device">
        <h2>${product.product_name}</h2>
        <h6>${product.brand}</h6>
        <p>${product.price}</p>
        </div>
        <div class="quan">
        <div class="quantity">
         <button class="minus">-</button>
         <p class="sum">${product.quantity}</p>
         <button class="add">+</button>
        </div>
        <div class="delete">
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>
       
       
      `;
      scrrolable.appendChild(cardproduct);
     });
     function calculateTotal() {
      const prices = document.querySelectorAll('.info-device p');
      const quantities = document.querySelectorAll('.sum');
      const shippingfees = document.getElementById('shipping-fee');
      const shippingValue = parseFloat(shippingfees.innerText.replace('$', ''));
      const totalprice=document.getElementById("totalprice");
      let total = 0;
       let totalp=0;
      prices.forEach((price, index) => {
        const priceValue = parseFloat(price.innerText.replace('$', ''));
        
        const quantityValue = parseInt(quantities[index].innerText);
        total += priceValue * quantityValue;
        
      });
    
      const totalPriceElement = document.getElementById('subtotal');
      totalPriceElement.innerText = `$${total.toFixed(2)}`;
      totalp=total+shippingValue;
      totalprice.innerText=`$${totalp.toFixed(2)}`;
    }
    calculateTotal();
    
     const dels=document.querySelectorAll('.delete');
     const products2=document.querySelectorAll('.product');
      dels.forEach((del,index)=>{
       del.addEventListener('click',()=>{
        console.log("the id of cart",products[index].cart_item_id)
        deleteCartItem(products[index].cart_item_id);
         products2[index].remove();
          calculateTotal();
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
        updateCartItemQuantity(products[index].cart_item_id,parseInt(result)-1);
        calculateTotal();
      });
     
    });
   
    

    adds.forEach((add,index)=>{
      add.addEventListener("click",()=>{
        let result=sum[index].innerText;
        sum[index].innerText=String(Number(result)+1); 
        updateCartItemQuantity(products[index].cart_item_id,parseInt(result)-1);
       calculateTotal();
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
  
  