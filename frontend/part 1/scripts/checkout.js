



async function getcart(userId) {
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
function getaddress(userid) {
  const country = document.getElementById("country-select").value;
  const name = document.querySelector(".name").value;
  const number = document.querySelector(".phone-number").value;
  const street = document.querySelector(".City").value;
  const apt = document.querySelector(".Provinence").value;
  const state = document.querySelector(".State").value;
  const city = document.querySelector(".Residence").value;
  const zip = document.querySelector(".Postal").value;

  const user_id = userid; 
  console.log("new user",userid);

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
      alert("Network error");
  });
}
function updateAddress(userid) {
  const country = document.getElementById("country-select").value;
  const name = document.querySelector(".name").value;
  const number = document.querySelector(".phone-number").value;
  const street = document.querySelector(".City").value;
  const apt = document.querySelector(".Provinence").value;
  const state = document.querySelector(".State").value;
  const city = document.querySelector(".Residence").value;
  const zip = document.querySelector(".Postal").value;

  const user_id = userid; 

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
      return addressData; 
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
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
          return decodeURIComponent(value);
      }
  }
  return null;
}

async function fetchAddress(userId) {
  try {
    const res = await fetch(`http://localhost/ALSHOPDZ/backend/part1/address.php?user_id=${userId}`);
    const data = await res.json();

    if (data.message === "No address found") {
      return null; // <== return null explicitly
    } else if (data.error) {
      alert("Error: " + data.error);
      return null;
    } else {
      console.log("User address:", data);
      return data;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

function getcard(){
  const cardnumber=document.querySelector(".number-card");
  const namecard=document.querySelector(".name-card");
  const mm=document.querySelector("");
  const yy=document.querySelector("");
  const CVV=document.querySelector(".CVV");
}

function addaddress(address) {
  if (address) {
    const container = document.querySelector(".address-text");
    if (!container) {
     
      return;
    }

    container.innerHTML = `
      <span>${address.full_name},</span>
      <span>${address.phone}</span>
      <p>${address.street}</p>
      <p>${address.state}</p>
      <span>${address.apt},</span>
      <span>${address.city},</span>
      <span>${address.country},</span>
      <span>${address.zip}</span>
    `;
  }
}
async function placeOrder(userId, optionId, quantity, price) {
  try {
    const response = await fetch('http://localhost/ALSHOPDZ/backend/part1/Orders.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        option_id: optionId,
        quantity: quantity,
        price: price
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log(' Order success:', data.message);
      alert('Order placed!');
    } else {
      console.error(' Order failed:', data.error);
      alert('Order failed: ' + data.error);
    }
  } catch (error) {
    console.error(' Network error:', error);
    alert('Network error');
  }
}

document.addEventListener("DOMContentLoaded", async() => {
 let userid="f";
  
  window.addEventListener("pageshow", function (event) {
    if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
      location.reload();
    }
  });
  
 const userCookie = getCookie('user');

if (userCookie) {
    try {
        const user = JSON.parse(userCookie);
        console.log("User found:", user);
              userid=user.id;
      
      
    } catch (e) {
        console.error("Error parsing user cookie:", e);
    }
} else {
    console.log("No user cookie found. Redirecting to login...");
   
}
if(userid==="f"){
  window.location.href="login.html";
}  
let products=[];
if(userid!=="f"){
   products = await getcart(userid);
}


  let addres=await fetchAddress(userid);
  console.log("this userid",addres);
  
  if (addres && typeof addres === "object") {
    console.log("This address:", addres);
    addaddress(addres); 
  } else {
    
  }
  
  
    const modal = document.getElementById("addressModal");
    const openBtn = document.querySelector(".add2");
    const closeBtn = document.querySelector(".close-modal");
    const closepayment = document.querySelector(".close-modal-p");
    const saveBtn = document.querySelector(".Save-address");
    const addpaymentbutton=document.querySelector('.selectcard');
    const cardmodal=document.querySelector('.card-modal');
    const cardsaver=document.querySelector('.card-saver');
    const palceorder=document.getElementById("place-order");
    palceorder.addEventListener("click",()=>{
     products.forEach(async(product,index)=>{
      console.log("the product",product);
      await placeOrder(userid,product.id,product.quantity,product.price*product.quantity);
      await deleteCartItem(product.cart_item_id);
      products2[index].remove();
     });
    });
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
        addres=await updateAddress(userid);
        console.log("this one");
          addaddress(addres);
      }else{
        console.log("new user d",userid);
      getaddress(userid);
      fetchAddress(userid);
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
        updateCartItemQuantity(products[index].cart_item_id,parseInt(result)+1);
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
  
  