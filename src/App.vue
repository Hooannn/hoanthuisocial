<template>
  <div id="app">
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
import ToastesContainer from './components/General/ToastesContainer.vue';
export default {
  components: { ToastesContainer },
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
    this.$store.dispatch("setUsername", username);
    this.$store.dispatch("setUser", account);
    this.$store.dispatch("setRole", role);
    this.$store.dispatch("setUkey", ukey);
    this.$store.dispatch("setAvatar", avatar);
    this.$store.dispatch("setStatus", status);
    this.$store.dispatch("setDob", dob);
    this.$store.dispatch("setCover", cover);
    this.$store.dispatch("setLocation", location);
    
    if (this.$store.state.user != null) {
      this.$router.push({ name: "dhome" });
    } else if (this.$store.state.user == null) {
      this.$router.push("/home");
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Poppins:wght@200&display=swap");
::-webkit-scrollbar {
  display: none;
}
.container {
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: content-box;
  position: relative;
  font-family: "Poppins", sans-serif;
  user-select: none;
  background-color: rgba(229, 240, 248, 0.904);
}
#app {
  width: 100vw;
  height: 100vh;
  position: relative;
}
a {
  text-decoration: none;
  color: unset;
}
</style>
