function createPoster(poster) {
    const image = document.createElement("img");
    const baseUrl = "https://image.tmdb.org/t/p/w500"; // Prefijo base para las imágenes de TMDB
    image.src = baseUrl + poster; // Construye la URL completa de la imagen
    image.className = "movie-poster";

    return image;
}
function createTitle(title) {
    const movieTitle = document.createElement("div");
    movieTitle.className = "movie-title";
    movieTitle.textContent = title;

    return movieTitle;
}

function createData(rating, year, category){
    const data = document.createElement("div");
    data.className = "movie-data";
    data.textContent = `Rating: ${rating} | ${year} | ${category}`;

    return data;
}

function createSummary(summary) {
    const movieSummary = document.createElement("div");
    movieSummary.className = "movie-description-summary";
    movieSummary.textContent = "Summary";

    return movieSummary;
}

function createDescription(description) {
    const desc = document.createElement("div");
    desc.className = "movie-description";

    const maxLength = 200;
    let truncatedDescription;

    if (description.length > maxLength) {
        truncatedDescription = description.substring(0, maxLength) + '...';
    } else {
        truncatedDescription = description;
    }

    desc.textContent = truncatedDescription;

    desc.addEventListener('mouseenter', () => {
        desc.textContent = description;
    });

    desc.addEventListener('mouseleave', () => {
        desc.textContent = truncatedDescription;
    });

    return desc;
}

export function createMovieElement(movie) {
    const movieElement = document.createElement("div");
    movieElement.className = "movie";
    movieElement.appendChild(createPoster(movie.poster));  
    movieElement.appendChild(createTitle(movie.title));
    movieElement.appendChild(createData(movie.rating, movie.year, movie.categories));
    movieElement.appendChild(createSummary(movie.summary));
    movieElement.appendChild(createDescription(movie.description));
    return movieElement;
};