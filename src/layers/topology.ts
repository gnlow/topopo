import {
    VectorLayer,
    VectorSource,
    TopoJSON,
    Fill,
    Style,
    Stroke,
    CircleStyle,
} from "../deps/ol.ts"
import { randColor } from "../util/randColor.ts"

export const topology = new VectorLayer({
    source: new VectorSource({
        url: "https://openlayers.org/en/latest/examples/data/topojson/world-110m.json",
        format: new TopoJSON({
            layers: ["land"],
        }),
        overlaps: false,
    }),
    style: feature => new Style({
        fill: new Fill({
            color: "transparent",
        }),
        stroke: new Stroke({
            width: 3,
            color: randColor(),
        }),
        image: new CircleStyle({
            stroke: new Stroke({
                width: 3,
            }),
            radius: 5,
        })
    })
})