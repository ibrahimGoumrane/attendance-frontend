// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ErrorWithRoot<T = {}> = Partial<T> & { root?: string };
