<template lang="pug">
v-main
  //- TODO custom style for heading
  p.text-h1.text-center
    | {{ chapterName }}
  v-container(v-if="chapters.length > 0")
    v-container.w-100(
      v-for="{id, name} in chapters"
    )
      router-link.text-subtitle-1(
        :id="id"
        :to='getChapterLink(id)'
        link
      ) {{ name }}
  v-row.w-100
    v-col.d-flex.flex-column.justify-center.align-center(cols="1")
      v-btn(
        v-if="prev"
        :icon="mdiChevronLeft"
        :to="prev"
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
        v-if="next"
        :icon="mdiChevronRight"
        :to="next"
        position="fixed"
        top="50%"
        color="primary"
      )
  full-screen-button
</template>

<script lang="ts" setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

// Components
import BookNavigation from '@/components/BookNavigation.vue';
import BookParagraph from '@/components/BookParagraph.vue';
import ChaptersList from '@/components/ChaptersList.vue';
import FullScreenButton from '@/components/FullScreenButton.vue';

// Composables
import { useRouteParams, useBookChaptersTree } from '@/composables';
import { useGetChapterQuery } from '@/generated';
import { useAppBarStore } from '@/store';

// Utilities 
import { computed } from 'vue';
import { chaptersTreeWithPointers, getValue } from '@/utils';

// TODO change title
const appBarStore = useAppBarStore();

const { chapterId } = useRouteParams<{
  chapterId: string;
}>();

const { result, error, loading } = useGetChapterQuery(
  computed(() => ({
    chapterId: getValue(chapterId),
  }))
);

const chapterName = computed(() => result.value?.findFirstChapter?.name ?? "");
const paragraphs = computed(() => result.value?.findFirstChapter?.paragraphs ?? []);
const chapters = computed(() => result.value?.findFirstChapter?.nestedChapters ?? []);
const bookId = computed(() => result.value?.findFirstChapter?.book?.id ?? "");

const { 
  chapters: chaptersTree, 
  error: bookChaptersTreeError, 
  loading: bookChaptersTreeLoading 
} = useBookChaptersTree(bookId);

const pointers = computed(() => 
  chaptersTreeWithPointers(chaptersTree.value.tree).hashMap[getValue(chapterId)]
);

const next = computed(() => pointers.value?.next ? getChapterLink(pointers.value.next) : null);
const prev = computed(() => pointers.value?.prev ? getChapterLink(pointers.value.prev) : null);

const getChapterLink = (id: string) => `/chapter/${id}`;

</script>
