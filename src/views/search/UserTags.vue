<template lang="pug">
v-main
  v-container
    v-text-field(
      density="compact"
      hide-details
      v-model="userTagName"
      label="Название пользовательского тега"
      placeholder="Введите пользовательского название тега"
    )
    //- TODO add user subsearch
    //- TODO add 'only my tags'
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
      v-else-if="userTags.length == 0"
    )
     v-col(cols="12").d-flex.flex-column.justify-center.align-center
        p.body-2 Теги не найдены
    v-row(
      v-else
      v-for="userTag in userTags"
      :id="userTag.id"
    )
      v-col(cols="12")
        p.text-h3.text-center {{ userTag.name }}
      v-col(cols="12")
        p.body-1.text-justify {{ userTag.description }}
      v-col(cols="12").d-flex.flex-column.justify-center.align-center
        v-btn.w-50(
          color="secondary"
          :to="`/userTag/${userTag.id}`"
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
import type { UserTagWhereInput } from '@/generated';

// Composables
import { useSearchUserTagsQuery, useSearchUserTagsAmountQuery } from '@/generated';
import { usePagination, useRouteQuery } from '@/composables';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed } from 'vue';
import { getValue } from '@/utils';

const defaultsStore = useDefaultsStore();

interface QueryParams extends LocationQuery {
  userTagName: string;
};

const {
  userTagName,
} = useRouteQuery<QueryParams>({
  userTagName: "",
});

const { page, pages, params: paginationParams } = usePagination({
  defaultPage: 1,
  itemsPerPage: defaultsStore.AmountOfUserTagsPerPage,
  itemsAmount: computed(() => totalUserTagAmountResult.value?.aggregateUserTag._count?._all ?? 0)
});

const params = computed(() => ({
  ...getValue(paginationParams),
  where: {
    name: { contains: getValue(userTagName) },
  } as UserTagWhereInput
}));

const { 
  result: totalTagAmountResult, 
  loading: totalTagAmountLoading, 
  error: totalTagAmountError,
} = useSearchUserTagsAmountQuery(params);

const { result, loading, error } = useSearchUserTagsQuery(params);
const userTags = computed(() => result.value?.userTags ?? []);

</script>
