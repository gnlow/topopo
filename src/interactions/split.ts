import {
    Draw,
    Feature,
    type Geometry,
    type VectorSource,
    type BaseEvent,
    LineString,
} from "../deps/ol.ts"

import { assert } from "../util/assert.ts"

export const split =
(source: VectorSource<Feature<Geometry>>) => {
    const draw = new Draw({
        source,
        type: "LineString",
    })
    draw.on("drawstart", e => {
        const geometry = e.feature.getGeometry()
        assert(geometry)
        geometry.on("change", onGeomChange)
    })
    return draw
}

const onGeomChange = (e: BaseEvent) => {
    const lineString = e.target as LineString
    // console.log(lineString.getCoordinates())
}