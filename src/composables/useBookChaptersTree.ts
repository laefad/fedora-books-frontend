// Types
import type { Ref, ComputedRef } from 'vue';

// Composables
import { useGetAllBookChaptersQuery } from '@/generated';

// Utilities
import { computed, toRefs } from 'vue';
import { arrayToTree, getValue } from '@/utils';

export const useBookChaptersTree = (
    bookId: string | Ref<string> | ComputedRef<string>
) => {

    const { result, error, loading } = useGetAllBookChaptersQuery(computed(() => ({
        bookId: getValue(bookId)
    })));

    const rawChapters = computed(() => result.value?.chapters ?? []);

    const chapters = computed(
        () => arrayToTree(
            getValue(rawChapters).map((ch) => ({
                id: ch.id,
                name: ch.name,
                top: ch.top?.id ?? null
            })),
            {
                key: 'id',
                parentKey: 'top',
                childrenKey: 'children',
                baseKey: null
            }
        )
    );

    return toRefs({
        loading,
        error,
        chapters
    });
}
