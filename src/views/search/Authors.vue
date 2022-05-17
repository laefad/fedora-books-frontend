<template lang="pug">
v-main
  v-container
    v-text-field(
      density="compact"
      hide-details
      v-model="authorName"
      label="Имя автора"
      placeholder="Введите имя автора"
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
      v-else-if="authors.length == 0"
    )
     v-col(cols="12").d-flex.flex-column.justify-center.align-center
        p.body-2 Авторы не найдены
    v-row(
      v-else
      v-for="autor in authors"
      :id="autor.id"
    )
      v-col(cols="4").d-flex.flex-column.justify-start.align-center
        v-avatar(
          :image="autor.coverImage ?? defaultsStore.authorCoverImage"
          size="240"
        )
      v-col(cols="8")
        p.text-h3 {{ autor.name }}
        v-divider
        p.body-1.overflow-y-auto {{ autor.description }}
        v-container.w-100
          v-btn.w-100(
            color="secondary"
            :to="`/author/${autor.id}`"
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
import { mdiMagnify, mdiMenuLeft, mdiMenuRight } from '@mdi/js';

// Types
import type { LocationQuery } from 'vue-router';
import type { AuthorWhereInput } from '@/generated';

// Composables
import { useSearchAuthorsQuery, useSearchAuthorsAmountQuery } from '@/generated';
import { usePagination, useRouteQuery } from '@/composables';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed } from 'vue';
import { getValue } from '@/utils';

const defaultsStore = useDefaultsStore();

interface QueryParams extends LocationQuery {
  authorName: string;
};

const {
  authorName,
} = useRouteQuery<QueryParams>({
  authorName: "",
});

const { page, pages, params: paginationParams } = usePagination({
  defaultPage: 1,
  itemsPerPage: defaultsStore.AmountOfAuthorsPerPage,
  itemsAmount: computed(() => totalAuthorAmountResult.value?.aggregateAuthor._count?._all ?? 0)
});

const params = computed(() => ({
  ...getValue(paginationParams),
  where: {
    name: { contains: getValue(authorName) },
  } as AuthorWhereInput
}));

const { 
  result: totalAuthorAmountResult, 
  loading: totalAuthorAmountLoading, 
  error: totalAuthorAmountError,
} = useSearchAuthorsAmountQuery(params);

const { result, loading, error } = useSearchAuthorsQuery(params);
const authors = computed(() => result.value?.authors ?? []);

</script>
