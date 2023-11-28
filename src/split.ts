import {
    Draw,
    Feature,
    type Geometry,
    type VectorSource,
    type BaseEvent,
    GeoJSON,
    LineString,
} from "./deps/ol.ts"

import { union } from "./deps/turf.ts"

import { assert } from "./util/assert.ts"

export const split =
(source: VectorSource<Feature<Geometry>>) => {
    const draw = new Draw({
        source,
        type: "LineString",
    })
    draw.on("drawstart", e => {
        const geometry = e.feature.getGeometry()
        assert(geometry)
        geometry.on("change", e => {
            console.log(e.target)
        })
    })
    return draw
}

const onGeomChange = (e: BaseEvent) => {
    const format = new GeoJSON()
    const turfLine = format.writeFeatureObject(new Feature(e.target as LineString))
    union
}