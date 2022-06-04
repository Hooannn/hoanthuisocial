<template>
  <div class="card-information center">
      <div v-if='load' class="ci-loader "></div>
      <div class='ci-content' v-if='!load'>
          <div class="cic-body">
              <div class="cicb-image">
                  <div style='position:relative'>
                      <div :style='{backgroundColor:user.status=="Online" ? "green":"slategrey"}' style='zIndex:10;width:15px;height:15px;borderRadius:50%;position:absolute;bottom:-2px;right:2px'></div>
                      <img @click='viewProfile' style='width:100%;height:100%;borderRadius:50%;objectFit:cover;cursor:pointer' :src="user.avatarImg" alt="avatar img">
                  </div>
              </div>
              <div v-if='user.type=="user"' class="cicb-detail">
                  <div @click='viewProfile' class="cicbd-username"><span>{{user.username}}</span></div>
                  <div v-if='user.friends.isfriend' class="cicbd-friends">
                      <ion-icon style='marginRight:5px' name="people-outline"></ion-icon> {{Object.keys(user.friends.isfriend).length||"0"}} friends
                  </div>
                  <div v-if='user.follows.followed' class="cicbd-follows">
                      <ion-icon style='marginRight:5px' name="heart-outline"></ion-icon> {{Object.keys(user.follows.followed).length||"0"}} follows
                  </div>
                  <div class="cicbd-location">
                      <ion-icon style='marginRight:5px' name="location-outline"></ion-icon> Live in {{user.location}}
                  </div>
              </div>
              <div v-if='user.type=="page"' class="cicb-detail">
                  <div @click='viewProfile' class="cicbd-username"><span>{{user.username}}</span></div>
                  <div v-if='user.follows.followed' class="cicbd-follows">
                      <ion-icon style='marginRight:5px' name="thumbs-up-outline"></ion-icon> {{Object.keys(user.follows.followed).length||"0"}} likes
                  </div>
                  <div v-if='user.description' class="cicbd-location">
                      {{user.description}}
                  </div>
              </div>
          </div>
          <div v-if='$store.state.ukey!=user[".key"]&&user.type=="user"' class="cic-control center">
              <button @click='$store.dispatch("sentFriendRequest",user[".key"])' v-if='!isFriend&&!isInvited&&!isInviting&&$store.state.type!="page"' class="btn btn-sm btn-dark center"><ion-icon style='marginRight:5px;' name="add-outline"></ion-icon>Add</button>
              <button v-if='isFriend' disabled class="btn btn-sm btn-secondary center"><ion-icon style='marginRight:5px;' name="checkmark-outline"></ion-icon>Friend</button>
              <button v-if='isInvited' disabled class="btn btn-sm btn-secondary center"><ion-icon style='marginRight:5px;' name="checkmark-outline"></ion-icon>Invite sent</button>
              <button @click='acceptInvite' v-if='isInviting' class="btn btn-sm btn-success center"><ion-icon style='marginRight:5px;' name="checkmark-outline"></ion-icon>Accept</button>
              <button @click='contactUser' class="btn btn-sm btn-info center cicc-contact_p"><ion-icon style='marginRight:5px;' name="navigate-outline"></ion-icon>Contact</button>
              <button @click='contactUser_m' class="btn btn-sm btn-info center cicc-contact_m"><ion-icon style='marginRight:5px;' name="navigate-outline"></ion-icon>Contact</button>
          </div>
          <div v-if='$store.state.ukey!=user[".key"]&&user.type=="page"' class="cic-control center">
              <button @click='$store.dispatch("follow",user[".key"])' v-if='!isLiked' class="btn btn-sm btn-danger center"><ion-icon style='marginRight:5px;' name="thumbs-up-outline"></ion-icon>Like</button>
              <button v-if='isLiked' disabled class="btn btn-sm btn-secondary center"><ion-icon style='marginRight:5px;' name="checkmark-outline"></ion-icon>Liked</button>
              <button @click='contactUser' class="btn btn-sm btn-info center cicc-contact_p"><ion-icon style='marginRight:5px;' name="navigate-outline"></ion-icon>Contact</button>
              <button @click='contactUser_m' class="btn btn-sm btn-info center cicc-contact_m"><ion-icon style='marginRight:5px;' name="navigate-outline"></ion-icon>Contact</button>
          </div>
          <div v-if='$store.state.ukey==user[".key"]' class="cic-control center">
              <button @click='$router.push({name:"personal",params:{key:$store.state.ukey}})' class="btn btn-sm btn-secondary center"><ion-icon style='marginRight:5px;' name="create-outline"></ion-icon>Edit</button>
              <button @click='$router.push({name:"messages"})' class="btn btn-sm btn-info center cicc-contact_p"><ion-icon style='marginRight:5px;' name="chatbubble-outline"></ion-icon>Message</button>
              <button @click='$router.push({name:"messages_m"})' class="btn btn-sm btn-info center cicc-contact_m"><ion-icon style='marginRight:5px;' name="chatbubble-outline"></ion-icon>Message</button>
          </div>
      </div>
  </div>
