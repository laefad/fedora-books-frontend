<template lang="pug">
v-main.d-flex.flex-column.align-center.justify-center
  v-container
    //- TODO values checkers
    v-row
      v-alert.d-flex.flex-column.align-center.justify-center(
        v-if="registerError"
        cols="12"
        type="error"
      ) Произошла ошибка: {{ registerError }}
      v-alert.d-flex.flex-column.align-center.justify-center(
        v-if="authStore.authenticated"
        cols="12"
        type="success"
      ) Регистрация произошла успешно
      v-alert.d-flex.flex-column.align-center.justify-center(
        v-if="loading"
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
          :loading="loading"
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
          :loading="loading"
        )
      v-col.d-flex.flex-column.align-center.justify-center(
        cols="1"
      )
        v-checkbox(
          v-model="showPassword"
          :true-icon="mdiEyeOff"
          :false-icon="mdiEye"
          :loading="loading"
        )
      v-col.d-flex.flex-column.align-center.justify-center(
          cols="12"
      )
        v-btn.w-50(
          @click="onRegister"
          :loading="loading"
        ) Зарегистрироваться
      v-col.d-flex.flex-column.align-center.justify-center(
          cols="12"
      )
        span.body-2 Уже есть аккаунт ? 
        router-link(to="/login") Войти
</template>

<script lang="ts" setup>
import { mdiEye, mdiEyeOff } from '@mdi/js';

// Composables
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';
import { useCreateUserMutation } from '@/generated';

// Utilities
import { computed, ref, watch } from 'vue';
import { getValue } from '@/utils';

const showPassword = ref(false);
const userName = ref("");
const password = ref("");

const authStore = useAuthStore();

const router = useRouter();
watch(ref(authStore.authenticated), () => {
  if (authStore.authenticated) 
    router.back()
});

const createUserMutation = useCreateUserMutation({});
const loading = computed(() => createUserMutation.loading.value);

const registerError = ref("");

const onRegister = async () => {
  registerError.value = "";

  const result = await createUserMutation.mutate({
    data: {
      name: getValue(userName),
      password: getValue(password)
    }
  }).catch(e => {
    registerError.value = e.message;
  })

  if (result?.data?.createUser?.id ?? "" != "") {
    authStore.fetchNewToken({userName, password});
    registerError.value = "";
  }

}

</script>
