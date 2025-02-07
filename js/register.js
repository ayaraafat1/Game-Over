// !========================== Start Global Variables================//
const inputs = document.querySelectorAll("input")
const btnRegister = document.querySelector("#btnRegister")
const showPassword = document.getElementById("showPassword")
const showRePassword = document.getElementById("showRePassword")
const formRegister = document.getElementById("register")
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
formRegister.addEventListener("input", () =>{
    if (validationName()  && validationEmail() && validationPassword()  && checkPassword() && validationPhone()) {
       btnRegister.removeAttribute("disabled");
       isValid = true;
    } else {
       btnRegister.setAttribute("disabled", true);
       isValid = false;
    }
});
showPassword.addEventListener("click",() =>{
    togglePasswordVisibility('password',showPassword);
});
showRePassword.addEventListener("click",() =>{
    togglePasswordVisibility('rePassword',showRePassword);
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
        name:inputs[0].value,
        email:inputs[1].value,
        password:inputs[2].value,
        rePassword:inputs[3].value,
        phone:inputs[4].value
    }
    registerForm(user); 
}

// function send data to API
async function registerForm(userData) {
    const api = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
        
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    const response = await api.json();
    console.log(response)
    if (response.message === "success") {
       location.href = "./index.html";
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
        showRePassword.innerHTML ='<i class="fa-solid fa-eye"></i>'
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
function validationName() { 
    const nameRegex =
       /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){3,20}$/;
 
    if (nameRegex.test(inputs[0].value)) {
       inputs[0].classList.remove("is-invalid");
       inputs[0].classList.add("is-valid");
       return true;
    } else {
       inputs[0].classList.add("is-invalid");
       inputs[0].classList.remove("is-valid");
       return false;
    }
 }
 
function validationEmail() {
    const emailRegex =
       /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
 
    if (emailRegex.test(inputs[1].value)) {
       inputs[1].classList.remove("is-invalid");
       inputs[1].classList.add("is-valid");
       return true;
    } else {
       inputs[1].classList.add("is-invalid");
       inputs[1].classList.remove("is-valid");
       return false;
    }
 }
 
function validationPassword() {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(inputs[2].value)) {
       inputs[2].classList.remove("is-invalid");
       inputs[2].classList.add("is-valid");
       showPassword.style.top = "50%"
       return true;
    } else {
       inputs[2].classList.add("is-invalid");
       inputs[2].classList.remove("is-valid");
       showPassword.style.top = "20%"
       return false;
    }
 }
 
function validationPhone() {
    const Phone = /^01[0125]\d{8}$/;
 
    if (Phone.test(inputs[4].value)) {
       inputs[4].classList.remove("is-invalid");
       inputs[4].classList.add("is-valid");
       
       return true;
    } else {
       inputs[4].classList.add("is-invalid");
       inputs[4].classList.remove("is-valid");
       return false;
    }
 }
function checkPassword()
{
    if (inputs[2].value === inputs[3].value) {
        inputs[3].classList.remove("is-invalid");
        inputs[3].classList.add("is-valid");
        showRePassword.style.top = "50%"
        return true;
     } else {
        inputs[3].classList.add("is-invalid");
        inputs[3].classList.remove("is-valid");
        showRePassword.style.top = "20%"
        return false;
     }
}
// ?========================== End Functions================//
