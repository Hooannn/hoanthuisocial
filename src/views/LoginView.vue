<template>
  <div class="login-page">
    <form>
      <span onMouseOver='this.style.color="orange"' onMouseOut='this.style.color="unset"' class='center' @click='$router.push("/home")' style='transition:.2s linear;width:150px;cursor:pointer'><ion-icon style='marginRight:5px' name="return-down-back-outline"></ion-icon> Back to Home</span>
      <h2><strong style='fontSize:25px'>Sign In</strong></h2>
      <div class="result" :class="{ success: getStatus }" v-if="getMessage">
        {{ getMessage }}<i @click="setMessage(null)" class="fas fa-times"></i>
      </div>
      <ul v-if="this.errmsgs.length" class="err-notice">
        <li v-for="(err, index) in errmsgs" :key="index">
          <strong>{{ err }}</strong>
        </li>
        <i @click="resetErrMsgs" class="fas fa-times"></i>
      </ul>
      <label for="email">Email address:</label>
      <input placeholder="Enter your email" v-model="email" type="email" id="email" />
      <label for="password">Password:</label>
      <input placeholder="Enter your password" v-model="password" type="password" id="password" />
      <button id="login" @click.prevent="validateLogin" type="submit">
        Login <i class="fas fa-angle-double-right"></i>
      </button>
      <a class='center' style='cursor:pointer;color:var(--cyan);width:150px' onMouseOver='this.style.fontWeight="bold"' onMouseOut='this.style.fontWeight="unset"' @click="$router.push({name:'forgot-password'})">Forgot password ?</a>
      <div id="more-authencation">
        <div @click="loginwGG" id="loginwFB">
          <img
            src="https://imgkub.com/images/2022/04/06/google-removebg-preview.png"
          />Sign in with Google
        </div>
        <div @click="loginwFB" id="loginwGG">
          <img
            src="https://image.similarpng.com/very-thumbnail/2021/01/Facebook-icon-with-flat-design-on-transparent-background-PNG.png"
          />Sign in with Facebook
        </div>
      </div>
    </form>
    <div id="to-new-account">
        <h3>Don't have an account?</h3>
        <span @click="$router.push('/sign-up')">Sign up here</span>
      </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import store from "./../store/store";
import db from "./../plugins/firebase";
import logo from "./../assets/images/logo.png"
import { mapActions, mapGetters } from "vuex";
import router from "./../router/router";
export default {
  data() {
    return {
      email: "",
      password: "",
      errmsgs: [],
      logo:logo,
      users:[],
    };
  },
  computed: {
    ...mapGetters(["getStatus", "getMessage"]),
  },
  methods: {
    ...mapActions(["login", "setMessage"]),
    loginwFB() {
      //authencation with fb
      this.resetErrMsgs()
      this.$store.dispatch('loading')
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
        console.log(result)      
        this.$store.dispatch('unload')
      }).catch((error) => {
        this.errmsgs.push(error.message)
        console.log(error)
        this.$store.dispatch('unload')
      });
    },
    loginwGG() {
      //authencation with gg
      this.resetErrMsgs()
      this.$store.dispatch('loading')
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
          console.log(result)
          // check if this email is exist
          let isExist=false
          this.users.forEach(user => {
            if (user.email==result.user.email) {
              this.$store.commit("SET_USER", result.user);
              this.$store.commit("SET_ROLE", user.role);
              this.$store.commit("SET_UKEY", user[".key"]);
              this.$store.commit("SET_AVATAR", user.avatarImg);
              this.$store.commit("SET_USERNAME", user.username);
              this.$store.commit("SET_DOB", user.dob);
              this.$store.commit("SET_USERSTATUS", user.status);
              this.$store.commit("SET_COVER", user.coverImg);
              this.$store.commit("SET_LOCATION", user.location);
              this.$store.state.type=user.type
              this.$store.state.credit=user.credit
              isExist=true
            }
          });
          if (isExist) {
            setTimeout(function(){
              router.push({name:'dhome'})
            },100)
          }
          else if (!isExist) {
            // if this email not exist => make a new account
            let newAccount={
              "Last Login":new Date().getTime(),
              avatarImg:result.user.photoURL,
              call:"free",
              coverImg:'https://wallpaperaccess.com/full/99810.jpg',
              credit:0,
              description:`Hi I'm ${result.user.displayName}`,
              email:result.user.email,
              gender:"Other",
              phone:result.user.phoneNumber,
              registerDate:new Date().toLocaleDateString(),
              role:"Member",
              status:"Offline",
              statusrel:"Single",
              type:"user",
              username:result.user.displayName
            }
            db.ref('usersInformation').push(newAccount).then(res=>{
              this.$store.commit("SET_USER", result.user);
              this.$store.commit("SET_ROLE", newAccount.role);
              this.$store.commit("SET_UKEY", res.key);
              this.$store.commit("SET_AVATAR", newAccount.avatarImg);
              this.$store.commit("SET_USERNAME", newAccount.username);
              this.$store.commit("SET_COVER", newAccount.coverImg);
              this.$store.commit("SET_USERSTATUS", newAccount.status);
              this.$store.state.type=newAccount.type
              this.$store.state.credit=newAccount.credit
              this.$store.dispatch('unload')
              setTimeout(function(){
                router.push({name:'dhome'})
              },100)
            }).catch(err=>{
              console.log(err)
              this.$store.dispatch('unload')
            })
          }
        }).catch((error) => {
          this.errmsgs.push(error.message)
          this.$store.dispatch('unload')
      });
    },
    resetErrMsgs() {
      this.errmsgs = [];
    },
    validateLogin() {
      this.resetErrMsgs();
      if (1===5) {
        this.errmsgs.push("This account has been logined already !");
      } else {
        if (!this.email) {
          this.errmsgs.push("E-mail cannot be empty.");
        }
        if (/.+@.+/.test(this.email) != true) {
          this.errmsgs.push("E-mail must be valid.");
        }
        if (!this.password) {
          this.errmsgs.push("Password cannot be empty.");
        }
        if (/.{6,}/.test(this.password) != true) {
          this.errmsgs.push("Password must be at least 6 characters long.");
        }
        if (this.errmsgs.length <= 0) {
          this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
          //this.login({ email: this.email, password: this.password });
          this.email = null;
          this.password = null;
          /*
          setTimeout(function () {
            router.push({name:"dhome"});
          }, 1500);
          */
        }
      }
    },
  },
  
  mounted() {
    this.$store.dispatch('loading')
    this.$rtdbBind('users',db.ref('usersInformation')).then(()=>{
      this.$store.dispatch('unload')
    }).catch(err=>{
      alert(err)
      this.$store.dispatch('unload')
    })
  },
  
  beforeRouteEnter(to, from, next) {
    if (store.state.user != null) {
      next({ name: "dhome" });
    } else next();
  },
};
</script>

