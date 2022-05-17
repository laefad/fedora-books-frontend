import { twoSideFilter } from '@/utils';


// TODO decrease O(N^2 recursive) to O(N) or O(N^2)
// see https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
export const arrayToTree = <
    T extends {},
    R extends {},
    Key
>(
    array: Readonly<Array<T>>,
    key: (el: Readonly<T>) => Key,
    parentKey: (el: Readonly<T>) => Key | null,
    withChilds: (el: Readonly<T>, childEls: Readonly<Array<R>>) => R,
    baseKey: Key | null = null
): {
    tree: Array<R>,
    orphans: Array<T>
} => {
    let { satisfied, rest } = twoSideFilter(array, (el) => parentKey(el) == baseKey);

    const tree = satisfied.map(el => {
        const elKey = key(el);
        const result = twoSideFilter(rest, (innerEl) => parentKey(innerEl) == elKey);
        rest = result.rest;
        return withChilds(el, 
            result.satisfied.map(satisfiedEl => {
                const { tree, orphans } = arrayToTree(rest, key, parentKey, withChilds, key(satisfiedEl));
                rest = orphans;
                return withChilds(satisfiedEl, tree);
            })
        );
    });

    return {
        tree,
        orphans: rest
    };
}
