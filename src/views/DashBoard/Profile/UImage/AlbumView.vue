<template>
  <div @click='close' style='visibility:visible;opacity:1' class="cover">
      <div class="album-view">
          <div class="image-review">
              <i v-if="$store.state.ukey==$route.params.key" @click='deleteImg' class="fas fa-trash-alt delete"></i>
              <i @click='stopPreview' class="fas fa-arrow-left back"></i>
              <img style='width:90%;height:100%;objectFit:contain;position:absolute;left:50%;transform:translateX(-50%)' :src="selectedImg">
              <i @click='previousImage' class="fas fa-angle-left left"></i>
              <i @click='nextImage' class="fas fa-angle-right right"></i>
          </div>
          <div class="album-header">
              <button @click='goBack' style='color:black;fontSize:16px;position:absolute;left:5px' class="btn btn-sm btn-link"><ion-icon name="return-down-back-outline"></ion-icon> Back</button>
              <button v-if="$store.state.ukey==$route.params.key" @click='deleteAlbum' style='position:absolute;right:0;color:red;fontWeight:bold' class="btn btn-sm btn-link">Delete</button>
              <div style='fontSize:20px;fontWeight:bolder'>{{album.name}}</div>
          </div>
          <div class="images">
              <div @click='startPreview(image[".value"])' v-for='image in images' :key='image[".key"]' :class='image[".key"]' class="image">
                  <img style='width:100%;height:100%;objectFit:cover' :src="image['.value']">
              </div>
              <div v-if="$store.state.ukey==$route.params.key" @click='addImage' class="add-image">
                  <ion-icon style='color:grey' name="add-outline"></ion-icon>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import db from '../../../../plugins/firebase'
import client from '../../../../plugins/filestack'
export default {
    data() {
        return {
            images:[],
            album:{},
            selectedImg:'',
        }
    },
    methods: {
        startPreview(img) {
            this.selectedImg=img
            let imagePreview=document.querySelector('.cover .album-view .image-review')
            imagePreview.style.width='100%'
            imagePreview.style.height='100%'
            imagePreview.style.opacity='1'
            imagePreview.style.visibility='visible'
        },
        stopPreview() {
            let imagePreview=document.querySelector('.cover .album-view .image-review')
            imagePreview.style.width='0'
            imagePreview.style.height='0'
            imagePreview.style.opacity='0'
            imagePreview.style.visibility='hidden'
        },
        previousImage() {
            let imagesPreview = [];
            this.images.forEach(image => imagesPreview.push(image[".value"]));
            let index = imagesPreview.indexOf(this.selectedImg) - 1;
            if (index == -1) {
                this.selectedImg = imagesPreview[imagesPreview.length - 1];
            } else {
                this.selectedImg = imagesPreview[index];
            }
        },
        nextImage() {
            let imagesPreview = [];
            this.images.forEach(image => imagesPreview.push(image[".value"]));
            let index = imagesPreview.indexOf(this.selectedImg) + 1;
            if (index == imagesPreview.length) {
                this.selectedImg = imagesPreview[0];
            } else {
                this.selectedImg = imagesPreview[index];
            }
        },
        deleteImg() {
            this.$bvModal.msgBoxConfirm('Are you sure ?',{
                title: 'Delete Image',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'Delete',
                cancelTitle: 'Cancle',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            }) 
            .then(value => {
                if (value==true) {
                    this.$store.dispatch('loading')
                    db.ref('usersInformation').child(this.$route.params.key).child('albums').child(this.$route.params.albumKey).child('images').get().then(res=>{
                        let resVal=res.val()
                        resVal=Object.keys(resVal).map((key)=>({key:key,val:resVal[key]}))
                        let imgKey=resVal.find(img=>img.val==this.selectedImg).key
                        db.ref('usersInformation').child(this.$route.params.key).child('albums').child(this.$route.params.albumKey).child('images').child(imgKey).remove()
                        let img=document.querySelector(`#app > div.dash-board > div.profile-view > div.profile__content > div.container > div.images-view.router-view > div.cover > div > div.images > div.image.${imgKey}`)
                        img.remove()
                        this.stopPreview()
                        this.$store.dispatch('unload')
                        this.$bvToast.show('edit')
                    }).catch(err=>{
                        alert(err)
                        this.$store.dispatch('unload')
                    })
                }
            })
            .catch(err => {
                if (err==false) {
                    return
                }
            })
        },
        addImage() {
            const options = {
            accept: ["image/*"],
            maxFiles: 20,
            uploadInBackground: false,
            onUploadDone: (res) => {
            let images = res.filesUploaded.map((item) => item.url);
            images.forEach(image => {
                db.ref('usersInformation').child(this.$route.params.key).child('albums').child(this.$route.params.albumKey).child('images').push(image)
            });
          },
        };
        client.picker(options).open();
        },
        deleteAlbum() { 
            this.$bvModal.msgBoxConfirm('Are you sure ?',{
                title: 'Delete Album',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'Delete',
                cancelTitle: 'Cancle',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            }) 
            .then(value => {
                if (value==true) {
                    this.$store.dispatch('loading')
                    let album=document.querySelector(`#app > div.dash-board > div.profile-view > div.profile__content > div.container > div.images-view.router-view > div.albums > div.album.${this.$route.params.albumKey}`)
                    album.remove()
                    db.ref('usersInformation').child(this.$route.params.key).child('albums').child(this.$route.params.albumKey).remove().then((res)=>{
                        this.$store.dispatch('unload')
                        this.goBack()
                        this.$bvToast.show('edit')
                    }).catch(err=>{
                        alert(err)
                        this.$store.dispatch('unload')
                    })
                }
            })
            .catch(err => {
                if (err==false) {
                    return
                }
            })
        },
        goBack(e) {
            this.$router.go(-1)
        },
        close(e) {
            if (e.target==document.querySelector(`#app > div.dash-board > div.profile-view > div.profile__content > div.container > div.images-view.router-view > div:nth-child(4)`)) {
                this.$router.go(-1)
            }
        }
    },
    mounted() {
        this.$store.dispatch('loading')
        this.$rtdbBind('album',db.ref('usersInformation').child(this.$route.params.key).child('albums').child(this.$route.params.albumKey)).then(()=>{this.$store.dispatch('unload')})
        this.$rtdbBind('images',db.ref('usersInformation').child(this.$route.params.key).child('albums').child(this.$route.params.albumKey).child('images')).then(()=>{this.$store.dispatch('unload')})
    }
}
</script>

