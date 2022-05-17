import type { ChapterTreeNodeOutput } from '@/composables/useBookChaptersTree';

export type ChapterTreeNodeOutputWithPointers = ChapterTreeNodeOutput & {
    next?: string;
    prev?: string;
};

// TODO rework
export const chaptersTreeWithPointers = (
    tree: Readonly<Array<ChapterTreeNodeOutputWithPointers>>,
) => {
    const toLinear = (
        arr: Readonly<Array<ChapterTreeNodeOutputWithPointers>>
    ): Array<string> => arr.reduce((arr, el) => {
        const a = el.children.length == 0
            ? [el.id]
            : toLinear(el.children);
        return arr.concat(a);
    }, [] as Array<string>);

    const mapTree = (
        arr: Readonly<Array<ChapterTreeNodeOutputWithPointers>>,
        map: (el: Readonly<ChapterTreeNodeOutputWithPointers>) => ChapterTreeNodeOutputWithPointers
    ): Array<ChapterTreeNodeOutputWithPointers> => {
        return arr.map(el => ({
            ...map(el),
            children: mapTree(el.children, map)
        }));
    };

    const linear = toLinear(tree);
    const hashMap: {
        [key: string]: number
    } = linear.reduce(
        (acc, el, i) => Object.assign(acc, {[el]: i})
    , {});

    return {
        tree: mapTree(tree, (el) => {
            const index = hashMap[el.id];

            return {
                ...el,
                next: linear.at(index + 1),
                prev: index == 0 ? undefined : linear.at(index - 1),
            }
        }),
        hashMap: Object.entries(hashMap).reduce((acc, [id, index]) => {
            return Object.assign(acc, {
                [id] : {
                    next: linear.at(index + 1),
                    prev: index == 0 ? undefined : linear.at(index - 1),
                }
            });
        }, {} as {
            [key: string]: {
                next?: string;
                prev?: string;
            }
        })
    };
}
