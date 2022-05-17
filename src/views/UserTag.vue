<template lang="pug">
v-main
  v-container
    v-row
      v-col(cols="12")
        p.text-h2.text-center
          | {{ userTagName }}
      v-col(cols="12")
        p.body-1.text-justify
          | {{ userTagDescription }}
      v-col(cols="3")
        p.body-1 Автор тега : 
      v-col(cols="9")
        v-chip(
          pill
          :prepend-avatar="userCoverImage"
          :text="userName"
          link
          :to="`/user/${userId}`"
        )
      v-col(cols="12")
        v-btn.w-50(
          :to="{path: '/books', query: { userTagId: userTagId}}"
          color="secondary"
        ) Книги c этим тегом
</template>

<script lang="ts" setup>
// Composables
import { useRouteParams } from '@/composables';
import { useGetUserTagQuery } from '@/generated';
import { useDefaultsStore } from '@/store';

// Utilities 
import { computed } from 'vue';
import { getValue } from '@/utils';

const defaultsStore = useDefaultsStore();

const { userTagId } = useRouteParams<{
  userTagId: string;
}>();

const { result, error, loading } = useGetUserTagQuery(computed(() => ({
  userTagId: getValue(userTagId)
})));

const userTagName = computed(() => result.value?.findFirstUserTag?.name);
const userId = computed(() => result.value?.findFirstUserTag?.user.id ?? "");
const userName = computed(() => result.value?.findFirstUserTag?.user.name ?? "");
const userCoverImage = computed(() => result.value?.findFirstUserTag?.user.coverImage ?? defaultsStore.userCoverImage);
const userTagDescription = computed(() => result.value?.findFirstUserTag?.description ?? defaultsStore.userTagDescription);

</script>
