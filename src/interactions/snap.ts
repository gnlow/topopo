import { Feature, Geometry, Snap, VectorSource, Map } from "../deps/ol.ts"

export const useSnap =
(source: VectorSource<Feature<Geometry>>) =>
(map: Map) => {
    const interaction = new Snap({
        source,
    })
    interaction.on("snap", e => {
        const v = e.target as Geometry
        console.log((e.feature as any).ol_uid, e.target.ol_uid)
    })
    map.addInteraction(interaction)
}