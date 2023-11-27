import {
    Draw,
    Map,
    View,
    OSM,
    VectorSource,
    TileLayer,
    VectorLayer,
    TopoJSON,
} from "./deps/ol.ts"

const source = new VectorSource({wrapX: false})

new Map({
    target: "map",
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        new VectorLayer({
            source: new VectorSource({
                url: "https://openlayers.org/en/latest/examples/data/topojson/world-110m.json",
                format: new TopoJSON({
                    layers: ["countries"],
                }),
                overlaps: false,
            }),
            style: {
                "fill-color": "rgba(100, 100, 200, 0.6)",
                "stroke-color": "#319FD3",
                "stroke-width": 1,
            },
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

