<template>
  <div @click="close" class="make-page-form cover">
      <div class="form">
          <h5 style='position:relative;padding:15px;width:100%;color:orangered'>Page Form <i @click='close' class="fas fa-times"></i></h5>
          <span>Page Name:</span>
          <input placeholder="Enter page name..." v-model='pageName' type="text">
          <span>Description:</span>
          <input placeholder="Enter page description..." v-model='pageDes' type="text">
           <span>Page Avatar</span>
          <div @click='uploadAvatarImg' class="page-avatar-img">
              <ion-icon class='icon' v-if=' pageAvatarImg==null || pageAvatarImg==""' style='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)' name="images-outline"></ion-icon>
              <img :src="pageAvatarImg">
          </div>
           <span>Page Cover</span>
          <div @click='uploadCoverImg' class="page-cover-img">
              <ion-icon class='icon' v-if=' pageCoverImg==null || pageCoverImg==""' style='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)' name="images-outline"></ion-icon>
              <img :src="pageCoverImg">
          </div>
          <button @click='createPage' style='width:20%;margin:10px auto' class="btn btn-sm btn-danger">Create</button>
      </div>
  </div>
</template>

<script>
const simpleHash = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return new Uint32Array([hash])[0].toString(36);
};
import firebase from "firebase/app";
import db from '../../plugins/firebase'
import client from '../../plugins/filestack'
export default {
    data() {
        return {
            pageName:'',
            pageDes:'',
            pageAvatarImg:null,
            pageCoverImg:null
        }
    },
    methods:{
        close(e) {
            let mgForm=document.querySelector('#app > div.dash-board > div.home-view > div.make-page-form.cover')
            if (e.target==document.querySelector('#home-view > div.make-page-form.cover.show > div > button')) {
                    mgForm.classList.remove('show')
            }
            if (e.target) {
                if (e.target.parentElement!=document.querySelector('div.make-page-form.cover div.form')&&
                e.target.parentElement!=document.querySelector('div.make-page-form.cover')&&
                e.target!=document.querySelector('div.make-page-form.cover div.form div.page-avatar-img img')&&
                e.target!=document.querySelector('div.make-page-form.cover div.form div.page-avatar-img .icon') &&
                e.target!=document.querySelector('div.make-page-form.cover div.form div.page-cover-img img')&&
                e.target!=document.querySelector('div.make-page-form.cover div.form div.page-cover-img .icon')
                ) {
                    mgForm.classList.remove('show')
                }
            }
        },
        createPage() {
            //console.log(md5("Welcome to DebugPointer.com"))
            
            if (this.pageName==null || this.pageName.trim()=='' ||
                this.pageDes==null || this.pageDes.trim()=='' ||
                this.pageAvatarImg==null || this.pageAvatarImg=='' ||
                this.pageCoverImg==null || this.pageCoverImg==''
            ) {
                this.$bvToast.show('alert-no-change')
                return
            }
            else {
                let newPage= {
                    avatarImg:this.pageAvatarImg,
                    coverImg:this.pageCoverImg,
                    description:this.pageDes,
                    location:'Viet Nam',
                    management:this.$store.state.ukey,
                    registerDate:new Date().toLocaleString(),
                    role:"Page",
                    status:"Offline",
                    type:"page",
                    username:this.pageName
                }
                this.$store.dispatch('loading')
                db.ref('usersInformation').push(newPage).then(res=>{
                    let email=`${res.key}@gmail.com`
                    email=email.toLowerCase()
                    let passwordUnHash=`${new Date().getTime()}${res.key}`
                    let password=simpleHash(passwordUnHash)
                    db.ref('usersInformation').child(res.key).child('email').set(email)
                    //sign up
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                    let newPInUser= {
                        account:{
                            email:email,
                            password:password
                        },
                        name:this.pageName,
                        pageKey:res.key
                    }
                    db.ref('usersInformation').child(this.$store.state.ukey).child('pages').push(newPInUser)
                    let noti={
                        content: `Your page "${this.pageName}" has been created. We had created your page account. Check it in your communities.`,
                        date: new Date().toLocaleString(),
                        time: -(new Date().getTime()),
                        status: "Unseen",
                        type: "page-create",
                        ukey: res.key,
                    }
                    db.ref('usersInformation').child(this.$store.state.ukey).child('notifications').push(noti).then(()=> {
                        this.pageName=''
                        this.pageDes=''
                        this.pageAvatarImg=null
                        this.pageCoverImg=null
                        this.$store.dispatch('unload')
                    })
                })
            }
            
        },
        uploadAvatarImg() {
            const options = {
            accept: ["image/*"],
            maxFiles: 1,
            uploadInBackground: false,
            onUploadDone: (res) => {
                    this.pageAvatarImg=res.filesUploaded[0].url
                },
            };
            client.picker(options).open();
        },
        uploadCoverImg() {
            const options = {
            accept: ["image/*"],
            maxFiles: 1,
            uploadInBackground: false,
            onUploadDone: (res) => {
                    this.pageCoverImg=res.filesUploaded[0].url
                },
            };
            client.picker(options).open();
        }
    }
}
</script>

<style>
.make-page-form div.form {
    background-color:white;
    border-radius: 2px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    width: 400px;
    display: flex;
    flex-direction: column;
    border-top:5px solid salmon;
}
.make-page-form .form h5 i{
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
.make-page-form .form h5 i:hover{
  background-color:rgba(0,0,0,0.2);
}
.make-page-form div.form span{
    padding:7px;
}
.make-page-form div.form input{
    padding:7px;
    outline:none;
    width: 80%;
    margin:0 auto;
    border:none;
    border:1px solid gainsboro;
}
.make-page-form div.form input:focus{
    border-color:orange;
}
.make-page-form div.form .page-avatar-img,.make-page-form div.form .page-cover-img{
    width: 90%;
    margin:10px auto;
    height: 200px;
    border:1px dotted black;
    position: relative;
    font-size: 40px;
    color:grey;
    cursor: pointer;
}
.make-page-form div.form .page-avatar-img img,.make-page-form div.form .page-cover-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
/* */
@media only screen and (max-width: 768px) {
    .make-page-form div.form {
        height: 100vh;
        font-size: 14px;
    }
    .make-page-form div.form span{
        padding:3px;
    }
    .make-page-form div.form .page-avatar-img,.make-page-form div.form .page-cover-img{
        height: 100px;
        width: 50%;
    }
}
</style>