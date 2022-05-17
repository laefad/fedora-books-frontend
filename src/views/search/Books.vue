<template lang="pug">
v-main
  v-container.d-flex.flex-row.justify-space-around.align-center
    v-text-field(
      density="compact"
      hide-details
      v-model="bookName"
      label="Название книги"
      placeholder="Введите название книги"
    )
    v-checkbox(
      v-model="simpleSearch"
      hide-details
      label="Простой поиск"
    )
    v-btn(
      :icon="mdiMagnify"
    )
      v-tooltip(
        activator="parent"
        anchor="bottom"
      ) Найти
  v-container
    v-expansion-panels(
      multiple
      v-model="panels"
      :disabled="simpleSearch"
    )
      v-expansion-panel(
        value="author"
      )
        v-expansion-panel-title
          | Поиск по автору
        v-expansion-panel-text
          author-select
      v-expansion-panel(
        value="tag"
      )
        v-expansion-panel-title
          | Поиск по тегу
        v-expansion-panel-text
          tag-select
  v-pagination(
    v-model="page"
    :length="pages"
    :prev-icon="mdiMenuLeft"
    :next-icon="mdiMenuRight"
  )
  v-container
    v-row(
      v-for="book in books"
      :id="book.id"
    )
      v-col(cols="4")
        v-img(:src="book.coverImage ?? defaultsStore.bookCoverImage")
      v-col(cols="8")
        p.text-h3 {{ book.name }}
        v-divider
        p.body-1.overflow-y-auto {{ book.description }}
        v-container.w-100
          v-btn.w-100(
            color="secondary"
            :to="`/book/${book.id}`"
            link
          ) Перейти
  v-pagination(
    v-model="page"
    :length="pages"
    :prev-icon="mdiMenuLeft"
    :next-icon="mdiMenuRight"
  )
</template>

<script lang="ts" setup>
import { mdiMagnify, mdiDelete, mdiMenuLeft, mdiMenuRight } from '@mdi/js';

// Components
import AuthorSelect from '@/components/AuthorSelect.vue';
import TagSelect from '@/components/TagSelect.vue';

// Types
import type { LocationQuery } from 'vue-router';
import type { BookWhereInput } from '@/generated';

// Composables
import { useSearchBooksQuery, useSearchBooksAmountQuery } from '@/generated';
import { useRouteQuery, usePagination } from '@/composables';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed, ref, watch } from 'vue';
import { objIfValue, getValue } from '@/utils';

const defaultsStore = useDefaultsStore();

interface QueryParams extends LocationQuery {
  bookName: string;
  authorName: string;
  authorId: string;
  tagName: string;
  tagId: string;
};

const {
  bookName,
  authorName,
  authorId,
  tagName,
  tagId
} = useRouteQuery<QueryParams>({
  bookName: "",
  authorName: "",
  authorId: "",
  tagName: "",
  tagId: ""
});

const simpleSearch = ref(
  authorName.value == ""
  && authorId.value == ""
  && tagName.value == ""
  && tagId.value == ""
);

const panels = ref([] as Array<string>);

if (authorName.value != "" || authorId.value != "")
  panels.value.push("author");
if (tagName.value != "" || tagId.value != "")
  panels.value.push("tag");

// Close all panels & clear query parameters if simple search
watch(simpleSearch, () => {
  console.log(simpleSearch.value);
  if(simpleSearch.value) {
    panels.value = [];
    authorId.value = "";
    authorName.value = "";
    tagId.value = "";
    tagName.value = "";
  }
});

const {
  page,
  pages,
  params: paginationParams
} = usePagination({
  defaultPage: 1,
  itemsPerPage: defaultsStore.AmountOfBooksPerPage,
  itemsAmount: computed(() => totalBookAmountResult.value?.aggregateBook._count?._all ?? 0)
});

const params = computed(() => ({
  ...getValue(paginationParams),
  where: {
    name: { contains: getValue(bookName) },
    authors: {
      some: {
        name: { contains: getValue(authorName) },
        ...objIfValue(authorId, "", 
          (id: string) => (
            {id: { equals: id }}
          )
        )
      }
    },
    tags: {
      some: {
        name: { contains: getValue(tagName) },
        ...objIfValue(tagId, "", 
          (id: string) => (
            {id: { equals: id }}
          )
        )
      }
    }
  } as BookWhereInput
}));

const { 
  result: totalBookAmountResult, 
  loading: totalBookAmountLoading, 
  error: totalBookAmountError 
} = useSearchBooksAmountQuery(params);

const { result, loading, error } = useSearchBooksQuery(params);
const books = computed(() => result.value?.books ?? []);

</script>
