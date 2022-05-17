<template lang="pug">
v-main
  v-container
    v-text-field(
      density="compact"
      hide-details
      v-model="userName"
      label="Имя пользователя"
      placeholder="Введите имя пользователя"
    )
  v-pagination(
    v-model="page"
    :length="pages"
    :prev-icon="mdiMenuLeft"
    :next-icon="mdiMenuRight"
  )
  //- TODO loading
  //- TODO error
  v-container
    v-row(v-if="error")
      v-col(cols="12").d-flex.flex-column.justify-center.align-center
        p.body-2 Произошла ошибка... {{ error }}
    v-row(v-else-if="loading")
      v-col(cols="12").d-flex.flex-column.justify-center.align-center
        v-progress-circular(
          indeterminate
          size="140"
          width="10"
          color="secondary"
        )
    v-row(
      v-else-if="users.length == 0"
    )
     v-col(cols="12").d-flex.flex-column.justify-center.align-center
        p.body-2 Пользователи не найдены
    v-row(
      v-else
      v-for="user in users"
      :id="user.id"
    )
      v-col(cols="4").d-flex.flex-column.justify-start.align-center
        v-avatar(
          :image="user.coverImage ?? defaultsStore.userCoverImage"
          size="240"
        )
      v-col(cols="8")
        p.text-h3 {{ user.name }}
        v-divider
        p.body-1 {{ userRoleToString(user.role) }}
        v-container.w-100
          v-btn.w-100(
            color="secondary"
            :to="`/user/${user.id}`"
            link
          ) Перейти
  v-pagination(
    v-model="page"
    :length="pages"
    :prev-icon="mdiMenuLeft"
    :next-icon="mdiMenuRight"
  )
  //- TODO loading
  //- TODO error
</template>

<script lang="ts" setup>
import { mdiMenuLeft, mdiMenuRight } from '@mdi/js';

// Types
import type { LocationQuery } from 'vue-router';
import type { UserWhereInput } from '@/generated';

// Composables
import { useSearchUsersQuery, useSearchUsersAmountQuery } from '@/generated';
import { usePagination, useRouteQuery } from '@/composables';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed } from 'vue';
import { getValue, userRoleToString } from '@/utils';

const defaultsStore = useDefaultsStore();

interface QueryParams extends LocationQuery {
  userName: string;
};

const {
  userName,
} = useRouteQuery<QueryParams>({
  userName: "",
});

const { page, pages, params: paginationParams } = usePagination({
  defaultPage: 1,
  itemsPerPage: defaultsStore.AmountOfUsersPerPage,
  itemsAmount: computed(() => totalUsersAmountResult.value?.aggregateUser._count?._all ?? 0)
});

const params = computed(() => ({
  ...getValue(paginationParams),
  where: {
    name: { contains: getValue(userName) },
  } as UserWhereInput
}));

const { 
  result: totalUsersAmountResult, 
  loading: totalUsersAmountLoading, 
  error: totalUsersAmountError,
} = useSearchUsersAmountQuery(params);

const { result, loading, error } = useSearchUsersQuery(params);
const users = computed(() => result.value?.users ?? []);

</script>
