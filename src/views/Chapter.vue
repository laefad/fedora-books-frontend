<template lang="pug">
v-main
  //- TODO custom style for heading
  //- TODO breadcrumbs for headings here ?
  p.text-h1.text-center
    | {{ chapterName }}
  v-container(v-if="chapters.length > 0")
    v-container.w-100(
      v-for="{id, name} in chapters"
    )
      router-link.text-subtitle-1(
        :id="id"
        :to='`/chapter/${id}`'
        link
      ) {{ name }}
  v-row.w-100
    v-col.d-flex.flex-column.justify-center.align-center(cols="1")
      v-btn(
        v-if="prevId"
        :icon="mdiChevronLeft"
        :to="`/chapter/${prevId}`"
        position="fixed"
        top="50%"
        color="primary"
      )
    v-col(cols="10")
      book-paragraph(
        v-for="paragraph in paragraphs"
        :paragraph="paragraph"
        :id="paragraph.id"
      )
    v-col.d-flex.flex-column.justify-center.align-center(cols="1")
      v-btn(
        v-if="nextId"
        :icon="mdiChevronRight"
        :to="`/chapter/${nextId}`"
        position="fixed"
        top="50%"
        color="primary"
      )
  full-screen-button
</template>

<script lang="ts" setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

// Components
import { RouterLink } from 'vue-router';
import BookParagraph from '@/components/BookParagraph.vue';
import FullScreenButton from '@/components/FullScreenButton.vue';

// Composables
import { useRouteParams } from '@/composables';
import { useGetChapterQuery } from '@/generated';

// Utilities 
import { computed } from 'vue';
import { getValue } from '@/utils';

const { chapterId } = useRouteParams<{
  chapterId: string;
}>();

const { result, error, loading } = useGetChapterQuery(
  computed(() => ({
    chapterId: getValue(chapterId),
  }))
);

const chapterName = computed(() => result.value?.chapter?.name ?? "");
const paragraphs = computed(() => result.value?.chapter?.paragraphs ?? []);
const chapters = computed(() => result.value?.chapter?.nestedChapters ?? []);
const bookId = computed(() => result.value?.chapter?.book?.id ?? "");
// Navigation
const topId = computed(() => result.value?.chapter?.top?.id ?? "");
const topName = computed(() => result.value?.chapter?.top?.name ?? "");
const nextId = computed(() => result.value?.chapter?.next?.id ?? "");
const nextName = computed(() => result.value?.chapter?.next?.name ?? "");
const prevId = computed(() => result.value?.chapter?.prev?.id ?? "");
const prevName = computed(() => result.value?.chapter?.prev?.name ?? "");

</script>
