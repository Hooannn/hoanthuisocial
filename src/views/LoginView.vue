<template>
  <div class="login-page">
    <form>
      <div style='position:absolute;width:250px;height:250px;top:-60px;right:80px;' class="logo"><img style='width:100%;height:100%;objectFit:cover' :src="logo"></div>
      <span @click='$router.push("/home")' style='display:flex;alignsItem:center;cursor:pointer'><ion-icon style='marginRight:5px' name="return-down-back-outline"></ion-icon> Back to Home</span>
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
      <input v-model="email" type="email" id="email" />
      <label for="password">Password:</label>
      <input v-model="password" type="password" id="password" />
      <button id="login" @click.prevent="validateLogin" type="submit">
        Login <i class="fas fa-angle-double-right"></i>
      </button>
      <a @click="forgotPassword">Forgot password ?</a>
      <div id="more-authencation">
        <div @click="loginwFB" id="loginwFB">
          <img
            src="https://imgkub.com/images/2022/04/06/google-removebg-preview.png"
          />Sign in with Google
        </div>
        <div @click="loginwGG" id="loginwGG">
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
      usersOnline: [],
      isLogin: false,
      logo:logo
    };
  },
  computed: {
    ...mapGetters(["getStatus", "getMessage"]),
  },
  methods: {
    ...mapActions(["login", "setMessage"]),
    forgotPassword() {
      //forgot password handling
      store.dispatch("warning", "Sorry! This gonna be updated soon");
    },
    loginwFB() {
      //authencation with fb
      store.dispatch("warning", "Sorry! This gonna be updated soon");
    },
    loginwGG() {
      //authencation with gg
      store.dispatch("warning", "Sorry! This gonna be updated soon");
    },
    resetErrMsgs() {
      this.errmsgs = [];
    },
    checkIsLogin() {
      this.isLogin = false;
      this.usersOnline.forEach((user) => {
        if (user.email == this.email) {
          this.isLogin = true;
        }
      });
    },
    validateLogin() {
      this.resetErrMsgs();
      this.checkIsLogin();
      if (this.isLogin) {
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
          setTimeout(function () {
            router.push("/");
          }, 1500);
        }
      }
    },
  },
  /*
  mounted() {
    db.ref("usersOnline")
      .get()
      .then((res) => {
        let resVal = res.val();
        this.usersOnline = Object.keys(resVal).map((key) => ({
          key: key,
          email: resVal[key].email,
        }));
      })
      .catch((err) => console.log(err));
  },
  */
  beforeRouteEnter(to, from, next) {
    if (store.state.user != null) {
      next({ path: "/" });
    } else next();
  },
};
</script>

<style>
a:hover {
  font-weight: 900;
  cursor: pointer;
}
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(229, 240, 248, 0.904);
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
.login-page form #login {
  outline: none;
  border: none;
  background-color: red;
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
  background-color: rgba(85, 3, 3, 0.8);
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
  .login-page form .logo {
    top:unset;
    left:50%;
    transform: translate(-50%,-15%);
  }
  .login-page form .logo img{
    transform: scale(0.6);
  }
}
</style>
