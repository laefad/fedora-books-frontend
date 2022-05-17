// Utilities
import { defineStore } from 'pinia';

export const useAppBarStore = defineStore('AppBarStore', {
    state: () => ({
        title: "Федора-библио",
        hidden: false,
    }),
    actions: {
        changeTitle(newTitle: string) {
            this.title = newTitle;
        },
        hide() {
            this.hidden = true;
        },
        show() {
            this.hidden = false;
        },
        toggle() {
            this.hidden = !this.hidden;
        }
    }
});
