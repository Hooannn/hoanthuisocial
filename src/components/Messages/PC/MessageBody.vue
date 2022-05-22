<template>
  <div class="message-body">
      <div v-if='$route.name=="message_m-detail"' class="mmv-notice-modal center">
        <div class="mmvn-modal-inner">
          It seem that you're using laptop or computer. Please go to messages view for computer.<br>
          <button @click='$router.push({name:"message-detail",params:{id:$route.params.id}})' class="btn btn-sm btn-link">Go.</button>
        </div>
      </div>
      <chat-area class='chatarea-mb' :load='load' :contact='contact' :messages='messages'/>
      <information-area class='infoarea-mb' :load='load' :contact='contact' :messages='messages'/>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
import ChatArea from './ChatArea.vue'
import InformationArea from './InformationArea.vue'
export default {
  components: { ChatArea, InformationArea },
  data() {
    return {
      messages:[],
      conversation:{},
      contact:{},
      load:true,
    }
  },
  watch: {
    conversation() {
      this.contact={}
      if (this.conversation.user1==this.$store.state.ukey) {
        this.$rtdbBind('contact', db.ref('usersInformation').child(this.conversation.user2))
      }
      else if (this.conversation.user2==this.$store.state.ukey) {
        this.$rtdbBind('contact', db.ref('usersInformation').child(this.conversation.user1))
      }
    }
  },
  mounted() {
    this.$rtdbBind('conversation',db.ref('messagesData').child(this.$route.params.id)).then(()=>{
      this.$rtdbBind('messages',db.ref('messagesData').child(this.$route.params.id).child('data'))
      db.ref('messagesData').child(this.$route.params.id).child('theme').get().then(res=>{
        if (res.val()!=null) {
          this.$store.state.messagetheme=res.val()
        }
        else if (res.val()==null) {
          this.$store.state.messagetheme={}
        }
        this.load=false
      })
    })
  }
}
</script>

<style>
.message-body {
  padding-top:50px;
  width: 100%;
  display: flex;
}
/* */
.message-body .mmv-notice-modal {
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
.message-body .mmv-notice-modal .mmvn-modal-inner {
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
/* */
@media only screen and (max-width: 768px) {
  .message-body {
    padding-top:35px;
    width: 100vw;
    height: 100vh;
  }
  .infoarea-mb {
    display: none;
  }
  .chatarea-mb {
    max-width: 100%;
    width: 100%;
  }
}
@media only screen and (min-width: 769px) {
  .message-body .mmv-notice-modal {
    display: flex;
  }
}
</style>