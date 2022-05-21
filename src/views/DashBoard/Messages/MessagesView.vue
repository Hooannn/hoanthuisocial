<template>
  <div class="messages-view">
      <div class="mv-notice-modal center">
        <div class="mvn-modal-inner">
          It seem that you're using mobile or tablet. Please go to messages view for mobile.<br>
          <button class='btn btn-sm btn-link' @click='goToMobileView'>Go.</button>
        </div>
      </div>
      <side-bar/>
      <router-view/>
  </div>
</template>

<script>
import SideBar from '@/components/Messages/PC/SideBar.vue'
export default {
  components: { SideBar },
  methods:{
    goToMobileView() {
      if (this.$route.name=='messages') {
        this.$router.push({name:"messages_m"})
      }
      else if (this.$route.name=='message-detail') {
        this.$router.push({name:'message_m-detail',params:{id:this.$route.params.id}})
      }
    }
  }
}
</script>

<style>
.messages-view {
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
}
.mv-notice-modal,.mmv-notice-modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top:0;
  left:0;
  z-index:100;
  background-color:rgba(0,0,0,0.5);
  visibility: hidden;
  opacity: 0;
}
.mv-notice-modal .mvn-modal-inner,.mmv-notice-modal .mmvn-modal-inner {
  width: 200px;
  padding:10px;
  background-color:white;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0,0,0,0.5);
  animation:slide-up .3s linear;
}
@keyframes slide-up {
  0% {
    transform:translateY(200%);
  }
  100% {
    transform:translateY(0);
  }
}
@media only screen and (max-width: 768px) {
  .mv-notice-modal {
    visibility: visible;
    opacity: 1;
  }
}
@media only screen and (min-width: 769px) {
  .mmv-notice-modal {
    visibility: visible;
    opacity: 1;
  }
}
</style>