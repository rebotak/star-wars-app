export const LOAD = 'profile/LOAD';
export const LOAD_SUCCESS = 'profile/LOAD_SUCCESS';
export const LOAD_FAIL = 'profile/LOAD_FAIL';

const initialState = {
  loaded: false,
  data: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.data,
        list: action.payload.data.results,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export function load(pageNumber) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    payload: {
      request: {
        url: `/people?page=${pageNumber}`,
        method: 'get'
      }
    }
  };
}

