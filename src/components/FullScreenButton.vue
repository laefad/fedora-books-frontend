<template lang="pug">
//- TODO fixed property doesnt work
//- wait for vuetify updates 
v-btn.ma-4(
  icon
  elevation="6"
  position="fixed"
  variant="outlined"
  color="primary"
  bottom
  right
  @click="onClick"
)
  v-icon(
    v-if="fullScreen"
    :icon="mdiFullscreenExit"
  )
  v-icon(
    v-else
    :icon="mdiFullscreen"
  )
</template>

<script lang="ts" setup>
import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js';

// Composables
import { useAppBarStore, useNavigationStore } from '@/store';

// Utils
import { onUnmounted, ref, watch } from 'vue';

const fullScreen = ref(false);

const appBarStore = useAppBarStore();
const navigationStore = useNavigationStore();

const onClick = () => {
  fullScreen.value = !fullScreen.value
};

watch(fullScreen, () => {
  if (fullScreen.value) {
    appBarStore.hide();
    navigationStore.hide();
  } else {
    appBarStore.show();
    navigationStore.show();
  }
});

onUnmounted(() => {
  appBarStore.show();
  navigationStore.show();
});

</script>
