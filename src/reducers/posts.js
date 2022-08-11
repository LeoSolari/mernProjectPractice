// IMPORT CONSTS ACTIONS

import {
  FETCH_ALL,
  DELETE,
  CREATE,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH,
  FETCH_POST,
} from "../constants/actionTypes";

export default (state = { posts: [] }, action) => {
  switch (action.type) {
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case FETCH_POST:
      return { ...state, post: action.payload };
    default:
      return state;
  }
};
