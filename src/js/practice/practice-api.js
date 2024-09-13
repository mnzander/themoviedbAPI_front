import { getMovieList, getMostRatedList,getNowPlayingList, getUpcomingList, searchMovie } from "../practice/api-movie.js"
import { createMenu, getMovieDetail, createMainContainer, createOverview, createActors, createRecommendations } from "../practice/movie-detail.js"
import { createMovieElement } from "./movie-grid.js";
import { createListElement } from "./movie-list.js";

let movies = getMovieList(1).then(movies => {
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

/*********************************************************PAGINACIÓN********************************************************* */
const nextPage = document.querySelector(".next-page");
let pageNumber = document.querySelector(".page-number");
pageNumber.textContent = 1;
let pageNum = 1;

nextPage.addEventListener("click", function (){
    pageNum++;
    pageNumber.textContent = pageNum;

    movieContainer.innerHTML = "";
    listContainer.innerHTML = "";

    if (currentView === "grid") {

        switch (buttonView) {
            case "upcoming":
                movies = getUpcomingList(pageNum).then(movies => {
                    addMoviesGrid(movies);
                });
                break;
            
            case "nowPlaying":
                movies = getNowPlayingList(pageNum).then(movies => {
                    addMoviesGrid(movies);
                });
                break;

            case "rating":
                movies = getMostRatedList(pageNum).then(movies => {
                    addMoviesGrid(movies);
                });
                break;
                 
            default:
                movies = getMovieList(pageNum).then(movies => {
                    addMoviesGrid(movies);
                });
                break;
        }

    } else if (currentView === "list") {
        switch (buttonView) {
            case "upcoming":
                movies = getUpcomingList(pageNum).then(movies => {
                    addMoviesList(movies);
                });
                break;
            
            case "nowPlaying":
                movies = getNowPlayingList(pageNum).then(movies => {
                    addMoviesList(movies);
                });
                break;

            case "rating":
                movies = getMostRatedList(pageNum).then(movies => {
                    addMoviesList(movies);
                });
                break;
                 
            default:
                movies = getMovieList(pageNum).then(movies => {
                    addMoviesList(movies);
                });
                break;
        }
    }
});

const previousPage = document.querySelector(".previous-page");

previousPage.addEventListener("click", function(){
    if (pageNum > 1) {
        pageNum--;
        pageNumber.textContent = pageNum;

        movieContainer.innerHTML = "";
        listContainer.innerHTML = "";

        if (currentView === "grid") {

            switch (buttonView) {
                case "upcoming":
                    movies = getUpcomingList(pageNum).then(movies => {
                        addMoviesGrid(movies);
                    });
                    break;
                
                case "nowPlaying":
                    movies = getNowPlayingList(pageNum).then(movies => {
                        addMoviesGrid(movies);
                    });
                    break;
    
                case "rating":
                    movies = getMostRatedList(pageNum).then(movies => {
                        addMoviesGrid(movies);
                    });
                    break;
                     
                default:
                    movies = getMovieList(pageNum).then(movies => {
                        addMoviesGrid(movies);
                    });
                    break;
            }
    
        } else if (currentView === "list") {
            indexCount = (pageNum - 1) * 20; // Si pageNum es 2, empieza a contar desde la pelicula numero 20 en la programación, en nuestra vista, la 21
            switch (buttonView) {
                case "upcoming":
                    movies = getUpcomingList(pageNum).then(movies => {
                        addMoviesList(movies);
                    });
                    break;
                
                case "nowPlaying":
                    movies = getNowPlayingList(pageNum).then(movies => {
                        addMoviesList(movies);
                    });
                    break;
    
                case "rating":
                    movies = getMostRatedList(pageNum).then(movies => {
                        addMoviesList(movies);
                    });
                    break;
                     
                default:
                    movies = getMovieList(pageNum).then(movies => {
                        addMoviesList(movies);
                    });
                    break;
            }
        }
    }
});

/***********************************************************DETALLE************************************************************ */
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

/************************************************************BOTONES********************************************************* */

/* BOTON GRID  */
const gridButton = document.querySelector(".grid"); //Seleccionamos el elemento con clase grid en el HTML (botón)
function clickGrid() {
    buttonView = "default";
    movieContainer.innerHTML = ""; //Vaciamos el container de GRID
    movieContainer.className = "movie-container layout-box"; //Añadimos las clases al container GRID
    listContainer.innerHTML = ""; //Vaciamos el container de LIST
    listTitles.className = "hidden"; // Añadimos la clase Hidden para que desaparezca el container LIST cuando volvamos al GRID
    
    movies = getMovieList(1).then(movies => {
        addMoviesGrid(movies);
    });
    pageNum = 1;
    pageNumber.textContent = 1;
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

    movies = getMovieList(1).then(movies => {
        addMoviesList(movies);
    });
    pageNum = 1;
    pageNumber.textContent = 1;
    currentView = "list"; //Le decimos a currentView que estamos en modo LIST
}

listButton.addEventListener("click", clickList); //Añadimos un evento para cuando clickemos en el botón LIST se ejecute la funcion clickList

/* BOTON UPCOMING */
const upcomingButton = document.querySelector(".upcoming"); // Seleccionamos el elemento con clase filter-films-desc en HTML (botón)
let buttonView;
upcomingButton.addEventListener("click", () => { //Añadimos un evento para cuando clickemos en el botón de filtrado se ejecute la funcion clickFilterDesc

    buttonView = "upcoming";

    if (currentView === "grid") { // Si estamos en la vista GRID
        movieContainer.innerHTML = ""; // Vacia el container GRID
        pageNum = 1;
        pageNumber.textContent = 1;
        movies = getUpcomingList(pageNum).then(movies => {
            addMoviesGrid(movies);
        });

    } else if (currentView === "list") { //Si estamos en la vista LIST
        listContainer.innerHTML = ""; // Vacia el contenedor LIST
        indexCount = 0; // Reiniciamos el contador
        pageNum = 1;
        pageNumber.textContent = 1;
        movies = getUpcomingList(pageNum).then(movies => {
            addMoviesList(movies);
        });
    }
});

/* BOTON NOW PLAYING */    
const sortButtonAsc = document.querySelector(".now-playing"); // Seleccionamos el elemento con clase filter-films-asc en HTML (botón)

sortButtonAsc.addEventListener("click", () =>{ //Añadimos un evento para cuando clickemos en el botón de filtrado se ejecute la funcion clickFilterASC

    buttonView = "nowPlaying";

if (currentView === "grid"){ // Si estamos en la vista GRID
    movieContainer.innerHTML = ""; // Vacia el container GRID
    pageNum = 1;
    pageNumber.textContent = 1;
    movies = getNowPlayingList(pageNum).then(movies => {
        addMoviesGrid(movies);
    });
    

} else if (currentView === "list") { // Si estamos en la vista LIST
    listContainer.innerHTML = ""; // Vacia el contenedor LIST
    indexCount = 0; // Reiniciamos el contador
    pageNum = 1;
    pageNumber.textContent = 1;
    movies = getNowPlayingList(pageNum).then(movies => {
        addMoviesList(movies);
    });
}
})

/* BOTON RATING */   
const ratingButton = document.querySelector(".rating-desc");

ratingButton.addEventListener('click', () => {

buttonView = "rating";

if (currentView === "grid") {
    movieContainer.innerHTML = "";
    pageNum = 1;
    pageNumber.textContent = 1;
    movies = getMostRatedList(pageNum).then(movies => {
        addMoviesGrid(movies);
    });

} else if (currentView === "list") {
    listContainer.innerHTML = "";
    indexCount = 0;
    pageNum = 1;
    pageNumber.textContent = 1;
    movies = getMostRatedList(pageNum).then(movies => {
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
                        listElement.addEventListener("click", function(){
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

        getMovieList(1).then(movies => {
            if (currentView === "grid") {
                pageNum = 1;
                pageNumber.textContent = 1;
                addMoviesGrid(movies);

            } else if (currentView === "list") {
                pageNum = 1;
                pageNumber.textContent = 1;
                indexCount = 0; 
                addMoviesList(movies);
            }
        });
    }
}

/* Añadimos los contenedores al HTML */

document.querySelector("#root").appendChild(movieContainer); //Añadimos el container del GRID al MAIN (con ID root)
document.querySelector("#root").appendChild(listContainer); //Añadimos el container del LIST al MAIN (con ID root)

/* CONTADOR DE LISTAS */

let indexCount = 0;
export function createMovieIndex() {
    const indexNum = document.createElement("div");
    indexNum.className = "film-number";

    indexCount++;
    indexNum.textContent = indexCount;

    return indexNum;
}
