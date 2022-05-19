<template lang="pug">
p.text-h1.text-center Главы:
p.body-2.error(v-if="error")
  | Error! 
  | {{ error }}
p.body-2(v-else-if="loading")
  | Loading...
template(v-else)
  chapters-list(
    :items="chapters"
    :book-id="bookId"
  )
</template>

<script lang="ts" setup>
// Components
import ChaptersList from '@/components/ChaptersList.vue';

// Composables
import { useRouteParams, useBookChaptersTree } from '@/composables';

const { bookId } = useRouteParams<{
  bookId: string;
}>();

const { chapters, error, loading } = useBookChaptersTree(bookId); 

</script>
