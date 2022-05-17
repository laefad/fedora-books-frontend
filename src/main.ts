import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { DefaultApolloClient } from '@vue/apollo-composable';

import App from '@/App.vue';
import { router } from '@/plugins/router';
import { vuetify } from '@/plugins/vuetify';
import { apolloClient } from '@/plugins/apolloClient';

createApp(App)
    .provide(DefaultApolloClient, apolloClient)
    .use(createPinia())
    .use(vuetify)
    .use(router)
    .mount('#app')
