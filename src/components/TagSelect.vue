<template lang="pug">
v-container
  //- todo need total rework after vuetify release
  v-autocomplete(
    hide-details
    :items="tagsNames"
    v-model="tagNameSelected"
    @update:search="(name) => {tagName = name}"
    :loading="loading"
    label="Название тега"
    placeholder="Введите название тега"
  )
</template>

<script lang="ts" setup>
// Types
import type { LocationQuery } from 'vue-router';

// Composables
import { useGetTagMinQuery } from '@/generated';
import { useRouteQuery } from '@/composables';
import { useDefaultsStore } from '@/store';

// Utilities
import { computed, ref, unref, watch } from 'vue';
import { objIfValue } from '@/utils';

const defaultsStore = useDefaultsStore();

interface TagSelectQueryParams extends LocationQuery {
  tagName: string;
  tagId: string;
};

const tagNameSelected = ref("");

const {
  tagId,
  tagName
} = useRouteQuery<TagSelectQueryParams>({
  tagName: "",
  tagId: ""
});

const {
  result,
  error,
  loading
} = useGetTagMinQuery(computed(() => ({
  where: {
    name: { contains: unref(tagName) },
    ...objIfValue(tagId, "", 
      (id: string) => (
        {id: { equals: id }}
      )
    )
  },
  take: defaultsStore.AmountOfSubSearchElements
})));

const tags = computed(() => result.value?.tags ?? []);
const tagsNames = computed(() => tags.value.map(el => el.name) ?? []);

const unwatch = watch(tags, () => {
  if (tagId.value != "" && tagNameSelected.value == "") {
    const name = tags.value.find(a => a.id == tagId.value)?.name ?? ""
    tagNameSelected.value = name;
    tagName.value = name;
  }
  unwatch();
});

watch(tagNameSelected, () => {
  const selected = tags.value.find(a => a.name == tagNameSelected.value);
  if (selected) {
    tagId.value = selected.id;
    tagName.value = tagNameSelected.value;
  }
});

watch(tagName, () => {
  const selected = tags.value.find(a => a.name == tagNameSelected.value);
  if (selected)
    tagId.value = selected.id;
  else 
    tagId.value = "";
});

watch(tagId, () => {
  const selected = tags.value.find(a => a.id == tagId.value);
  if (selected) 
    tagName.value = selected.name;
});

</script>
