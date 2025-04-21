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
    
  })

  //handle sidebar open:
  const sidebar = document.getElementById("sidebar");
    const openSidebarBtn = document.getElementById("openSidebar");
    const closeSidebarBtn = document.getElementById("closeSidebar");

    // Open sidebar
    openSidebarBtn.addEventListener("click", () => {
        sidebar.classList.add("open");
    });

    // Close sidebar
    closeSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });
});

  //cart stuff here: 
  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "250px";
  };
  
  document.getElementById("cart-button").onclick = function () {
    document.getElementById("mySidebar").style.width = "0";
  };

  function smoothNavigate(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }

