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
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".details").classList.add("d-none");
  location.href = "./home.html";
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
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const response = await api.json();
  displayData(response);
  console.log(response);
}

// function to Display Details
function displayData(data) {
  let cartona = `
   
   <div class="col-md-4">
   <figure>
      <img src="${data.thumbnail}" class="w-100" alt="${data.title}" />
   </figure>
</div>
<div class="col-md-8 text-white">

   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb">
            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
         </ol>
      </nav>

      <h1 class="text-white">${data.title}</h1>
       <p>Category: <span class="badge text-bg-info py-1">${data.genre}</span></p>
      <p>Platform: <span class="badge text-bg-info pb-1">${data.platform}</span></p>
      <p>Status: <span class="badge text-bg-info pb-1">${data.status}</span></p>
      <p>${data.description}</p>
      <a class="btn btn-outline-warning" target="_blank" href="${data.game_url}">
          Show Game
      </a>
      
   </div>
</div>

   `;

  document.getElementById("detailsData").innerHTML = cartona;
  document.body.style.cssText = `background:url('${data.thumbnail.replace(
    "thumbnail",
    "background"
  )}') center / cover no-repeat`;
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
