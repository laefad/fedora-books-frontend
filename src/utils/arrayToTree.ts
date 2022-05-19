
// Utility type
type KeysOfType<O, T> = {
    [K in keyof O]: O[K] extends T ? K : never
}[keyof O];

export const arrayToTree = <
    T extends {},
    // Needs for correct typing
    CHKey extends string = 'children',
    K extends string | number | symbol = string,
>(
    array: Readonly<Array<T>>,
    {
        key,
        parentKey,
        childrenKey,
        baseKey
    } : {
        key: KeysOfType<T, K>,
        parentKey: KeysOfType<T, K | null>,
        childrenKey: CHKey,
        baseKey: K | null
    }
) => {

    type HashMapElement = {
        [key in CHKey]: Array<HashMapElement>;
    } & T;

    const hashMap = {} as Record<K, HashMapElement>;
    const roots = {} as Record<K, HashMapElement>;

    // TODO orphans are ignored

    array.forEach((el) => {
        const k = el[key] as unknown as K;
        const pk = el[parentKey] as unknown as K;

        if (hashMap[k]) {
            Object.assign(hashMap[k], el); 
        } else {
            hashMap[k] = Object.assign(el, {
                [childrenKey]: [] as Array<HashMapElement>
            }) as HashMapElement;
        }

        if (pk != baseKey && pk != null) {
            if (hashMap[pk]) {
                hashMap[pk][childrenKey].push(hashMap[k]);
            } else {
                hashMap[pk] = {
                    [childrenKey]: [hashMap[k]],
                } as HashMapElement;
            }
        } else {
            roots[k] = hashMap[k];
        }
        
    });

    return Object.entries<HashMapElement>(roots).map(
        ([key, value]) => value
    );
}
