import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path:'/profile',
        name:'profile',
        component:() => import('../views/DashBoard/Profile/ProfileView.vue'),
        children:[
          {
            path:'/profile/post',
            name:'post',
            component:() => import('../views/DashBoard/Profile/PostView.vue')
          },
        ]
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('../views/SignupView.vue')
  },

  {
    path: "*",
    name: "error",
    component: () => import('../views/ErrorView.vue')
  },
  {
    path:'/loading',
    name:'loading',
    component: () => import('../views/LoadingView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
