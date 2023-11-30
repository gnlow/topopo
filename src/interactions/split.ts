import {
    Draw,
    Feature,
    type Geometry,
    type VectorSource,
    type BaseEvent,
    type LineString,
    type MultiPolygon,
} from "../deps/ol.ts"

import { assert } from "../util/assert.ts"
import { lineIntersect } from "../util/turf.ts";

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
    draw.on("drawend", e => {
        const geometry = e.feature.getGeometry()!
        const a = e.feature as Feature<LineString>
        const extent = geometry.getExtent()
        source.forEachFeatureIntersectingExtent(extent, feature => {
            const b = feature as Feature<MultiPolygon>
            source.addFeatures(lineIntersect(a, b))
            console.log(lineIntersect(a, b))
        })
    })
    return draw
}

const onGeomChange = (e: BaseEvent) => {
    const lineString = e.target as LineString
    // console.log(lineString.getCoordinates())
}