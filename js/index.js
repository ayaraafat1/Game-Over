// !========================== Start Global Variables================//
const inputs = document.querySelectorAll("input")
const btnLogin = document.querySelector("#btnLogin")
const showPassword = document.getElementById("showPassword")
const formlogin = document.getElementById("login")
const msgElement = document.getElementById("msg");
const modeBtn = document.getElementById("mode");
let isValid = false;

if (localStorage.getItem("theme")) {
    const theme = localStorage.getItem("theme");
    document.documentElement.dataset.theme = localStorage.getItem("theme");
    if (theme === "light") {
       modeBtn.classList.replace("fa-sun", "fa-moon");
    } else {
       modeBtn.classList.replace("fa-moon", "fa-sun");
    }
 }
// !========================== End Global Variables================//



// ========================== Start Events====================//
document.forms[0].addEventListener("submit",(e) =>{
    e.preventDefault();
    if(isValid === true)
    {
        setForm()
        clearForm()
    }
});

formlogin.addEventListener("input", () =>{
    if ( validationEmail() && validationPassword()) {
        btnLogin.removeAttribute("disabled");
       isValid = true;
    } else {
        btnLogin.setAttribute("disabled", true);
       isValid = false;
    }
});

showPassword.addEventListener("click",() =>{
    togglePasswordVisibility('password',showPassword);
});

modeBtn.addEventListener("click", function (e) {
    theme(e.target);
});
// ========================== End Events====================//



// ?========================== Start Functions================//

// function to get user data from inputs then send data to api function
function setForm()
{
    const user = {
        email:inputs[0].value,
        password:inputs[1].value
    }
    loginForm(user); 
}

// function send data to API
async function loginForm(userData) {
    const api = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
        
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    const response = await api.json();
    if (response.message === "success") {
        localStorage.setItem("uToken",response.token)
       location.href = "./home.html";
     } else {
        msgElement.innerText = response.message;
     }
}

// function to clear all Inputs
function clearForm()
{
    for (const input of inputs) {
        input.value="";
        input.classList.remove("is-valid")
        showPassword.innerHTML ='<i class="fa-solid fa-eye"></i>'
    }
}

// function to show passward or hide passward
function togglePasswordVisibility(inputId,button) {
    const input = document.getElementById(inputId);
    // Toggle the type of the input field
    if (input.type === 'password') {
      input.type = 'text'; // Show password
        button.innerHTML ='<i class="fa-solid fa-eye-slash"></i>'
    } else {
      input.type = 'password'; // Hide password
        button.innerHTML ='<i class="fa-solid fa-eye"></i>'
    }
}

// function to toggle mode
function theme(element) {
    const rootElement = document.documentElement;
    if (element.classList.contains("fa-sun")) {
       element.classList.replace("fa-sun", "fa-moon");
       rootElement.dataset.theme = "light";
       localStorage.setItem("theme", "light");
    } else {
       element.classList?.replace("fa-moon", "fa-sun");
       rootElement.dataset.theme = "dark";
       localStorage.setItem("theme", "dark");
    }
}

//========== Validation functions
function validationEmail() {
    const emailRegex =
       /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
 
    if (emailRegex.test(inputs[0].value)) {
       inputs[0].classList.remove("is-invalid");
       inputs[0].classList.add("is-valid");
       return true;
    } else {
       inputs[0].classList.add("is-invalid");
       inputs[0].classList.remove("is-valid");
       return false;
    }
 }
 
function validationPassword() {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(inputs[1].value)) {
       inputs[1].classList.remove("is-invalid");
       inputs[1].classList.add("is-valid");
       showPassword.style.top = "50%"
       return true;
    } else {
       inputs[1].classList.add("is-invalid");
       inputs[1].classList.remove("is-valid");
       showPassword.style.top = "20%"
       return false;
    }
 }

// ?========================== End Functions================//