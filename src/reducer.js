import { ADD_GEOJSON, SELECT_GEOJSON } from "./types";

export const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

export const initialState = {
  selectedLayer: null,
  layers: JSON.parse(localStorage.getItem("layers")) || [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GEOJSON:
      return { ...state, layers: [...state.layers, action.payload] };
    case SELECT_GEOJSON:
      return { ...state, selectedLayer: action.payload };
    default:
      return state;
  }
};
