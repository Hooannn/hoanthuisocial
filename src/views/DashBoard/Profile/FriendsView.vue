<template>
  <div class="friends-view container">
      <div class="current-friends">
          <h5 @click='yfSlide'><div>Friends <span style='fontSize:13px'>({{friends.length}})</span></div><i class="fas" :class='{"fa-chevron-down":slide.fr==false,"fa-chevron-up":slide.fr==true}'></i></h5>
          <div class='list'>
              <friend-com :type="'friend'" :class='friend[".key"]' v-for='friend in friends' :key='friend[".key"]' :ukey='friend[".value"]' :fKey='friend[".key"]'/>
          </div>
      </div>
      <div v-if='$store.state.ukey==$route.params.key' class="requested-friends">
          <h5 @click='frqedSlide'><div>Friend Requested Sent <span style='fontSize:13px'>({{friendsRequested.length}})</span></div><i class="fas" :class='{"fa-chevron-down":slide.frqed==false,"fa-chevron-up":slide.frqed==true}'></i></h5>
          <div class='list'>
              <friend-com :type='"friendsrequested"' :class='friend[".key"]' v-for='friend in friendsRequested' :key='friend[".key"]' :ukey='friend[".value"]' :fKey='friend[".key"]'/>
          </div>
      </div>
      <div v-if='$store.state.ukey==$route.params.key' class="requesting-friends">
          <h5 @click='frqingSlide'><div>Friend Requesting <span style='fontSize:13px'>({{friendsRequesting.length}})</span></div><i class="fas" :class='{"fa-chevron-down":slide.frqing==false,"fa-chevron-up":slide.frqing==true}'></i></h5>
          <div class='list'>
              <friend-com :type='"friendsrequesting"' :class='friend[".key"]' v-for='friend in friendsRequesting' :key='friend[".key"]' :ukey='friend[".value"]' :fKey='friend[".key"]'/>
          </div>
      </div>
      <div class="following">
          <h5 @click='flingSlide'><div>Following <span style='fontSize:13px'>({{following.length}})</span></div><i class="fas" :class='{"fa-chevron-down":slide.fling==false,"fa-chevron-up":slide.fling==true}'></i></h5>
          <div class='list'>
              <friend-com :type="'following'" :class='follow[".key"]' v-for='follow in following' :key='follow[".key"]' :ukey='follow[".value"]' :fKey='follow[".key"]'/>
          </div>
      </div>
      <div class="followed">
          <h5 @click='fledSlide'><div>Followed <span style='fontSize:13px'>({{followed.length}})</span></div><i class="fas" :class='{"fa-chevron-down":slide.fled==false,"fa-chevron-up":slide.fled==true}'></i></h5>
          <div class='list'>
              <friend-com :type='"followed"' :class='follow[".key"]' v-for='follow in followed' :key='follow[".key"]' :ukey='follow[".value"]' :fKey='follow[".key"]'/>
          </div>
      </div>
  </div>
</template>

<script>
import store from '../../../store/store'
import FriendCom from '../../../components/Friend/FriendCom.vue'
import db from '../../../plugins/firebase'
export default {
  components: { FriendCom },
    data() {
        return {
            following:[],
            followed:[],
            friends:[],
            friendsRequested:[],
            friendsRequesting:[],
            slide: {
                fr:false,
                frqed:false,
                frqing:false,
                fling:false,
                fled:false,
            }
        }
    },
    methods: {
        yfSlide() {
            let list=document.querySelector('#app > div > div.profile-view > div.profile__content > div.container > div.friends-view.container > div.current-friends > div')
            if (this.slide.fr==false) {
                list.style.animation='slide-down .3s forwards'
                this.slide.fr=true
            }
            else if (this.slide.fr==true) {
                list.style.animation='slide-up .3s forwards'
                this.slide.fr=false
            }
        },
        frqedSlide() {
            let list=document.querySelector('#app > div > div.profile-view > div.profile__content > div.container > div.friends-view.container > div.requested-friends > div')
            if (this.slide.frqed==false) {
                list.style.animation='slide-down .3s forwards'
                this.slide.frqed=true
            }
            else if (this.slide.frqed==true) {
                list.style.animation='slide-up .3s forwards'
                this.slide.frqed=false
            }
        },
        frqingSlide() {
            let list=document.querySelector('#app > div > div.profile-view > div.profile__content > div.container > div.friends-view.container > div.requesting-friends > div')
            if (this.slide.frqing==false) {
                list.style.animation='slide-down .3s forwards'
                this.slide.frqing=true
            }
            else if (this.slide.frqing==true) {
                list.style.animation='slide-up .3s forwards'
                this.slide.frqing=false
            }
        },
        flingSlide() {
            let list=document.querySelector('#app > div > div.profile-view > div.profile__content > div.container > div.friends-view.container > div.following > div')
            if (this.slide.fling==false) {
                list.style.animation='slide-down .3s forwards'
                this.slide.fling=true
            }
            else if (this.slide.fling==true) {
                list.style.animation='slide-up .3s forwards'
                this.slide.fling=false
            }
        },
        fledSlide() {
            let list=document.querySelector('#app > div > div.profile-view > div.profile__content > div.container > div.friends-view.container > div.followed > div')
            if (this.slide.fled==false) {
                list.style.animation='slide-down .3s forwards'
                this.slide.fled=true
            }
            else if (this.slide.fled==true) {
                list.style.animation='slide-up .3s forwards'
                this.slide.fled=false
            }
        }
    },
    mounted() {
        this.$rtdbBind('friends',db.ref('usersInformation').child(this.$route.params.key).child('friends').child('isfriend'))
        this.$rtdbBind('friendsRequested',db.ref('usersInformation').child(this.$route.params.key).child('friends').child('friendrequested'))
        this.$rtdbBind('friendsRequesting',db.ref('usersInformation').child(this.$route.params.key).child('friends').child('friendrequesting'))
        this.$rtdbBind('following', db.ref('usersInformation').child(this.$route.params.key).child('follows').child('following'))
        this.$rtdbBind('followed', db.ref('usersInformation').child(this.$route.params.key).child('follows').child('followed'))
    },
    beforeRouteEnter(to,from,next) {
        if (store.state.type=='page') {
            next(false)
        }
        else {
            next()
        }
    }
}
</script>

<style>
div.friends-view.container > div > h5 > i {
    cursor: pointer;
}
div.friends-view.container > div > h5 > i:hover{
    transform: scale(1.3);
}
.friends-view h5 {
  margin: 0;
  padding: unset;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  color:white;
  font-size: 15.5px;
  font-weight: 800;
  background-color:#FB5252;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.friends-view .following,.friends-view .followed ,.friends-view .current-friends,.friends-view .requested-friends,.friends-view .requesting-friends{
    width: 100%;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
    margin:30px 0;
    border-radius: 2px;
}
.friends-view div .list{
    width: 100%;
    height: 0;
    background-color:white;
    opacity: 0;
    visibility: hidden;
    flex-wrap: wrap;
    display: flex;
}
@keyframes slide-down {
    0% {
        height: 0;
        opacity: 0;
        visibility: hidden;
    }
    100% {
        height: auto;
        opacity: 1;
        visibility: visible;
    }
}
@keyframes slide-up {
    0% {
        height: auto;
        visibility: visible;
    }
    100% {
        height: 0;
        visibility: hidden;
    }
}

/*  */
@media only screen and (max-width: 768px) {
    .friends-view h5 {
        font-size: 12px;
        padding:8px;
    }
    .friends-view div .list .friend-com {
        width: 100%;
        height: auto;
        padding: 5px 40px;
    }
}
</style>