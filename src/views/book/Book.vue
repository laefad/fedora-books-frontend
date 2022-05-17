<template lang="pug">
v-main
  router-view
</template>

<script lang="ts" setup>
// Composables
import { useRouteParams } from '@/composables';

const { bookId } = useRouteParams<{
  bookId: string;
}>();

</script>
