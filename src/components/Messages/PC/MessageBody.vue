<template>
  <div class="message-body">
      <chat-area :load='load' :contact='contact' :messages='messages'/>
      <information-area :load='load' :contact='contact' :messages='messages'/>
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
      this.load=false
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
</style>