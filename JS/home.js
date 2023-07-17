
const mycards = document.querySelector("#my-cards");
const input = document.getElementById("input");
const count = document.getElementById("count");

// for count in small screens using off canvas component
const count1 = document.getElementById("count1");


const URL = 'https://api.themoviedb.org/3/movie/popular?api_key=458184493cc57d1740b126c2cc6f9f72&page=1';

let watchlist = JSON.parse(localStorage.getItem("WATCHLIST")) || [];


// getting data from api
async function getData(query) {
    let list = [];
    let response;
    // getting movies data based on search query
    if (query) {
        let SEARCH_URL = "https://api.themoviedb.org/3/search/movie?query=" + query + "&api_key=458184493cc57d1740b126c2cc6f9f72&language=en-US&page=1"
        response = await fetch(SEARCH_URL)
    }
    // getting popular movies on 1st render
    else {
        console.log("hi")
        response = await fetch(URL);
    }
    const movies = await response.json();
    movies.results.forEach((movie) => list.push(movie));
    localStorage.setItem("MOVIELIST", JSON.stringify(list));
    renderMovies();
}
getData("")


function handleChangeEvent(e) {
    let search = e.target.value;
    console.log(search)
    getData(search);
}

// listening change in input in search bar
input.addEventListener("input", handleChangeEvent);
// listening for all click events
document.addEventListener("click", handleClickEvents);




function handleClickEvents(e) {
    console.log(e.target)
    if (e.target.className == "add-watchlist") {
        e.preventDefault();
        let id = e.target.id;
        addToWatchList(id);
    }
    if (e.target.className == "remove-watchlist") {
        let id = e.target.id;
        removeFromWatchList(id);
    }
    if (e.target.className == "card-img-text" || e.target.className == "fa-solid fa-film" || e.target.className == "overlay" ) {
        let id = e.target.id;
        showMovie(id);

    }
}

// dsplaying the UI
function renderMovies() {
    count.innerHTML = watchlist.length;
    count1.innerHTML = watchlist.length;
    let moviesList = JSON.parse(localStorage.getItem("MOVIELIST")) || [];
    let watchList = JSON.parse(localStorage.getItem("WATCHLIST")) || [];
    let str = "";
    if (moviesList.length) {
        moviesList.map((movie) => {
            let id = movie.id;
            let isPresentWatchlist = false;
            watchList.map(movie => {
                if (movie.id == id) {
                    isPresentWatchlist = true;
                    return;
                }
            });

            // creating dynamic button based on movie is present in watchlist or not
            let myButtn;
            if (isPresentWatchlist) {
                myButtn = `  <button class="butn" title="remove from watchlist">
                        <img src="./images/remove.png" class="remove-watchlist" id=${movie.id} />
                        <span class="remove-watchlist" id=${movie.id}>Remove from watchlist</span>
                    </button>`
            } else {
                myButtn = `<button class="butn" title="add to watchlist">
                        <img src="./images/video.png" class="add-watchlist" id=${movie.id} />
                        <span class="add-watchlist" id=${movie.id}>Add to watchlist</span>
                    </button>`
            }

            let src = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            str += `
            <div class="card" style="width: 18rem;">
                <div class="image">
                    <img src=${src}  alt="..." />
                    <div class="overlay" id=${id}>
                        <p class="card-img-text" id=${id}>click for more</p>
                        <i class="fa-solid fa-film" id=${id}></i>
                    </div>
                </div>
                <div class="card-body">
                    <p class="imdbRating">
                        <i class="fa-solid fa-star"></i>
                        ${movie.vote_average}
                    </p>
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">
                        <span>Released on: ${movie.release_date}</span>
                    </p>
                    <div class="actions">
                    ${myButtn}
                    </div>
                </div>
            </div>`;
        })
        mycards.innerHTML = str;
    }
    else {
        mycards.innerHTML = `<h1>Loading...</h1>`;
    }
}

// adding to faourites/watchlist
function addToWatchList(id) {
    // getting the movie
    let moviesList = JSON.parse(localStorage.getItem("MOVIELIST")) || [];
    let movie = moviesList.filter(movie => movie.id == id);
    
    watchlist.push(movie[0]);
    count.innerHTML = watchlist.length;
    count1.innerHTML = watchlist.length;

    localStorage.setItem("WATCHLIST", JSON.stringify(watchlist));
    renderMovies();
}

// remove from watchlist
function removeFromWatchList(id) {
    watchlist = watchlist.filter(movie => movie.id != id)
    count.innerHTML = watchlist.length;
    count1.innerHTML = watchlist.length;

    localStorage.setItem("WATCHLIST", JSON.stringify(watchlist));
    renderMovies();
}


// tool tips from bootstrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


