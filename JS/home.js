
const mycards = document.querySelector("#my-cards");
const input = document.getElementById("input");
const count = document.getElementById("count");

// for count in small screens using off canvas component
const count1 = document.getElementById("count1");


const URL = 'https://www.omdbapi.com/?apikey=c997ccc2';

let watchlist = JSON.parse(localStorage.getItem("WATCHLIST")) || [];

let searchTerm = "hum"

async function getData(URL, searchTerm) {
    let list = [];
    let page = 1;
    console.log(`${URL}&s=${searchTerm}&type=movie&page=${page}`)
    while (page <= 2) {
        const response = await fetch(`${URL}&s=${searchTerm}&type=movie&page=${page}`);
        const movies = await response.json();
        // console.log(movies.Search)
        movies.Search.forEach((movie) => list.push(movie));
        page++
    }
    localStorage.setItem("MOVIELIST", JSON.stringify(list));
    renderMovies();
}


getData(URL, searchTerm)

// listening for all click events
document.addEventListener("click", handleClickEvents);

function handleClickEvents(e) {

    if (e.target.id == "search") {
        e.preventDefault();
        let search = input.value;
        getData(URL, search);
        input.value = "";
    }
    if (e.target.className == "add-watchlist") {
        e.preventDefault();
        let id = e.target.id;
        addToWatchList(id);
    }
    if (e.target.className == "remove-watchlist") {
        let id = e.target.id;
        removeFromWatchList(id);
    }
    if (e.target.className == "card-img-top") {
        let id = e.target.id;
        showMovie(id);

    }
}

function renderMovies() {
    count.innerHTML = watchlist.length;
    count1.innerHTML = watchlist.length;
    let moviesList = JSON.parse(localStorage.getItem("MOVIELIST")) || [];
    let str = "";
    if (moviesList.length) {
        moviesList.map((movie, index) => {
            let id = movie.imdbID;
            // console.log(id)
            str += `
            <div class="card" style="width: 18rem;">
                <div class="image">
                    <img src=${movie.Poster} class="card-img-top" alt="..."   id=${id} />
                </div>
                <div class="card-body">
                    <p class="imdbRating">
                        <i class="fa-solid fa-star"></i>
                        7.6
                    </p>
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">
                        <span>Released on: ${movie.Year}</span>
                        <span>Type: ${movie.Type}</span>
                    </p>
                    <div class="actions">
                        <button class="butn" title="remove from watchlist">
                            <img src="./images/remove.png"  class="remove-watchlist" id=${movie.imdbID} />
                        </button>
                        
                        <button class="butn" title="add to watchlist">
                            <img src="./images/video.png" class="add-watchlist" id=${movie.imdbID} />
                        </button>
                    </div>
                </div>
            </div>`;
        })
        console.log("str", mycards)
        mycards.innerHTML = str;
    }
    else {
        mycards.innerHTML = `<h1>Loading...</h1>`;
    }
}


function addToWatchList(id) {
    // getting the movie
    let moviesList = JSON.parse(localStorage.getItem("MOVIELIST")) || [];
    let movie = moviesList.filter(movie => movie.imdbID == id);

    // checking if movie already in watchList
    let isPresent = false;
    watchlist.map(item => {
        if (item.imdbID == movie[0].imdbID) {
            isPresent = true;
            return;
        }
    });
    if (!isPresent) {
        watchlist.push(movie[0]);
    }
    count.innerHTML = watchlist.length;
    count1.innerHTML = watchlist.length;

    localStorage.setItem("WATCHLIST", JSON.stringify(watchlist));
}

function removeFromWatchList(id) {
    // getting the movie from watchlist
    let movie = watchlist.filter(movie => movie.imdbID == id);
    if (movie.length == 0) {
        alert("movie not added to watchlist yet.")
    }
    watchlist = watchlist.filter(movie => movie.imdbID != id)
    count.innerHTML = watchlist.length;
    count1.innerHTML = watchlist.length;
    
    localStorage.setItem("WATCHLIST", JSON.stringify(watchlist));
}

// getting data using id from omdb
async function showMovie(id) {
    const URL = 'http://www.omdbapi.com/?apikey=c997ccc2';
    const response = await fetch(`${URL}&i=${id}`);
    const movie = await response.json();
    localStorage.setItem("MOVIE", JSON.stringify([movie]));
}

// tool tips from bootstrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


