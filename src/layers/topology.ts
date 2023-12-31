import {
    VectorLayer,
    VectorSource,
    TopoJSON,
    Fill,
    Style,
    Stroke,
    Text,
    CircleStyle,
} from "../deps/ol.ts"
import { hashColor, randColor } from "../util/color.ts"

export const topology = new VectorLayer({
    source: new VectorSource({
        url: "https://openlayers.org/en/latest/examples/data/topojson/world-110m.json",
        format: new TopoJSON({
            layers: ["countries"],
        }),
        overlaps: false,
    }),
    style: feature => new Style({
        fill: new Fill({
            color: hashColor((feature as any).ol_uid),
        }),
        stroke: new Stroke({
            width: 3,
            color: "black",
        }),
        image: new CircleStyle({
            stroke: new Stroke({
                width: 3,
            }),
            radius: 5,
        }),
        text: new Text({
            text: (feature.getGeometry()!.getType()) + (feature as any).ol_uid,
            stroke: new Stroke({
                color: "white",
                width: 10,
            }),
            font: "15px",
        })
    })
})