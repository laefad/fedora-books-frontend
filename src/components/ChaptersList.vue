<template lang="pug">
//- TODO change to treeview
//- see https://github.com/vuetifyjs/vuetify/pull/14715
v-container
  v-container.ml-6(
    v-for="item in items"
    :id="item.id"
  )
    router-link(
      :to="getChapterLink(item.id)"
      :class="getTypograpyClass()"
    )
      | {{ item.name }}
    chapters-list(
      v-if="item.children.length > 0"
      :items="item.children"
      :depth="depth + 1"
    )
</template>

<script lang="ts" setup>

interface ItemType {
  id: string;
  name: string;
  children: Array<ItemType>;
}

const { items, depth } = withDefaults(defineProps<{
  items: Array<ItemType>
  depth: number;
}>(), {
  depth: 0
});

const getChapterLink = (id: string) => `/chapter/${id}`;
const getTypograpyClass = (offset = 3) => depth + offset <= 6 ? `text-h${depth + offset + 1}` : 'text-subtitle-1';

</script>