import { allCategories } from '../data/movie-categories';

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "5d8eaed2475a13402c33e7dd4ab82ec2";
const langCode = "es-ES";

// MOVIE LIST FUNCTIONS

async function getAllMovies(pageNum) {
    const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=${langCode}&page=${pageNum}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("The response was not OK");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching movies...");
        throw error;
    }
}

async function getTopRated(pageNum) {
    const apiUrl = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=${langCode}&page=${pageNum}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  } 

async function getUpcoming(pageNum){
    const url = `${baseUrl}/movie/upcoming?api_key=${apiKey}&language=${langCode}&page=${pageNum}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const data = await response.json();
        return data;
    } catch (error){
        console.error("Error fetching upcoming movies", error);
    }
}

async function getNowPlaying(pageNum) {
    const url = `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=${langCode}&page=${pageNum}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const data = await response.json();
        return data;
    } catch (error){
        console.error("Error fetching Now-playing movies", error);
    }
}

export async function getMovieList(pageNum) {
    let buttonView = "default";
    const movieList = await getAllMovies(pageNum);
    const moviesInfo = movieList.results.map(movie => {
        const {id, title, overview: description, poster_path: poster, release_date, genre_ids: genres, vote_average, vote_count: reviews} = movie;

        let year = release_date? release_date.split("-")[0] : '';

        let categories = [];
        if (genres.length > 0) {

            const firstGenreName = genres.map(genreId => {
                const category = allCategories.find(cat => cat.id === genreId);
                return category? category.name : "Unknown";
            }).find(name => name!== "Unknown"); // Encuentra el primer nombre válido de categoría y detén la búsqueda

            categories.push(firstGenreName); // Usa push para añadir solo el primer nombre encontrado

        }
        
        let rating = vote_average? vote_average.toFixed(1) : '';

        return {id, title, description, poster, year, categories, rating, reviews}; // Ahora solo incluye 'categories' que contendrá solo el primer nombre de categoría
    });

    return moviesInfo;
}

export async function getMostRatedList(pageNum) {
    const topRatedView = await getTopRated(pageNum);

    const moviesInfo = topRatedView.results.map(movie => {
        const {id, title, overview: description, poster_path: poster, release_date, genre_ids: genres, vote_average, vote_count: reviews} = movie;
    
        let year = release_date? release_date.split("-")[0] : '';

        let categories = [];
        if (genres && genres.length > 0) {

            const firstGenreName = genres.map(genreId => {
                const category = allCategories.find(cat => cat.id === genreId);
                return category? category.name : "Unknown";
            }).find(name => name!== "Unknown"); // Encuentra el primer nombre válido de categoría y detén la búsqueda

            categories.push(firstGenreName); // Usa push para añadir solo el primer nombre encontrado
        }

        let rating = vote_average? vote_average.toFixed(1) : '';
    
        return {id, title, description, poster, year, categories, rating, reviews};
    });

    return moviesInfo;
}

export async function getUpcomingList(pageNum) {
    const upcomingView = await getUpcoming(pageNum);

    const moviesInfo = upcomingView.results.map(movie => {
        const {id, title, overview: description, poster_path: poster, release_date, genre_ids: genres, vote_average, vote_count: reviews} = movie;

        let year;
        if (release_date) {
            year = release_date.split("-")[0];
        }

        let categories = [];
        if (genres && genres.length > 0) {

            const firstGenreName = genres.map(genreId => {
                const category = allCategories.find(cat => cat.id === genreId);
                return category? category.name : "Unknown";
            }).find(name => name!== "Unknown"); // Encuentra el primer nombre válido de categoría y detén la búsqueda

            categories.push(firstGenreName); // Usa push para añadir solo el primer nombre encontrado
        }

        let rating;
        if (vote_average){
            rating = vote_average.toFixed(1);
        }

        return {id, title, description, poster, year, categories, rating, reviews};
    });

    return moviesInfo;
};

export async function getNowPlayingList(pageNum) {
    const nowPlayingView = await getNowPlaying(pageNum);

    const moviesInfo = nowPlayingView.results.map(movie => {
        const {id, title, overview: description, poster_path: poster, release_date, genre_ids: genres, vote_average, vote_count: reviews} = movie;

        let year;
        if (release_date) {
            year = release_date.split("-")[0];
        }

        let categories = [];
        if (genres && genres.length > 0) {

            const firstGenreName = genres.map(genreId => {
                const category = allCategories.find(cat => cat.id === genreId);
                return category? category.name : "Unknown";
            }).find(name => name!== "Unknown"); // Encuentra el primer nombre válido de categoría y detén la búsqueda

            categories.push(firstGenreName); // Usa push para añadir solo el primer nombre encontrado
        }

        let rating;
        if (vote_average){
            rating = vote_average.toFixed(1);
        }

        return {id, title, description, poster, year, categories, rating, reviews};
    });

    return moviesInfo;
}

// Movie Search Functions

async function fetchMovieQuery(searchString) {
    const searchBaseUrl = "https://api.themoviedb.org/3/search/movie";
    const url = `${searchBaseUrl}?api_key=${apiKey}&language=${langCode}&query=${searchString}`;
    const response = await fetch(url);
    const json = await response.json();
    return json.results;
}

export async function searchMovie(searchString) {
    const moviesData = await fetchMovieQuery(searchString);
    return moviesData.filter (movie => movie.adult === false).map (movie => {
        const {id, title, overview: description, poster_path: poster, release_date, vote_average, vote_count: reviews, genre_ids: genres} = movie;
        const year = release_date.split("-")[0];
        const rating = vote_average.toFixed(1);

        let categories = [];
        if (genres && genres.length > 0) {

            const firstGenreName = genres.map(genreId => {
                const category = allCategories.find(cat => cat.id === genreId);
                return category? category.name : "Unknown";
            }).find(name => name!== "Unknown"); // Encuentra el primer nombre válido de categoría y detén la búsqueda

            categories.push(firstGenreName); // Usa push para añadir solo el primer nombre encontrado
        }

        return {id, title, description, poster, year, rating, reviews, categories};
    });
}