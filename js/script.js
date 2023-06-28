const moviesContainer = document.querySelector(".movies");
const inputSearch = document.querySelector("#field-search");
const inputCheckbox = document.querySelector("#input-checkbox");

const movies = [
    {
        image: "https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg",
        title: "Batman",
        rating: 9.2,
        year: 2022,
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        isFavorited: false,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg",
        title: "Avengers",
        rating: 8.2,
        year: 2019,
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        isFavorited: false,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg",
        title: "Doctor Strange",
        rating: 7.2,
        year: 2022,
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        isFavorited: true,
    },
];

window.onload = function () {
    inputSearch.focus();
    movies.forEach((movie) => renderMovie(movie));
};

function renderMovie(movie) {
    const { title, image, rating, year, description, isFavorited } = movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    moviesContainer.appendChild(movieElement);

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");
    movieElement.appendChild(movieInfo);

    const movieImage = document.createElement("img");
    movieImage.classList.add("img-movie");
    movieImage.src = image;
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
    btnStar.appendChild(starImage);
    ratingContainer.appendChild(btnStar);

    const textRating = document.createElement("span");
    textRating.classList.add("text-rating");
    textRating.textContent = rating;
    ratingContainer.appendChild(textRating);

    const btnFavorite = document.createElement("button");
    btnFavorite.classList.add("btn-favorite");
    const favoriteImage = document.createElement("img");
    btnFavorite.appendChild(favoriteImage);
    favoriteImage.src = isFavorited
        ? "./assets/heart-fill.svg"
        : "./assets/heart.svg";
    favoriteImage.alt = "Heart";
    movieBtns.appendChild(btnFavorite);

    const movieDescriptionContainer = document.createElement("div");
    movieDescriptionContainer.classList.add("description");
    const movieDescription = document.createElement("span");
    movieDescription.classList.add("movie-description");
    movieDescription.textContent = description;
    movieInfo.appendChild(movieDescriptionContainer);
    movieDescriptionContainer.appendChild(movieDescription);
}
