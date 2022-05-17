import { 
    mdiInformationVariant, 
    mdiBookVariant, 
    mdiTypewriter, 
    mdiTagOutline, 
    mdiTagText, 
    mdiBookshelf,
    mdiAccountGroup 
} from '@mdi/js';

// Utilities
import { defineStore } from 'pinia';

interface NavigationItem {
    icon: string;
    title: string;
    path: string;
    // TODO add children: NavigationItem[]
}

export const useNavigationStore = defineStore('NavigationStore', {
    state: () => ({
        visible: false,
        items: [
            {
                icon: mdiInformationVariant,
                title: 'О приложении',
                path: '/about'
            },
            {
                icon: mdiBookVariant,
                title: 'Книги',
                path: '/books'
            },
            {
                icon: mdiTypewriter,
                title: 'Авторы',
                path: '/authors'
            },
            {
                icon: mdiTagOutline,
                title: 'Теги',
                path: '/tags'
            },
            {
                icon: mdiTagText,
                title: 'Пользовательские теги',
                path: '/userTags'
            },
            {
                icon: mdiBookshelf,
                title: 'Списки книг',
                path: '/bookLists'
            },
            {
                icon: mdiAccountGroup,
                title: 'Пользователи',
                path: '/users'
            },
        ] as Array<NavigationItem>
    }),
    actions: {
        hide() {
            this.visible = true;
        },
        show() {
            this.visible = false;
        },
        toggle() {
            this.visible = !this.visible;
        }
    }
});
