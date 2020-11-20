import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export const profile = (state = initialState, aciotn) => {
  const { type, payload } = aciotn;
  switch (type) {
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };
    case GET_REPOS:
      return { ...state, repos: payload, loading: false };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, profile: null, loading: false, error: payload };
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false };
    default:
      return state;
  }
};
