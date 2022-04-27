<template>
  <div @click="close" class="make-group-form cover">
      <div class="form">
          <h5 style='position:relative;padding:15px;width:100%;color:orangered'>Group Form <i @click='close' class="fas fa-times"></i></h5>
          <span>Groupname:</span>
          <input placeholder="Enter group name..." v-model='groupName' type="text">
          <span>Description:</span>
          <input placeholder="Enter group description..." v-model='groupDes' type="text">
          <span>Group Image</span>
          <div @click='uploadImg' class="grImg">
              <ion-icon class='icon' v-if=' groupImg==null || groupImg==""' style='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)' name="images-outline"></ion-icon>
              <img :src="groupImg">
          </div>
          <button @click='createGroup' style='width:20%;margin:10px auto' class="btn btn-sm btn-danger">Create</button>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
import client from '../../plugins/filestack'
export default {
    data() {
        return {
            groupName:'',
            groupDes:'',
            groupImg:null,
        }
    },
    methods:{
        close(e) {
            let mgForm=document.querySelector('#app > div.dash-board > div.home-view > div.make-group-form.cover')
            if (e.target!=null && e.target!=undefined) {
                if (e.target==document.querySelector('#home-view > div.make-group-form.cover.show > div > button')) {
                    mgForm.classList.remove('show')
                }
                if (e.target.parentElement!=document.querySelector('div.make-group-form.cover div.form')&&
                e.target.parentElement!=document.querySelector('div.make-group-form.cover')&&
                e.target!=document.querySelector('div.make-group-form.cover div.form div.grImg img')&&
                e.target!=document.querySelector('div.make-group-form.cover div.form div.grImg .icon')
                ) {
                    mgForm.classList.remove('show')
                }
            }
        },
        createGroup() {
            if (this.groupName==null || this.groupName.trim()=='' ||
                this.groupDes==null || this.groupDes.trim()=='' ||
                this.groupImg==null || this.groupImg==''
            ) {
                this.$bvToast.show('alert-no-change')
                return
            }
            let newGroup= {
                groupname:this.groupName,
                description:this.groupDes,
                avatarImg:this.groupImg,
                registerDate:new Date().toLocaleString()
            }
            let member={
                key:this.$store.state.ukey,
                role:"staff",
            }
            this.$store.dispatch('loading')
            db.ref('groups').push(newGroup).then((res)=>{
                db.ref('groups').child(res.key).child('key').set(res.key)
                db.ref('groups').child(res.key).child('members').push(member)
                let newGrinUser= {
                    groupKey:res.key,
                    role:'staff',
                }
                db.ref('usersInformation').child(this.$store.state.ukey).child('groups').push(newGrinUser)
                let noti= {
                content: `Your group "${this.groupName}" has been created. You can now add rules in group manage.`,
                date: new Date().toLocaleString(),
                groupKey: res.key,
                time: new Date().getTime(),
                status: "Unseen",
                type: "group-create",
                ukey: res.key,
                }
                db.ref('usersInformation').child(this.$store.state.ukey).child('notifications').push(noti)
                this.groupName=''
                this.groupDes=''
                this.groupImg=null
                this.close()
                this.$store.dispatch('unload')
            }).catch((err)=>{
                this.$store.dispatch('unload')
            })
        },
        uploadImg() {
            const options = {
            accept: ["image/*"],
            maxFiles: 1,
            uploadInBackground: false,
            onUploadDone: (res) => {
                    this.groupImg=res.filesUploaded[0].url
                },
            };
            client.picker(options).open();
        }
    }
}
</script>

<style>
.make-group-form div.form {
    background-color:white;
    border-radius: 2px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    width: 400px;
    display: flex;
    flex-direction: column;
    border-top:5px solid salmon;
}
.make-group-form .form h5 i{
  position: absolute;
  top:0;
  right: 0;
  color:black;
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .1s;
}
.make-group-form .form h5 i:hover{
  background-color:rgba(0,0,0,0.2);
}
.make-group-form div.form span{
    padding:7px;
}
.make-group-form div.form input{
    padding:7px;
    outline:none;
    width: 80%;
    margin:0 auto;
    border:none;
    border:1px solid gainsboro;
}
.make-group-form div.form input:focus{
    border-color:orange;
}
.make-group-form div.form .grImg{
    width: 90%;
    margin:10px auto;
    height: 200px;
    border:1px dotted black;
    position: relative;
    font-size: 40px;
    color:grey;
    cursor: pointer;
}
.make-group-form div.form .grImg img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>