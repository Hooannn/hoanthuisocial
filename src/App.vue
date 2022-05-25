<template>
  <div id="app" >
    <coming-call/>
    <theme-modal />
    <image-review/>
    <loading-view/>
    <toastes-container/>
    <!--
    <div class="app__introduce">
      <div class="content">
        <h1 style="fontSize: 50px; fontWeight: bolder">Join Us</h1>
          <div class="carousel">
            <div class='active'>
              <h4 style="fontSize: 20px; color: rgba(0, 0, 0, 0.7)">
                Fast and easy
              </h4>
              <h5 style="fontSize: 15px; color: rgba(0, 0, 0, 0.7)">
                Connect to the whole world...
              </h5>
            </div>
            <div>
              <h4 style="fontSize: 20px; color: rgba(0, 0, 0, 0.7)">
                Social Network
              </h4>
              <h5 style="fontSize: 15px; color: rgba(0, 0, 0, 0.7)">
                Share your experience...
              </h5>
            </div>
             <div>
               <h4 style="fontSize: 20px; color: rgba(0, 0, 0, 0.7)">Market</h4>
              <h5 style="fontSize: 15px; color: rgba(0, 0, 0, 0.7)">
                Sell and buy anything with our real-time bidding...
              </h5>
               </div> 
          </div>
        <button>
          <span>Get Started</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </div>
      <div class="nav">
        <div class="nav__control">
          <div class="nav__control--login" to="/login">
            <span>Login</span>
          </div>
          <div class="nav__control--signup" to="/sign-up">
            <span>Sign Up</span>
          </div>
        </div>
        <div class="nav__contact">
          <div class="nav__contact--about" to="#">
            <span
              ><ion-icon
                style="marginRight: 5px"
                name="chevron-down-outline"
              ></ion-icon>
              About</span
            >
          </div>
          <div class="nav__contact--help" to="#">
            <span>Help</span>
          </div>
          <div class="nav__contact--contact" to="#">
            <span
              ><ion-icon
                style="marginRight: 5px"
                name="call-outline"
              ></ion-icon>
              Contact</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="app__overview">
      <div class="header">
        <h3 style="fontSize: 18px; marginLeft: 20px">Our Active Members</h3>
        <h5
          style="fontSize: 15px; color: rgba(0, 0, 0, 0.5); marginRight: 20px"
        >
          View All...
        </h5>
      </div>
      <ion-icon @click='previous' class='icon previous' name="chevron-back-outline"></ion-icon>
      <ion-icon @click='next' class='icon next' name="chevron-forward-outline"></ion-icon>
      <div class="users-overview">
        
        <div v-for='user in users' :key='user[".key"]' class="user">
          <div class="user__avatar"><img :src="user.avatarImg"><i :class='{online:user.status=="Online",offline:user.status=="Offline"}' style='position:absolute;bottom:-2px;right:-2px;fontSize:12px' class="fas fa-circle"></i></div>
          <div class="user__username"><strong>{{user.username}}</strong></div>
          <div class="user__role"><i>{{user.role}}</i></div>
        </div>
        
      </div>
    </div>
    <footer-com/>
    
    -->
    <router-view> </router-view>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
import ToastesContainer from './components/General/ToastesContainer.vue';
import ComingCall from './components/Modal/ComingCall.vue';
import ImageReview from './components/Modal/ImageReview.vue';
import ThemeModal from './components/Modal/ThemeModal.vue';
import LoadingView from './views/LoadingView.vue';
export default {
  components: { ToastesContainer, LoadingView, ImageReview, ThemeModal, ComingCall },
  firebase:{
    call:db.ref('call')
  },
  data() {
    return {
      call:[],
    }
  },
  watch: {
    call() {
      this.call.forEach(c => {
        if (c.contact==this.$store.state.ukey) {
          console.log('Some one is calling')
          this.$store.state.callComing=c
          db.ref('usersInformation').child(this.$store.state.ukey).child('call').set('oncall')
          setTimeout(function() {
            document.querySelector('#app div.coming-call-modal').classList.add('show')
          },100)
        }
      });
    },
    '$store.state.apptheme'() {
      document.body.style.background=this.$store.state.apptheme.bgColor
      document.body.style.color=this.$store.state.apptheme.color
    }
  },
  mounted() {
    let account = JSON.parse(sessionStorage.getItem("account"));
    let role = sessionStorage.getItem("role");
    let ukey = sessionStorage.getItem("ukey");
    let username = sessionStorage.getItem("username");
    let avatar = sessionStorage.getItem("avatar");
    let dob = sessionStorage.getItem("dob");
    let status = sessionStorage.getItem("status");
    let cover = sessionStorage.getItem("cover");
    let location = sessionStorage.getItem("location");
    let type = sessionStorage.getItem("type");
    let credit = sessionStorage.getItem("credit");
    this.$store.dispatch("setUsername", username);
    this.$store.dispatch("setUser", account);
    this.$store.dispatch("setRole", role);
    this.$store.dispatch("setUkey", ukey);
    this.$store.dispatch("setAvatar", avatar);
    this.$store.dispatch("setStatus", status);
    this.$store.dispatch("setDob", dob);
    this.$store.dispatch("setCover", cover);
    this.$store.dispatch("setLocation", location);
    this.$store.state.type=type
    this.$store.state.credit=credit
    if (this.$store.state.user == null) {
      this.$router.push("/home");
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Poppins:wght@200&display=swap");

.container {
  padding: 0;
}
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar
{
	width: 8px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	background-color: #313131;
}
::-webkit-scrollbar-thumb:hover {
  background-color:rgb(49, 49, 49,0.8);
}
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  height: auto;
  box-sizing: content-box;
  position: relative;
  font-family: "Poppins", sans-serif;
  user-select: none;
  overflow-x:hidden;
  transition:all .2s linear;
}
body > div.nanobar .bar {
  background:orange;
}
.modal-backdrop {
  background-color:rgba(0,0,0,0.4);
}
#app {
  width: 100vw;
  min-height: 100vh;
  height: auto;
  position: relative;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
a {
  text-decoration: none;
  color: unset;
}
/*  */
@media only screen and (max-width: 768px) {
  body {
    max-width: 100vw;
    height: auto;
  }
  #app {
    max-width: 100vw;
    height: auto;
  }
}
</style>
