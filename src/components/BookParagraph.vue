<template lang="pug">
p.body-1.book-paragraph(
  :style="getStyle()"
) {{ paragraph.content }}
</template>

<script lang="ts" setup>
// Types
import type { TextAlignProperty } from 'csstype';
import type { Paragraph } from '@/generated';
import { AlignType } from '@/generated';

const { paragraph } = defineProps<{
  paragraph: PartialWithRequired<Paragraph, 'content'>
}>();

const alignMapping: {
  [key in AlignType]: TextAlignProperty;
} = {
  [AlignType.Middle]: "center",
  [AlignType.Left]: "left",
  [AlignType.Right]: "right",
  [AlignType.Width]: "justify",
};

const getStyle = () => {
  const indent = paragraph.firstLineIndent ? {
    'text-indent': `${paragraph.firstLineIndent}px`
  } : {};

  const align = paragraph.align ? {
    'text-align': alignMapping[paragraph.align]
  } : {};

  return {
    ...indent,
    ...align
  };
};

</script>

<style lang="sass">
.book-paragraph
  text-align: justify
  text-indent: 30px
  margin-top: 0.5em
  margin-bottom: 0.5em
</style>
