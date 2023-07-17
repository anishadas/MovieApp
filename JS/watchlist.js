let myWatchList = JSON.parse(localStorage.getItem("WATCHLIST")) || [];
const watchlist_el = document.getElementById("my-watchlist");
const count3 = document.getElementById("count3");

// event lstener for removing the movie
document.addEventListener('click', (e) => {
    if (e.target.className == "buttn") {
        id = e.target.id;
        removeMovie(id);
    }
})


// for UI display
function displayList() {
    let str = "";
    if (myWatchList.length) {
        myWatchList.forEach(movie => {
            let src = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            str += `
              <div class="row">
                <div class="col-sm-8 movie">
                    <div class="image">
                        <img
                            src=${src} />
                    </div>
                   <div class="info">
                        <p class="title">${movie.title}</p>
                         <div class="type-year">
                            
                            <span><p>Year: </p>${movie.release_date}</span>

                            <button class="buttn" id=${movie.id}>Remove</button>
                        </div>
                        
                        <p class="rating">
                            <span class="rate">Rating:</span>
                            <i class="fa-solid fa-star"></i>
                            ${movie.vote_average}
                        </p>
                    </div>
                </div>
            </div>
            `
        });
        watchlist_el.innerHTML = str;
        
    }
    else {
        watchlist_el.innerHTML = `<h1>No items in watchlist</h1>`;
        
    }
    count.innerHTML = myWatchList.length;
    count3.innerHTML = myWatchList.length;
}

displayList();



// remove from watchlist
function removeMovie(id) {
    myWatchList = myWatchList.filter(movie => movie.id != id);
    localStorage.setItem("WATCHLIST", JSON.stringify(myWatchList));
    displayList();
}