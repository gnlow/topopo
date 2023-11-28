export function assert(expr: unknown): asserts expr {
    if (!expr) throw new Error("AssertionError")
}