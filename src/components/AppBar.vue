<template lang="pug">
v-app-bar(
  :class="{ 'appbar--hidden': appBarStore.hidden }"
)
  template(v-slot:image)
    v-img
  template(v-slot:prepend)
    v-app-bar-nav-icon(
      @click="navigationStore.toggle"
    )
  v-app-bar-title {{ appBarStore.title }}
  v-spacer
  template(
    v-if="authStore.currentUser"
  )
    v-chip(
      pill
      :prepend-avatar="authStore.currentUser.coverImage ?? defaultsStore.userCoverImage"
      :text="authStore.currentUser.name"
      :to="`/user/${authStore.currentUser.id}`"
      link
    )
    v-btn(
      @click="authStore.resetToken"
      color="secondary"
    ) Выйти
  v-chip(
    v-else-if="authStore.userLoading"
    color="info"
  ) Загрузка...
  v-chip(
    v-else-if="authStore.userError"
    color="error"
  ) Произошла ошибка при загрузке пользователя
  v-btn(
    v-else
    color="secondary"
    to="/login"
    link
  ) Войти
</template>

<script lang="ts" setup>
import { mdiMagnify, mdiHeart, mdiDotsVertical } from '@mdi/js';

// Composables 
import { useAppBarStore, useNavigationStore, useDefaultsStore, useAuthStore } from '@/store';

const authStore = useAuthStore();
const appBarStore = useAppBarStore();
const defaultsStore = useDefaultsStore();
const navigationStore = useNavigationStore();

</script>

<style lang="sass">
.appbar--hidden
  box-shadow: none!important
  transform: translateY(-100%)!important
</style>
