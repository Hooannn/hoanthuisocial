<template>
  <div class="deactivate-account">
      <h5>Deactivate Account</h5>
      <div style='padding:30px'>
          <span style='color:red' >{{err}}</span>
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Email</div>
          <input v-model='inputEmail' style='padding:5px;width:300px' type="email" placeholder="Enter Email Address">
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Password</div>
          <input v-model='inputPassword' style='padding:5px;width:300px' type="password" placeholder="Enter Password">
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Description Here</div>
          <textarea style='padding:5px;width:100%;min-height:100px;' placeholder="Description"/>
      </div>
      <button style='width:100px;color:white;fontWeight:800;marginLeft:30px;marginBottom:30px' @click='deactivateAccountConfirm' class="btn btn-danger btn-sm">Deactivate</button>
  </div>
</template>

<script>
import db from '../../../../plugins/firebase'
import firebase from "firebase/app";
export default {
    data() {
        return {
            user:{},
            curEmail:'',
            curPassword:'',
            inputEmail:'',
            inputPassword:'',
            err:'',
        }
    },
    methods: {
        deactivateAccountConfirm() {
            if (this.inputEmail!=this.curEmail[".value"]||this.inputPassword!=this.curPassword[".value"]) {
                this.err='Your email or password is not correct.'
            }
            else if (this.inputEmail==this.curEmail[".value"] && this.inputPassword==this.curPassword[".value"]) {
                this.$bvModal.msgBoxConfirm('You will be logged out and your account will be deactivated ? Are you sure ?',{
                    title: 'Please Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Confirm',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        this.deactivateAccount()
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
            }
        },
        deactivateAccount() {
            this.$store.dispatch('loading')
            let curUser=firebase.auth().currentUser;
            curUser.delete().then(()=>{
                db.ref('deactivatedUsers').push(this.user)
                db.ref('usersInformation').child(this.$store.state.ukey).set({
                    username:"Unknown",
                    description:'This user was deactivated or banned.',
                    avatarImg:'https://icon-library.com/images/blocked-icon/blocked-icon-9.jpg',
                    coverImg:'https://wallpaperaccess.com/full/2141.jpg',
                    dob:'Unknown',
                    gender:'Unknown',
                    location:"Unknown",
                    password:'',
                    albums:'',
                    email:'Unknown',
                    phone:'Unknown',
                    registerDate:'None',
                    socialAccounts:'',
                    status:'None',
                    statusrel:'Unknown',
                })
                this.$store.dispatch('logOut').then(()=>{
                    this.$store.dispatch('unload')
                })
            }).catch(err=>{
                this.err=err
                this.$store.dispatch('unload')
            })
        }
    },
    watch: {
        inputEmail(e) {
            if (e!='') {
                this.err=''
            }
        },
        inputPassword(e) {
            if (e!='') {
                this.err=''
            }
        }
    },
    mounted() {
        this.$rtdbBind('user',db.ref('usersInformation').child(this.$store.state.ukey))
        this.$rtdbBind('curEmail',db.ref('usersInformation').child(this.$store.state.ukey).child('email'))
        this.$rtdbBind('curPassword',db.ref('usersInformation').child(this.$store.state.ukey).child('password'))
    }
}
</script>

<style>
.deactivate-account {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color: white;
}
.deactivate-account h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
</style>