export const getMovies = () => {
    return fetch('http://localhost:8080/movies/getMovies')
        .then(response => response.json())
};

