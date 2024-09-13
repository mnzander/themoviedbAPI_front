import { createMovieIndex } from "./practice-api";

function createMiniPoster(poster) {
    const posterContainer = document.createElement("div");
    posterContainer.className = "poster-container"

    const miniImage = document.createElement("img");
    const baseUrl = "https://image.tmdb.org/t/p/w500"; // Prefijo base para las imágenes de TMDB
    miniImage.src = baseUrl + poster; // Construye la URL completa de la imagen
    miniImage.className = "poster-mini";

    posterContainer.appendChild(miniImage);

    return posterContainer;
}

function createTitleYear(title, year) {
    const titleYear = document.createElement("div");
    titleYear.className = "title-year";
    titleYear.textContent = `${title} (${year})`;

    return titleYear;
}

function createAvgRating(rating) {
    const avgRating = document.createElement("div");
    avgRating.className = "avg-rating";
    
    function generateStars(starsNumber){
        const starsContainer = document.createElement("div");
        starsContainer.className = "starStyle";

        for (let i = 0; i < 5; i++) {
            const stars = document.createElement("div");
            if (i < starsNumber) {
                stars.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="yellow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-star">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                </svg>`;
            } else {
                stars.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-star">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                </svg>`;
            }

            starsContainer.appendChild(stars);
       }

       return starsContainer;
    }

    function showStars(rating) {
        const starsNumber = Math.round(rating / 2);
        const starsSvg = generateStars(starsNumber);
        avgRating.appendChild(starsSvg);
    }
    
    showStars(rating);
    return avgRating;
}

function createReviews(reviews) {
    const filmReviews = document.createElement("div");
    filmReviews.className = "reviews";
    filmReviews.textContent = `(${reviews} reviews)`;

    return filmReviews;
}

function createYourRating() {
    const yourRating = document.createElement("div");
    yourRating.className = "your-rating";
    yourRating.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="yellow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-star">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
        </svg> 0.0
        `;

    return yourRating;

}

export function createListElement(movie) {
    const movieElement = document.createElement("div");
    movieElement.className = "film-row";
    movieElement.appendChild(createMovieIndex());  
    movieElement.appendChild(createMiniPoster(movie.poster));
    movieElement.appendChild(createTitleYear(movie.title, movie.year));
    movieElement.appendChild(createAvgRating(movie.rating));
    movieElement.appendChild(createReviews(movie.reviews));
    movieElement.appendChild(createYourRating());

    return movieElement;
};