</template>

<script>
import store from '@/store/store'
import db from '@/plugins/firebase'
export default {
    props:{
        authorKey:String
    },
    data() {
        return {
            targetFriendRequestingList:[],
            messageKey:null,
            messagesData:[],
            yourFriendInviting:[],
            load:true,
            user:{},
            isFriend:false,
            isLiked:false,
            isInviting:false,
            isInvited:false,
        }
    },
    methods:{
        viewProfile() {
            if (this.user.type=="page") {
                this.$router.push({name:"pages",params:{key:this.user[".key"]}})
            }
            else if (this.user.type=="user") {
                this.$router.push({name:"post",params:{key:this.user[".key"]}})
            }
        },
        acceptInvite() {
            let fKey=this.yourFriendInviting.find(f=>f[".value"]==this.user[".key"])[".key"]
            if (!fKey) {
                return
            }
            this.$store.dispatch('loading')
            let e=[...this.targetFriendRequestingList]
            db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('friendrequested').child(fKey).remove()
                .then(() => {
                    this.$store.dispatch('follow',this.user[".key"])
                    let noti={
                        content:`${this.$store.state.username} and you have become friend.`,
                        date:new Date().toLocaleString(),
                        time:-(new Date().getTime()),
                        type:'accept-friendInvite',
                        status:'Unseen',
                        ukey:this.$store.state.ukey,
                    }
            db.ref('usersInformation').child(this.user[".key"]).child('notifications').push(noti)
            db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('isfriend').push(this.user[".key"]).catch(err=>console.log(err))
            db.ref('usersInformation').child(this.user[".key"]).child('friends').child('isfriend').push(this.$store.state.ukey).catch(err=>console.log(err))
            if (this.messageKey==null) {
                let newMessage= {
                    user1:this.$store.state.ukey,
                    user2:this.user[".key"],
                }
                db.ref('messagesData').push(newMessage)
            }
            let fkey
            e.forEach(element => {
                if (element[".value"]==store.state.ukey) {
                    fkey=element[".key"]
                }
            });
            db.ref('usersInformation').child(this.user[".key"]).child('friends').child('friendrequesting').child(fkey/*this.targetFriendRequestingList.find((friend) => ((friend[".value"]==store.state.ukey)[".key"]))*/).remove().catch(err=>console.log(err))
          }).then(()=>{
            this.$store.dispatch('unload')
          }).catch(err=> {
            this.$store.dispatch('unload')
            alert(err)
          })
        },
        contactUser() {
            if (this.messageKey==null) {
                //create new conversation
                this.$store.dispatch('loading')
                let newConversation= {
                    user1:this.$store.state.ukey,
                    user2:this.user[".key"],
                }
                db.ref('messagesData').push(newConversation).then((res)=>{
                    // this.$store.dispatch('addMsgData', res.key)
                    this.$router.push({name:"message-detail",params:{id:res.key}})
                    this.$store.dispatch('unload')
                }).catch((err)=>{
                    alert(err)
                    this.$store.dispatch('unload')
                })
            }
            else {
                //this.$store.dispatch('addMsgData', this.messageKey)
                this.$router.push({name:"message-detail",params:{id:this.messageKey}})
            }
        },
        contactUser_m() {
            if (this.messageKey==null) {
                //create new conversation
                this.$store.dispatch('loading')
                let newConversation= {
                    user1:this.$store.state.ukey,
                    user2:this.$route.params.key,
                }
                db.ref('messagesData').push(newConversation).then((res)=>{
                    // this.$store.dispatch('addMsgData', res.key)
                    this.$router.push({name:"message_m-detail",params:{id:res.key}})
                    this.$store.dispatch('unload')
                }).catch((err)=>{
                    alert(err)
                    this.$store.dispatch('unload')
                })
            }
            else {
                //this.$store.dispatch('addMsgData', this.messageKey)
                this.$router.push({name:"message_m-detail",params:{id:this.messageKey}})
            }
        }
    },
    watch: {
        messagesData() {
            this.messageKey=null
            this.messagesData.forEach(message => {
                if (message['user1']==this.$store.state.ukey && message['user2']==this.user[".key"]) {
                    this.messageKey=message[".key"]
                }
                else if (message['user2']==this.$store.state.ukey && message['user1']==this.user[".key"]) {
                    this.messageKey=message[".key"]
                }
            });
        },
        user() {
            this.isFriend=false
            this.isLiked=false
            this.isInvited=false
            if (this.user.friends&&this.user.type=="user") {
                if (this.user.friends.isfriend) {
                    Object.keys(this.user.friends.isfriend).forEach(fr => {
                        if (this.user.friends.isfriend[fr]==this.$store.state.ukey) {
                            this.isFriend=true
                        }
                    });
                }
                if (this.user.friends.friendrequested) {
                    Object.keys(this.user.friends.friendrequested).forEach(fr => {
                        if (this.user.friends.friendrequested[fr]==this.$store.state.ukey) {
                            this.isInvited=true
                        }
                    });
                }
            }
            if (this.user.follows&&this.user.type=="page") {
                if (this.user.follows.followed) {
                    Object.keys(this.user.follows.followed).forEach(fl => {
                        if (this.user.follows.followed[fl]==this.$store.state.ukey) {
                            this.isLiked=true
                        }
                    });
                }
            }
        },
        yourFriendInviting() {
            this.isInviting=false
            if (this.yourFriendInviting.length>0) {
                this.yourFriendInviting.forEach(e => {
                    if (e[".value"]==this.user[".key"]) {
                        this.isInviting=true
                    }
                });
            }
        }
    },
    mounted() {
        this.$rtdbBind('user',db.ref('usersInformation').child(this.authorKey)).then(()=>{
            this.$rtdbBind('yourFriendInviting',db.ref('usersInformation').child(this.$store.state.ukey).child("friends").child("friendrequested")).then(()=>{
                this.$rtdbBind('messagesData',db.ref('messagesData')).then(()=>{
                    this.$rtdbBind('targetFriendRequestingList',db.ref('usersInformation').child(this.authorKey).child('friends').child('friendrequesting')).then(()=>{
                        this.load=false
                    }).catch(err=>{this.load=false})
                }).catch(err=>{console.log(err)})
            }).catch(err=>{console.log(err)})
        }).catch(err=>console.log(err))
    }
}
</script>

