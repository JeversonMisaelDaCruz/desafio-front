// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import LoginPage from '../views/Login.vue';
import LeadsView from '../views/LeadsView.vue';
import KanbanBoard from '../views/Kanban.vue';
import RegisterPage from '../views/Register.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/',
    redirect: '/register',
  },
  {
    path: '/leads',
    name: 'LeadsView',
    component: LeadsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/kanban',
    name: 'KanbanBoard',
    component: KanbanBoard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Proteger rotas
router.beforeEach((to, from, next) => {
  const loggedIn = store.getters['auth/isAuthenticated'];
  if (to.meta.requiresAuth && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
