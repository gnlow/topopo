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

import { split } from "./split.ts"

const source = new VectorSource({wrapX: false})

new Map({
    target: "map",
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        topology,
        new VectorLayer({
            source,
        })
    ],
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
    }),
    interactions: [
        split(source),
        new Snap({
            source: topology.getSource()!
        })
    ]
})