<style>
.card-information {
    position:absolute;
    top:100%;
    left:0;
    width: 0;
    height: 0;
    background-color:whitesmoke;
    z-index: 50;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding:10px 0;
    visibility: hidden;
    opacity: 0;
    transition:.2s linear;
}
.card-information.show {
    opacity: 1;
    width: 350px;
    height: auto;
    visibility: visible;
}
.card-information .ci-loader {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border:10px solid #7a7878;
    border-top-color: lightblue;
    animation: spin3 .6s ease-in-out infinite;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
.card-information .ci-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.card-information .ci-content .cic-body {
    height: auto;
    display: flex;
}
.card-information .ci-content .cic-body .cicb-image {
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
}
.card-information .ci-content .cic-body .cicb-image>div {
    max-width: 70px;
    max-height: 70px;
    border-radius: 50%;
}
.card-information .ci-content .cic-body .cicb-image>div img:hover {
    opacity: 0.8;
}
.card-information .ci-content .cic-body .cicb-detail {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.card-information .ci-content .cic-body .cicb-detail>div:first-child {
    font-weight: bolder;
    color:steelblue;
    cursor: pointer;
    font-size: 18px;
}
.card-information .ci-content .cic-body .cicb-detail>div:first-child:hover {
    text-decoration: underline;
}
.card-information .ci-content .cic-body .cicb-detail div {
    display: flex;
    align-items: center;
    margin:2px 0;
}
.card-information .ci-content .cic-control {
    height: 40px;
    justify-content: space-around;
}
.card-information .ci-content .cic-control button {
    width: 45%;
}
.card-information .ci-content .cic-control .cicc-contact_m {
    display: none;
}
/*  */
@media only screen and (max-width: 1024px) {
  /* For mobile phones: */
    .card-information .ci-content .cic-body .cicb-image>div {
        max-width: 60px;
        max-height: 60px;
    }
    .card-information {
        font-size: 15px;
    }
    .card-information .ci-content .cic-control button {
        font-size: 13.5px;
        width: 40%;
    }
    .card-information .ci-content .cic-body .cicb-detail>div:first-child {
        font-size:16px;
    }
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
    .card-information .ci-content .cic-control .cicc-contact_p {
        display: none;
    }
    .card-information .ci-content .cic-control .cicc-contact_m {
        display: flex;
    }
    .card-information .ci-content .cic-body .cicb-image>div {
        max-width: 50px;
        max-height: 50px;
    }
    .card-information .ci-content .cic-control button {
        font-size: 12px;
        width: 40%;
    }
}
</style>