<template>
  <div class="change-password">
      <h5>Change Password</h5>
      <div style='padding:30px'>
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Old Password</div>
          <input v-model='oldPassword' style='padding:5px;width:300px' type="password" placeholder="Enter Old Password"><br>
          <span style='color:red;fontSize:12px'>{{error.msg1}}</span>
          <div style='padding:5px;fontSize:15px;fontWeight:700'>New Password</div>
          <input v-model='newPassword' style='padding:5px;width:300px' type="password" placeholder="Enter New Password"><br>
          <span style='color:red;fontSize:12px'>{{error.msg2}}</span>
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Confirm New Password</div>
          <input v-model='confirmNewPassword' style='padding:5px;width:300px' type="password" placeholder="Confirm New Password"><br>
          <span style='color:red;fontSize:12px'>{{error.msg3}}</span>
      </div>
      <button style='width:50px;color:white;fontWeight:800;marginLeft:30px;marginBottom:30px' @click='saveChanges' class="btn btn-danger btn-sm">Save</button>
  </div>
</template>

<script>
import db from '../../../../plugins/firebase'
import firebase from "firebase/app";
export default {
    data() {
        return {
            currentPassword:'',
            oldPassword:'',
            newPassword:'',
            confirmNewPassword:'',
            error: {
                msg1:'',
                msg2:'',
                msg3:'',
            },
        }
    },
    methods: {
        saveChanges() {
            this.error={
                msg1:'',
                msg2:'',
                msg3:''
            }
            let user=firebase.auth().currentUser;
            if (this.validatePassword()) {
                this.$store.dispatch('loading')
                user.updatePassword(this.newPassword).then(() => {
                    db.ref('usersInformation').child(this.$store.state.ukey).child('password').set(this.newPassword).then(()=>{
                        this.$store.dispatch('unload')
                        this.$bvToast.show('edit')
                    })
                    this.reset()
                }).catch((error) => {
                    this.reset()
                    this.error.msg2=error
                    this.$store.dispatch('unload')
                    
                })
            }
            else {
                this.$bvToast.show('alert-no-change')
                return
            }
            
        },
        validatePassword() {
            if (this.oldPassword!=this.currentPassword['.value']) {
                //old password isn't match
                return false
            }
            if (this.newPassword!=this.confirmNewPassword) {
                //confirm password isn't match
                return false
            }
            if (this.newPassword==this.currentPassword[".value"]) {
                return false
            }
            else return true
            //validate new password//
        },
        reset() {
            this.oldPassword=''
            this.newPassword=''
            this.confirmNewPassword=''
        }
    },
    watch: {
        oldPassword(e) {
            this.error.msg1=''
            if (e!=this.currentPassword[".value"]&&e!='') {
                this.error.msg1='Your current password is not correct.'
            }
        },
        newPassword(e) {
            if (e!='') {
                this.error.msg2=''
            } 
            if (e==this.currentPassword[".value"] && e!='') {
                this.error.msg2='Your new password is the same as your old password.'
            }
        },
        confirmNewPassword(e) {
            this.error.msg3=''
            if (e!=this.newPassword && e!='') {
                this.error.msg3='Your confirm password does not match.'
            }
        }
    },
    mounted() {
        this.$rtdbBind('currentPassword',db.ref('usersInformation').child(this.$store.state.ukey).child('password'))
    }
}
</script>

<style>
.change-password {
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
.change-password h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
</style>