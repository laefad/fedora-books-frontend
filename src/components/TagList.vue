<template lang="pug">
v-row
  v-col
    v-chip(
      v-for="tag, i in tags" :key="tag.id"
      :to="getTagHref(tag)"
      :color="colors[i]"
      link
      variant="outlined"
    ) 
      p.body-1 {{ tag.name }}
</template>

<script lang="ts" setup>
// Types
import type { Tag, UserTag } from '@/generated';

// Utilities
import { computed } from 'vue';
import { generateHSLColors } from '@/utils';

const { tags, variant } = defineProps<{
  tags: Readonly<Array<PartialWithRequired<Tag | UserTag, "id" | "name">>>;
  variant: 'userTag' | 'tag';
}>();

// TODO add theme condition
const colors = computed(() => generateHSLColors(90, 40, tags.length));

const getTagHref = (tag: PartialWithRequired<Tag | UserTag, "id">) => (variant == 'userTag' ? '/userTag/' : '/tag/') + tag.id;

</script>
