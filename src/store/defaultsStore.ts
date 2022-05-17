// Utilities
import { defineStore } from 'pinia';

export const useDefaultsStore = defineStore('DefaultsStore', {
    getters: {
        // Images
        bookCoverImage: () => 'https://www.litmir.me/data/Book/0/743000/743166/BC4_1637467354.jpg',
        bookListCoverImage: () => 'https://www.booklineservices.com/v1/image/cache/catalog/product/Book%202/NO%20IMAGE-600x770.jpg',
        authorCoverImage: () => 'https://avatars.githubusercontent.com/u/61306696?v=4',
        userCoverImage: () => 'https://avatars.githubusercontent.com/u/61306696?v=4',
        // Descriptions
        // TODO add 'no' prefix
        authorDescription: () => 'Описание автора не предоставлено',
        // TODO add 'no' prefix
        tagDescription: () => 'Описание тэга не предоставлено',
        // TODO add 'no' prefix
        userTagDescription: () => 'Описание пользовательского тэга не предоставлено',
        bookListNoDescription: () => 'Описание списка книг не предоставлено',
        userNoTagsDescription: () => 'У пользователя нет тегов', 
        userNoBookListsDescription: () => 'У пользователя нет тегов', 
        // Pagination
        AmountOfBooksPerPage: () => 20,
        AmountOfAuthorsPerPage: () => 20,
        AmountOfTagsPerPage: () => 20,
        AmountOfUserTagsPerPage: () => 20,
        AmountOfBookListsPerPage: () => 20,
        AmountOfUsersPerPage: () => 20,
        AmountOfSubSearchElements: () => 5,
    }
});
