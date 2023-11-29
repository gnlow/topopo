import {
    Draw,
    Map,
    View,
    OSM,
    VectorSource,
    TileLayer,
    VectorLayer,
    TopoJSON,
    Snap,
} from "./deps/ol.ts"

import { topology } from "./layers/topology.ts"

import { split } from "./interactions/split.ts"
import { snap } from "./interactions/snap.ts"

const source = new VectorSource({wrapX: false})

const lineLayer = new VectorLayer({
    source,
})

const map = new Map({
    target: "map",
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        topology,
        lineLayer,
    ],
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
    }),
    interactions: [
        split(source),
        snap(topology.getSource()!),
        snap(lineLayer.getSource()!),
    ]
})

map.on("click", e => {
    map.forEachFeatureAtPixel(e.pixel, feature => {
        const type = feature.getGeometry()?.getType()
        if (type?.endsWith("Polygon"))
        console.log(
            "click:",
            feature.getGeometry()?.getType(),
            feature.getId(),
        )
    })
})