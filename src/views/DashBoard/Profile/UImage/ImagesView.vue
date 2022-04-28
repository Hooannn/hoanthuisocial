<template>
  <div class="images-view">
      <div @click="closeForm" class="create-album-form cover">
        <div class="form">
            <h5 style='position:relative;padding:15px;width:100%'>New Album <i @click='closeForm' class="fas fa-times"></i></h5>
            <span>Album Name:</span>
            <input placeholder="Enter album name..." v-model='albumName' type="text">
                <span>Album cover</span>
            <div @click='uploadAlbumCover' class="album-cover-img">
              <ion-icon class='icon' v-if=' albumCoverImg==null || albumCoverImg==""' style='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)' name="images-outline"></ion-icon>
              <img :src="albumCoverImg">
            </div>
            <button @click='createAlbum' style='width:20%;margin:10px auto' class="btn btn-sm btn-danger">Create</button>
        </div>
      </div>
      <div style='padding:5px;fontSize:14px' v-if='albums.length==0 && $store.state.ukey==$route.params.key'>You don't have any album. Let's create one.</div>
      <div style='padding:5px;fontSize:14px' v-if='albums.length==0 && $store.state.ukey!=$route.params.key'>This user don't have any album.</div>
      <button @click='showCreateAlbum' style='color:orangered;fontSize:15px' v-if='$store.state.ukey==$route.params.key' class="btn btn-sm btn-link">Create new album</button>
      <div class="albums">
          <div @click='viewAlbum(album[".key"])' v-for='album in albums' :key='album[".key"]' class="album" :class='album[".key"]'>
              <img style='width:100%;height:100%;objectFit:cover' :src="album.cover">
          </div>
      </div>
      <router-view ></router-view>
  </div>
</template>

<script>
import db from '../../../../plugins/firebase'
import router from '../../../../router/router'
import client from '../../../../plugins/filestack'
import store from '../../../../store/store'
export default {
    data() {
        return {
            albums:[],
            albumCoverImg:null,
            albumName:'',
        }
    },
    methods: {
        viewAlbum(key) {
            router.push({name:"album",params:{albumKey:key}})
        },
        showCreateAlbum() {
            let form=document.querySelector('.images-view .create-album-form.cover')
            form.classList.toggle('show')
        },
        createAlbum() {
            if (this.albumName==null || this.albumName.trim()=='' ||
                this.albumCoverImg==null || this.albumCoverImg.trim()=='') {
                    this.$bvToast.show('alert-no-change')
            }
            else {
                this.$store.dispatch('loading')
                let newAlbum= {
                    cover:this.albumCoverImg,
                    name:this.albumName
                }
                db.ref('usersInformation').child(this.$store.state.ukey).child('albums').push(newAlbum).then(()=>{
                    this.closeForm_()
                    this.$store.dispatch('unload')
                    this.$bvToast.show('edit')
                }).catch(()=>{
                    this.$store.dispatch('unload')
                })
            }
        },
        uploadAlbumCover() {
            const options = {
            accept: ["image/*"],
            maxFiles: 1,
            uploadInBackground: false,
            onUploadDone: (res) => {
                    this.albumCoverImg=res.filesUploaded[0].url
                },
            };
            client.picker(options).open();
        },
        closeForm(e) {
            let form=document.querySelector('.images-view .create-album-form.cover')
            if (e.target.parentElement!=document.querySelector('.images-view .create-album-form')&&
                e.target.parentElement!=document.querySelector('.images-view .create-album-form div.form') &&
                e.target.parentElement!=document.querySelector('.images-view .create-album-form div.form div.album-cover-img')
            ) {
                form.classList.remove('show')
            }
            
        },
        closeForm_() {
            let form=document.querySelector('.images-view .create-album-form.cover')
            form.classList.remove('show')
            this.albumCoverImg=null
            this.albumName=''
        }
    },
    mounted() {
        this.$store.dispatch('loading')
        this.$rtdbBind('albums',db.ref('usersInformation').child(this.$route.params.key).child('albums')).then(()=>{
            this.$store.dispatch('unload')
        })
    }
}
</script>

<style>
.images-view .albums {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding:15px 0;
}
.images-view .albums .album{
    width: 250px;
    height: 250px;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    border:2px solid whitesmoke;
    cursor: pointer;
    transition:all .18s linear;
    margin:17.5px;
}
.images-view .albums .album:hover{
    transform: scale(0.9);
    border-color: orange;
}
.images-view .create-album-form.cover {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.3);
    z-index:10;
    visibility: hidden;
    opacity: 0;
}
.images-view .create-album-form.cover.show {
    visibility: visible;
    opacity: 1;
}
.images-view .create-album-form div.form {
    background-color:white;
    border-radius: 2px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    width: 400px;
    display: flex;
    flex-direction: column;
}
.images-view .create-album-form .form h5 i{
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
.images-view .create-album-form .form h5 i:hover{
  background-color:rgba(0,0,0,0.2);
}
.images-view .create-album-form div.form span{
    padding:7px;
}
.images-view .create-album-form div.form input{
    padding:7px;
    outline:none;
    width: 80%;
    margin:0 auto;
    border:none;
    border:1px solid gainsboro;
}
.images-view .create-album-form div.form input:focus{
    border-color:orange;
}
.images-view .create-album-form div.form .album-cover-img{
    width: 90%;
    margin:10px auto;
    height: 200px;
    border:1px dotted black;
    position: relative;
    font-size: 40px;
    color:grey;
    cursor: pointer;
}
.images-view .create-album-form div.form .album-cover-img img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
/*  */
@media only screen and (max-width: 768px) {
    .images-view .albums {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
@media only screen and (max-width: 1200px) {
    .images-view .albums {
        justify-content: space-around;
    }
}
</style>