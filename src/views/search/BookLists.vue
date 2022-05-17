<template lang="pug">
v-main
  v-container
    v-text-field(
      density="compact"
      hide-details
      v-model="bookListName"
      label="Название списка книг"
      placeholder="Введите название списка книг"
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
      v-else-if="bookLists.length == 0"
    )
     v-col(cols="12").d-flex.flex-column.justify-center.align-center
        p.body-2 Списки книг не найдены
    v-row(
      v-else
      v-for="bookList in bookLists"
      :id="bookList.id"
    )
      v-col(cols="12")
        p.text-h3.text-center {{ bookList.name }}
      v-col(cols="12")
        p.body-1.text-justify {{ bookList.description }}
      v-col(cols="12").d-flex.flex-column.justify-center.align-center
        v-btn.w-50(
          color="secondary"
          :to="`/lists/book/${bookList.id}`"
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
import type { BookListWhereInput } from '@/generated';

// Composables
import { useSearchBookListsQuery, useSearchBookListsAmountQuery } from '@/generated';
import { usePagination, useRouteQuery } from '@/composables';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed } from 'vue';
import { getValue } from '@/utils';

const defaultsStore = useDefaultsStore();

interface QueryParams extends LocationQuery {
  bookListName: string;
};

const {
  bookListName,
} = useRouteQuery<QueryParams>({
  bookListName: "",
});

const { page, pages, params: paginationParams } = usePagination({
  defaultPage: 1,
  itemsPerPage: defaultsStore.AmountOfBookListsPerPage,
  itemsAmount: computed(() => totalBookListAmountResult.value?.aggregateBookList._count?._all ?? 0)
});

const params = computed(() => ({
  ...getValue(paginationParams),
  where: {
    name: { contains: getValue(bookListName) },
  } as BookListWhereInput
}));

const { 
  result: totalBookListAmountResult, 
  loading: totalBookListAmountLoading, 
  error: totalBookListAmountError,
} = useSearchBookListsAmountQuery(params);

const { result, loading, error } = useSearchBookListsQuery(params);
const bookLists = computed(() => result.value?.bookLists ?? []);

</script>
