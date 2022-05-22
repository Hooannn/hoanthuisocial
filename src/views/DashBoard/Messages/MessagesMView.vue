<template>
  <div class="messages-m-view">
      <div class="mmv-notice-modal">
        <div class="mmvn-modal-inner">
          It seem that you're using laptop or computer. Please go to messages view for computer.<br>
          <button @click='$router.push({name:"messages"})' class="btn btn-sm btn-link">Go.</button>
        </div>
      </div>
    <side-bar/>
  </div>
</template>

<script>
import SideBar from '@/components/Messages/PC/SideBar.vue'
export default {
  components: { SideBar },

}
</script>

<style>
.messages-m-view {
    width: 100vw;
    height: 100vh;
}
.messages-m-view .mmv-notice-modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top:0;
  left:0;
  z-index:100;
  background-color:rgba(0,0,0,0.5);
  display: none;
  justify-content: center;
  align-items: center;
}
.messages-m-view .mmv-notice-modal .mmvn-modal-inner {
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
@media only screen and (min-width: 769px) {
  .messages-m-view .mmv-notice-modal {
    display: flex;
  }
}
</style>