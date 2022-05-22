<template>
  <div @click='closeEmojis' class="messages-view" >
      <div class="mv-notice-modal">
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
    },
    closeEmojis(e) {
      let emoji=document.querySelectorAll('#emojis div.emoji')
      for (let index = 0; index < emoji.length; index++) {
        if (e.target==emoji[index]) {
          return
        }
      }
      if (e.target==document.querySelector('#emojis')||e.target==document.querySelector('#app > div.dash-board > div.messages-view > div.message-body > div.chat-area.chatarea-mb > div.ca-input > ion-icon:nth-child(4)')) {
        return
      }
      if (document.querySelector('#emojis')) {
        document.querySelector('#emojis').classList.remove('show')
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
.messages-view .mv-notice-modal {
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
.messages-view .mv-notice-modal .mvn-modal-inner {
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
  .messages-view .mv-notice-modal {
    display: flex;
  }
}
</style>