export const MOVIE_SEARCH = 'MOVIE_SEARCH';
export const MOVIE_SEARCH_SUCCESS = 'MOVIE_SEARCH_SUCCESS';
export const MOVIE_SEARCH_ERROR = 'MOVIE_SEARCH_ERROR';

const initialState = {
  loading: true,
  response: false,
  movie: [],
  error: '',
};

function movieSearch(state = initialState, action) {
  switch (action.type) {
    case MOVIE_SEARCH:
      return {
        ...state,
        loading: true,
      };
    case MOVIE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchTerm: action.payload ? action.payload.searchTerm : '',
        response: action.payload ? action.payload.Response : false,
        error: action.payload ? action.payload.Error : false,
        movies: action.payload ? action.payload.Search : [],
        totalpages: action.payload ? parseInt(action.payload.totalResults) : 0,
      };
    case MOVIE_SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        response: action.payload ? action.payload.Response : false,
        error: action.payload ? action.payload.Error : false,
      };
    default:
      return state;
  }
}

export default movieSearch;
