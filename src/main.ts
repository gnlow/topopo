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

import { useSplit } from "./interactions/split.ts"
import { useSnap } from "./interactions/snap.ts"

const map = new Map({
    target: "map",
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        topology,
    ],
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
    }),
})

const lineLayer = useSplit(map)
useSnap(topology.getSource()!)
useSnap(lineLayer.getSource()!)

map.on("pointermove", e => {
    map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        if (layer) {
            console.log(feature.getProperties())
        }
    })
})