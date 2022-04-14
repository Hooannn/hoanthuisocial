<template>
  <div class="message-bar">
      <message-user v-for='user in myFriendList' :ukey='user[".value"]' :key='user[".value"]' :class='user[".key"]'/>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
import MessageUser from './MessageUser.vue'
export default {
  components: { MessageUser },
    data() {
        return {
            myFriendList:[]
        }
    },
    mounted() {
        this.$rtdbBind('myFriendList',db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('isfriend'))
    }
}
</script>

<style>
.message-bar {
    height: 95vh;
    max-height: 95vh;
    width: 0;
    opacity: 0;
    visibility: hidden;
    background-color:transparent;
    position: fixed;
    right: 0;
    top:50px;
    display: flex;
    flex-direction: column;
    transition: all .3s ease-in-out;
}
.message-bar.show {
    width: 35px;
    visibility: visible;
    opacity: 1;
}
</style>