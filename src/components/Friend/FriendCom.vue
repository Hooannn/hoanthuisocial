<template>
  <div class="friend-com">
      <div style='display:flex;alignItems:center'>
        <div class="ava">
        <img style='width:100%;height:100%;objectFit:cover' :src="user.avatarImg">
      </div>
      <div class="infor">
        <div style='fontSize:16px'>{{user.username}}</div>
        <div style='fontSize:13px;color:grey'>Mutual 0</div>
      </div>
      </div>
      <div class='option'>
        <span><i @click='showOption' class="fas fa-ellipsis-h"></i></span>
        <div class="drop-down">
          <span v-if='type=="friend"'>Unfriend</span>
          <span v-if='type=="friendsrequested"'>Accept</span>
          <span v-if='type=="friendsrequested"'>Refuse</span>
          <span v-if='type=="friendsrequesting"'>Cancle</span>
          <span >View Profile</span>
        </div>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
  props: {
    type:String,
    ukey:String,
    fKey:String,
  },
  data() {
    return {
      user:{}
    }
  },
  methods: {
    showOption() {
      let option=document.querySelector(`div.friend-com.${this.fKey} div.option div.drop-down`)
      option.classList.toggle('show')
    }
  },
  mounted() {
    this.$rtdbBind('user',db.ref('usersInformation').child(this.ukey))
  }
}
</script>

<style>
.friend-com {
  width: 25%;
  padding:20px 40px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.friend-com .ava{
  width: 35px;
  height: 35px;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 8px;
}
.friend-com .option .drop-down{
  border-radius: 3px;
  border-left: 3px solid #FB5252;
  background-color:white;
  color:black;
  font-size: 14.5px;
  box-shadow: 0 0 2px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  visibility: hidden;
}
.friend-com .option .drop-down.show{
  visibility: visible;
}
.friend-com .option>span>i:hover{
  cursor: pointer;
  color:#FB5252;
}
.friend-com .option .drop-down span{
  padding:6px;
  cursor: pointer;
  width: 100%;
}
.friend-com .option .drop-down span:hover{
  background-color:#FB5252;
  color:white;
}
.friend-com .option .drop-down::before{
  display: none;
}
</style>