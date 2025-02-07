// !========================== Start Global================//
const modeBtn = document.getElementById("mode");
const searchParams = location.search;
const params = new URLSearchParams(searchParams);
const id = params.get("id");
getDetails(id);

if (localStorage.getItem("theme")) {
    const theme = localStorage.getItem("theme");
    document.documentElement.dataset.theme = localStorage.getItem("theme");
    if (theme === "light") {
       modeBtn.classList.replace("fa-sun", "fa-moon");
    } else {
       modeBtn.classList.replace("fa-moon", "fa-sun");
    }
 }
// !========================== End Global ================//



// ========================== Start Events================//
modeBtn.addEventListener("click", function (e) {
    theme(e.target);
});
// ========================== End Events================//



// ?========================== Start Functions================//

// function to get game details from API
async function getDetails(id) {
    const options = {
       method: "GET",
       headers: {
          "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
          Accept: "application/json",
          "Content-Type": "application/json",
       },
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    const response = await api.json();
    displayData(response);
    console.log(response);
}

// function to Display Details
function displayData(data){
    let cartona = `
   
   <div class="col-md-4">
   <figure>
      <img src="${data.thumbnail}" class="w-100" alt="${data.title}" />
   </figure>
</div>
<div class="col-md-8">

   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb">
            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
         </ol>
      </nav>

      <h1>${data.title}</h1>

      <h3>About ${data.title}</h3>
      <p>${data.description}</p>

      
   </div>
</div>

   `;

   document.getElementById("detailsData").innerHTML = cartona;
   document.body.style.cssText = `background:url('${data.thumbnail.replace("thumbnail", "background")}') center / cover no-repeat`;

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
// ?========================== End Functions================//