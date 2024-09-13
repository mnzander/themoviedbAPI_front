import { allCategories } from '../data/movie-categories';

/* ELEMENTOS DE DETALLE */

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "5d8eaed2475a13402c33e7dd4ab82ec2";
const langCode = "es-ES";

// https://api.themoviedb.org/3/movie/653346/images?api_key=5d8eaed2475a13402c33e7dd4ab82ec2

export async function fetchMovieImages(movieId) {
    const url = `${baseUrl}/movie/${movieId}/images?api_key=${apiKey}`;
    const response = await fetch(url);
    return await response.json();
}

export async function fetchMovieDetail(movieId) {
    const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=${langCode}`;
    const response = await fetch(url);
    return await response.json();
}

async function fetchMovieCredits(movieId) {
    const url = `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}&language=${langCode}`;
    const response = await fetch(url);
    return await response.json();
}

async function fetchMovieRecommendations(movieId) {
    const baseUrl = "https://api.themoviedb.org/3";
    const url = `${baseUrl}/movie/${movieId}/recommendations?api_key=${apiKey}&language=${langCode}`;
    const response = await fetch(url);
    const json = await response.json();
    return json.results;
}

export async function getMovieDetail(movieId) {
    const movieData = await fetchMovieDetail(movieId);
    const creditsData = await fetchMovieCredits(movieId);
    const imageData = await fetchMovieImages(movieId);
    console.log(imageData);

    const {id, title, overview: description, poster_path: poster, genres, backdrop_path: background, release_date, runtime, popularity, budget, origin_country: country, original_language, vote_average, vote_count} = movieData;

    const year = release_date.split("-")[0];
    const rating = vote_average.toFixed(1);
    const popular = Math.round(popularity);
    const categories = genres.map((genre) => genre.name).join(', ');
    const language = original_language.toUpperCase();

    const {cast, crew} = creditsData;
    const actors = cast.map(member => member.name)
    const actorsImg = cast.map(member => member.profile_path)
    const actorsCharacter = cast.map(member => member.character);
    const director = crew.find(member => member.job.toLowerCase() === "director")?.name ?? "(not available)";

    return {id, title, description, poster, categories, background, release_date, year, runtime, actors, actorsCharacter, actorsImg, director, budget, popular, country, language, rating, vote_count};
}

/* CREAMOS EL CONTENEDOR */

const movieDetailContainer = document.createElement("div");
movieDetailContainer.className = "detail-container";

document.querySelector("#root").appendChild(movieDetailContainer);

/***********************************************MAIN********************************************* */

export function createMainContainer(movie) {
    const moviePoster = document.createElement("div");
    moviePoster.className = "imagen";
    const baseUrl = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";
    moviePoster.style.backgroundImage = `url(${baseUrl}${movie.background})`;

    // moviePoster.appendChild(createMenu(movie.poster, movie.title));
    moviePoster.appendChild(createData(movie.title, movie.year));
    moviePoster.appendChild(createBlackData(movie.popular, movie.rating, movie.vote_count));

    return moviePoster;
}

export function createMenu(poster, title) {
    const menuContainer = document.createElement("div");
    menuContainer.className = "menu-float layout-box";

        const baseUrl = "https://image.tmdb.org/t/p/w500";
        const imgSrc = `${baseUrl}${poster}`;

        const posterMenu = document.createElement("img");
        posterMenu.className = "poster-menu";
        posterMenu.src = imgSrc;
        posterMenu.alt = title;

        const menuNav = document.createElement("nav");
        menuNav.className = "opciones";

            const menuList = document.createElement("ul");
            menuList.className = "lista";

                const menuOverview = document.createElement("li");
                menuOverview.className = "item selected";

                    const overviewLink = document.createElement("a");
                    overviewLink.href = "#overview";
                    overviewLink.textContent = "Overview";

                const menuDescription = document.createElement("li");
                menuDescription.className = "item";

                    const descripcionLink = document.createElement("a");
                    descripcionLink.href = "#description"
                    descripcionLink.textContent = "Description"

                const menuActors = document.createElement("li");
                menuActors.className = "item";

                    const actorsLink = document.createElement("a");
                    actorsLink.href = "#actors";
                    actorsLink.textContent = "Actors"

                const menuRecommendations = document.createElement("li");
                menuRecommendations.className = "item";

                    const recommendationsLink = document.createElement("a");
                    recommendationsLink.href = "#also";
                    recommendationsLink.textContent = "You May Also Like";

        menuOverview.appendChild(overviewLink);
        menuActors.appendChild(actorsLink);
        menuDescription.appendChild(descripcionLink);
        menuRecommendations.appendChild(recommendationsLink);

        menuList.appendChild(menuOverview);
        menuList.appendChild(menuActors);
        menuList.appendChild(menuDescription);
        menuList.appendChild(menuRecommendations);

        menuNav.appendChild(menuList);

        menuContainer.appendChild(posterMenu);
        menuContainer.appendChild(menuNav);

        return menuContainer; 
}

function createData(title, year) {
    const movieData = document.createElement("div");
    movieData.className = "data layout-box2";

    const movieTitle = document.createElement("p");
    movieTitle.className = "title-movie";
    movieTitle.textContent = title;
    movieData.appendChild(movieTitle);

    const date = document.createElement("p");
    date.className = "date-movie";
    date.textContent = year;
    movieData.appendChild(date);

    return movieData;
}

function createBlackData(popular, rating, vote_count) {
    const blackContainer = document.createElement("div");
    blackContainer.className = "black";

    const ratingContainer = document.createElement("div");
    ratingContainer.className = "rating layout-box2";

/************************************************************************** */
    const rateContainer = document.createElement("div");
    rateContainer.className = "rate";

    const horizonVotes = document.createElement("div");
    horizonVotes.className = "horizon";
    horizonVotes.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" version="1.1">
            <g transform="translate(0 -1028.4)">
                <path d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z" fill="#c0392b"/>
            </g>
        </svg>
        `;

    const verticalVotes = document.createElement("div");
    verticalVotes.className = "vertical"

    const votesRate = document.createElement("p");
    votesRate.className = "class1";
    votesRate.textContent = rating;
    
    const votesCount = document.createElement("p");
    votesCount.className = "class2";
    votesCount.textContent = `${vote_count} votes`;

