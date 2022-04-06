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
          {
            path:'/profile/about',
            name:'about',
            component:() => import('../views/DashBoard/Profile/AboutView.vue')
          },
          {
            path:'/profile/edit',
            name:'edit',
            component:() => import('../views/DashBoard/Profile/Edit/EditView.vue'),
            children: [
              {
                path:"/profile/edit/personal",
                name:'personal',
                component:() => import('../views/DashBoard/Profile/Edit/PersonalInfo.vue')
              },
              {
                path:"/profile/edit/profile",
                name:'profile',
                component:() => import('../views/DashBoard/Profile/Edit/ProfileEdit.vue')
              },
              {
                path:"/profile/edit/social-networks",
                name:'social-networks',
                component:() => import('../views/DashBoard/Profile/Edit/SocialNetworks.vue')
              },
              {
                path:"/profile/edit/email-setting",
                name:'email-setting',
                component:() => import('../views/DashBoard/Profile/Edit/EmailSetting.vue')
              },
              {
                path:"/profile/edit/change-password",
                name:'change-password',
                component:() => import('../views/DashBoard/Profile/Edit/ChangePassword.vue')
              },
              {
                path:"/profile/edit/deactivate-account",
                name:'deactivate-account',
                component:() => import('../views/DashBoard/Profile/Edit/DeactivateAccount.vue')
              },
            ]
          }
        ]
      },
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
