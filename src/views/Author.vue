<template lang="pug">
v-main
  v-container.d-flex.flex-column.align-center.justify-space-around
    v-avatar(
      size="128"
      :image="coverImage"
    )
    p.text-h2.text-center
      | {{ authorName }}
    p.body-1.text-justify
      | {{ authorDescription }}
    v-btn.w-50(
      :to="{path: '/books', query: { authorId: authorId}}"
      color="secondary"
    )
      | Книги автора
</template>

<script lang="ts" setup>
// Composables
import { useRouteParams } from '@/composables';
import { useGetAuthorQuery } from '@/generated';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed } from 'vue';
import { getValue } from '@/utils';

const defaultsStore = useDefaultsStore();

const { authorId } = useRouteParams<{
  authorId: string;
}>();

const { result, error, loading } = useGetAuthorQuery(computed(() => ({
  authorId: getValue(authorId)
})));

const coverImage = computed(() => result.value?.findFirstAuthor?.coverImage ?? defaultsStore.authorCoverImage);
const authorName = computed(() => result.value?.findFirstAuthor?.name);
const authorDescription = computed(() => result.value?.findFirstAuthor?.description ?? defaultsStore.authorDescription);

</script>