/************************************************************************* */

    const yourRateContainer = document.createElement("div");
    yourRateContainer.className = "rate";

    const yourHorizonRate = document.createElement("div");
    yourHorizonRate.className = "horizon";
    yourHorizonRate.innerHTML = `
        <svg class="icon filler" xmlns="http://www.w3.org/2000/svg"viewBox="0 -960 960 960" fill="#ffffff">
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
        </svg>
        `;

    const yourVerticalVotes = document.createElement("div");
    yourVerticalVotes.className = "vertical"

    const yourVotesRate = document.createElement("p");
    yourVotesRate.className = "class1";
    yourVotesRate.textContent = "Rate this movie";
    
    const yourVotesCount = document.createElement("p");
    yourVotesCount.className = "class2";
    yourVotesCount.textContent = "What did you think?";

/************************************************************************ */

    const popularityContainer = document.createElement("div");
    popularityContainer.className = "rate";

    const horizonPopularity = document.createElement("div");
    horizonPopularity.className = "horizon";
    horizonPopularity.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="yellow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-star">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
        </svg>`;

    const verticalPopularity = document.createElement("div");
    verticalPopularity.className = "vertical"

    const popularityRate = document.createElement("p");
    popularityRate.className = "class1";
    popularityRate.textContent = popular;

    const popularityText = document.createElement("p");
    popularityText.className = "class2"
    popularityText.textContent = "Popularity Points"

/************************************************************************ */

    blackContainer.appendChild(ratingContainer);

    ratingContainer.appendChild(rateContainer);
    ratingContainer.appendChild(yourRateContainer);
    ratingContainer.appendChild(popularityContainer);

    verticalVotes.appendChild(votesRate);
    verticalVotes.appendChild(votesCount);

    horizonVotes.appendChild(verticalVotes);

    rateContainer.appendChild(horizonVotes);

    yourVerticalVotes.appendChild(yourVotesRate);
    yourVerticalVotes.appendChild(yourVotesCount);

    yourHorizonRate.appendChild(yourVerticalVotes);
    yourRateContainer.appendChild(yourHorizonRate);

    verticalPopularity.appendChild(popularityText);
    verticalPopularity.appendChild(popularityRate)

    horizonPopularity.appendChild(verticalPopularity);

    popularityContainer.appendChild(horizonPopularity);
    

    return blackContainer;
}

/**********************************************OVERVIEW******************************************* */
export function createOverview(movie){
    const overviewContainer = document.createElement("section");
    overviewContainer.className = "overview";
    overviewContainer.id = "overview";

    const overviewInfo = document.createElement("div");
    overviewInfo.className = "informacion layout-box2";

    const descriptionTitle = document.createElement("p");
    descriptionTitle.className = "description-title layout-box2"
    descriptionTitle.textContent = "Description";
    descriptionTitle.id = "description";

    const movieDescription = document.createElement("div");
    movieDescription.className = "descripcion layout-box2";
    movieDescription.textContent = movie.description;

    /********************************************************* */
    const releaseRow = document.createElement("div");
    releaseRow.className = "info1";

        const movieRelease = document.createElement("div");
        movieRelease.className = "i1";
        
            const releaseText = document.createElement("h3");
            releaseText.className = "greyinfo";
            releaseText.textContent = "Released"

            const releaseDate = document.createElement("p");
            releaseDate.className = "white";
            releaseDate.textContent = movie.release_date;

    /******************************************************** */
    const crewRow = document.createElement("div");
    crewRow.className = "info1";

        const movieDirector = document.createElement("div");
            movieDirector.className = "i1";
            
            const movieDirectorText = document.createElement("h3");
            movieDirectorText.className = "greyinfo";
            movieDirectorText.textContent = "Director"

            const movieDirectorName = document.createElement("p");
            movieDirectorName.className = "white";
            movieDirectorName.textContent = movie.director;

    /********************************************************** */
    const languageCountryRow = document.createElement("div");
    languageCountryRow.className = "info1";

        const movieCountry = document.createElement("div");
            movieCountry.className = "i1";
            
            const movieCountryText = document.createElement("h3");
            movieCountryText.className = "greyinfo";
            movieCountryText.textContent = "Country"

            const movieCountryName = document.createElement("p");
            movieCountryName.className = "white";
            movieCountryName.textContent = movie.country;

        const movieLanguage = document.createElement("div");
            movieLanguage.className = "i1";
            
            const movieLanguageText = document.createElement("h3");
            movieLanguageText.className = "greyinfo";
            movieLanguageText.textContent = "Language"

            const movieLanguageName = document.createElement("p");
            movieLanguageName.className = "white";
            movieLanguageName.textContent = movie.language;

    /*********************************************************** */
    const genresRow = document.createElement("div");
    genresRow.className = "info1";

    const movieGenres = document.createElement("div");
    movieGenres.className = "i1";
    
    const movieGenresText = document.createElement("h3");
    movieGenresText.className = "greyinfo";
    movieGenresText.textContent = "Genres"

    const movieGenresName = document.createElement("p");
    movieGenresName.className = "white";
    movieGenresName.textContent = movie.categories;

    /*********************************************************** */
    movieRelease.appendChild(releaseText);
    movieRelease.appendChild(releaseDate);
    releaseRow.appendChild(movieRelease);

    movieDirector.appendChild(movieDirectorText);
    movieDirector.appendChild(movieDirectorName);
    crewRow.appendChild(movieDirector);

    movieCountry.appendChild(movieCountryText);
    movieCountry.appendChild(movieCountryName);
    movieLanguage.appendChild(movieLanguageText);
    movieLanguage.appendChild(movieLanguageName);
    languageCountryRow.appendChild(movieCountry);
    languageCountryRow.appendChild(movieLanguage);

    movieGenres.appendChild(movieGenresText);
    movieGenres.appendChild(movieGenresName);
    genresRow.appendChild(movieGenres);

    overviewInfo.appendChild(releaseRow);
    overviewInfo.appendChild(crewRow);
    overviewInfo.appendChild(languageCountryRow);
    overviewInfo.appendChild(genresRow);
    overviewInfo.appendChild(descriptionTitle);
    overviewInfo.appendChild(movieDescription);

    overviewContainer.appendChild(overviewInfo);
    
    return overviewContainer;
}

/**********************************************ACTORES********************************************* */

export function createActors(actors, actorsCharacter, actorsImg) {
    const actorSection = document.createElement("section");
    actorSection.className = "actores";
    actorSection.id = "actors";

    const actorTitle = document.createElement("div");
    actorTitle.className = "titulo layout-box2";
    
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("viewBox", "0 -960 960 960");
    svgElement.innerHTML = `<path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>`;

    const actorsHeader = document.createElement("h3");
    actorsHeader.textContent = "Actors";
    
    const castCrew = document.createElement("p");
    castCrew.className = "all";
    castCrew.textContent = "All Cast & Crew";

    const actorsContainer = document.createElement("div");
    actorsContainer.className = "container layout-box2";

    for (let i = 0; i < Math.min(actors.length, 10); i++) {
        const actor = actors[i];
        const character = actorsCharacter[i];
        const baseUrl = "https://image.tmdb.org/t/p/w500";
        const imgSrc = `${baseUrl}${actorsImg[i]}`;

        const article = document.createElement('article');
        article.className = "item";

        const actorDiv = document.createElement('div');
        actorDiv.className = "actor";

        const nombre = document.createElement('p');
        nombre.className = "nombre";
        nombre.textContent = actor;

        const personaje = document.createElement('p');
        personaje.className = "personaje";
        personaje.textContent = character;

        const actorImage = document.createElement('img');
        actorImage.className = "item";
        actorImage.src = imgSrc;
        actorImage.alt = actor;

        actorDiv.appendChild(nombre);
        actorDiv.appendChild(personaje);

        article.appendChild(actorImage);
        article.appendChild(actorDiv);

        actorsContainer.appendChild(article);
    }

    actorTitle.appendChild(actorsHeader);
    actorTitle.appendChild(castCrew);
    actorTitle.appendChild(svgElement);

    actorSection.appendChild(actorTitle);
    actorSection.appendChild(actorsContainer);

    return actorSection;
}

/******************************************RECOMENDACIONES**************************************** */

export async function createRecommendations(movieId) {
    const recommendations = document.createElement("section");
    recommendations.className = "also";
    recommendations.id = "also"

    const titleRecommendations = document.createElement("div");
    titleRecommendations.className = "titulo layout-box2";
    titleRecommendations.innerHTML = "<h3>You may also like</h3>";

    const gridRecommendations = document.createElement("div");
    gridRecommendations.className = "grid layout-box2";

    let recommendationsData = await fetchMovieRecommendations(movieId);
    recommendationsData = recommendationsData.slice(0, 2).filter(movie => movie.adult === false).map(movie => {
        const {id, title, poster_path: poster, release_date, genre_ids: genres} = movie;
        
        const year = release_date.split("-")[0];
        let categories = "";
        if (genres && genres.length > 0) {
            for (let i = 0; i < genres.length; i++) {
                const genreId = genres[i];
                const category = allCategories.find(cat => cat.id === genreId);
                if (category) {
                    categories += category.name + (i < genres.length - 1? ", " : "");
                }
            }
        }

        return {id, title, poster, year, categories};
    });

    for (let i = 0; i < recommendationsData.length; i++) {
        const movie = recommendationsData[i];
        const { title, poster, year: releaseDate, categories } = movie;
        const baseUrl = "https://image.tmdb.org/t/p/w500";
        const imgSrc = `${baseUrl}${poster}`;
        
        const article = document.createElement("article");
        article.className = "item band";
        article.style.backgroundImage = `url(${imgSrc})`;
        article.addEventListener("click", function(){
            const id = movie.id;
            localStorage.setItem("ID", id);
            recommendationsIdFinder();
        });

        const gradient = document.createElement("div");
        gradient.className = "gradient";

        const centrar = document.createElement("div");
        centrar.className = "centrar";

        const circle = document.createElement("div");
        circle.className = "circulo";
        circle.innerHTML = `
            <svg class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>
            `;

        const data = document.createElement("div");
        data.className = "data";

        const movieCategories = document.createElement("p");
        movieCategories.className = "subtitle";
        movieCategories.textContent = categories;

        const movieTitle = document.createElement("h4");
        movieTitle.className = "title";
        movieTitle.textContent = title;

        const movieRelease = document.createElement("time");
        movieRelease.className = "date";
        movieRelease.textContent = releaseDate;

        centrar.appendChild(circle);
        gradient.appendChild(centrar);
        gradient.appendChild(data);

        data.appendChild(movieCategories);
        data.appendChild(movieTitle);
        data.appendChild(movieRelease);

        article.appendChild(gradient);
        gridRecommendations.appendChild(article);
    }

    recommendations.appendChild(titleRecommendations);
    recommendations.appendChild(gridRecommendations);

    return recommendations;
}

async function recommendationsIdFinder() {
    const recommendationID = localStorage.getItem("ID");
    if (recommendationID) { 
        try {
            console.log("movieID obtenido:", recommendationID);
            document.querySelector("#root").innerHTML = "";

            const recommendationDetails = await getMovieDetail(recommendationID);

            const recommendationContainer = document.createElement("div");
            recommendationContainer.className = "detail-container";

            recommendationContainer.appendChild(createMenu(recommendationDetails.poster, recommendationDetails.title));
            recommendationContainer.appendChild(createMainContainer(recommendationDetails));
            recommendationContainer.appendChild(createOverview(recommendationDetails));
            recommendationContainer.appendChild(createActors(recommendationDetails.actors, recommendationDetails.actorsCharacter, recommendationDetails.actorsImg));
            recommendationContainer.appendChild(await createRecommendations(recommendationDetails.id));
            
            document.querySelector("#root").appendChild(recommendationContainer);

        } catch (error) {
            console.error("Error searching movies:", error);
            span.textContent = "Search failed...";
        }
    }
}

/**********************************************SCROLL******************************************* */

window.addEventListener("scroll", function () {
    let menuFixed = document.querySelector(".menu-float");
    let also = document.querySelector(".also");
    let footer = document.querySelector(".footer");
    let footerBounding = footer.getBoundingClientRect();
    let alsoBounding = also.getBoundingClientRect();
    let menuFixedBounding = menuFixed.getBoundingClientRect();

    if (window.scrollY <= footerBounding.top + 250) {
        menuFixed.style.position = "fixed";
        menuFixed.style.top = "375px";

    } else {
        menuFixed.style.position = "absolute";
        menuFixed.style.top = (window.scrollY + alsoBounding.bottom - menuFixedBounding.height) + 'px';
    }
});