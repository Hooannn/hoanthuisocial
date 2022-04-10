<template>
  <div class="signup-page">
    <form action="/">
      <div class="account">
        <!--  <div style='position:absolute;width:250px;height:250px;top:-60px;right:80px;' class="logo"><img style='width:100%;height:100%;objectFit:cover' :src="logo"></div> -->
        <span
          @click="$router.push('/home')"
          style="display: flex; alignsItem: center; cursor: pointer"
          ><ion-icon
            style="marginRight: 5px"
            name="return-down-back-outline"
          ></ion-icon>
          Back to Home</span
        >
        <h2><strong style="fontSize: 25px">Account Details:</strong></h2>
        <div
          class="result"
          :class="{ success: getStatus != null }"
          v-if="getMessage"
        >
          {{ getMessage }}<i @click="setMessage(null)" class="fas fa-times"></i>
        </div>
        <ul v-if="this.errmsgs.length" class="err-notice">
          <li v-for="(err, index) in errmsgs" :key="index">
            <strong>{{ err }}</strong>
          </li>
          <i @click="resetErrMsgs" class="fas fa-times"></i>
        </ul>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" />
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" />
        <label for="password">Confirm Password:</label>
        <input
          v-model="passwordConfirm"
          type="password"
          id="password-confirm"
        />
        <button id="signup" @click.prevent="validateSignup" type="submit">
          Sign Up <i class="fas fa-angle-double-right"></i>
        </button>
      </div>
      <div class="information">
        <h2><strong style="fontSize: 25px">Information:</strong></h2>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" />
        <label for="password">Date of Birth:</label>
        <input v-model="dob" type="date" id="dob" />
        <div class='gender-status'>
          <label for="gender">Gender:</label>
          <select v-model="gender" id="gender" >
            <option selected value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label for="status">Status:</label>
          <select v-model="status" id="status" >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="In a relationship">In a relationship</option>
            <option value="It's complicated">It's complicated</option>
          </select>
        </div>
        <label for="location">Location:</label>
          <select v-model="location" id="location" >
            <option value="Viet Nam">Viet Nam</option>
          </select>
      </div>
    </form>
    <div id="to-login">
      <h3>Already has an account?</h3>
      <span @click="$router.push('/login')">Login here</span>
    </div>
  </div>
</template>

<script>
import store from "./../store/store";
import router from "./../router/router";
import logo from "./../assets/images/logo.png";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: null,
      password: null,
      passwordConfirm: null,
      errmsgs: [],
      logo: logo,
    };
  },
  computed: {
    ...mapGetters(["getStatus", "getMessage"]),
  },
  methods: {
    ...mapActions(["signUp", "setMessage", "resetStatus"]),
    resetErrMsgs() {
      this.errmsgs = [];
    },
    validateSignup: function () {
      this.resetErrMsgs();
      if (!this.email) {
        this.errmsgs.push("Email cannot be empty.");
      }
      if (/.+@.+/.test(this.email) != true) {
        this.errmsgs.push("E-mail must be valid.");
      }
      if (!this.password) {
        this.errmsgs.push("Password cannot be empty");
      }
      if (/.{6,}/.test(this.password) != true) {
        this.errmsgs.push("Password must be at least 6 characters long");
      }
      if (!(this.password === this.passwordConfirm)) {
        this.errmsgs.push("Passwords did not match");
      }
      if (this.errmsgs.length <= 0) {
        store.dispatch("signUp", {
          email: this.email,
          password: this.password,
        });
        let newAccount = {
          email: this.email,
          password: this.password,
        };
        //this.signUp({email:this.email,password:this.password})
        setTimeout(function () {
          store.dispatch("login", newAccount);
          setTimeout(function () {
            router.push("/login");
          }, 1000);
        }, 1500);
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.user != null) {
      next({ name: "dhome" });
    } else next();
  },
};
</script>

<style>
a:hover {
  font-weight: 900;
  cursor: pointer;
}
.signup-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color:rgba(119, 107, 107, 0.2);
}
.signup-page div.result {
  color: white;
  background-color: red;
  border-radius: 15px;
  padding: 20px;
  position: relative;
}
.signup-page div.result > i {
  position: absolute;
  right: 20px;
  top: 5px;
  transition: 0.2s;
}
.signup-page div.result > i:hover {
  transform: scale(0.9);
  cursor: pointer;
}
.signup-page div.success {
  background-color: green;
}
.signup-page form {
  width: 80%;
  background-color: whitesmoke;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  display: flex;
}
/* account */
.signup-page form .account {
  display: flex;
  flex-direction: column;
  padding: 50px;
  position: relative;
  width: 50%;
}
.signup-page form .account::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: #fb5252;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
.signup-page form * {
  margin: 5px 0;
}
.signup-page form .account label {
  font-size: 16px;
}
.signup-page form .account input {
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  font-size: 17px;
  padding: 10px;
}
.signup-page form .account #signup {
  outline: none;
  border: none;
  background-color: #fb5252;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  color: white;
  transition: 0.2s;
  margin: 0 auto;
  margin-top: 20px;
}
.signup-page form .account #signup:hover {
  background-color: rgb(255, 51, 0);
  cursor: pointer;
}
/* information */
.signup-page form .information {
  display: flex;
  flex-direction: column;
  padding: 50px;
  position: relative;
  width: 50%;
  background-color: #fb5252;
  color:white;
}
.signup-page form .information::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: white;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
.signup-page form .information select {
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid white;
  font-size: 17px;
  padding: 10px;
  color:white;
}
.signup-page form .information .gender-status {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  overflow: hidden;
}
.signup-page form * {
  margin: 5px 0;
}
.signup-page form .information label {
  font-size: 16px;
}
.signup-page form .information input {
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid white;
  font-size: 17px;
  padding: 10px;
  color:white;
}
/*  */
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
#to-login {
  margin-top: 15px;
  width: 100%;
  text-align: center;
}
#to-login h3 {
  font-size: 18px;
}
#to-login span {
  cursor: pointer;
  color: blue;
  font-weight: bolder;
  font-size: 15px;
}
#to-login span:hover {
  border-bottom: 1px solid blue;
}

@media only screen and (max-width: 768px) {
  /*
  .signup-page form .logo {
    top:unset;
    left:50%;
    transform: translate(-50%,-15%);
  }
  .signup-page form .logo img{
    transform: scale(0.6);
  }
  */
}
</style>
