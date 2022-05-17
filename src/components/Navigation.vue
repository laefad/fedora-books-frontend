<template lang="pug">
v-navigation-drawer(
  v-model="navigationStore.visible"
  temporary
)
  v-list
    v-list-item(
      v-for="item in navigationStore.items" :key="item.title"
      :title="item.title"
      :prepend-icon="item.icon"
      :to="item.path"
      link
    )
</template>

<script lang="ts" setup>
// Composables
import { useNavigationStore } from '@/store';

const navigationStore = useNavigationStore();

</script>
