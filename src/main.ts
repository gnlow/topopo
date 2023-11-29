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
    MultiLineString,
    GeoJSONMultiLineString,
    Feature,
    GeoJSON,
    defaultInteractions,
    DragRotateAndZoom,
} from "./deps/ol.ts"

import { topology } from "./layers/topology.ts"

import { split } from "./interactions/split.ts"
import { snap } from "./interactions/snap.ts"


import { merge, mesh } from "./deps/topojson-client.ts"

const topo = await fetch("https://openlayers.org/en/latest/examples/data/topojson/world-110m.json").then(x => x.json())

console.log(
    mesh(topo)
)


const format = new GeoJSON()
const topoMesh = format.readGeometry(mesh(topo))

const mul = new VectorLayer({
    source: new VectorSource({
        features: [
            new Feature({
                geometry: topoMesh,
            })
        ]
    }),
    style: {
        "stroke-width": 3
    }
})


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
        //topology,
        mul,
        lineLayer,
    ],
    view: new View({
        center: [0, 0],
        zoom: 4,
        projection: "EPSG:4326",
    }),
    interactions: defaultInteractions().extend([
        new DragRotateAndZoom(),
        split(source),
        snap(mul.getSource()!),
        snap(lineLayer.getSource()!),
    ])
})

map.on("click", e => {
    map.forEachFeatureAtPixel(e.pixel, feature => {
        const type = feature.getGeometry()?.getType()
        //if (type?.endsWith("Polygon"))
        console.log(
            "click:",
            feature.getGeometry()?.getType(),
            feature.getId(),
        )
    })
})


