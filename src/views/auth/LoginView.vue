<template lang="pug">
v-main.d-flex.flex-column.align-center.justify-center
  v-container
    //- TODO values checkers
    v-row
      v-alert.d-flex.flex-column.align-center.justify-center(
        v-if="authStore.tokenError"
        cols="12"
        type="error"
      ) Произошла ошибка: {{ authStore.tokenError }}
      v-alert.d-flex.flex-column.align-center.justify-center(
        v-if="authStore.authenticated"
        cols="12"
        type="success"
      ) Вход произошел успешно
      v-alert.d-flex.flex-column.align-center.justify-center(
        v-if="authStore.tokenLoading"
        cols="12"
        type="info"
      ) Загрузка...
      v-col(
        cols="12"
      )
        v-text-field(
          density="comfortable"
          hide-details
          v-model="userName"
          label="Имя пользователя"
          placeholder="Введите имя пользователя"
          :loading="authStore.tokenLoading"
        )
      v-col(
        cols="11"
      )
        v-text-field(
          :type="showPassword ? 'text' : 'password'"
          density="comfortable"
          hide-details
          v-model="password"
          label="Пароль"
          placeholder="Введите пароль"
          :loading="authStore.tokenLoading"
        )
      v-col.d-flex.flex-column.align-center.justify-center(
        cols="1"
      )
        v-checkbox(
          v-model="showPassword"
          :true-icon="mdiEyeOff"
          :false-icon="mdiEye"
          :loading="authStore.tokenLoading"
        )
      v-col.d-flex.flex-column.align-center.justify-center(
          cols="12"
      )
        v-btn.w-50(
          @click="onLogin"
          :loading="authStore.tokenLoading"
        ) Войти
      v-col.d-flex.flex-column.align-center.justify-center(
          cols="12"
      )
        span.body-2 Нет аккаунта ? 
        router-link(to="/registration") Зарегистрироваться
</template>

<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from '@mdi/js';

// Composables 
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

// Utilities
import { ref, watch } from 'vue';

const showPassword = ref(false);
const userName = ref("");
const password = ref("");

const authStore = useAuthStore();

const router = useRouter();

watch(ref(authStore.authenticated), () => {
  if (authStore.authenticated) 
    router.back()
});

const onLogin = async () => {
  authStore.fetchNewToken({userName, password});
};

</script>
