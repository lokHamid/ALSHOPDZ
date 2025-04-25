document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("addressModal");
    const openBtn = document.querySelector(".add2");
    const closeBtn = document.querySelector(".close-modal");
    const saveBtn = document.querySelector(".Save-address");
  
    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
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
  