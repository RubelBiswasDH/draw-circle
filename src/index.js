import { render } from "react-dom";
import React, { useReducer, useEffect, useState } from "react";
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import mapboxgl from "mapbox-gl";

import { addLayer, selectLayer } from "./actions";
import { initialState, reducer } from "./reducer";
import GeoJsonModel from "./GeoJsonModel";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./style.css";

mapboxgl.accessToken = "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g",
});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [coordinates, setCoordinates] = useState([])
  const handlSetCoordinates = (value) => {
    // 90.362471%2023.740238,90.362471%2023.740432,90.363101%2023.740432,90.363101%2023.740238,90.362471%2023.740238
    let area = ''
    if (value && value.length){
      for (let i of value){
        area += `${i[0]}%20${i[1]},`   
      }
      console.log(area)
    }
    setCoordinates(value)
    // console.log(value)
  }
  useEffect(() => {
    localStorage.setItem("layers", JSON.stringify(state.layers));
  }, [state.layers]);

  const onDrawCreate = ({ features }) => {
    let feature = new GeoJsonModel(features[0]);
    // console.log("feature", feature?.features[0]?.geometry?.coordinates[0]);

    dispatch(addLayer(feature));
    handlSetCoordinates(feature?.features[0]?.geometry?.coordinates[0])
    // const coordinates = feature[0].geometry?.coordinates
    // console.log({coordinates})
  };

  const onDrawUpdate = ({ features }) => {
    const feature = new GeoJsonModel(features[0]);
    console.log("feature", feature.getId());
  };

  const onDrawDelete = ({ features }) => {
    const feature = features[0];
    // console.log("feature", feature);
  };

  const onDrawSelectionChange = ({ features }) => {
    if (features.length > 0) {
      const feature = new GeoJsonModel(features[0]);
      dispatch(selectLayer(feature.getId()));
    } else {
      dispatch(selectLayer(null));
    }
  };

  return (
    <div className="App">
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        zoom={[16]}
        center={[-73.9757752418518, 40.69144210646147]}
      >
        <DrawControl
          position="top-left"
          onDrawCreate={onDrawCreate}
          onDrawUpdate={onDrawUpdate}
          onDrawDelete={onDrawDelete}
          onDrawSelectionChange={onDrawSelectionChange}
        />
        {state.layers.map((layer, key) => (
          <GeoJSONLayer key={key} data={layer} />
        ))}
      </Map>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  );
}

render(<App />, document.getElementById("root"));
