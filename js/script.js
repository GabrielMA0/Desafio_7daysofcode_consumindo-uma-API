import { apiKey } from "./Api_key.js";

const moviesContainer = document.querySelector(".movies");
const inputSearch = document.querySelector("#field-search");
const inputCheckbox = document.querySelector("#input-checkbox");
const searchButton = document.querySelector("#search-btn");

let popularMovies = [];

window.onload = function () {
    inputSearch.focus();
    getPopularMovies();
};

async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    const responses = await fetch(url);

    const data = await responses.json();

    popularMovies = data.results;

    popularMovies.forEach((movies) => renderMovie(movies));
}

searchButton.addEventListener("click", async function () {
    let searchInputValue = inputSearch.value;

    const urlSearch = `https://api.themoviedb.org/3/search/movie?query=${searchInputValue}&api_key=${apiKey}`;

    if (searchInputValue === "") {
        alert("Preencha o campo!");
    } else {
        moviesContainer.innerText = "";

        const responsesSearch = await fetch(urlSearch);

        const dataSearch = await responsesSearch.json();

        dataSearch.results.forEach((movieSearch) => renderMovie(movieSearch));
    }
});

function checkFavoriteMovie(id) {
    let favoriteMoviesJSON =
        JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    return favoriteMoviesJSON.some((m) => m.id === id);
}

function renderMovie(movie) {
    const { title, poster_path, vote_average, release_date, overview, id } =
        movie;

    let isFavorited = checkFavoriteMovie(id);
    const imgApi = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const year = release_date.split("-")[0];

    const movieElement = document.createElement("div");
    movieElement.setAttribute("data-id", id);
    movieElement.classList.add("movie");
    moviesContainer.appendChild(movieElement);

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");
    movieElement.appendChild(movieInfo);

    const movieImage = document.createElement("img");
    movieImage.classList.add("img-movie");
    movieImage.src = imgApi;
    movieImage.alt = `${title} Poster`;
    movieInfo.appendChild(movieImage);

    const movieBtnsTitle = document.createElement("div");
    movieBtnsTitle.classList.add("movie-btns-title");
    movieInfo.appendChild(movieBtnsTitle);

    const movieTitle = document.createElement("h2");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = `${title} (${year})`;
    movieBtnsTitle.appendChild(movieTitle);

    const movieBtns = document.createElement("div");
    movieBtns.classList.add("movie-btns");
    movieBtnsTitle.appendChild(movieBtns);

    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("ratingContainer");
    movieBtns.appendChild(ratingContainer);

    const btnStar = document.createElement("button");
    const starImage = document.createElement("img");
    starImage.src = "./assets/star.svg";
    starImage.alt = "Star";
    starImage.title = "Avaliação";
    btnStar.appendChild(starImage);
    ratingContainer.appendChild(btnStar);

    const textRating = document.createElement("span");
    textRating.classList.add("text-rating");
    textRating.textContent = vote_average;
    ratingContainer.appendChild(textRating);

    const btnFavorite = document.createElement("button");
    btnFavorite.classList.add("btn-favorite");
    const favoriteImage = document.createElement("img");
    btnFavorite.appendChild(favoriteImage);
    favoriteImage.src = isFavorited
        ? "./assets/heart-fill.svg"
        : "./assets/heart.svg";
    favoriteImage.alt = "Heart";
    favoriteImage.title = "Favoritar";
    favoriteImage.classList.add("favorite-image");
    movieBtns.appendChild(btnFavorite);

    const movieDescriptionContainer = document.createElement("div");
    movieDescriptionContainer.classList.add("description");
    const movieDescription = document.createElement("span");
    movieDescription.classList.add("movie-description");
    movieDescription.textContent = overview;
    movieInfo.appendChild(movieDescriptionContainer);
    movieDescriptionContainer.appendChild(movieDescription);

    btnFavorite.addEventListener("click", function () {
        saveFavoriteMovie(movie, isFavorited);
    });
}

function saveFavoriteMovie(movie, isFavorited) {
    isFavorited = !isFavorited;
    let movieDiv = document.querySelector(`[data-id="${movie.id}"]`);

    const favoriteImage = movieDiv.querySelector(".favorite-image"); // primeiro filho

    if (isFavorited) {
        let getFavoriteMoviesJSON =
            JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        getFavoriteMoviesJSON.push(movie);
        const favoriteMoviesJSON = JSON.stringify(getFavoriteMoviesJSON);
        localStorage.setItem("favoriteMovies", favoriteMoviesJSON);
        favoriteImage.src = "./assets/heart-fill.svg";
    } else {
        favoriteImage.src = "./assets/heart.svg";
        removeFavoriteMovie(movie);
    }
}

function removeFavoriteMovie(movie) {
    let getFavoriteMoviesJSON = JSON.parse(
        localStorage.getItem("favoriteMovies")
    );
    const indexMovie = getFavoriteMoviesJSON.findIndex(
        (m) => m.id === movie.id
    );
    if (indexMovie !== -1) {
        getFavoriteMoviesJSON.splice(indexMovie, 1);
        const favoriteMoviesJSON = JSON.stringify(getFavoriteMoviesJSON);
        localStorage.setItem("favoriteMovies", favoriteMoviesJSON);
        if (inputCheckbox.checked) {
            let movieElement = document.querySelector(
                `[data-id="${movie.id}"]`
            );
            movieElement.remove();
        }
    }
}

inputCheckbox.addEventListener("change", function () {
    if (inputCheckbox.checked) {
        moviesContainer.innerText = "";
        let favoriteMoviesJSON = JSON.parse(
            localStorage.getItem("favoriteMovies")
        );
        favoriteMoviesJSON.forEach((movie) => renderMovie(movie));
    } else {
        moviesContainer.innerText = "";
        getPopularMovies();
    }
});

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchButton.click();
    }
});
