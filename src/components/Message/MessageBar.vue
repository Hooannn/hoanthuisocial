<template>
  <div class="message-bar">
      <message-user v-show='$store.state.currentContact>0' v-for='(user,index) in users' :ukey='user[".key"]' :key='user[".key"]+index'/>
      <div style='fontSize:14px;color:red;backgroundColor:white;borderRadius:10px;textAlign:center;boxShadow:0 0 3px rgba(0,0,0,0.3);fontWeight:bold' v-if='$store.state.currentContact==0'>
          You have no contact now.
      </div>
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
    overflow-x:hidden;
}
.message-bar.show {
    width: 60px;
    visibility: visible;
    opacity: 1;
}
.message-bar::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

.message-bar::-webkit-scrollbar
{
	width: 5px;
	background-color: #F5F5F5;
}

.message-bar::-webkit-scrollbar-thumb
{
	background-color: rgb(253, 184, 56);
}

</style>