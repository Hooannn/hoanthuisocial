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
                  <button v-if='$store.state.ukey!=profileKey' @click='isSelect="Add Friend"' class='btn btn-dark btn-sm edit'>Add Friend</button>
                  <button v-if='$store.state.ukey==profileKey' class="btn btn-danger btn-sm market">View Market</button>
                  <button v-if='$store.state.ukey!=profileKey' class="btn btn-danger btn-sm market">Follow</button>
                  <div class="friends">
                      <span>Friends</span>
                      <span style='fontSize:20px'><strong>{{friends.length}}</strong></span>
                  </div>
                  <div class="follows">
                      <span>Follows</span>
                      <span style='fontSize:20px'><strong>{{follows.length}}</strong></span>
                  </div>
              </div>
              </div>
          </div>
          <div class="container">
              <div class="profile__nav">
                  <div @click='$router.push({name:"post",params:{key:profileKey}}),isSelect="Post"' class="post" :class="{active:isSelect=='Post'}">Post</div>
                  <div @click='$router.push({name:"about",params:{key:profileKey}}),isSelect="About"' class="about" :class="{active:isSelect=='About'}">About</div>
                  <div @click='$router.push({name:"friends",params:{key:profileKey}}),isSelect="Friends"' class="friends-list" :class="{active:isSelect=='Friends'}">Friends</div>
                  <div @click='isSelect="Image"' class="images" :class="{active:isSelect=='Image'}">Image</div>
                  <div @click='isSelect="Follows"' class="follows-list" :class="{active:isSelect=='Follows'}">Follows</div>
                  <div @click='isSelect="See more"' class="more" :class="{active:isSelect=='See more'}">See more <ion-icon style="marginLeft:5px" name="chevron-down-outline"></ion-icon></div>
              </div>
              <router-view></router-view>
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
            isSelect:"Post",
            profileKey:''
        }
    },
    mounted() {
        this.$rtdbBind('user',db.ref('usersInformation').child(this.$route.params.key))
        this.$rtdbBind('friends',db.ref('usersInformation').child(this.$route.params.key).child('friends').child('isfriend'))
        this.$rtdbBind('follows',db.ref('usersInformation').child(this.$route.params.key).child('follows').child('followed'))
        this.profileKey=this.$route.params.key
    }
}
</script>

<style>
.profile-view {
    width: 100%;
    height: 100vh;
    min-height: 100vh;
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
</style>