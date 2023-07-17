
const myWatchList = JSON.parse(localStorage.getItem("WATCHLIST")) || [];
const addMovie = document.querySelector("#movie");
// for count in small screens using off canvas component
const count2 = document.getElementById("count2");

// event listener to add the move to watchlist
document.addEventListener('click', (e) => {
    if (e.target.className == "watch-btn") {
        let id = e.target.id;
        addWatchList();
    }
})


// getting data using id from omdb
async function showMovie(id) {
    const URL = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=458184493cc57d1740b126c2cc6f9f72&append_to_response=credits';
    const response = await fetch(URL);
    const mymovie = await response.json();
    window.location.href = './movie.html';
    localStorage.setItem("MOVIE", JSON.stringify(mymovie));
}

// displaying data on a movie
function displayMovie() {
    const movie = JSON.parse(localStorage.getItem("MOVIE")) || {};
    count2.innerHTML = myWatchList.length;
    let str = "";
    if (movie) {
        
        const { genres, original_language, overview, backdrop_path, release_date, title, id, tagline, credits } = movie;
  
        // director
        let director = "";
        credits.crew.forEach(credit => {
            if (credit.known_for_department == "Directing") {
                director = credit.name;
                return;
            }
        })
        
        // for genre
        let genre = "";
        genres.forEach(item => {
            genre += `<li>${item.name}</li>`
        });

        // for Writer
        let writers_str = "";
        let count = 3;
        credits.crew.forEach(credit => {
            if (credit.known_for_department == "Writing" && count>0) {
                writers_str += `${credit.name} <span class="dot" >.</span>`
                count--
            }
        });

        // for actors
        let actors_str = "";
        let first_two = 3;
        credits.cast.map(credit => {
            if (credit.known_for_department == "Acting" && first_two > 0) {
                actors_str += `${credit.name} <span class="dot" >.</span>`
                first_two--
            }
        });
       
        // for producer
        let producer = "";
        credits.crew.forEach(credit => {
            if (credit.known_for_department == "Production") {
                producer = credit.name;
                return;
            }
        })

        // poster path
        let src = "https://image.tmdb.org/t/p/w500" + backdrop_path;

        str += `
        <div class="row" id="movie">
            <div class="col-sm-6 banner">
                <h5 class="title">${title}</h5>
                <p>
                    <span>${original_language}</span>
                    <span class="dot" >.</span>
                    <span>${release_date}</span>
                </p>
                <div class="poster">
                    <img src=${src} class
                        alt="..." >
                </div>
                <button class="watch-btn" id=${id}>
                    <img src="./images/video.png" />
                    Add To Watchlist
                </button>
            </div>
            <div class="col-sm-6 movie-data">
                <ul class="movie-type">
                ${genre}
                </ul>
                <p class="text">
                    ${overview}<br/>
                    <span>Tagline :<q>${tagline}</q></span>
                </p>
                
                <hr />
                <div class="extra-info">
                    <p class="designation">Director </p>
                    <p class="name">${director}</p>
                </div>
                <hr />
                <div class="extra-info">
                    <p class="designation">Writers </p>
                    <p class="name">
                        ${writers_str}
                    </p>
                </div>
                <hr />
                <div class="extra-info">
                    <p class="designation">Actors </p>
                    <p class="name">
                        ${actors_str}
                    </p>
                </div>
                <hr />
                <div class="extra-info">
                    <p class="designation">
                        Producer
                    </p>
                    <p class="name">
                        ${producer}
                    </p>
                </div>
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


// add movie to watchlist
function addWatchList() {

    const movie = JSON.parse(localStorage.getItem("MOVIE")) || {};
    
    // checking if movie already in watchList
    let isPresent = false;
    myWatchList.map(item => {
        if (item.id == movie.id) {
            isPresent = true;
            alert("Movie already in watchList");
            return;
        }
    });
    if (!isPresent) {
        myWatchList.push(movie);
    }
    count.innerHTML = myWatchList.length;
    count2.innerHTML = myWatchList.length;
    localStorage.setItem("WATCHLIST", JSON.stringify(myWatchList));
}