<template lang="pug">
v-main
  v-container
    v-row
      v-col(cols="12")
        p.text-h2.text-center {{ bookListName }} 
      v-col(cols="12")
        v-img(:src="coverImage")
      v-col(cols="12")
        p.body-1.text-justify {{ bookListDescription }} 
      v-col(cols="3")
        p.body-1 Автор списка книг : 
      v-col(cols="9")
        v-chip(
          pill
          :prepend-avatar="userCoverImage"
          :text="userName"
          link
          :to="`/user/${userId}`"
        )
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
</template>

<script lang="ts" setup>
// Composables
import { useRouteParams } from '@/composables';
import { useGetBookListQuery } from '@/generated';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed } from 'vue';
import { getValue } from '@/utils';

const defaultsStore = useDefaultsStore();

const { bookListId } = useRouteParams<{
  bookListId: string;
}>();

const { result, error, loading } = useGetBookListQuery(computed(() => ({
  bookListId: getValue(bookListId)
})));

const coverImage = computed(() => defaultsStore.bookListCoverImage);
const bookListName = computed(() => result.value?.bookList?.name ?? "");
const bookListDescription = computed(() => result.value?.bookList?.description ?? defaultsStore.bookListNoDescription);
const userId = computed(() => result.value?.bookList?.user.id ?? "");
const userName = computed(() => result.value?.bookList?.user.name ?? "");
const userCoverImage = computed(() => result.value?.bookList?.user.coverImage ?? defaultsStore.userCoverImage);
const books = computed(() => result.value?.bookList?.books ?? []);

</script>
