import {
    Draw,
    Feature,
    type Geometry,
    VectorSource,
    type BaseEvent,
    LineString,
    Map,
    VectorLayer,
} from "../deps/ol.ts"

import { assert } from "../util/assert.ts"

export const useSplit = (map: Map) => {
    const source = new VectorSource({wrapX: false})
    const lineLayer = new VectorLayer({
        source,
    })
    
    const draw = new Draw({
        source,
        type: "LineString",
    })
    draw.on("drawstart", e => {
        const geometry = e.feature.getGeometry()
        assert(geometry)
        geometry.on("change", onGeomChange)
    })

    map.addLayer(lineLayer)
    map.addInteraction(draw)

    return lineLayer
}

const onGeomChange = (e: BaseEvent) => {
    const lineString = e.target as LineString
    console.log(lineString.getCoordinates())
}