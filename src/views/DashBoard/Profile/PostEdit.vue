<template>
  <div class="post-edit">
      <div class="post-header">
           <div class="avatar"><img style='width:100%;height:100%;objectFit:cover' :src="author.avatarImg"></div>
           <div class="username">{{author.username}}</div>
      </div>
      <div class="post-content">
        <textarea v-model="newContent" style='width:100%;minHeight:50px;outline:none;border:none;padding:10px;fontSize:14px' class="text"></textarea>
        <div style='width:100%;display:flex;flexWrap:wrap' class="images">
          <div style='width:25%;maxHeight:150px;padding:5px;position:relative' v-for='(image,index) in newImages' :key='index' class='image'>
            <ion-icon @click='removeImg(image)' onMouseOver='this.style.transform="scale(1.1)"' onMouseOut='this.style.transform="scale(1)"' style='position:absolute;top:0;right:0;color:orangered;cursor:pointer' name="close-circle-outline"></ion-icon>
            <img style='width:100%;height:100%;objectFit:contain' :src="image" >
          </div>
        </div>
      </div>
      <div style='position:absolute;top:100%;left:50%;transform:translateX(-50%);marginTop:10px;display:flex;flexDirection:column'>
          <button style='fontSize:13px' @click='uploadImgs' class="btn btn-sm btn-dark">Add Image</button>
          <button style='fontSize:13px' @click='saveChanges' class="btn btn-sm btn-success">Save</button>
      </div>
  </div>
</template>

<script>
import client from '../../../plugins/filestack'
import db from '../../../plugins/firebase'
import store from '../../../store/store'
export default {
    data() {
        return {
            post:{},
            author:{},
            newImages:[],
            newContent:'',
            postImages:[]
        }
    },
    methods:{
        removeImg(img) {
            let index=this.newImages.indexOf(img)
            this.newImages.splice(index,1)
        },
        uploadImgs() {
            const options = {
                accept: ["image/*"],
                maxFiles: 20,
                uploadInBackground: false,
                onUploadDone: (res) => {
                    let images = res.filesUploaded.map((item) => item.url);
                    if (images.length == 1 ) {
                        this.newImages.push(images[0]);
                    } else if (images.length > 1 ) {
                        this.newImages = [...this.newImages, ...images];
                    }
                },
            };
            client.picker(options).open();
        },
        saveChanges() {
            this.$bvModal.msgBoxConfirm('Save your change ?',{
                title: 'Edit post',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                okTitle: 'Save',
                cancelTitle: 'Cancle',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            }) 
            .then(value => {
                if (value==true) {
                    this.$store.dispatch('loading')
                    db.ref('postsData').child(this.$route.params.postKey).child('images').set(this.newImages).then(()=>{
                        db.ref('postsData').child(this.$route.params.postKey).child('content').set(this.newContent).then(()=>{
                            this.$store.dispatch('unload')
                            this.$bvToast.show('edit')
                        })
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
        }
    },
    watch:{
        postImages() {
            this.newImages=[]
            this.postImages.forEach(image => {
                this.newImages.push(image[".value"])
            });
        }
    },
    mounted() {
        this.$rtdbBind('post',db.ref('postsData').child(this.$route.params.postKey)).then(()=>{
            this.newContent=this.post.content
        })
        this.$rtdbBind("author",db.ref('usersInformation').child(this.$route.params.key))
        this.$rtdbBind("postImages",db.ref('postsData').child(this.$route.params.postKey).child('images'))
    },
    beforeRouteEnter(to,from,next) {
        if (to.params.key!=store.state.ukey) {
            next({name:'dhome'})
        }
        else {
            next()
        }
    }
}
</script>

<style>
.post-edit {
    margin:15px auto;
    margin-bottom: 80px;
    width: 50%;
    background-color:white;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    position: relative;
}
.post-edit .post-header{
    width: 100%;
    padding:10px;
    border-bottom: 1px solid gainsboro;
    display: flex;
    align-items: center;
}
.post-edit .post-header .avatar{
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 9px;
}
.post-edit .post-header .username{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 16px;
  font-weight: 800;
}
/*  */
@media only screen and (max-width: 768px) {
  .post-edit {
    width: 95%;
  }
}
</style>