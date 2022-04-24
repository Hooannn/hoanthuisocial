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
        component:() => import ('../views/DashBoard/Home/HomeView.vue'),
        children: [
          {
            path:'/home/search',
            name:'filter',
            component:() => import('../views/DashBoard/Home/HomeFilter.vue')
          }
        ]
      },
      /*
      {
        path:'/dashboard/messages',
        name:'messages',
        component:() => import ('../views/DashBoard/Messages/MessagesView.vue')
      },
      */
      {
        path:'/dashboard/group/:key',
        name:'group',
        component:() => import ('../views/DashBoard/Groups/GroupView.vue'),
        children:[
          {
            path:'/dashboard/group/:key/post',
            name:'group-post',
            component:() => import('../views/DashBoard/Groups/GroupPost.vue')
          },
          {
            path:'/dashboard/group/:key/post-detail/:postKey',
            name:'group-post-detail',
            component:() => import('../views/DashBoard/Groups/GroupPostDetail.vue')
          },
          {
            path:'/dashboard/group/:key/about',
            name:'group-about',
            component:() => import('../views/DashBoard/Groups/AboutView.vue')
          },
          {
            path:'/dashboard/group/:key/members',
            name:'members',
            component:() => import('../views/DashBoard/Groups/MembersView.vue')
          },
          {
            path:'/dashboard/group/:key/manage',
            name:'manage',
            component:() => import('../views/DashBoard/Groups/Manage/StaffsView.vue'),
            children: [
              {
                path:'/dashboard/group/:key/group-manage-notifications',
                name:'group-manage-notifications',
                component:() => import('../views/DashBoard/Groups/Manage/ManageNotifications.vue')
              },
              {
                path:'/dashboard/group/:key/group-manage-delete',
                name:'group-manage-delete',
                component:() => import('../views/DashBoard/Groups/Manage/ManageDelete.vue')
              },
              {
                path:'/dashboard/group/:key/group-manage-info',
                name:'group-manage-info',
                component:() => import('../views/DashBoard/Groups/Manage/ManageInfo.vue')
              },
              {
                path:'/dashboard/group/:key/group-manage-post',
                name:'group-manage-post',
                component:() => import('../views/DashBoard/Groups/Manage/ManagePosts.vue')
              },
              {
                path:'/dashboard/group/:key/group-manage-members',
                name:'group-manage-members',
                component:() => import('../views/DashBoard/Groups/Manage/ManageMembers.vue')
              },
              {
                path:'/dashboard/group/:key/group-manage-members-request',
                name:'group-manage-members-request',
                component:() => import('../views/DashBoard/Groups/Manage/ManageRequest.vue')
              },
            ]
          },
        ]
      },
      {
        path:'/dashboard/pages/:key',
        name:'pages',
        component:() => import ('../views/DashBoard/Pages/PagesView.vue')
      },
      {
        path:'/dashboard/profile/:key',
        name:'profile',
        component:() => import('../views/DashBoard/Profile/ProfileView.vue'),
        children:[
          {
            path:'/dashboard/profile/:key/post-detail/:postKey',
            name:'post-detail',
            component:() => import('../views/DashBoard/Profile/PostDetail.vue')
          },
          {
            path:'/dashboard/profile/:key/post',
            name:'post',
            component:() => import('../views/DashBoard/Profile/PostView.vue')
          },
          {
            path:'/dashboard/profile/:key/about',
            name:'about',
            component:() => import('../views/DashBoard/Profile/AboutView.vue')
          },
          {
            path:'/dashboard/profile/:key/images',
            name:'images',
            component:() => import('../views/DashBoard/Profile/UImage/ImagesView.vue'),
            children: [
              {
                path:':albumKey',
                name:'album',
                component:()=> import('../views/DashBoard/Profile/UImage/AlbumView.vue'),
              }
            ]
          },
          {
            path:'/dashboard/profile/:key/communities',
            name:'communities',
            component:() => import('../views/DashBoard/Profile/CommunitiesView.vue')
          },
          {
            path:'/dashboard/profile/:key/friends',
            name:'friends',
            component:() => import('../views/DashBoard/Profile/FriendsView.vue')
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
                name:'profile-edit',
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
    component: () => import('../views/IntroView.vue'),
  },
  {
    path: '/console',
    name: 'console',
    component: () => import('../views/Admin/ConsoleView.vue'),
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
