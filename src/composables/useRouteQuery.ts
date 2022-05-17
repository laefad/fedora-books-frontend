// Types
import type { LocationQuery } from 'vue-router';

// Composables
import { useRoute, useRouter } from 'vue-router';

// Utilities
import { reactive, toRefs, watch, toRaw } from 'vue';

/** 
 * By default uses value from route, if there is nothing, then default value
 */ 
export const useRouteQuery = <
    T extends LocationQuery
>(
    defaultValue: T,
    options: {
        rewriteQuery?: boolean;
        rewriteQueryFirstRun?: boolean;
    } = {
        rewriteQuery: false,
        rewriteQueryFirstRun: false
    }
) => {
    const route = useRoute();
    const router = useRouter();
    const query = reactive({
        ...defaultValue,
        ...route.query as T
    });

    watch(route, () => {
        Object.assign(query, route.query as T);
    });

    watch(query, () => {
        router.push({
            ...route, 
            query: options.rewriteQuery 
                ? toRaw(query) 
                : {...route.query, ...toRaw(query)}
        });
    });

    router.push({
        ...route, 
        query: options.rewriteQueryFirstRun 
            ? toRaw(query) 
            : {...route.query, ...toRaw(query)}
    });

    return toRefs(query as T);
};
