// !========================== Start Global ================//
const loading = document.querySelector(".loading");
const modeBtn = document.getElementById("mode");
let data = [];
getGames("mmorpg")

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
document.querySelectorAll(".menu a").forEach((link)=>{
    link.addEventListener("click",()=>{
        document.querySelector(".menu .active").classList.remove("active")
        link.classList.add('active')
        const category = link.dataset.category;
        getGames(category)
    })
})

document.querySelector(".logout-btn").addEventListener("click", function () {
    logout();
});

window.addEventListener("scroll", function () {
    if (scrollY > 40) {
       document.querySelector("nav").classList.add("fixed-top");
    } else {
       document.querySelector("nav").classList.remove("fixed-top");
    }
 
});

modeBtn.addEventListener("click", function (e) {
    theme(e.target);
});
// ========================== End Events================//



// ?========================== Start Functions================//

// function to call API
async function getGames(category) {
    loading.classList.remove("d-none");
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '259458d788msh53013369d6c5980p1575b2jsna4694e535fe7',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)
    data = await response.json()
    displayGames();
    loading.classList.add("d-none");
}

// function to display Games
function displayGames() {
let cartona ="";
for (const game of data) {
    let videPath = game.thumbnail.replace("thumbnail.jpg","videoplayback.webm") ;
    cartona +=`
    <div class="col">
      <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" class="card h-100 bg-transparent" role="button" onclick="showDetails(${game.id})">
         <div class="card-body">
            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${game.thumbnail}" alt="${game.title}"/>
             <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
              <source src="${videPath}">
              </video>
            </figure>

            <figcaption>

               <div class="hstack justify-content-between">
                  <h3 class="h6 small">${game.title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>

               <p class="card-text small text-center opacity-50">
                  ${game.short_description.split(" ", 8)}
               </p>

            </figcaption>
         </div>

         <footer class="card-footer small hstack justify-content-between">

            <span class="badge badge-color">${game.genre}</span>
            <span class="badge badge-color">${game.platform}</span>

         </footer>
      </div>
   </div>
    `
}
document.getElementById("gameData").innerHTML =cartona
}

// function to start Video
function startVideo(event) {
    const videoEl = event.currentTarget.querySelector("video");
    videoEl.muted = true;
    videoEl.play().then(function () {
       videoEl.classList.remove("d-none");
    });
}

// function to stop Video
function stopVideo(event) {
    const videoEl = event.currentTarget.querySelector("video");
    videoEl.muted = true;
    videoEl.pause();
    videoEl.classList.add("d-none");
}

// function to move to Details page
function showDetails(id) {
    location.href = `./details.html?id=${id}`;
}

// function to move to login page
function logout() {
    localStorage.removeItem("uToken");
    location.href = "./index.html";
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





