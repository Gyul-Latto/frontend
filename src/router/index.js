import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RecommendedApartment from '@/views/RecommendedApartment.vue';
import SimilarApartment from '@/views/SimilarApartment.vue';
import PopularApartment from '@/views/PopularApartment.vue';
import MapView from '@/views/MapView.vue';
import NotFoundComponent from '@/views/NotFoundComponent.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView }, // 메인 페이지
  { path: '/map', name: 'map', component: MapView,
    props: (route) => ({ query: route.query.q }),},
  { path: '/recommended', name: 'recommended', component: RecommendedApartment },
  { path: '/similar', name: 'similar', component: SimilarApartment },
  { path: '/popular', name: 'popular', component: PopularApartment },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
