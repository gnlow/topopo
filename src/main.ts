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

new Map({
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

