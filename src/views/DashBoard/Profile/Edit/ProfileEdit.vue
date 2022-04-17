<template>
  <div class="profile-edit">
      <h5>Profile</h5>
      <div style='padding:20px' class="avatar">
          <div style='fontSize:16px;fontWeight:900;margin:10px 0'>Avatar</div>
          <div style='width:100px;height:100px;borderRadius:50%;overflow:hidden' class="current-avatar">
              <img style='width:100%;objectFit:contain' :src="user.avatarImg">
          </div>
          <div style='fontSize:14px;margin:10px 0'>Upload a new avatar.</div>
          <button @click='changeAvatar' class="btn btn-dark btn-sm">Choose File</button>
      </div>
      <div style='padding:20px' class="background">
          <div style='fontSize:16px;fontWeight:900;margin:10px 0'>Background</div>
          <div style='width:100%;overflow:hidden' class="current-background">
              <img style='width:100%;objectFit:contain' :src="user.coverImg">
          </div>
          <div style='fontSize:14px;margin:10px 0'>Upload a new background.</div>
          <button @click='changeBackground' class="btn btn-dark btn-sm">Choose File</button>
      </div>
      <button @click='saveChanges' class="btn btn-danger btn-sm" style='color:white;width:90px;margin:20px'>Save</button>
  </div>    
</template>

<script>
import db from '../../../../plugins/firebase'
import client from '../../../../plugins/filestack'
export default {
    data() {
        return {
            user: {

            },
            newAvatar:null,
            newBackground:null,
        }
    },
    methods: {
        changeAvatar() {
            const options = {
            accept: ["image/*"],
            maxFiles: 1,
            uploadInBackground: false,
            onUploadDone: (res) => {
            this.newAvatar = res.filesUploaded[0].url;
            this.user.avatarImg=this.newAvatar
            }
            }
            client.picker(options).open();
        },
        changeBackground() {
            const options = {
            accept: ["image/*"],
            maxFiles: 1,
            uploadInBackground: false,
            onUploadDone: (res) => {
            this.newBackground = res.filesUploaded[0].url;
            this.user.coverImg=this.newBackground
            }
            }
            client.picker(options).open();
        },
        saveChanges() {
            if (this.newAvatar!=null || this.newBackground!=null) {
                if (this.newAvatar!=null) {
                    this.$store.dispatch('loading')
                    db.ref('usersInformation').child(this.$store.state.ukey).child('avatarImg').set(this.newAvatar)
                    .then(()=> {
                        this.$store.dispatch('unload')
                        this.$store.dispatch('setAvatar',this.newAvatar)
                    })
                }
                if (this.newBackground!=null) {
                    this.$store.dispatch('loading')
                    db.ref('usersInformation').child(this.$store.state.ukey).child('coverImg').set(this.newBackground)
                    .then(()=> {
                        this.$store.dispatch('unload')
                        this.$store.dispatch('setCover',this.newBackground)
                    })
                }
                this.$router.push({name:'about',params:{key:this.$store.state.ukey}})
                this.$bvToast.show('edit')
            }   
            else {
                this.$bvToast.show('alert-no-change')
                return
            }
        }
    },
    mounted() {
        this.$rtdbBind('user',db.ref('usersInformation').child(this.$store.state.ukey))
    }
}
</script>

<style>
.profile-edit {
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
.profile-edit h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
</style>