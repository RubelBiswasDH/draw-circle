export default class GeoJsonModel {
    constructor(feature) {
      this.type = "FeatureCollection";
      this.features = [feature];
    }
  
    getId() {
      return this.features[0].id;
    }
  }
  