// Types
import type { ComputedRef, Ref } from 'vue';

// Composables
import { useRouteQuery } from '@/composables';

// Utilities
import { computed, ref, watch } from 'vue';
import { getValue } from '@/utils';

export const usePagination = ({
    defaultPage,
    itemsPerPage,
    itemsAmount
}: {
    defaultPage: number | Ref<number> | ComputedRef<number>,
    itemsPerPage: number | Ref<number> | ComputedRef<number>,
    itemsAmount: number | Ref<number> | ComputedRef<number>
}, options: {
    useQueryParam?: boolean;
} = {
    useQueryParam: true
}) => {

    const page = options.useQueryParam
        // I think this lazy initialization works...
        ? (() => {
            const { page } = useRouteQuery<{
                page: string;
            }>({
                page: defaultPage.toString()
            });

            const pageNum = ref(parseInt(getValue(page)));

            watch(pageNum, () => {
                page.value = pageNum.value.toString();
            });

            watch(page, () => {
                pageNum.value = parseInt(getValue(page));
            });

            return pageNum;
        })()
        : (() => ref(defaultPage))()
    ;

    const pages = computed(
        () => getValue(itemsAmount) / getValue(itemsPerPage)
    );

    return {
        page,
        pages,
        params: computed(() => ({
            take: getValue(itemsPerPage),
            skip: (getValue(page) - 1) * getValue(itemsPerPage),
        }))
    };
};
