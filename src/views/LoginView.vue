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
            src="data:image/png;base64,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"
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
