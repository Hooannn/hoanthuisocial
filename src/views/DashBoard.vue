<template>
  <div @click="closeMoreInfo" class="dash-board">
    <dashboard-nav :key='$route.name'/>
    <message-bar/>
    <div class="messages-m-container">
        <mini-message v-for='message in $store.state.messagesData' :key='message' :class='message' :messageKey='message'/>
    </div>
    <router-view :key='$route.fullPath'></router-view>
  </div>
</template>

<script>
import DashboardNav from "../components/DashBoard/DashboardNav.vue";
import MessageBar from '../components/MessageMini/MessageBar.vue';
import MiniMessage from '../components/MessageMini/MiniMessage.vue';
import store from "./../store/store";
export default {
  components: { DashboardNav, MessageBar, MiniMessage},
  methods: {
      closeMoreInfo(e) {
          this.$store.dispatch('closeMoreInfo',e)
      }
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
}
</style>
