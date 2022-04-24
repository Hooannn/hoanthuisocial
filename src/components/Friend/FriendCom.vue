<template>
  <div class="friend-com">
      <div style='display:flex;alignItems:center'>
        <div class="ava">
        <img style='width:100%;height:100%;objectFit:cover' :src="user.avatarImg">
      </div>
      <div class="infor">
        <div style='fontSize:16px'>{{user.username}}</div>
        <div v-if='ukey!=$store.state.ukey && user.type=="user"' style='fontSize:13px;color:grey'>Mutual {{mutualFriend.length}}</div>
      </div>
      </div>
      <div class='option'>
        <span><i @click='showOption' class="fas fa-ellipsis-h"></i></span>
        <div class="drop-down">
          <span v-if='user.type=="user"' @click='viewProfile'>View Profile</span>
          <span v-if='user.type=="page"' @click='viewPage'>View Page</span>
          <span @click='unfriend ' v-if='type=="friend" && $store.state.ukey==$route.params.key'>Unfriend</span>
          <span @click='acceptInvite' v-if='type=="friendsrequested" && $store.state.ukey==$route.params.key'>Accept</span>
          <span @click='refuseInvite' v-if='type=="friendsrequested" && $store.state.ukey==$route.params.key'>Refuse</span>
          <span @click='cancleInvite' v-if='type=="friendsrequesting" && $store.state.ukey==$route.params.key'>Cancle</span>
          <span @click='unfollow' v-if='type=="following" && $store.state.ukey==$route.params.key'>Unfollow</span>     
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
      myFriendList:[],
      targetFriendRequestingList:[],
      mutualFriend:[],
    }
  },
  methods: {
    showOption() {
      let option=document.querySelector(`div.friend-com.${this.fKey} div.option div.drop-down`)
      option.classList.toggle('show')
    },
    viewProfile() {
      let key=this.ukey
      router.push({name:'post',params:{key:key}})
    },
    viewPage() {
      let key=this.ukey
      router.push({name:'pages',params:{key:key}})
    },
    unfriend() {
      this.$store.dispatch('loading')
      let e=[...this.targetFriendList]
      db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('isfriend').child(this.fKey).remove()
        .then(() => {
          this.$store.dispatch('unfollow',this.ukey)
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
        }).then(()=>{
          this.$store.dispatch('unload')
        })
        .catch(err=> {
          this.$store.dispatch('unload')
          alert(err)
          })
    },
    acceptInvite() {
      this.$store.dispatch('loading')
      let e=[...this.targetFriendRequestingList]
      db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('friendrequested').child(this.fKey).remove()
      .then(() => {
        this.$store.dispatch('follow',this.ukey)
        let noti={
          content:`${this.$store.state.username} and you have become friend.`,
          date:new Date().toLocaleString(),
          time:-(new Date().getTime()),
          type:'accept-friendInvite',
          status:'Unseen',
          ukey:this.$store.state.ukey,
        }
        db.ref('usersInformation').child(this.ukey).child('notifications').push(noti)
        db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('isfriend').push(this.ukey).catch(err=>console.log(err))
        db.ref('usersInformation').child(this.ukey).child('friends').child('isfriend').push(this.$store.state.ukey).catch(err=>console.log(err))
        let newMessage= {
          user1:this.$store.state.ukey,
          user2:this.ukey,
        }
        db.ref('messagesData').push(newMessage)
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
      }).then(()=>{
          this.$store.dispatch('unload')
        })
        .catch(err=> {
          this.$store.dispatch('unload')
          alert(err)
          })
    },
    refuseInvite() {
      this.$store.dispatch('loading')
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
      }).then(()=>{
          this.$store.dispatch('unload')
        })
        .catch(err=> {
          this.$store.dispatch('unload')
          alert(err)
          })
    },
    unfollow() {
      this.$store.dispatch("unfollow",this.ukey)
      let followEle=document.querySelector(`#app > div > div.profile-view > div.profile__content > div.container > div.friends-view.container > div.following > div.list > div.friend-com.${this.fKey}`)
      followEle.remove()
    }
  },
  
  watch: {
    targetFriendList() {
      this.mutualFriend=[]
      this.myFriendList.forEach(myfr => {
        this.targetFriendList.forEach(tarfr => {
          if (myfr[".value"]==tarfr[".value"]) {
            this.mutualFriend.push(myfr[".value"])
          }
        });
      });
    }
  },
  mounted() {
    this.$rtdbBind('user',db.ref('usersInformation').child(this.ukey))
    this.$rtdbBind('targetFriendRequestedList',db.ref('usersInformation').child(this.ukey).child('friends').child('friendrequested'))
    this.$rtdbBind('targetFriendRequestingList',db.ref('usersInformation').child(this.ukey).child('friends').child('friendrequesting'))
    this.$rtdbBind('targetFriendList',db.ref('usersInformation').child(this.ukey).child('friends').child('isfriend'))
    this.$rtdbBind('myFriendList',db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('isfriend'))
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