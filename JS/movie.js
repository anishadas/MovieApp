
const myWatchList = JSON.parse(localStorage.getItem("WATCHLIST")) || [];
const addMovie = document.querySelector("#movie");
// for count in small screens using off canvas component
const count2 = document.getElementById("count2");





// getting data using id from omdb
async function showMovie(id) {
    // console.log("hi",id)
    const URL = 'https://www.omdbapi.com/?apikey=c997ccc2';
    const response = await fetch(`${URL}&i=${id}`);
    const mymovie = await response.json();
    console.log(mymovie);
    window.location.href = './movie.html';
    localStorage.setItem("MOVIE", JSON.stringify([mymovie]));
}

// displaying data on a movie
function displayMovie() {
    const movie = JSON.parse(localStorage.getItem("MOVIE")) || [];
    count2.innerHTML = myWatchList.length;
    let str = "";
    if (movie.length) {
        const { Actors, Director, Genre, Language, Plot, Poster, Released, Title, Writer,imdbID } = movie[0];

        // for genre
        let genre = "";
        Genre.split(",").map(item => {
            genre += `<li>${item.trim()}</li>`
        });
       
        // for Writer
        let writers = "";
        Writer.split(",").map(item => {
            writers += `${item.trim()} <span class="dot" >.</span>`
        });

        // for actors
        let actors = "";
        Actors.split(",").map(item => {
            actors += `${item.trim()} <span class="dot" >.</span>`
        });


        str += `
        <div class="row" id="movie">
            <div class="col-sm-6 banner">
                <h5 class="title">${Title}</h5>
                <p>
                    <span>${Language}</span>
                    <span class="dot" >.</span>
                    <span>${Released}</span>
                </p>
                <div class="poster">
                    <img src=${Poster} class
                        alt="..." >
                </div>
            </div>
            <div class="col-sm-6 movie-data">
                <ul class="movie-type">
                ${genre}
                </ul>
                <p class="text">
                    ${Plot}
                </p>
                <hr />
                <div class="extra-info">
                    <p class="designation">Director </p>
                    <p class="name">${Director}</p>
                </div>
                <hr />
                <div class="extra-info">
                    <p class="designation">Writers </p>
                    <p class="name">
                        ${writers}
                    </p>
                </div>
                <hr />
                <div class="extra-info">
                    <p class="designation">Actors </p>
                    <p class="name">
                        ${actors}
                    </p>
                </div>
                <hr />
                <div class="extra-info">
                    <div>
                        <img src="./images/imdbpro.png" />
                    </div>
                    <a href="" class="name">
                        See production, box office & company info
                    </a>
                </div>
                <br/>
                <button class="watch-btn" id=${imdbID}>
                    <img src="./images/video.png" />
                    Add To Watchlist
                </button>
            </div>
        </div>
    `
        addMovie.innerHTML = str;
    }
    else {
        addMovie.innerHTML = `<h1>no movie yet</h1>`
    }

}

displayMovie();

document.addEventListener('click', (e) => {
    // console.log(e.target)
    if (e.target.className == "watch-btn") {
        let id = e.target.id;
        addWatchList();
    }
})

function addWatchList() {
    
    const movie = JSON.parse(localStorage.getItem("MOVIE")) || [];
    console.log(movie);
    // checking if movie already in watchList
    let isPresent = false;
    myWatchList.map(item => {
        if (item.imdbID == movie[0].imdbID) {
            isPresent = true;
            return;
        }
    });
    if (!isPresent) {
        myWatchList.push(movie[0]);
    }
    count.innerHTML = myWatchList.length;
    count2.innerHTML = myWatchList.length;
    localStorage.setItem("WATCHLIST", JSON.stringify(myWatchList));
}