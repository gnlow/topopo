import type {
    GeoJsonProperties,
    FeatureCollection,
} from "https://esm.sh/v135/geojson@0.5.0"

import {
    GeoJSON,
    type LineString,
    type Polygon,
    type Feature,
    type Point,
    type Geometry,
    type MultiLineString,
    type MultiPolygon,
} from "../deps/ol.ts"

import * as turf from "../deps/turf.ts"

const format = new GeoJSON()

type LineLike = LineString | MultiLineString | Polygon | MultiPolygon

export const lineIntersect =
    (
        a: Feature<LineLike>,
        b: Feature<LineLike>,
    ) => {
        const intersects = turf.lineIntersect(
            format.writeFeaturesObject([a]) as FeatureCollection<LineLike, GeoJsonProperties>,
            format.writeFeaturesObject([b]) as FeatureCollection<LineLike, GeoJsonProperties>,
        )
        return format.readFeatures(intersects) as Feature<Point>[]
    }