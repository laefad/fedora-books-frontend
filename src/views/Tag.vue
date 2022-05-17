<template lang="pug">
v-main
  v-container.d-flex.flex-column.align-center.justify-space-around
    p.text-h2.text-center
      | {{ tagName }}
    p.body-1.text-justify
      | {{ tagDescription }}
    v-btn.w-50(
      :to="{path: '/books', query: { tagId: tagId}}"
      color="secondary"
    )
      | Книги c этим тегом
</template>

<script lang="ts" setup>
// Composables
import { useRouteParams } from '@/composables';
import { useGetTagQuery } from '@/generated';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed } from 'vue';
import { getValue } from '@/utils';

const defaultsStore = useDefaultsStore();

const { tagId } = useRouteParams<{
  tagId: string;
}>();

const { result, error, loading } = useGetTagQuery(computed(() => ({
  tagId: getValue(tagId)
})));

const tagName = computed(() => result.value?.findFirstTag?.name);
const tagDescription = computed(() => result.value?.findFirstTag?.description ?? defaultsStore.tagDescription);

</script>
