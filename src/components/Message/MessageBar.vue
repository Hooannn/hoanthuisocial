<template>
  <div class="message-bar">
      <message-user v-for='(user,index) in users' :ukey='user[".key"]' :key='user[".key"]+index'/>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
import MessageUser from './MessageUser.vue'
export default {
  components: { MessageUser },
    data() {
        return {
            users:[]
        }
    },
    mounted() {
        this.$rtdbBind('users',db.ref('usersInformation'))
    }
}
</script>

<style>
.message-bar {
    height: 95vh;
    max-height: 95vh;
    overflow-y:auto;
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
    z-index: 10;
}
.message-bar.show {
    width: 60px;
    visibility: visible;
    opacity: 1;
}
</style>