// Types
import type { Ref, ComputedRef } from 'vue';
import type { Chapter } from '@/generated';

// Composables
import { useGetAllBookChaptersQuery } from '@/generated';

// Utilities
import { computed, toRefs } from 'vue';
import { arrayToTree, getValue } from '@/utils';

export type ChapterTreeNodeInput = PartialWithRequired<Chapter, 'topChapter' | 'id' | 'name'> & {
    topChapter: PartialWithRequired<Chapter, 'id'>;
};

export type ChapterTreeNodeOutput = PartialWithRequired<Chapter, 'id' | 'name'> & {
    children: Array<ChapterTreeNodeOutput>;
};

export const useBookChaptersTree = (
    bookId: string | Ref<string> | ComputedRef<string>
) => {

    const { result, error, loading } = useGetAllBookChaptersQuery(computed(() => ({
        bookId: getValue(bookId)
    })));

    const rawChapters = computed(() => result.value?.chapters as Array<ChapterTreeNodeInput> ?? []);

    const chapters = computed(
        () => arrayToTree<
            ChapterTreeNodeInput,
            ChapterTreeNodeOutput,
            string
        >(
            getValue(rawChapters), 
            (chapter) => chapter.id,
            (chapter) => chapter?.topChapter?.id ?? null,
            (chapter, children) => ({
                id: chapter.id,
                name: chapter.name,
                children
            } as ChapterTreeNodeOutput)
        )
    );

    return toRefs({
        loading,
        error,
        chapters
    });
}
