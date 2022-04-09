import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path:'/dashboard/home',
        name:'dhome',
        component:() => import ('../views/DashBoard/Home/HomeView.vue')
      },
      {
        path:'/dashboard/messages',
        name:'messages',
        component:() => import ('../views/DashBoard/Messages/MessagesView.vue')
      },
      {
        path:'/dashboard/profile',
        name:'profile',
        component:() => import('../views/DashBoard/Profile/ProfileView.vue'),
        children:[
          {
            path:'/dashboard/profile/post',
            name:'post',
            component:() => import('../views/DashBoard/Profile/PostView.vue')
          },
          {
            path:'/dashboard/profile/about',
            name:'about',
            component:() => import('../views/DashBoard/Profile/AboutView.vue')
          },
          {
            path:'/dashboard/profile/edit',
            name:'edit',
            component:() => import('../views/DashBoard/Profile/Edit/EditView.vue'),
            children: [
              {
                path:"/dashboard/profile/edit/personal",
                name:'personal',
                component:() => import('../views/DashBoard/Profile/Edit/PersonalInfo.vue')
              },
              {
                path:"/dashboard/profile/edit/profile",
                name:'profile',
                component:() => import('../views/DashBoard/Profile/Edit/ProfileEdit.vue')
              },
              {
                path:"/dashboard/profile/edit/social-networks",
                name:'social-networks',
                component:() => import('../views/DashBoard/Profile/Edit/SocialNetworks.vue')
              },
              {
                path:"/dashboard/profile/edit/email-setting",
                name:'email-setting',
                component:() => import('../views/DashBoard/Profile/Edit/EmailSetting.vue')
              },
              {
                path:"/dashboard/profile/edit/change-password",
                name:'change-password',
                component:() => import('../views/DashBoard/Profile/Edit/ChangePassword.vue')
              },
              {
                path:"/dashboard/profile/edit/deactivate-account",
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
