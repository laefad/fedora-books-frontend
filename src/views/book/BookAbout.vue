<template lang="pug">
v-container(v-if="error")
  p.text-h2.error Что-то пошло не так...
  p.body-1 {{ error.toString() }}
v-container(v-else-if="loading")
  p.body-1 Загрузка...
v-container(v-else)
  v-row
    v-col(cols="4")
      v-img(
        :src="coverImage"
      )
      v-btn.d-flex(
        color="primary"
        :to="`/book/${bookId}/chapters`"
        link
      )
        p.text-subtitle-1 Главы
    v-col(cols="8")
      v-row
        v-col(cols="4")
          p.body-1 Название: 
        v-col(cols="8")
          p.body-1 {{ name }}
      v-divider
      v-row(v-if="publishedAt")
        v-col(cols="4")
          p.text-subtitle-1 Дата публикации: 
        v-col(cols="8")
          p.text-subtitle-1 {{ publishedAt }}
      v-divider
      v-row
        v-col.tag-header(cols="4") 
          p.text-subtitle-1 Тэги: 
        v-col(cols="8")
          tag-list(
            variant="tag"
            :tags="tags"
          )
      v-divider
      v-row
        v-col.tag-header(cols="4")
          v-row
            v-col(cols="12")
              p.text-subtitle-1.text-center Пользовательские тэги: 
            v-col(
              cols="12"
              v-if="authStore.currentUser"
            )
              v-checkbox(
                v-model="allUsersTags"
                density="compact"
                hide-details
                label="Теги всех пользователей"
              )
        v-col(cols="8")
          tag-list(
            variant="userTag"
            :tags="userTags"
          )
      v-divider
      v-row
        v-col(cols="4")
          p.text-subtitle-1 Авторы
        v-col(cols="8")
          v-chip(
            v-for="author in authors" :key="author.id"
            pill
            :prepend-avatar="author.coverImage ?? defaultsStore.authorCoverImage"
            :text="author.name"
            link
            :to="`/author/${author.id}`"
            variant="outlined"
          )
      v-divider
      v-row
        v-col(cols="12")
          p.body-1 {{ description }}
      v-divider
      v-container
        p.text-h4.text-center Списки книг:
        v-slide-group(
          show-arrows
        )
          v-slide-group-item(
            v-for="bookList in bookLists" :key="bookList.id"
          )
            v-card(
              :to="`/lists/book/${bookList.id}`"
              height="200px"
              link
            )
              p.text-subtitle-1.text-center {{ bookList.name }}
              v-img(
                :src="defaultsStore.bookListCoverImage"
              )
</template>

<script lang="ts" setup>
// Components
import TagList from '@/components/TagList.vue';

// Composables
import { useGetBookForAboutQuery } from '@/generated';
import { useLocalDateString, useRouteParams } from '@/composables';
import { useDefaultsStore, useAuthStore } from '@/store';

// Utilities
import { computed, ref } from 'vue';
import { getValue, objIfValue } from '@/utils';

const allUsersTags = ref(false);

const defaultsStore = useDefaultsStore();

const { bookId } = useRouteParams<{
  bookId: string;
}>();

const authStore = useAuthStore();

const { result, error, loading } = useGetBookForAboutQuery(computed(() => ({  
  bookId: getValue(bookId),
  // TODO rework to another query
  ...objIfValue(
      computed(() => getValue(allUsersTags) ? "" : getValue(authStore.currentUser)?.id ?? ""), 
      "", 
      (id) => ({
        tagsParams: {
          user: { is: { id: { equals: id } } }
        }
    })
  )
})));

const name = computed(() => result.value?.findFirstBook?.name ?? "");
const coverImage = computed(() => result.value?.findFirstBook?.coverImage ?? defaultsStore.bookCoverImage);
const publishedAt = useLocalDateString({
  date: computed(() => result.value?.findFirstBook?.publishedAt ?? "")
});
const description = computed(() => result.value?.findFirstBook?.description ?? "");
const tags = computed(() => result.value?.findFirstBook?.tags ?? []);
const userTags = computed(() => result.value?.findFirstBook?.userTags ?? []);
const authors = computed(() => result.value?.findFirstBook?.authors ?? []);
const bookLists = computed(() => result.value?.findFirstBook?.bookLists ?? []);

</script>

<style lang="sass">
.tag-header
  display: flex
  justify-content: flex-start
  align-items: center
</style>
