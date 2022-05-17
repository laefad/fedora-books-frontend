<template lang="pug">
v-app(fluid)
  app-bar
  navigation
  router-view
</template>

<script lang="ts" setup>
// Components
import AppBar from '@/components/AppBar.vue';
import Navigation from '@/components/Navigation.vue';

</script>
