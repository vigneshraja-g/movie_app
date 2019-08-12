import { MOVIE_SEARCH_SUCCESS, MOVIE_SEARCH_ERROR } from './reducers';

// const urlapi = `https://reqres.in/api`;

export function searchMovie(res) {
  return {
    type: res.type,
    payload: res.payload,
  };
}

export function searchMovies(searchTerm, page) {
  return (dispatch) => {
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=fa281222&s=${searchTerm}&page=${page}`;
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        data.searchTerm = searchTerm;
        data.page = page;
        dispatch(searchMovie({ type: MOVIE_SEARCH_SUCCESS, payload: data }));
      })
      .catch((err) => {
        dispatch(searchMovie({ type: MOVIE_SEARCH_ERROR, payload: err }));
      });
  };
}
