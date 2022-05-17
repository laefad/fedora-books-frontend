<template lang="pug">
v-row
  v-col
    v-chip(
      v-for="tag in tags" :key="tag.id"
      :to="getTagHref(tag)"
      :color="getRandomColor()"
      link
      variant="outlined"
    ) 
      p.body-1 {{ tag.name }}
</template>

<script lang="ts" setup>
// Types
import type { Tag, UserTag } from '@/generated';

const { tags, variant } = defineProps<{
  tags: Readonly<Array<PartialWithRequired<Tag | UserTag, "id" | "name">>>;
  variant: 'userTag' | 'tag';
}>();

// TODO поменять способ генерации цвета с учетом темы и читаемости на ней.
const getRandomColor = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);
const getTagHref = (tag: PartialWithRequired<Tag | UserTag, "id">) => (variant == 'userTag' ? '/userTag/' : '/tag/') + tag.id;

</script>
