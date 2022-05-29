<template>
<div class='intro-view'>
  <div class="app__introduce">
      <div class="content">
        <h1 style="fontSize: 50px; fontWeight: bolder; ">Join Us</h1>
          <div style='fontStyle:italic' class="carousel">
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
               <h4 style="fontSize: 20px; color: rgba(0, 0, 0, 0.7)">Message</h4>
              <h5 style="fontSize: 15px; color: rgba(0, 0, 0, 0.7)">
                Chat, make a call with your friends and family...
              </h5>
               </div> 
          </div>
        <button @click='$router.push("/sign-up")'>
          <span>Get Started</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </div>
      <div class="nav">
        <div class="nav__control">
          <div @click='$router.push("/login")' class="nav__control--login">
            <span>Login</span>
          </div>
          <div @click='$router.push("/sign-up")' class="nav__control--signup">
            <span>Sign Up</span>
          </div>
        </div>
        <div class="nav__contact">
          <div class="nav__contact--about" @click='$router.push({name:"pre-home"})'>
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
        <h3 style="marginLeft: 20px">Our Active Members</h3>
        <h5
          style="fontSize: 15px; color: rgba(0, 0, 0, 0.5); marginRight: 20px"
        >
          View All...
        </h5>
      </div>
      <!-- <ion-icon @click='previous' class='icon previous' name="chevron-back-outline"></ion-icon>
      <ion-icon @click='next' class='icon next' name="chevron-forward-outline"></ion-icon> -->
      <div v-if='load' class="loader"></div>
      <div v-if='users.length>0' class="users-overview">
          <div v-for='user in users' :key='user[".key"]' class="user">
            <div class="user__avatar"><img :src="user.avatarImg"><i :class='{online:user.status=="Online",offline:user.status=="Offline"}' style='position:absolute;bottom:-2px;right:-2px;fontSize:12px' class="fas fa-circle"></i></div>
            <div class="user__username"><strong>{{user.username}}</strong></div>
            <div class="user__role"><i>{{user.role}}</i></div>
          </div>
      </div>
    </div>
    <footer-com/>
</div>

</template>

<script>
import carousel from 'vue-owl-carousel'
import store from '../store/store'
import FooterCom from '../components/General/FooterCom.vue';
import db from "../plugins/firebase";
export default {
  components: {  FooterCom, carousel },
    data() {
        return {
        users: [],
        slideInterval:null,
        usersInterval:null,
        load:true
      }
    },
    mounted() {
    //carouse text introduce
    this.$rtdbBind('users',db.ref('usersInformation').orderByChild('Last Login').limitToLast(10)).then(()=>{
      this.load=false
    })
    let carouselItem=document.querySelectorAll('#app > div.intro-view > div.app__introduce > div.content > div div')
    setTimeout(()=>{
      carouselItem[2].classList.remove('active')
      carouselItem[0].classList.add('active')
    },0)
    setTimeout(()=>{
      carouselItem[0].classList.remove('active')
      carouselItem[1].classList.add('active')
    },3000)
    setTimeout(()=>{
      carouselItem[1].classList.remove('active')
      carouselItem[2].classList.add('active')
    },6000)
    this.slideInterval=setInterval(()=>{
      setTimeout(()=>{
      carouselItem[2].classList.remove('active')
      carouselItem[0].classList.add('active')
    },0)
    setTimeout(()=>{
      carouselItem[0].classList.remove('active')
      carouselItem[1].classList.add('active')
    },3000)
    setTimeout(()=>{
      carouselItem[1].classList.remove('active')
      carouselItem[2].classList.add('active')
    },6000)
    },9000)
    ///
    /*
    ///
    let wrapper=document.querySelector('#app > div.intro-view > div.app__overview > div.users-overview')
    this.usersInterval=setInterval(()=>{
      setTimeout(()=>{
      var interval=setInterval(()=>{
        wrapper.scrollLeft = wrapper.scrollLeft + 1
        if (wrapper.scrollLeft*3.4>=wrapper.scrollWidth) {
          wrapper.scrollLeft=0
        }
      },5)
      setTimeout(()=>{
        clearInterval(interval)
      },1000)
    },1500)
    },2000)
    */
    },
    
  methods: {
    next() {
      clearInterval(this.usersInterval)
      let wrapper=document.querySelector('#app > div.intro-view > div.app__overview > div.users-overview')
      wrapper.scrollLeft = wrapper.scrollLeft + 100
    },
    previous() {
      clearInterval(this.usersInterval)
      let wrapper=document.querySelector('#app > div.intro-view > div.app__overview > div.users-overview')
      wrapper.scrollLeft = wrapper.scrollLeft - 100
    },
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.user != null) {
      next({ name: "dhome" });
    } else next();
  },
 detroyed() {
   clearInterval(this.slideInterval)
   clearInterval(this.usersInterval)
 }
}
</script>

