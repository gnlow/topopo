import { Feature, Geometry, Snap, VectorSource } from "../deps/ol.ts"

export const snap =
(source: VectorSource<Feature<Geometry>>) => {
    const interaction = new Snap({
        source,
    })
    interaction.on("snap", e => {
        const v = e.target as Geometry
        console.log(
            "snap:",
            e.feature.getGeometry()?.getType(),
            (e.feature as any).ol_uid,
        )
    })
    return interaction
}