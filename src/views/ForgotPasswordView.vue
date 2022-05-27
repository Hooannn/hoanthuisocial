<template>
  <div class="forgot-password-view center">
    <form>
      <span onMouseOver='this.style.color="orange"' onMouseOut='this.style.color="unset"' class='center' @click='$router.push("/login")' style='transition:.2s linear;width:150px;cursor:pointer'><ion-icon style='marginRight:5px' name="return-down-back-outline"></ion-icon> Back to Login</span>
      <h2><strong style='fontSize:25px'>Password Reset</strong></h2>
      <span v-if='err' style='color:red;fontWeight:bold;'>{{err}}</span>
      <span v-if='result' style='color:green;fontWeight:bold;'>{{result}}</span>
      <label for="email">Please enter your account email. We will sent you a password reset email.</label>
      <input placeholder="*Email" v-model="email" type="email" id="email" />
      <button @click.prevent='sendEmail' id="forgotpassword">
        Confirm <i class="fas fa-angle-double-right"></i>
      </button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
    data() {
        return {
            result:'',
            err:'',
            email:''
        }
    },
    watch:{
        email(e) {
            if (e.trim()!=''&&e!=null) {
                this.err=''
                this.result=''
            }
        }
    },
    methods:{
        sendEmail() {
            this.$store.dispatch('loading')
            firebase.auth().sendPasswordResetEmail(this.email)
                .then(() => {
                    this.$store.dispatch('unload')
                    this.result='Please check your email. We just have sent you a password reset email'
                })
                .catch((error) => {
                    this.$store.dispatch('unload')
                    this.err = error.message;
                });
            this.email=''
        }
    }
}
</script>

<style>
.forgot-password-view {
    width: 100%;
    background-color:rgba(119, 107, 107, 0.2);
    min-height: 100vh;
}
.forgot-password-view form {
  display: flex;
  height: auto;
  flex-direction: column;
  width: 80%;
  padding: 50px;
  background-color: whitesmoke;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  position: relative;
}
.forgot-password-view form * {
  margin: 5px 0;
}
.forgot-password-view form label {
  font-size: 16px;
}
.forgot-password-view form input {
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  font-size: 17px;
  padding: 10px;
}
.forgot-password-view form input:focus {
  border-color: orange;
}
.forgot-password-view form #forgotpassword {
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
.forgot-password-view form #forgotpassword:hover {
  background-color: rgb(255, 51, 0);
  cursor: pointer;
}
@media only screen and (max-width: 768px) {
  .forgot-password-view {
    max-width: 100vw;
    max-height: 100vh;
  }
  .forgot-password-view form{
    padding:20px;
  }
}
</style>