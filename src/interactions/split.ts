import {
    GeoJsonProperties,
    FeatureCollection,
} from "https://esm.sh/v135/geojson@0.5.0"
import {
    Draw,
    Feature,
    type Geometry,
    type VectorSource,
    type BaseEvent,
    type LineString,
    GeoJSON,
    type Point,
} from "../deps/ol.ts"

import * as turf from "../deps/turf.ts"

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
    draw.on("drawend", e => {
        const format = new GeoJSON()
        const geometry = e.feature.getGeometry()!
        const type = geometry.getType()
        if (type == "LineString" || type == "Polygon") {
            const geojson1 = format.writeFeaturesObject([e.feature]) as FeatureCollection<LineString, GeoJsonProperties>
            const extent = geometry.getExtent()
            source.forEachFeatureIntersectingExtent(extent, feature => {
                const geometry = feature.getGeometry()!
                const type = geometry.getType()
                if (type == "LineString" || type == "Polygon") {
                    const geojson2 = format.writeFeaturesObject([feature]) as FeatureCollection<LineString, GeoJsonProperties>
                    const intersects = turf.lineIntersect(geojson1, geojson2)
                    const points = format.readFeatures(intersects) as Feature<Point>[]
                    source.addFeatures(points)
                    console.log(points)
                }
            })
        }
    })
    return draw
}

const onGeomChange = (e: BaseEvent) => {
    const lineString = e.target as LineString
    // console.log(lineString.getCoordinates())
}