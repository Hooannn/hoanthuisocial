<template>
  <div @click="closeMoreInfo" class="dash-board">
    <dashboard-nav />
    <message-bar/>
    <div @click='showMessageBar' :class='{hide:($route.name=="messages"||$route.name=="message-detail")}' class='message-bar-control center'>
      <ion-icon class='icon' name="chatbox-ellipses"></ion-icon>
      <div class="mbc-unseenmsg center">
        {{$store.state.unseenMessage}}
      </div>
    </div>
    <div class="messages-m-container">
        <mini-message v-for='message in $store.state.messagesData' :key='message' :class='message' :messageKey='message'/>
    </div>
    <router-view :key='$route.fullPath'></router-view>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
import DashboardNav from "../components/DashBoard/DashboardNav.vue";
import MessageBar from '../components/MessageMini/MessageBar.vue';
import MiniMessage from '../components/MessageMini/MiniMessage.vue';
import store from "./../store/store";
export default {
  components: { DashboardNav, MessageBar, MiniMessage},
  methods: {
      closeMoreInfo(e) {
          this.$store.dispatch('closeMoreInfo',e)
      },
      showMessageBar() {
        document.querySelector('div.dash-board div.message-bar-control').classList.add('move')
        let mb=document.querySelector('#app > div.dash-board > div.message-bar')
        mb.classList.toggle('show')
      }
  },
  mounted() {
    db.ref('usersInformation').child(this.$store.state.ukey).child('apptheme').get().then(res=>{
      if (res.val()!=null) {
        this.$store.state.apptheme=res.val()
      }
    })
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.user != null) {
      next();
    } else next(false);
  }
};
</script>

<style>
.dash-board {
  width: 100%;
  min-height: 100%;
  height: auto;
  position: relative;
}
.dash-board .message-bar-control {
  position: fixed;
  right:20px;
  top:50%;
  transform: translateY(-50%);
  font-size: 60px;
  cursor: pointer;
  color:var(--cyan);
  transition: .2s linear;
}
.dash-board .message-bar-control .mbc-unseenmsg {
  position: absolute;
  top:0;
  right:0;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color:orangered;
  color:white;
  font-size: 14px;
}
.dash-board .message-bar-control.hide {
  display: none;
}
.dash-board .message-bar-control.move {
  transform:translateY(-50%) translateX(200%);
}
.dash-board .message-bar-control:hover {
  color:var(--teal);
  font-size: 70px;
}
.dash-board .messages-m-container{
  width: 90%;
  pointer-events: none;
  position: fixed;
  bottom: 0;
  left:50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-end;
  z-index: 5;
}
@media only screen and (max-width: 768px) {
  .dash-board {
    width: 100vw;
    max-width: 100vw;
    max-height: 100vh;
  }
  .dash-board .message-bar-control {
    display: none;
  }
}
</style>
