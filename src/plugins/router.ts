// Types 
import type { RouteRecordRaw } from 'vue-router';

// Utilities
import { createRouter, createWebHistory } from 'vue-router';

const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    component: () => import('@/views/AboutView.vue')
  },
  { 
    path: '/',
    redirect: '/about'
  },
];

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/registration',
    component: () => import('@/views/auth/RegisterView.vue')
  }
];

const searchRoutes: Array<RouteRecordRaw> = [
  {
    path: '/books',
    component: () => import('@/views/search/Books.vue')
  },
  {
    path: '/authors',
    component: () => import('@/views/search/Authors.vue')
  },
  {
    path: '/tags',
    component: () => import('@/views/search/Tags.vue')
  },
  {
    path: '/userTags',
    component: () => import('@/views/search/UserTags.vue')
  },
  {
    path: '/users',
    component: () => import('@/views/search/Users.vue')
  },
  {
    path: '/bookLists',
    component: () => import('@/views/search/BookLists.vue')
  }
];

const routes: Array<RouteRecordRaw> = [
  ...basicRoutes,
  ...authRoutes,
  ...searchRoutes,
  {
    path: '/book/:bookId',
    component: () => import('@/views/book/Book.vue'),
    children: [
      {
        path: 'about',
        component: () => import('@/views/book/BookAbout.vue'),
        alias: ['']
      },
      {
        path: 'chapters',
        component: () => import('@/views/book/BookChapters.vue'),
      }
    ]
  },
  {
    path: '/user/:userId',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/author/:authorId',
    component: () => import('@/views/Author.vue'),
  },
  {
    path: '/tag/:tagId',
    component: () => import('@/views/Tag.vue'),
  },
  {
    path: '/userTag/:userTagId',
    component: () => import('@/views/UserTag.vue'),
  },
  {
    path: '/chapter/:chapterId',
    component: () => import('@/views/Chapter.vue'),
  },
  {
    path: '/lists/book/:bookListId',
    component: () => import('@/views/BookList.vue'),
  }
];

// https://router.vuejs.org/api/#createrouter
export const router = createRouter({
  history: createWebHistory(),
  routes
});
