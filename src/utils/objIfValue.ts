import type { ComputedRef, Ref } from 'vue';
import { getValue } from '@/utils/getValue';

export const objIfValue = <T, R> (
    value: T | Ref<T> | ComputedRef<T>,
    zeroValue: T | Ref<T> | ComputedRef<T>,
    constructor: (value: T) => R
): R | {} => {
    const a = getValue(value);
    const b = getValue(zeroValue);
    return (a == b ? {} : constructor(a));
}
