<template>
  <div class="message-bar">
        <message-user v-show='$store.state.currentContact>0' v-for='(user,index) in users' :class='"messagecontact"+user[".key"]' :ukey='user[".key"]' :key='user[".key"]+index'/>
        <div class='message-user' style='justifyContent:center;backgroundColor:transparent;cursor:unset;width:auto;height:auto;fontSize:14px;color:black;borderRadius:10px;textAlign:center;fontWeight:bold;' v-if='$store.state.currentContact==0'>
          You have no contact in current.
        </div>
        <div style=';width:100%;' class='center'>
            <button @click='$router.push({name:"messages"})' class="btn btn-dark">Full Message</button>
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
    width: 0;
    opacity: 0;
    visibility: hidden;
    background-color:transparent;
    position: fixed;
    right: 0;
    top:50px;
    display: flex;
    flex-direction: column;
    transition: all .4s linear;
    z-index: 10;
    overflow-y:scroll ;
    overflow-x:hidden;
    background-color:rgb(221, 234, 252);
    border-left:3px solid lightsteelblue;
    box-shadow: 0 0 2px 1px rgba(0,0,0,0.3);
}
.message-bar.show {
    width: 260px;
    visibility: visible;
    opacity: 1;
}
/* scroll bar */
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
.message-bar::-webkit-scrollbar-thumb:hover {
    background-color:rgb(253, 184, 56,0.6);
}
/*  */
@media only screen and (max-width: 768px) {
       .message-bar {
           display: none;
       }
}
</style>