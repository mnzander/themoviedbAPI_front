import { getMovieList, getMostRatedList,getNowPlayingList, getUpcomingList, searchMovie } from "../practice/api-movie.js"
import { createMenu, getMovieDetail, createMainContainer, createOverview, createActors, createRecommendations } from "../practice/movie-detail.js"

document.addEventListener("DOMContentLoaded", function() { //Añadimos el contenido al DOM

    let movies = getMovieList().then(movies => {
        addMoviesGrid(movies);
    });

/***********************************************************CONTENEDORES********************************************************** */

/* CONTENEDOR GRID */
const movieContainer = document.createElement("div"); // Creamos un Container con todas las peliculas (GRID)
movieContainer.className = "movie-container layout-box"; // Añadimos las clases

function addMoviesGrid(movies) {
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        const movieElement = createMovieElement(movie);
        movieContainer.appendChild(movieElement);

        movieElement.addEventListener("click", function(){
            const id = movie.id;
            localStorage.setItem("ID", id);
            movieIdFinder();
        });
    }
}

addMoviesGrid(movies); // Añade por defecto el display del GRID
let currentView = "grid"; //Añadimos una variable en modo GRID, porque es el display por defecto.

/* CONTENEDOR LIST */
const listContainer = document.createElement("div");  // Creamos un Container con todas las peliculas (GRID)
listContainer.className = "list-container layout-box"; // Añadimos las clases

function addMoviesList(movies) {
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        const movieElement = createListElement(movie);
        listContainer.appendChild(movieElement);

        movieElement.addEventListener("click", function(){
            const id = movie.id;
            localStorage.setItem("ID", id);
            movieIdFinder();
        });
    }
}

const listTitles = document.querySelector("ul.film-row-titles");
listTitles.className = "hidden";


/* DETALLE */
async function movieIdFinder() {
    console.log("movieIdFinder llamado");
    const movieID = localStorage.getItem("ID");
    if (movieID) { 
        try {
            console.log("movieID obtenido:", movieID);
            document.querySelector("#root").innerHTML = "";

            // Obtener los detalles de la película usando el ID almacenado
            const movieDetails = await getMovieDetail(movieID); // Asegúrate de que getMovieDetail es una función asíncrona que retorna un objeto con los detalles de la película

            // Crear el contenedor principal para los detalles de la película
            const movieDetailContainer = document.createElement("div");
            movieDetailContainer.className = "detail-container";

            // Generar y agregar el contenedor principal de la película
            movieDetailContainer.appendChild(createMenu(movieDetails.poster, movieDetails.title));
            movieDetailContainer.appendChild(createMainContainer(movieDetails));
            movieDetailContainer.appendChild(createOverview(movieDetails));
            movieDetailContainer.appendChild(createActors(movieDetails.actors, movieDetails.actorsCharacter, movieDetails.actorsImg));
            movieDetailContainer.appendChild(await createRecommendations(movieDetails.id));
            
            // Agregar el contenedor de detalles de la película al DOM
            document.querySelector("#root").appendChild(movieDetailContainer);

        } catch (error) {
            console.error("Error searching movies:", error);
            span.textContent = "Search failed...";
        }
    }
}
/*********************************************************PAGINACIÓN********************************************************* */

const nextPage = document.querySelector(".next-page");
let pageNum = document.querySelector(".page-number");
pageNum.textContent = 1;

nextPage.addEventListener("click", function (){
    pageNum.textContent = Number(pageNum.textContent) + 1;
});

const previousPage = document.querySelector(".previous-page");
previousPage.addEventListener("click", function(){
    if(pageNum.textContent >= 2) {
        pageNum.textContent = Number(pageNum.textContent) - 1;
    }
});


/************************************************************BOTONES********************************************************* */

/* BOTON GRID  */
const gridButton = document.querySelector(".grid"); //Seleccionamos el elemento con clase grid en el HTML (botón)
function clickGrid() {

    movieContainer.innerHTML = ""; //Vaciamos el container de GRID
    movieContainer.className = "movie-container layout-box"; //Añadimos las clases al container GRID
    listContainer.innerHTML = ""; //Vaciamos el container de LIST
    listTitles.className = "hidden"; // Añadimos la clase Hidden para que desaparezca el container LIST cuando volvamos al GRID
    
    movies = getMovieList().then(movies => {
        addMoviesGrid(movies);
    });

    currentView = "grid"; // Le decimos a currentView que estamos en modo GRID
}

gridButton.addEventListener("click", clickGrid); //Añadimos un evento para cuando clickemos en el botón GRID se ejecute la funcion clickGrid

/* BOTON LIST  */

const listButton = document.querySelector(".list"); //Seleccionamos el elemento con clase list en el HTML (botón)
function clickList () {

    movieContainer.innerHTML = ""; //Vaciamos el container de GRID
    movieContainer.className = "hidden"; //Añadimos al container GRID la clase Hidden para que desaparezca
    listContainer.innerHTML = ""; //Vaciamos el container de LIST
    indexCount = 0; //Para que cuando se reinicie la función vuelva a empezar desde 0
    listTitles.className = "film-row-titles layout-box"; // Añadimos las clases

    movies = getMovieList().then(movies => {
        addMoviesList(movies);
    });

    currentView = "list"; //Le decimos a currentView que estamos en modo LIST
}

