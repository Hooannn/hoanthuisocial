<template>
  <div @click='close_' class="cover">
      <div class="make-post">
        <div style='color:orangered' class="header">Make a post<i @click='close' class="fas fa-times"></i></div>
        <div class="body">
          <div class="short-inf">
            <img style='borderRadius:50%;width:40px;maxHeight:80%;marginLeft:10px' :src="$store.state.avatarImg">
            <h6 style='marginLeft:10px;fontWeight:bold'>{{$store.state.username}}</h6>
          </div>
          <textarea style='width:98%;maxHeight:50%;height:50%;minHeight:50%' v-model='postContent' class='content' :placeholder="phd"></textarea>
          <div style='width:100%;display:flex;flexWrap:wrap;maxHeight:50%;overflowY:auto' class="images-container">
              <img style='width:25%' @click='removeImg(img)' v-for='(img,index) in imgsUpload' :key="index" :src="img">
            </div>
          <div class="add-more">
            <i @click='uploadImgs' class="fas fa-images"></i>
            <i class="fas fa-video"></i>
            <i class="fas fa-grin"></i>
          </div>
        </div>
        <div class="footer">
          <button @click='postPost' style='color:white;width:25%' class="btn btn-danger">Post</button>
        </div>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
import client from '../../plugins/filestack'
export default {
  data() {
    return {
      phd:`What are you thinking ${this.$store.state.username} ?`,
      postContent:'',
      imgsUpload:[],
      myfollowers:[],    
    }
  },
  methods: {
    postPost() {
            if ((this.postContent==null || this.postContent.trim()=='') && (this.imgsUpload.length==0)) {
                this.$bvToast.show('alert-empty-blog')
            }
            else {
                let newPost= {
                    author:this.$store.state.ukey,
                    date:new Date().toLocaleString(),
                    time: -(new Date().getTime()),
                    content:this.postContent,
                    images:this.imgsUpload,
                    type:'user-post'
                }
                this.$store.dispatch('loading')
                db.ref('postsData').push(newPost).then(res => {
                    db.ref('postsData').child(res.key).child('key').set(res.key)
                    this.$store.dispatch('unload')
                    this.$bvToast.show('new-blog')
                    let noti={
                        content:`${this.$store.state.username} has post a new post.`,
                        date:new Date().toLocaleString(), 
                        time:-(new Date().getTime()),
                        status:'Unseen',
                        type:'new-blog',
                        ukey:this.$store.state.ukey,
                        postKey:res.key,
                    }
                    this.myfollowers.forEach(follower => {
                        db.ref('usersInformation').child(follower['.value']).child('notifications').push(noti)
                    });
                })
                .catch(()=>this.$store.dispatch('unload'))
                this.postContent=''
                this.imgsUpload=[]
                this.close()
            }
    },
    close(e) {
      let makePost=document.querySelector('#app > div.dash-board > div.home-view > div.cover')
      makePost.classList.remove('show')
    },
    close_(e) {
      if (e.target==document.querySelector(`#home-view > div.cover.show`)) {
        let makePost=document.querySelector('#app > div.dash-board > div.home-view > div.cover')
        makePost.classList.remove('show')
      }
    },
    removeImg(img) {
            let index=this.imgsUpload.indexOf(img)
            this.imgsUpload.splice(index,1)
    },
    uploadImgs() {
      const options = {
            accept: ["image/*"],
            maxFiles: 20,
            uploadInBackground: false,
            onUploadDone: (res) => {
            let images = res.filesUploaded.map((item) => item.url);
            if (images.length == 1 ) {
                this.imgsUpload.push(images[0]);
            } else if (images.length > 1 ) {
                this.imgsUpload = [...this.imgsUpload, ...images];
            }
          },
        };
      client.picker(options).open();
    }
  },
  mounted() {
    this.$rtdbBind('myfollowers',db.ref('usersInformation').child(this.$store.state.ukey).child('follows').child('followed'))
  }
}
</script>

<style>
.cover textarea {
  background-color:transparent;
  outline:none;
  border:none;
}
div.images-container img:hover {
  cursor: pointer;
  opacity: 0.5;
}
.cover {
  min-width: 100vw;
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  background-color:rgba(0,0,0,0.5);
  z-index: 10;
  position: fixed;
  display: flex;
  top:0;
  left:0;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
}
.cover.show {
  visibility: visible;
  opacity: 1;
}
.cover .make-post{
  width:600px;
  height: 500px;
  box-shadow:0 0 3px rgba(0,0,0,0.5);
  border-radius: 3px;
  background-color:whitesmoke;
  display: flex;
  flex-direction: column;
  padding:0;
  border-top:5px solid salmon;
}
.cover .make-post .header{
  width: 100%;
  height: 10%;
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  position: relative;
}
.cover .make-post .header i{
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
.cover .make-post .header i:hover{
  background-color:rgba(0,0,0,0.2);
}
.cover .make-post .body{
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.cover .make-post .body .short-inf{
  width: 100%;
  height: 17%;
  display: flex;
  align-items: center;
}
.cover .make-post .body .add-more{
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover .make-post .body .add-more i{
  height: 100%;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition:.1s;
  cursor:pointer;
  color:white;
}
.cover .make-post .body .add-more i.fa-images{
  background-color:orange;
}
.cover .make-post .body .add-more i.fa-video{
  background-color:green;
}
.cover .make-post .body .add-more i.fa-grin{
  background-color:orangered;
}
.cover .make-post .body .add-more i:hover{
  opacity: 0.7;
}
.cover .make-post .footer{
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top:1px solid grey;
}
/*  */ 
@media only screen and (max-width: 768px) {
  .cover .make-post {
    width: 95%;
  }
}
</style>