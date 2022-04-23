<template>
  <div class="profile-view" :key='$route.params.key'>
      <div class="profile__cover">
          <img :src="user.coverImg" alt="Cover img">
      </div>
      <div class="profile__content ">
          <div class="profile__header">
              <div class="container">
                  <div class="inf">
                  <div class='avatar'>
                      <img :src="user.avatarImg">
                      <div :class='{online:user.status=="Online"}' class="status"></div>
                  </div>
                  <div class="detail">
                      <div class="username"><strong style='fontSize:20px'>{{user.username}}</strong></div>
                      <div class="member" style='fontSize:14px'>Member since {{user.registerDate}}</div>
                  </div>
              </div>
              <div class="more-inf">
                  <button v-if='$store.state.ukey==profileKey' @click='$router.push({name:"personal"}),isSelect="Edit"' class='btn btn-dark btn-sm edit'>Edit Profile</button>
                  <button :disabled='userFriend.find((user)=>(user[".value"]==$route.params.key))||userFriendRequesting.find((user)=>(user[".value"]==$route.params.key))||userFriendRequested.find((user)=>(user[".value"]==$route.params.key))' @click='$store.dispatch("sentFriendRequest",$route.params.key),$store.dispatch("follow",$route.params.key)' v-if='$store.state.type!="page"&&$store.state.ukey!=profileKey' class='btn btn-dark btn-sm edit'>
                      <span v-if='!userFriend.find((user)=>(user[".value"]==$route.params.key))'>Add Friend</span>
                      <span v-if='userFriend.find((user)=>(user[".value"]==$route.params.key))'>Friend</span>
                  </button>
                  <button v-if='$store.state.ukey==profileKey' class="btn btn-danger btn-sm market">View Market</button>
                  <button @click='$store.dispatch("follow",$route.params.key)' v-if='$store.state.ukey!=profileKey && !follows.find(user=> user[".value"]==$store.state.ukey)' class="btn btn-danger btn-sm market">
                      Follow
                  </button>
                  <button @click='$store.dispatch("unfollow",$route.params.key)' v-if='$store.state.ukey!=profileKey && follows.find(user=> user[".value"]==$store.state.ukey)' class="btn btn-dark btn-sm market">
                      Unfollow
                  </button>
                  <div class="friends">
                      <span>Friends</span>
                      <span><strong>{{friends.length}}</strong></span>
                  </div>
                  <div class="follows">
                      <span>Follows</span>
                      <span><strong>{{follows.length}}</strong></span>
                  </div>
              </div>
              </div>
          </div>
          <div style='height:auto;minHeight:55vh;marginBottom:25px' class="container">
              <div class="profile__nav">
                  <div @click='$router.push({name:"post",params:{key:profileKey}})' class="post" :class="{active:$route.name=='post'}">Post</div>
                  <div @click='$router.push({name:"about",params:{key:profileKey}})' class="about" :class="{active:$route.name=='about'}">About</div>
                  <div v-if='$store.state.ukey==$route.params.key && $store.state.type!="page"' @click='$router.push({name:"friends",params:{key:profileKey}})' class="friends-list" :class="{active:$route.name=='friends'}">Friends ({{friends.length+follows.length+following.length+userFriendRequested.length+userFriendRequesting.length}})</div>
                  <div v-if='$store.state.ukey!=$route.params.key' @click='$router.push({name:"friends",params:{key:profileKey}})' class="friends-list" :class="{active:$route.name=='friends'}">Friends ({{friends.length+follows.length+following.length}})</div>
                  <div class="images" :class="{active:$route.name=='images'}">Images</div>
                  <div @click='$router.push({name:"communities",params:{key:profileKey}})' class="communities" :class="{active:$route.name=='communities'}">Coms</div>
                  <div class="more" :class="{active:$route.name=='see-more'}">See more <ion-icon style="marginLeft:5px" name="chevron-down-outline"></ion-icon></div>
              </div>
              <router-view class='router-view'></router-view>
          </div>
          <footer-com/>
      </div>
  </div>
</template>

