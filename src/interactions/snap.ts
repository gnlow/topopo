import { Feature, Geometry, Snap, VectorSource } from "../deps/ol.ts"

export const snap =
(source: VectorSource<Feature<Geometry>>) => {
    const interaction = new Snap({
        source,
    })
    interaction.on("snap", e => {
        const v = e.target as Geometry
        console.log(e.feature.ol_uid, e.target.ol_uid)
    })
    return interaction
}