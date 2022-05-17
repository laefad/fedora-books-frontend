<template lang="pug">
v-main
  v-container
    v-text-field(
      density="compact"
      hide-details
      v-model="tagName"
      label="Название тега"
      placeholder="Введите название тега"
    )
  v-pagination(
    v-model="page"
    :length="pages"
    :prev-icon="mdiMenuLeft"
    :next-icon="mdiMenuRight"
  )
  //- TODO loading
  //- TODO error
  v-container
    v-row(v-if="error")
      v-col(cols="12").d-flex.flex-column.justify-center.align-center
        p.body-2 Произошла ошибка... {{ error }}
    v-row(v-else-if="loading")
      v-col(cols="12").d-flex.flex-column.justify-center.align-center
        v-progress-circular(
          indeterminate
          size="140"
          width="10"
          color="secondary"
        )
    v-row(
      v-else-if="tags.length == 0"
    )
     v-col(cols="12").d-flex.flex-column.justify-center.align-center
        p.body-2 Теги не найдены
    v-row(
      v-else
      v-for="tag in tags"
      :id="tag.id"
    )
      v-col(cols="12")
        p.text-h3.text-center {{ tag.name }}
      v-col(cols="12")
        p.body-1.text-justify {{ tag.description }}
      v-col(cols="12").d-flex.flex-column.justify-center.align-center
        v-btn.w-50(
          color="secondary"
          :to="`/tag/${tag.id}`"
          link
        ) Перейти
  v-pagination(
    v-model="page"
    :length="pages"
    :prev-icon="mdiMenuLeft"
    :next-icon="mdiMenuRight"
  )
  //- TODO loading
  //- TODO error
</template>

<script lang="ts" setup>
import { mdiMenuLeft, mdiMenuRight } from '@mdi/js';

// Types
import type { LocationQuery } from 'vue-router';
import type { TagWhereInput } from '@/generated';

// Composables
import { useSearchTagsQuery, useSearchTagsAmountQuery } from '@/generated';
import { usePagination, useRouteQuery } from '@/composables';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed } from 'vue';
import { getValue } from '@/utils';

const defaultsStore = useDefaultsStore();

interface QueryParams extends LocationQuery {
  tagName: string;
};

const {
  tagName,
} = useRouteQuery<QueryParams>({
  tagName: "",
});

const { page, pages, params: paginationParams } = usePagination({
  defaultPage: 1,
  itemsPerPage: defaultsStore.AmountOfTagsPerPage,
  itemsAmount: computed(() => totalTagAmountResult.value?.aggregateTag._count?._all ?? 0)
});

const params = computed(() => ({
  ...getValue(paginationParams),
  where: {
    name: { contains: getValue(tagName) },
  } as TagWhereInput
}));

const { 
  result: totalTagAmountResult, 
  loading: totalTagAmountLoading, 
  error: totalTagAmountError,
} = useSearchTagsAmountQuery(params);

const { result, loading, error } = useSearchTagsQuery(params);
const tags = computed(() => result.value?.tags ?? []);

</script>
