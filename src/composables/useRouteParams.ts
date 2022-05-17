// Types
import type { RouteParams } from 'vue-router';

// Composables
import { useRoute } from 'vue-router';

// Utilities
import { reactive, toRefs, watch } from 'vue';

// Params are readonly! 
export const useRouteParams = <
    T extends RouteParams
>() => {
    const route = useRoute();
    const params = reactive(route.params);
    watch(route, () => {
        Object.assign(params, route.params);
    }); 
    return toRefs(params as T);
};