<script>
import FooterCom from '../../../components/General/FooterCom.vue'
import db from './../../../plugins/firebase'
export default {
  components: { FooterCom },
    data() {
        return {
            user: {
                
            },
            friends:[],
            follows:[],
            following:[],
            profileKey:'',
            //friend handle
            userFriendRequesting:[],
            userFriendRequested:[],
            userFriend:[],
            //,
        }
    },
    watch: {
        user() {
            if (this.user.type=="page" && this.user[".key"]!=this.$store.state.ukey) {
                this.$router.push({name:'pages',params:{key:this.$route.params.key}})
            }
            else {
                return
            }
        }
    },
    mounted() {
        document.documentElement.scrollTop=0
        this.$store.dispatch('loading')
        this.$rtdbBind('friends',db.ref('usersInformation').child(this.$route.params.key).child('friends').child('isfriend'))
        this.$rtdbBind('follows',db.ref('usersInformation').child(this.$route.params.key).child('follows').child('followed'))
        this.$rtdbBind('following',db.ref('usersInformation').child(this.$route.params.key).child('follows').child('following'))
        this.$rtdbBind('userFriendRequesting',db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('friendrequesting'))
        this.$rtdbBind('userFriendRequested',db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('friendrequested'))
        this.$rtdbBind('userFriend',db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('isfriend'))
        this.$rtdbBind('user',db.ref('usersInformation').child(this.$route.params.key))
        .then(()=> {this.$store.dispatch('unload')})
        .catch(()=>{this.$store.dispatch('unload')})
        this.profileKey=this.$route.params.key
    },
}
</script>

<style>
.profile-view {
    width: 100%;
    min-height: 100vh;
    height: auto;
    display: flex;
    flex-direction: column;
}
.profile__cover {
    padding-top:50px;   
    height: 350px;
}
.profile__cover img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.profile__content {
    width: 100%;
    height: auto;
}
.profile__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 120px;
    background-color:white;
}
.profile__header .container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.profile__header .container .inf,.profile__header .container .more-inf {
    display: flex;
    height: 100%;
    align-items: center;
    width: 400px;
}
.profile__header .container .inf .detail{
    margin-left:130px;
}
.profile__header .container .inf .avatar{
    width: 120px;
    height: 120px;
    border:2px solid white;
    border-radius: 50%;
    position: absolute;
    top:-35px;
}
.profile__header .container .inf .avatar img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.profile__header .container .inf .avatar .status{
    width:23px;
    height:23px;
    border-radius: 50%;
    position:absolute;
    bottom:0px;
    right:10px;
    background-color:grey;
}
.profile__header .container .inf .avatar .status.online{
    background-color: green;
}
.profile__header .container .more-inf {
    display: flex;
    justify-content: space-between;
}
.profile__header .container .more-inf div{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.profile__nav {
    width: 100%;
    justify-content: space-around;
    display: flex;
    align-items: center;
    height: 40px;
}
.profile__nav div{
    height: 100%;
    width: 15%;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(0,0,0,0.4);
    cursor: pointer;
}
.profile__nav div.active{
    background-color:rgba(128, 128, 128, 0.158);
    border-bottom:3px solid orange;
    color:orangered;
    font-weight: 900;
}
.profile__nav div:hover{
    background-color:rgba(128, 128, 128, 0.158);
}
.profile__nav .more{
    display: flex;
    align-items: center;
}

/*  */
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
    .profile__cover {
        padding-top:35px;   
        height: 200px;
    }
    .profile__header{
        height: auto;
        word-wrap: break-word;
    }
   .profile__header .container{
        flex-direction: column;
    }
    .profile__header .container .inf .avatar{
        width: 70px;
        height: 70px;
        top:-15px;
        left:15px;
    }
    .profile__header .container .inf .avatar .status{
        width:15px;
        height:15px;
    }
    .profile__header .container .more-inf {
        flex-direction: column;
        font-size: 15px;
    }
    .profile__header .container .more-inf *:not(span){
        margin:5px 0;
    }
    .profile__nav {
        display: flex;
        justify-content: center;
    }
    .profile__nav div{
        width: 10%;
        font-size: 10.5px;
        margin:0 5px;
    }
    #app > div.dash-board > div.profile-view > div.profile__content > div.container > div.post-view.router-view > div.second-col > div.posts-list div {
        font-size: 12px;
    }
}
</style>