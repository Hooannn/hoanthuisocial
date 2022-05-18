<template>
  <div @click="closeMoreInfo" class="dash-board">
    <calling-modal/>
    <dashboard-nav :key='$route.name'/>
    <message-bar/>
    <div class="messages-m-container">
        <mini-message v-for='message in $store.state.messagesData' :key='message' :class='message' :messageKey='message'/>
    </div>
    <router-view :key='$route.fullPath'></router-view>
  </div>
</template>

<script>
import CallingModal from "../components/Modal/CallingModal.vue";
import DashboardNav from "../components/DashBoard/DashboardNav.vue";
import MessageBar from '../components/Message/MessageBar.vue';
import MiniMessage from '../components/Message/MiniMessage.vue';
import store from "./../store/store";
export default {
  components: { DashboardNav, MessageBar, MiniMessage, CallingModal},
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
  overflow-y:visible;
  pointer-events: none;
  width: 90%;
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
