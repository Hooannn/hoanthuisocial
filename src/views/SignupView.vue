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
          :class="{ success: getStatus == null }"
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
        <label for="phone">Phone:</label>
        <input v-model="phone" type="text" id="phone" />
      </div>
      <div class="information">
        <h2><strong style="fontSize: 25px">Information:</strong></h2>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" />
        <label for="password">Date of Birth:</label>
        <input v-model="dob" type="date" id="dob" />
        <div class='gender-status'>
          <div style='width:50%'>
            <label for="gender">Gender:</label>
            <select v-model="gender" id="gender" >
              <option selected value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style='width:50%'>
            <label for="status">Status:</label>
            <select v-model="status" id="status" >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="In a relationship">In a relationship</option>
              <option value="It's complicated">It's complicated</option>
            </select>
          </div>
        </div>
        <label for="location">Location:</label>
          <select v-model="location" id="location" >
            <option v-for='(country,index) in listCountry' :key='index' :value='country'>{{country}}</option>
          </select>
        <button id="signup" @click.prevent="validateSignup" type="submit">
          Sign Up <i class="fas fa-angle-double-right"></i>
        </button>
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
      status:'Single',
      phone:'',
      gender:'Male',
      location:'',
      username:'',
      dob:'',
      listCountry:['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'],
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
      if (this.phone==null || this.phone.trim()=='' || 
          this.gender==null || this.gender.trim()=='' || 
          this.username==null || this.username.trim()=='' || 
          this.dob==null || this.dob.trim()=='' || 
          this.status==null || this.status.trim()=='' ||
          this.location==null || this.location.trim()=='' 
      ) {
        this.errmsgs.push("Please fill in your information.")
      }
      if(this.username.length>15) {
        this.errmsgs.push('Your username is too long.')
      }
      if(this.phone.length>15) {
        this.errmsgs.push('Phone number is too long.')
      }
      if (this.phone.length<6) {
        this.errmsgs.push('Phone number is too short.')
      }
      if (isNaN(parseInt(this.phone))) {
        this.errmsgs.push('Phone number is invalid.')
      }
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
          phone:this.phone,
          username:this.username,
          statusrel:this.status,
          gender:this.gender,
          dob:this.dob,
          location:this.location
        });
        /*
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
        */
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
  min-height: 100vh;
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
  background-color: #fb5252;
  color:white;
}
.signup-page form .account::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: white;
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
  border-bottom: 1px solid white;
  font-size: 17px;
  padding: 10px;
  color:white;
}

/* information */
.signup-page form .information {
  display: flex;
  flex-direction: column;
  padding: 50px;
  position: relative;
  width: 50%;
  background-color: white;
  color:black;
}
.signup-page form .information::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: #fb5252;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
.signup-page form .information select {
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  font-size: 17px;
  padding: 10px;
  color:black;
}
.signup-page form .information .gender-status {
  display: flex;
  justify-content: space-between;
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
  border-bottom: 1px solid black;
  font-size: 17px;
  padding: 10px;
  color:black;
}
.signup-page form .information #signup {
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
.signup-page form .information #signup:hover {
  background-color: rgb(255, 51, 0);
  cursor: pointer;
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
  .signup-page form {
    flex-direction: column;
  }
  .signup-page {
    height: auto;
  }
  .signup-page form .information {
    width: 100%;
  }
  .signup-page form .account{
    width: 100%;
  }
}
</style>
