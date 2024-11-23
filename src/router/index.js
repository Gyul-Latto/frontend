import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RecommendedApartment from '@/views/RecommendedApartment.vue';
import SimilarApartment from '@/views/SimilarApartment.vue';
import PopularApartment from '@/views/PopularApartment.vue';
import MapView from '@/views/MapView.vue';
import NotFoundComponent from '@/views/NotFoundComponent.vue';
import LoginView from '@/views/LoginView.vue';
import SignUpView from '@/views/SignUpView.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  { path: '/', name: 'home', component: HomeView }, // 메인 페이지
  {
    path: '/map',
    name: 'map',
    component: MapView,
    meta: { requiresAuth: true },
  },
  {
    path: '/recommended',
    name: 'recommended',
    component: RecommendedApartment,
    meta: { requiresAuth: true },
  },
  {
    path: '/similar',
    name: 'similar',
    component: SimilarApartment,
    meta: { requiresAuth: true },
  },
  {
    path: '/popular',
    name: 'popular',
    component: PopularApartment,
  },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/sign-up', name: 'sign-up', component: SignUpView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && authStore.token === null) {
    next({ name: 'login' }); // 로그인 페이지로 리디렉션
  } else {
    next();
  }
});

export default router;