<style>
#app .intro-view {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
#app .intro-view .app__introduce {
  width: 100%;
  height: 60%;
  position: relative;
  background: url("https://idgadvertising.com/wp-content/uploads/2020/09/iStock-1199773764-scaled.jpg")
    no-repeat center/cover;
}
.intro-view .app__introduce .content {
  position: absolute;
  top: 40%;
  left: 4%;
  transform: translateY(-50%);
}
.intro-view .app__introduce .content .carousel{
  display: flex;
  position: relative;
  height: 100px;
}
.intro-view .app__introduce .content .carousel div{
  position: absolute;
  opacity: 0;
  visibility: hidden;
  transform: translate(100%);
}
.intro-view .app__introduce .content .carousel div.active{
  opacity: 1;
  visibility: visible;
  transform:translate(0);
  transition:all 1s ease-in-out;
}
.intro-view .app__introduce .content button {
  font-family: "Poppins", sans-serif;
  border: none;
  outline: none;
  padding: 10px;
  background-color: transparent;
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
}
.intro-view .app__introduce .content button * {
  transition: all 0.2s ease-in-out;
}
.intro-view .app__introduce .content button *:not(span) {
  margin-left: 3px;
}
.intro-view .app__introduce .content button:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
}
.intro-view .app__introduce .content button:hover > * {
  transform: translateX(2px);
}
#app .intro-view .app__introduce .nav {
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  height: 5%;
  background: transparent;
  color: black;
}
.nav__control,
.nav__contact {
  display: flex;
  height: 100%;
  align-items: center;
}
.nav__control span,
.nav__contact span {
  margin: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav__control {
  position: absolute;
  right: 10px;
}
.nav__contact {
  position: absolute;
  left: 10px;
}
.nav__contact--contact > span,
.nav__contact--about > span {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav__control--login,
.nav__control--signup {
  border: 2px solid rgba(0, 0, 0, 0.3);
  padding: 5px;
  border-radius: 4px;
  margin: 0 5px;
  width: 103px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}
.nav__control--login:hover,
.nav__control--signup:hover {
  background-color: rgba(255, 255, 255, 0.5);
  border-color: black;
  cursor: pointer;
}
.nav__contact--about,
.nav__contact--help,
.nav__contact--contact {
 transition: all 0.1s ease-in-out;
}
.nav__contact--about:hover,
.nav__contact--help:hover,
.nav__contact--contact:hover {
  font-weight: bolder;
  cursor: pointer;
}
#app .intro-view .app__overview .loader {
  width: 40px;
  height: 40px;
  border:10px solid rgb(230, 227, 227);
  border-top-color:var(--cyan);
  border-radius: 50%;
  animation: spin3 .5s linear infinite;
  margin:0 auto;
}
#app .intro-view .app__overview {
  margin-top: 20px;
  width: 95%;
  height: 30%;
  overflow: hidden;
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  position: relative;
}
.app__overview .header h3 {
  font-size: 18px;
}
.app__overview .header {
  padding: 10px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.app__overview .header h5:hover {
  font-style: italic;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.app__overview .header h5 {
  transition:all 0.2s ease-in-out;
}
.app__overview .users-overview{
  padding:0 150px;
  user-select: none;
  overflow:hidden;
  width: 100%;
  max-width: 100%;
  max-height: 75%;
  height: 75%;
  display:flex;
  flex-wrap: wrap;
  overflow-y:auto ;
  align-items: center;
  position: relative;
}
.app__overview .icon{
  position: absolute;
  font-size: 30px;
  border:1px solid rgba(0, 0, 0, 0.1);
  color:grey;
  transition:.2s;
  z-index: 10;
  top:50%;
  transform: translateY(-50%);
}
.app__overview .icon:hover{
  cursor: pointer;
  background-color:rgba(0, 0, 0, 0.1);
}
.icon.next {
  right: 0;
}
.icon.previous {
  left:0;
}
.app__overview .users-overview .user{
  width: 20%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color:white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  transition:all .2s ease-in-out;
  border-radius: 3px;
}
.app__overview .users-overview .user:hover{
  cursor: pointer;
  transform:scale(0.95);
}
.user .user__avatar{
  width: 30px;
  height: 30px;
  position: relative;
  border-radius: 50%;
  border:2px solid rgba(0, 0, 0, 0.3);
}
.user .user__username{
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user .user__role {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user .user__avatar i.online{
  color:green;
}
.user .user__avatar i.offline{
  color:grey;
}
.user .user__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
   .nav__control {
     display: unset;
     font-size: 13px;
   }
   .nav__contact span {
     font-size: 13px;
     margin:auto 5px;
   }
   .app__overview .users-overview {
     padding:0 25px;
   }
    .app__overview .users-overview .user {
      height: 35%;
      font-size: 10px;
    }
    #app .intro-view {
      width: 100vw;
      max-width: 100vw;
      max-height: 100vh;
    } 
    .app__overview .header {
      padding:5px;
    }
    .app__overview .header h3 {
      font-size: 15px;
    }
}
@media only screen and (max-width: 300px) {
    .nav__control--login,
    .nav__control--signup {
      width: 70px;
      margin:0;
    } 
}
</style>