export type Timer = ReturnType<typeof setTimeout>

export type Primitive = null | undefined | string | number | boolean | symbol | bigint
export type LiteralUnion<T, U> = T | (U & { _?: never })
export type LiteralIntersection<T, U> = T & (U & { _?: never })

/**
 * This utility type combines two types and omits specified keys.
 * @template T1 - The first type to be merged.
 * @template T2 - The second type to be merged.
 * @template S - An optional string literal type for keys to omit from the merged type.
 */
export type MergeTypes<T1, T2, OmitKeys extends keyof any = never> = Omit<Omit<T1, keyof T2> & T2, OmitKeys>

export type FromPromise<T> = T extends PromiseLike<infer U> ? U : T
