import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import VPage from '../components/Page/VPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: VPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;