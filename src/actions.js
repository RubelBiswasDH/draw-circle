import { ADD_GEOJSON, SELECT_GEOJSON } from "./types";

export function addLayer(data) {
  return {
    type: ADD_GEOJSON,
    payload: data,
  };
}

export function selectLayer(id) {
  return {
    type: SELECT_GEOJSON,
    payload: id,
  };
}
