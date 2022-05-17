<template lang="pug">
v-main
  v-container.d-flex.flex-column.align-center.justify-center
    p(
      v-if="loading"
    ).text-h3 Загрузка...
    v-row(
      v-else
    )
      v-col(
        cols="4"
      ).d-flex.flex-row.align-center.justify-center
        v-avatar(
          :image="coverImage"
          :size="120"
        )
      v-col(
        cols="8" 
      ).d-flex.flex-row.align-center.justify-start
        p.text-h3 {{ name }} | {{ userRoleToString(role) }}
      v-col(cols="12")
        p.text-h5.text-center Пользовательские списки книг
      v-col(cols="12")
        v-slide-group(
          v-if="bookLists.length > 0"
          show-arrows
        )
          v-slide-group-item(
            v-for="bookList in bookLists" :key="bookList.id"
          )
            v-card(
              :to="`/lists/book/${bookList.id}`"
              height="200"
              link
            )
              p.text-subtitle-1.text-center {{ bookList.name }}
              v-img(
                :src="defaultsStore.bookListCoverImage"
              )
        p(v-else).text-h6.text-center {{ defaultsStore.userNoTagsDescription }}
      v-col(cols="12")
        p.text-h5.text-center Пользовательские тэги
      v-col(cols="12")
        tag-list(
          v-if="userTags.length > 0"
          :tags="userTags"
          variant="userTag"
        )
        p(v-else).text-h6.text-center {{ defaultsStore.userNoBookListsDescription }}
</template>

<script lang="ts" setup>
// Components
import TagList from '@/components/TagList.vue';

// Composables
import { useRouteParams } from '@/composables';
import { useGetUserQuery } from '@/generated';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed } from 'vue';
import { getValue, userRoleToString } from '@/utils';

const { userId } = useRouteParams<{
  userId: string;
}>();

const defaultsStore = useDefaultsStore();

const { result, loading, error } = useGetUserQuery(computed(() => ({
  where: {
    id: getValue(userId)
  }
})));

const name = computed(() => result.value?.user?.name ?? "");
const role = computed(() => result.value?.user?.role ?? "");
const coverImage = computed(() => result.value?.user?.coverImage ?? defaultsStore.userCoverImage);
const bookLists = computed(() => result.value?.user?.bookLists ?? []);
const userTags = computed(() => result.value?.user?.userTags ?? []);

</script>