listButton.addEventListener("click", clickList); //Añadimos un evento para cuando clickemos en el botón LIST se ejecute la funcion clickList

/* BOTON UPCOMING */
const upcomingButton = document.querySelector(".upcoming"); // Seleccionamos el elemento con clase filter-films-desc en HTML (botón)

upcomingButton.addEventListener("click", () => { //Añadimos un evento para cuando clickemos en el botón de filtrado se ejecute la funcion clickFilterDesc

if (currentView === "grid") { // Si estamos en la vista GRID
    movieContainer.innerHTML = ""; // Vacia el container GRID

    movies = getUpcomingList().then(movies => {
        addMoviesGrid(movies);
    });

} else if (currentView === "list") { //Si estamos en la vista LIST
    listContainer.innerHTML = ""; // Vacia el contenedor LIST
    indexCount = 0; // Reiniciamos el contador

    movies = getUpcomingList().then(movies => {
        addMoviesList(movies);
    });
}
});

/* BOTON NOW PLAYING */    
const sortButtonAsc = document.querySelector(".now-playing"); // Seleccionamos el elemento con clase filter-films-asc en HTML (botón)

sortButtonAsc.addEventListener("click", () =>{ //Añadimos un evento para cuando clickemos en el botón de filtrado se ejecute la funcion clickFilterASC

if (currentView === "grid"){ // Si estamos en la vista GRID
    movieContainer.innerHTML = ""; // Vacia el container GRID
    
    movies = getNowPlayingList().then(movies => {
        addMoviesGrid(movies);
    });
    

} else if (currentView === "list") { // Si estamos en la vista LIST
    listContainer.innerHTML = ""; // Vacia el contenedor LIST
    indexCount = 0; // Reiniciamos el contador

    movies = getNowPlayingList().then(movies => {
        addMoviesList(movies);
    });
}
})

/* BOTON RATING */   
const ratingButton = document.querySelector(".rating-desc");

ratingButton.addEventListener('click', () => {

if (currentView === "grid") {
    movieContainer.innerHTML = "";
    movies = getMostRatedList().then(movies => {
        addMoviesGrid(movies);
    });

} else if (currentView === "list") {
    listContainer.innerHTML = "";
    indexCount = 0;
    movies = getMostRatedList().then(movies => {
        addMoviesList(movies);
    });
}
});

/****************************************************BUSCADOR DE TITULOS************************************************* */

const input = document.querySelector(".text-input"); // Agregamos el elemento con clase .text-input (input type= text)
const span = document.querySelector(".error-msg"); // Agregamos el elemento con clase .error-msg (span)

input.addEventListener("keyup", movieFinder); //Añadimos un evento para que cuando se pulse una tecla, haga la funcion movieFinder

async function movieFinder() {
    const inputVal = input.value;
    if (inputVal!== "") { 
        try {
            const filteredMovies = await searchMovie(inputVal);
            if (filteredMovies.length > 0) { 
                if (currentView === "grid") {
                    movieContainer.innerHTML = ""; 
                    filteredMovies.forEach(movie => {
                        const movieElement = createMovieElement(movie);
                        movieElement.addEventListener("click", function(){
                            const id = movie.id;
                            localStorage.setItem("ID", id);
                            movieIdFinder();
                        });
                        movieContainer.appendChild(movieElement);
                    });

                } else if (currentView === "list") {
                    listContainer.innerHTML = ""; 
                    indexCount = 0; 
                    filteredMovies.forEach(movie => {
                        const listElement = createListElement(movie); 
                        movieElement.addEventListener("click", function(){
                            const id = movie.id;
                            localStorage.setItem("ID", id);
                            movieIdFinder();
                        });
                        listContainer.appendChild(listElement);
                    });
                }

            } else {
                span.textContent = "Not found...";
                movieContainer.innerHTML = "";
                listContainer.innerHTML = "";
            }
        } catch (error) {
            console.error("Error searching movies:", error);
            span.textContent = "Search failed...";
        }

    } else {
        span.textContent = "";
        movieContainer.innerHTML = "";
        listContainer.innerHTML = "";

        getMovieList().then(movies => {
            if (currentView === "grid") {
                addMoviesGrid(movies);

            } else if (currentView === "list") {
                indexCount = 0; 
                addMoviesList(movies);
            }
        });
    }
}

/* Añadimos los contenedores al HTML */

document.querySelector("#root").appendChild(movieContainer); //Añadimos el container del GRID al MAIN (con ID root)
document.querySelector("#root").appendChild(listContainer); //Añadimos el container del LIST al MAIN (con ID root)

/*********************************************GRID*******************************************/

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

function createMovieElement(movie) {
    const movieElement = document.createElement("div");
    movieElement.className = "movie";
    movieElement.appendChild(createPoster(movie.poster));  
    movieElement.appendChild(createTitle(movie.title));
    movieElement.appendChild(createData(movie.rating, movie.year, movie.categories));
    movieElement.appendChild(createSummary(movie.summary));
    movieElement.appendChild(createDescription(movie.description));
    return movieElement;
};

/*********************************************LISTA*******************************************/

let indexCount = 0
function createMovieIndex() {
    const indexNum = document.createElement("div");
    indexNum.className = "film-number";

    indexCount++;
    indexNum.textContent = indexCount;

    return indexNum;
}

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

function createListElement(movie) {
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
});