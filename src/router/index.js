import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IntroView from '../components/SpinnerComp.vue'

const routes = [
  {
    path: '/intro',
    name: 'intro',
    component: IntroView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: () => import('../views/StockBookingView.vue')
  },
  {
    path: '/5465351321asdad48w6521a5sd',
    name: 'admin',
    component: () => import('../views/AdminView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'intro' && !localStorage.getItem('introVisited')) { 
    next('/intro');
  } else {
    localStorage.setItem('introVisited', true);
    next();
  }
});

export default router
