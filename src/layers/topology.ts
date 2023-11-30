import {
    VectorLayer,
    VectorSource,
    TopoJSON,
} from "../deps/ol.ts"

export const topology = new VectorLayer({
    source: new VectorSource({
        url: "https://openlayers.org/en/latest/examples/data/topojson/world-110m.json",
        format: new TopoJSON({
            layers: ["land"],
        }),
        overlaps: false,
    }),
    style: {
        "fill-color": "rgba(100, 100, 200, 0.6)",
        "stroke-width": 3,
        "circle-stroke-width": 3,
        "circle-radius": 5,
    },
})