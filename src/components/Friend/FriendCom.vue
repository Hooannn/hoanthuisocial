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
          <span @click='unfriend' v-if='type=="friend"'>Unfriend</span>
          <span @click='acceptInvite' v-if='type=="friendsrequested"'>Accept</span>
          <span @click='refuseInvite' v-if='type=="friendsrequested"'>Refuse</span>
          <span @click='cancleInvite' v-if='type=="friendsrequesting"'>Cancle</span>
          <span @click='viewProfile'>View Profile</span>
        </div>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
import router from '../../router/router'
import store from '../../store/store'
export default {
  props: {
    type:String,
    ukey:String,
    fKey:String,
  },
  data() {
    return {
      user:{},
      targetFriendRequestedList:[],
      targetFriendList:[],
      targetFriendRequestingList:[],
    }
  },
  methods: {
    showOption() {
      let option=document.querySelector(`div.friend-com.${this.fKey} div.option div.drop-down`)
      option.classList.toggle('show')
    },
    viewProfile() {
      let key=this.ukey
      router.push('/loading')
      setTimeout(function() {
        router.push({name:'post',params:{key:key}})
      },50)
    },
    unfriend() {
      let e=[...this.targetFriendList]
      db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('isfriend').child(this.fKey).remove()
        .then(() => {
          let fkey
          e.forEach(element => {
          if (element[".value"]==store.state.ukey) {
            fkey=element[".key"]
          }
          });
          db.ref('usersInformation').child(this.ukey).child('friends').child('isfriend').child(fkey).remove().catch(err=>console.log(err))
          setTimeout(function() {
            let friendEle=document.querySelector(`#app > div > div.profile-view > div.profile__content > div.container > div.friends-view.container > div.current-friends > div.list > div.friend-com.${this.fKey}`)
            friendEle.remove()
          },50)
        })
        .catch(err=> {console.log(err)})
    },
    acceptInvite() {
      let e=[...this.targetFriendRequestingList]
      db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('friendrequested').child(this.fKey).remove()
      .then(() => {
        db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('isfriend').push(this.ukey).catch(err=>console.log(err))
        db.ref('usersInformation').child(this.ukey).child('friends').child('isfriend').push(this.$store.state.ukey).catch(err=>console.log(err))
        let fkey
        e.forEach(element => {
          if (element[".value"]==store.state.ukey) {
            fkey=element[".key"]
          }
        });
        db.ref('usersInformation').child(this.ukey).child('friends').child('friendrequesting').child(fkey/*this.targetFriendRequestingList.find((friend) => ((friend[".value"]==store.state.ukey)[".key"]))*/).remove().catch(err=>console.log(err))
        setTimeout(function() {
          let friendEle=document.querySelector(`#app > div > div.profile-view > div.profile__content > div.container > div.friends-view.container > div.requested-friends > div.list > div.friend-com.${this.fKey}`)
          friendEle.remove()
        },50)
      })
      .catch(err => console.log(err))
    },
    refuseInvite() {
      let e=[...this.targetFriendRequestingList]
      db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('friendrequested').child(this.fKey).remove()
      .then(() => {
        let fkey
        e.forEach(element => {
          if (element[".value"]==store.state.ukey) {
            fkey=element[".key"]
          }
        });
        db.ref('usersInformation').child(this.ukey).child('friends').child('friendrequesting').child(fkey/*this.targetFriendRequestingList.find((friend) => ((friend[".value"]==store.state.ukey)[".key"]))*/).remove().catch(err=>console.log(err))
        setTimeout(function() {
          let friendEle=document.querySelector(`#app > div > div.profile-view > div.profile__content > div.container > div.friends-view.container > div.requested-friends > div.list > div.friend-com.${this.fKey}`)
          friendEle.remove()
        },50)
      })
      .catch(err => console.log(err))
    },
    cancleInvite() {
      let e=[...this.targetFriendRequestedList]
      db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('friendrequesting').child(this.fKey).remove()
      .then(() => {
        let fkey
        e.forEach(element => {
          if (element[".value"]==store.state.ukey) {
            fkey=element[".key"]
          }
        });
        db.ref('usersInformation').child(this.ukey).child('friends').child('friendrequested').child(fkey/*this.targetFriendRequestingList.find((friend) => ((friend[".value"]==store.state.ukey)[".key"]))*/).remove().catch(err=>console.log(err))
        setTimeout(function() {
          let friendEle=document.querySelector(`#app > div > div.profile-view > div.profile__content > div.container > div.friends-view.container > div.requesting-friends > div.list > div.friend-com.${this.fKey}`)
          friendEle.remove()
        },50)
      })
      .catch(err => console.log(err))
    }
  },
  /*
  watch: {
    targetFriendRequestingList(e) {
      this.targetFriendRequestingList=e
    }
  },
  */
  mounted() {
    this.$rtdbBind('user',db.ref('usersInformation').child(this.ukey))
    this.$rtdbBind('targetFriendRequestedList',db.ref('usersInformation').child(this.ukey).child('friends').child('friendrequested'))
    this.$rtdbBind('targetFriendRequestingList',db.ref('usersInformation').child(this.ukey).child('friends').child('friendrequesting'))
    this.$rtdbBind('targetFriendList',db.ref('usersInformation').child(this.ukey).child('friends').child('isfriend'))
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