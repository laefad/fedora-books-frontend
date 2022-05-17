type PartialWithRequired<T, K extends keyof T, R = Pick<T, K>> = 
    Partial<T> & Required<R> | 
    Readonly<Partial<T>> & Readonly<Required<R>>;
