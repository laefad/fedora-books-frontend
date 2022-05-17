// Types
import type { ComputedRef, Ref } from 'vue';

// Composables
import { useLocalStorage } from '@vueuse/core';
import { useCurrentUserQuery, useLoginMutation } from '@/generated';

// Utilities
import { defineStore } from 'pinia';
import { computed, watch, ref } from 'vue';
import { getValue } from '@/utils';

// TODO rework?
export const useAuthStore = defineStore('AuthStore', () => {
    const token = useLocalStorage<string>('token', null);

    const { 
        mutate: login,
        loading: tokenLoading
    } = useLoginMutation({});

    // todo rework or remove
    const tokenError = ref("");

    const fetchNewToken = async (credentials: {
        userName: string | Ref<string> | ComputedRef<string>,
        password: string | Ref<string> | ComputedRef<string>
    }) => {
        tokenError.value = "";
        
        const result = await login({
            data: {
                name: getValue(credentials.userName),
                password: getValue(credentials.password)
            }
        }).catch(e => {
            tokenError.value = e.message;
        })

        token.value = result?.data?.login ?? null;
        if (token.value != null)
            tokenError.value = "";
    };

    const resetToken = () => {
        token.value = null;
    };

    const {
        result: userResult,
        loading: userLoading,
        error: userError,
        refetch: refetchUser
    } = useCurrentUserQuery();

    // Watch token changes and refetch current user
    watch(token, () => {
        refetchUser();
    });

    const currentUser = computed(() => userResult.value?.getCurrentUser ?? null);
    const authenticated = computed(() => currentUser.value != null);

    return {
        authenticated,
        resetToken,
        fetchNewToken,
        tokenLoading,
        tokenError,
        token,
        currentUser,
        userLoading,
        userError
    }
});
