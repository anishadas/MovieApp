let myWatchList = JSON.parse(localStorage.getItem("WATCHLIST")) || [];
const watchlist_el = document.getElementById("my-watchlist");
const count = document.getElementById("count");

// for remove button
document.addEventListener('click', (e) => {
    if (e.target.className == "buttn") {
        id = e.target.id;
        removeItem(id);
    }
})


// for UI display
function displayList() {
    let str = "";
    if (myWatchList.length) {
        myWatchList.forEach(movie => {
            str += `
              <div class="row">
                <div class="col-sm-8 movie">
                    <div class="image">
                        <img
                            src=${movie.Poster} />
                    </div>
                   <div class="info">
                        <p class="title">${movie.Title}</p>
                         <div class="type-year">
                           
                            <span> <p>Type: </p> ${movie.Type}</span>
                            
                            <span><p>Year: </p>${movie.Year}</span>

                            <button class="buttn" id=${movie.imdbID}>Remove</button>
                        </div>
                        
                        <p class="rating">
                            <span class="rate">Rating:</span>
                            <i class="fa-solid fa-star"></i>
                            7.6
                        </p>
                    </div>
                </div>
            </div>
            `
        });
        watchlist_el.innerHTML = str;
        count.innerHTML = myWatchList.length;
    }
    else {
        watchlist_el.innerHTML = `<h1>No items in watchlist</h1>`;
        count.innerHTML = myWatchList.length;
    }
}

displayList();



// remove from watchlist
function removeItem(id) {
    myWatchList = myWatchList.filter(movie => movie.imdbID != id);
    localStorage.setItem("WATCHLIST", JSON.stringify(myWatchList));
    displayList();
}