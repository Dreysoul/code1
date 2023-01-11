import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import( '../views/Goods.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue'),
    redirect:'/user/cart',
    children: [
      {
        path: 'cart',
        component:()=>import('../components/user/cart.vue')
      }
    ]
  },  
  {
    path: '/free',
    name: 'free',
    component: () => import( '../views/Free.vue')
  }, 
  {
    path: '/order',
    name: 'order',
    component: () => import( '../views/Order.vue')
  }, 
  {
    path: '/detail',
    name: 'detail',
    component: () => import( '../views/Detail.vue')
  }, 
  {
    path: '/affirm',
    name: 'affirm',
    component: () => import( '../views/Affirm.vue')
  }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
 
router.beforeEach((to, from, next) => {
  if (to.path == '/user/cart') {
    let token = localStorage.getItem("x-auth-token")
    if (token) {
      next()
    } else {
     router.app.$options.store.commit('changeShowLoginModel',true)
    }
      
  } else {
    next()
  }
})
export default router
