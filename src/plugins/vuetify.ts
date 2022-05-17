import '@/style/main.scss';

import { createVuetify, ThemeDefinition } from 'vuetify';
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg';

// @vuetify/vite-plugin isn't very convenient to use,   
// so for now just add all the existing components

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const myDarkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: "#212121",
        surface: "#303030",
        primary: "#fbc02d",
        secondary: "#f50057",
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
};

const myLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: "#ffffff",
        surface: "#afafaf",
        primary: "#fbc02d",
        secondary: "#f50057",
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
}

export const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'myLightTheme',
        themes: {
            myDarkTheme,
            myLightTheme
        }
    },
    components,
    directives
});
