import { Color as CesiumColor } from "@/cesiumSource/Cesium";
import gpCatalog from "../../data/gp.json";

// https://cesium.com/learn/cesiumjs/ref-doc/Color.html
const debrisColor = new CesiumColor.fromBytes(255, 214, 0,255);
const payloadColor = new CesiumColor.fromBytes(15,98,255,255);
const unknownColor = new CesiumColor.fromBytes(235,235,235,255);

const debris = {
  name: "Debris",
  color: debrisColor,
  data: [],
  kind: "DEBRIS",
  needsDarkText: true
};

const rocketBody = {
  name: "Rocket body",
  color: debrisColor,
  data: [],
  kind: "DEBRIS",
  needsDarkText: true
};

const unknown = {
  name: "Uncategorized",
  color: unknownColor,
  data: [],
  kind: "UNCATEGORIZED",
  needsDarkText: true
};

const payload = {
  name: "Payload",
  color: payloadColor,
  kind: "PAYLOAD",
  data: []
};

const gpCatalogLen = gpCatalog.length;

for (let i = 0; i < gpCatalogLen; i++) {
  const gp = gpCatalog[i];
  if (gp["TLE_LINE0"] && gp["TLE_LINE1"] && gp["TLE_LINE2"]) {
    let target = unknown.data;
    if (gp["OBJECT_TYPE"] === "DEBRIS") {
      target = debris.data;
    } else if (gp["OBJECT_TYPE"] === "ROCKET BODY") {
      target = rocketBody.data;
    } else if (gp["OBJECT_TYPE"] === "PAYLOAD") {
      target = payload.data;
    }
    target.push(gp["TLE_LINE0"], gp["TLE_LINE1"], gp["TLE_LINE2"])
  }
}

const combinedTLE = [
  payload,
  debris,
  rocketBody,
  unknown
];

export default combinedTLE;
