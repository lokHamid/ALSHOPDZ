async function signup() {
    const username = document.querySelector(".user-name").value.trim();
    const email = document.querySelector(".Email").value.trim();
    const password = document.querySelector(".Password").value.trim();
    const passwordfield = document.querySelector(".Password");
    const confirmPassword = document.querySelector(".Password-conf").value.trim();

   
    if (password !== confirmPassword) {
        passwordfield.style.border = "0.5px solid red";
        return; 
    } else {
        passwordfield.style.border = ""; 
    }

   
    if (!username || !email || !password) {
        alert("Please fill in all fields");
        return;
    }

    
    const userData = {
        username: username,
        email: email,
        password: password,
    };

    try {
        
        const response = await fetch('http://localhost/ALSHOPDZ/backend/part2/users.php?action=create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("User created successfully!");
            const now = new Date();
    now.setTime(now.getTime() + 1 * 60 * 1000); 
    document.cookie = `user=${encodeURIComponent(JSON.stringify(data))}; expires=${now.toUTCString()}; path=/`;
} else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert("There was an error creating the user. Please try again.");
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
           signup();
        });
    }
});
