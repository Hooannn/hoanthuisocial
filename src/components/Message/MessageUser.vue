<template>
  <div class="message-user">
      <img style='width:100%;height:100%;objectFit:cover;borderRadius:50%' :src="user.avatarImg">
      <span class='username'>{{user.username}}</span>
      <div :class='{online:user.status=="Online"}' class="status"></div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props: {
        ukey:String,
    },
    data() {
        return {
            user: {}
        }
    },
    mounted() {
        this.$rtdbBind('user',db.ref('usersInformation').child(this.ukey))
    }
}
</script>

<style>
.message-user {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transform: translateX(-25px);
    position: relative;
    margin:25px 0;
    transition: all .2s ease-in-out;
}
.message-user:hover {
    cursor: pointer;
    width: 60px;
    height: 60px;
    transform: translateX(-40px);
}
.message-user .username{
    position: absolute;
    font-size: 14px;
    width: 100px;
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    word-wrap: break-word;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:5px;
    background-color: white;
    border-top:5px solid rgb(255, 117, 85);
    visibility: hidden;
    color:black;
    opacity: 0;
    transition: all .2s ease-in-out;
    border-radius: 5px;
    box-shadow: 0 0 3px rgb(0, 0, 0,0.3);
}

.message-user:hover .username{
    visibility: visible;
    opacity: 1;
    transform: translate(-140%,-50%);
}
.message-user .status{
    width: 13px;
    height: 13px;
    border-radius: 50%;
    position: absolute;
    bottom: 0px;
    right: 1px;
    background-color:grey;
}
.message-user .status.online{
    background-color:green;
}
</style>