<style>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color:rgba(119, 107, 107, 0.2);
}
.login-page div.result {
  color: white;
  background-color: red;
  border-radius: 15px;
  padding: 20px;
  position: relative;
}
.login-page div.result > i {
  position: absolute;
  right: 20px;
  top: 5px;
  transition: 0.2s;
}
.login-page div.result > i:hover {
  transform: scale(0.9);
  cursor: pointer;
}
.login-page div.success {
  background-color: green;
}
.login-page form {
  display: flex;
  height: auto;
  flex-direction: column;
  width: 80%;
  padding: 50px;
  background-color: whitesmoke;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  position: relative;
}
.login-page form * {
  margin: 5px 0;
}
.login-page form label {
  font-size: 16px;
}
.login-page form input {
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  font-size: 17px;
  padding: 10px;
}
.login-page form input:focus {
  border-color: orange;
}
.login-page form #login {
  outline: none;
  border: none;
  background-color: #FB5252;
  font-size: 16px;
  padding: 10px;
  width:100%;
  border-radius: 5px;
  color: white;
  transition: 0.2s;
  margin: 0 auto;
  margin-top: 20px;
}
.login-page form #login:hover {
  background-color: rgb(255, 51, 0);
  cursor: pointer;
}
#more-authencation {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#more-authencation div {
  width: 30%;
  padding: 10px;
  background-color: rgba(245, 245, 245, 0.8);
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  overflow: hidden;
  word-break: normal;
}
#more-authencation div:hover {
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
#more-authencation div img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.err-notice {
  background-color: orangered;
  color: white;
  margin: 0;
  padding: 20px;
  position: relative;
}
.err-notice > i {
  position: absolute;
  right: 20px;
  top: 5px;
  transition: 0.2s;
}
.err-notice > i:hover {
  transform: scale(0.9);
  cursor: pointer;
}
#to-new-account {
  margin-top:15px;
  width: 100%;
  text-align: center;
}
#to-new-account h3{
  font-size: 18px;
}
#to-new-account span {
  cursor: pointer;
  color: blue;
  font-weight: bolder;
  font-size: 15px;
}
#to-new-account span:hover {
  border-bottom: 1px solid blue;
}
@media only screen and (max-width: 768px) {
  #more-authencation {
    display: block;
  }
  #more-authencation div {
    width: 100%;
    font-size: 14px;
  }
  .login-page {
    max-width: 100vw;
    max-height: 100vh;
  }
  .login-page form{
    padding:20px;
  }
  .login-page form .logo {
    display: none;
  }
}
</style>
