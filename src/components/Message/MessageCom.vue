<template>
  <div class="message-com" :class='{owner:$store.state.ukey==msg.author}'>
      <div v-if='$store.state.ukey!=msg.author' class='avaImg'><img :src="author.avatarImg"></div>
      <div :class='{owner:$store.state.ukey==msg.author}' class='msg-content'>
          <div style='fontSize:11px;opacity:0.8'>{{msg.date}}</div>
          <div>{{msg.content}}</div>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props: {
        msg:Object,
    },
    data() {
        return {
            author:{},
        }
    },
    mounted() {
        this.$rtdbBind('author',db.ref('usersInformation').child(this.msg.author))
    }
}
</script>

<style>
.message-com {
    width: 100%;
    padding:8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.message-com.owner {
    flex-direction: row-reverse;
}
.message-com .avaImg{
    width: 27px;
    height: 27px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 5px;
}
.message-com .avaImg img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.message-com .msg-content{
    max-width: 75%;
    word-wrap: break-word;
    font-size: 13.5px;
    padding:3px;
    background-color:rgba(0,0,0,0.5);
    border-radius: 3px;
    color:white;
}
.message-com .msg-content.owner{
    background-color: rgb(255, 117, 85);
    text-align: end;
}  
</style>