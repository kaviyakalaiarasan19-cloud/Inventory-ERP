function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    if(username === "admin" && password === "admin123"){

        msg.style.color = "green";
        msg.innerHTML = "Login Successful...";

        setTimeout(()=>{
            window.location.href = "dashboard.html";
        },1000);

    }
    else{

        msg.style.color = "red";
        msg.innerHTML = "Invalid Username or Password";

    }

}