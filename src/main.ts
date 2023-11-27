import {
    Draw,
    Map,
    View,
    OSM,
    VectorSource,
    TileLayer,
    VectorLayer,
} from "./deps/ol.ts"

const source = new VectorSource({wrapX: false})

new Map({
    target: "map",
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        new VectorLayer({
            source,
        })
    ],
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
    }),
    interactions: [
        new Draw({
            source,
            type: "LineString",
        })
    ]
})