<style>
#app > div.dash-board > div.profile-view > div.profile__content > div.container > div.images-view.router-view > div.cover {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0;
    left:0;
    z-index:10;
    background-color:rgba(0,0,0,0.3);
}
.cover .album-view {
    background-color:whitesmoke;
    box-shadow: 0 0 3px rgba(0,0,0,0.4);
    width: 850px;
    height: 750px;
    max-height: 750px;
    overflow-y:auto;
    position: relative;
}
.cover .album-view .image-review{
    position: sticky;
    top:0;
    left:0;
    opacity: 0;
    visibility: hidden;
    width: 0;
    height: 0;
    z-index:100;
    background-color:white;
    overflow: hidden;
    transition:all .2s ease-in-out;
}
.cover .album-view .image-review .back{
    position:absolute;
    left:5px;
    top:5px;
    z-index: 10;
    font-size:20px;
    padding:5px;
    cursor: pointer;
    transition: .2s linear;
    color:orangered;
}
.cover .album-view .image-review .delete{
    position:absolute;
    right:5px;
    top:5px;
    z-index: 10;
    font-size:20px;
    padding:5px;
    cursor: pointer;
    color:orangered;
}
.cover .album-view .image-review .left{
    border:1px solid black;
    border-left:none;
    color:black;
    position:absolute;
    left:0;
    top:50%;
    transform:translateY(-50%);
    font-size:20px;
    padding:5px;
    cursor: pointer;
}
.cover .album-view .image-review .right {
    border:1px solid black;
    border-right:none;
    color:black;
    position:absolute;
    right:0;
    top:50%;
    transform:translateY(-50%);
    font-size:20px;
    padding:5px;
    cursor: pointer;
}
.cover .album-view .image-review .left:hover,.cover .album-view .image-review .right:hover {
    background-color:rgba(0,0,0,0.1);
}
.cover .album-view .image-review .back:hover {
    transform:translateX(-3px);
}
.cover .album-view .image-review .delete:hover {
    transform: scale(1.1);
}
.cover .album-view .album-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-bottom:1px solid grey;
    position: relative;
}   
.cover .album-view .images{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.cover .album-view .images .image{
    width: 150px;
    height: 150px;
    margin: 10px;
    cursor: pointer;
    box-shadow: 0 0 1px rgba(0,0,0,0.4);
}
.cover .album-view .images .image:hover{
    border:2px solid salmon;
}
.cover .album-view .images .add-image{
    width: 150px;
    height: 150px;
    margin: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border:2px dotted grey;
    font-size: 40px;
}
.cover .album-view .images .add-image:hover{
    border:2px solid grey;
}
@media only screen and (max-width: 850px) {
    .cover .album-view .images {
        justify-content: space-around;
    }
}
@media only screen and (max-width: 768px) {
    .cover .album-view {
        width: 100vw;
        height: 100vh;
        position: fixed;
    }
}
</style>