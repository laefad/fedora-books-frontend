// Types
import type { Ref, ComputedRef } from 'vue';

// Utilities
import { computed } from 'vue';
import { getValue } from '@/utils';

export const useLocalDateString = ({
    date, 
    lang = navigator.language
} : {
    date: string | Ref<string> | ComputedRef<string>;
    lang?: string | Ref<string> | ComputedRef<string>;
}) => {
    return computed(
        () => new Date(getValue(date)).toLocaleDateString(getValue(lang))
    );
};
