<template lang="pug">
v-container
  //- todo need total rework after vuetify release
  v-autocomplete(
    hide-details
    :items="authorsNames"
    v-model="authorNameSelected"
    @update:search="(name) => {authorName = name}"
    :loading="loading"
    label="Имя автора"
    placeholder="Введите имя автора"
  )
</template>

<script lang="ts" setup>
// Types
import type { LocationQuery } from 'vue-router';

// Composables
import { useRouteQuery } from '@/composables';
import { useGetAuthorMinQuery } from '@/generated';
import { useDefaultsStore } from '@/store/defaultsStore';

// Utilities
import { computed, ref, unref, watch } from 'vue';
import { objIfValue } from '@/utils';

const defaultsStore = useDefaultsStore();

interface AuthorSelectQueryParams extends LocationQuery {
  authorName: string;
  authorId: string;
};

const authorNameSelected = ref("");

const {
  authorId,
  authorName
} = useRouteQuery<AuthorSelectQueryParams>({
  authorName: "",
  authorId: ""
});

const {
  result,
  error,
  loading
} = useGetAuthorMinQuery(computed(() => ({
  where: {
    name: { contains: unref(authorName) },
    ...objIfValue(authorId, "", 
      (id: string) => (
        {id: { equals: id }}
      )
    )
  },
  take: defaultsStore.AmountOfSubSearchElements
})));

const authors = computed(() => result.value?.authors ?? []);
const authorsNames = computed(() => authors.value.map(el => el.name) ?? []);

const unwatch = watch(authors, () => {
  if (authorId.value != "" && authorNameSelected.value == "") {
    const name = authors.value.find(a => a.id == authorId.value)?.name ?? ""
    authorNameSelected.value = name;
    authorName.value = name;
  }
  unwatch();
});

watch(authorNameSelected, () => {
  const selected = authors.value.find(a => a.name == authorNameSelected.value);
  if (selected) {
    authorId.value = selected.id;
    authorName.value = authorNameSelected.value;
  }
});

watch(authorName, () => {
  const selected = authors.value.find(a => a.name == authorNameSelected.value);
  if (selected)
    authorId.value = selected.id;
  else 
    authorId.value = "";
});

watch(authorId, () => {
  const selected = authors.value.find(a => a.id == authorId.value);
  if (selected) 
    authorName.value = selected.name;
});

</script>
