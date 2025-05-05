async function login() {
    const email = document.querySelector(".Email").value.trim();
    const password = document.querySelector(".Password").value.trim();

    if (!email || !password) {
        alert("Please fill in both email and password.");
        return;
    }

    try {
        const response = await fetch("http://localhost/ALSHOPDZ/backend/part2/users.php?action=login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Login successful!");
    console.log("User data:", result);

    
    const now = new Date();
    now.setTime(now.getTime() + 24 * 60 * 1000); // 1 minute in ms
    document.cookie = `user=${encodeURIComponent(JSON.stringify(result))}; expires=${now.toUTCString()}; path=/`;
            // localStorage.setItem("user", JSON.stringify(result));
            
            if(result.role==="admin"){
            window.location.href = "dashboard.html";
            }else{
             
              window.history.back();
  
            }
        } else {
            alert("Login failed: " + result.message);
        }

    } catch (error) {
        console.error("Login error:", error);
        alert("Network error during login.");
    }
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

document.addEventListener('DOMContentLoaded', () => {
    const userCookie = getCookie('user');
    
    if (userCookie) {
        try {
            const user = JSON.parse(userCookie);
            console.log("User is already logged in:", user);

            // Example: redirect to dashboard
            // window.location.href = "dashboard.html";

            // Or update UI
            // document.querySelector('.welcome').textContent = `Welcome back, ${user.name}`;

        } catch (e) {
            console.error("Failed to parse user cookie:", e);
        }
    } else {
        console.log("No user cookie found.");
    }

    const btn = document.querySelector('.Sign-in');
    if (btn) {
        btn.addEventListener('click', ()=>{
            login();
        });
    }
});
