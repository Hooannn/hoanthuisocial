<template>
  <div class="post-com">
      <div @click='closeImgPreview' style='display:flex;justifyContent:center;alignItems:center;top:0;left:0;position:fixed;width:100vw;height:100vh;maxWidth:100vw;maxHeight:100vh;backgroundColor:rgba(0,0,0,0.5);zIndex:10' class="images-preview">
        <i @click.prevent='closeImgPreview' @click='previous' style='position:absolute;fontSize:18px;border:1px solid white;padding:5px;top:50%;left:0;transform:translateY(-50%)' class="fas fa-chevron-left"></i>
        <div @click.prevent='closeImgPreview' style='width:70%;height:80%' class="image">
          <img style='width:100%;height:100%;objectFit:contain' :src="selectedImg">
        </div>
        <i @click.prevent='closeImgPreview' @click='next' style='position:absolute;fontSize:18px;border:1px solid white;padding:5px;top:50%;right:0;transform:translateY(-50%)' class="fas fa-chevron-right"></i>
      </div>
      <div class="post-header">
        <div @click='viewAuthorProfile' class="author">
          <div class="avatar"><img style='width:100%;height:100%;objectFit:cover' :src="author.avatarImg"></div>
          <div class="infor">
            <div class="username">{{author.username}}</div>
            <div class="time">{{post.date}}</div>
          </div>
        </div>
        <div class="control">
          <i @click='showControl' class="grey fas fa-ellipsis-v"></i>
          <div class="drop-down">
            <span v-if='$route.name!="post-detail" && author.type!="page" && type!="group-post"' @click='viewPost'>View</span>
            <span v-if='authorKey==$store.state.ukey'>Hide</span>
            <span v-if='authorKey==$store.state.ukey'>Edit</span>
            <span @click='deletePost' v-if='authorKey==$store.state.ukey'>Delete</span>
            <span v-if='authorKey!=$store.state.ukey'>Report</span>
          </div>
        </div>
      </div>
      <div class="post-content">
        <pre style='max-width:100%;minHeight:50px;wordWrap:break-word;overflowX:auto' class="text">
          {{post.content}}
        </pre>
        <div class="images">
          <div v-for='(image,index) in postImages' :key='index' class='image'>
            <img style='cursor:pointer' @click='showImage(image)' :src="image" >
          </div>
        </div>
      </div>
      <div class="post-react">
        <div class="left">
          <div :class='{liked:isLiked}' @click='likePost' class="likes"><i class="grey fas fa-heart"></i> Like {{likes.length}}</div>
          <div @click='showPostComment' class="comments"><i class="grey fas fa-comment-alt"></i> Comment {{comments.length}}</div>
        </div>
        <div class="right">
          <div v-if='author.type!="page" && type!="group-post"' class="views">
            <i class="grey fas fa-eye"></i>  View {{views.length}}
          </div>
        </div>
      </div>
      <div class="post-comments">
        <post-comment :groupKey='groupKey' :type='type' :class='comment.key' v-for='comment in post.comments' :key='comment.key' :commentKey='comment.key' :authorCommentKey='comment.author' :authorPostKey='post.author' :postKey='post.key'/>
      </div>
      <div class="post-input-comment">
        <div style='width:30px;height:30px;borderRadius:50%;overflow:hidden'>
          <img style='width:100%;height:100%;objectFit:cover' :src="$store.state.avatarImg">
        </div>
        <input @keypress.enter="postComment" v-model='comment' style='width:65%' type="text" placeholder="Write a comment here...">
        <button @click='postComment' style='backgroundColor:orangered;borderColor:orangered' class="btn btn-danger btn-sm">Comment</button>
      </div>
  </div>
</template>

<script>
import EventBus from '../../eventbus'
import db from '../../plugins/firebase'
import PostComment from '../Post/PostComment.vue'
export default {
  components: { PostComment },
  props:{
    postKey:String,
    authorKey:String,
    postImages:Array,
    type:String,
    groupKey:String,
  },
  data() {
    return {
      author:{},
      post:{},
      likes:[],
      comments:[],
      views:[],
      comment:'',
      isLiked:false,
      selectedImg:''
    }
  },
  methods: {
    //image preview
    
    next() {
      let images = [];
      this.postImages.forEach(image => images.push(image));
      let index = images.indexOf(this.selectedImg) + 1;
      if (index == images.length) {
        this.selectedImg = images[0];
      } else {
        this.selectedImg = images[index];
      }
    },
    previous() {
      let images = [];
      this.postImages.forEach(image => images.push(image));
      let index = images.indexOf(this.selectedImg) - 1;
      if (index == -1) {
        this.selectedImg = images[images.length - 1];
      } else {
        this.selectedImg = images[index];
      }
    },
    
    showImage(img) {
        this.selectedImg = img;
        let imagePreview = document.querySelector(
          `.post-com.${this.postKey} .images-preview`
        );
        imagePreview.classList.toggle("show");
    },
    
    closeImgPreview() {
      let imagePreview = document.querySelector(
          `.post-com.${this.postKey} .images-preview`
        );
      imagePreview.classList.toggle("show");
    },

    //
    likePost() {
      if (this.type!='group-post') {
        if (!this.isLiked) {
          db.ref("usersInformation").child(this.authorKey).child('posts').child(this.postKey).child('likes').child(this.$store.state.ukey).set('liked')
          let noti={
            content:`${this.$store.state.username} has liked your blog.`,
            date:new Date().toLocaleString(),
            time:new Date().getTime(),
            status:'Unseen',
            type:'like-blog',
            ukey:this.$store.state.ukey,
            postKey:this.postKey,
          }
          if (this.authorKey!=this.$store.state.ukey) {
              db.ref("usersInformation").child(this.authorKey).child('notifications').push(noti).catch(err => console.log(err))
          }
        }
        else if (this.isLiked) {
          db.ref("usersInformation").child(this.authorKey).child('posts').child(this.postKey).child('likes').child(this.$store.state.ukey).remove()
        }
      }
      else if (this.type=='group-post') {
        if (!this.isLiked) {
          db.ref("groups").child(this.groupKey).child('posts').child(this.postKey).child('likes').child(this.$store.state.ukey).set('liked')
          let noti={
            content:`${this.$store.state.username} has liked your blog.`,
            date:new Date().toLocaleString(),
            time:new Date().getTime(),
            status:'Unseen',
            type:'like-blog',
            ukey:this.$store.state.ukey,
            postKey:this.postKey,
          }
          if (this.authorKey!=this.$store.state.ukey) {
              db.ref("usersInformation").child(this.authorKey).child('notifications').push(noti).catch(err => console.log(err))
          }
        }
        else if (this.isLiked) {
          db.ref("groups").child(this.groupKey).child('posts').child(this.postKey).child('likes').child(this.$store.state.ukey).remove()
        }
      }
    },
    showControl() {
      let dd=document.querySelector(`div.post-com.${this.post.key} > div.post-header > div.control > div`)
      dd.classList.toggle('show')
    },
    showPostComment() {
      let comments=document.querySelector(`.post-com.${this.postKey} .post-react .left .comments`)
      let comment=document.querySelector(`.post-com.${this.postKey} .post-comments`)
      let commentInput=document.querySelector(`.post-com.${this.postKey} .post-input-comment`)
      comments.classList.toggle('active')
      comment.classList.toggle('show')
      commentInput.classList.toggle('show')
    },
    viewAuthorProfile() {
      if (this.$store.state.ukey!=this.authorKey && this.$route.params.key!=this.authorKey && this.author.type!="page") {
        this.$router.push({name:"post",params:{key:this.authorKey}})
      }
      else if (this.author.type=="page") {
        this.$router.push({name:"pages",params:{key:this.authorKey}})
      }
      else {
        return
      }
    },
    postComment() {
      if (this.type!='group-post') {
        if (this.comment!=null && this.comment.trim()!="") {
        let comment= {
          author:this.$store.state.ukey,
          content:this.comment,
          date:new Date().toLocaleString(),
          time:new Date().getTime(),
        }
        db.ref('usersInformation').child(this.authorKey).child('posts').child(this.postKey).child('comments').push(comment).then(res => {
          db.ref('usersInformation').child(this.authorKey).child('posts').child(this.postKey).child('comments').child(res.key).child('key').set(res.key)
          let noti= {
            content:`${this.$store.state.username} has commented to your blog.`,
            date:new Date().toLocaleString(),
            time:new Date().getTime(),
            status:'Unseen',
            type:'comment-blog',
            ukey:this.$store.state.ukey,
            postKey:this.postKey,
            commentKey:res.key
          }
          if (this.authorKey!=this.$store.state.ukey) {
            db.ref("usersInformation").child(this.authorKey).child('notifications').push(noti).catch(err => console.log(err))
          }
        })
        this.comment=''
        }
        else {
          return
        }
      }
      else if (this.type=='group-post') {
        if (this.comment!=null && this.comment.trim()!="") {
        let comment= {
          author:this.$store.state.ukey,
          content:this.comment,
          date:new Date().toLocaleString(),
          time:new Date().getTime(),
        }
        db.ref('groups').child(this.groupKey).child('posts').child(this.postKey).child('comments').push(comment).then(res => {
          db.ref('groups').child(this.groupKey).child('posts').child(this.postKey).child('comments').child(res.key).child('key').set(res.key)
          let noti= {
            content:`${this.$store.state.username} has commented to your blog.`,
            date:new Date().toLocaleString(),
            time:new Date().getTime(),
            status:'Unseen',
            type:'comment-blog',
            ukey:this.$store.state.ukey,
            postKey:this.postKey,
            commentKey:res.key
          }
          if (this.authorKey!=this.$store.state.ukey) {
            db.ref("usersInformation").child(this.authorKey).child('notifications').push(noti).catch(err => console.log(err))
          }
        })
        this.comment=''
        }
        else {
          return
        }
      }
    },
    //more control 
    viewPost() {
      if (this.$route.name!='post-detail') {
        if (this.views.length==0 || this.views.filter(view=> view['.value']==this.$store.state.ukey).length==0) {
          db.ref('usersInformation').child(this.authorKey).child('posts').child(this.postKey).child('views').push(this.$store.state.ukey).catch(err=>console.log(err))
        }
        this.$router.push({name:'post-detail',params:{key:this.authorKey,postKey:this.postKey}})
      }
      else {
        return
      }
    },
    deletePost() {
      if (this.type!='group-post') {
        db.ref('usersInformation').child(this.$store.state.ukey).child('posts').child(this.postKey).remove()
        .then(()=> {
          let post=document.querySelector(`div.post-com.${this.post.key}`)
          post.remove()
        })
        .catch(err=> console.log(err))
      }
      else if (this.type=='group-post') {
        db.ref('groups').child(this.groupKey).child('posts').child(this.postKey).remove()
        .then(()=> {
          let post=document.querySelector(`div.post-com.${this.post.key}`)
          post.remove()
        })
        .catch(err=> console.log(err))
      }
    },
    //
    /*
    showComment(commentKey) {
      this.showPostComment()
      let comment=document.querySelector(`div.post-com.${this.post.key} div.post-comments div.post-comment.${commentKey}`)
      setTimeout(function() {
        comment.focus()
      },1000)
    }
    */
  },
  watch: {
    post() {
      //check is liked
      this.isLiked=false
      this.likes.forEach(like=> {
        if (like['.key']==this.$store.state.ukey) {
          this.isLiked=true
          return
        }
      })
    //
    }

  },
  mounted() {
    if (this.type=='group-post') {
    this.$rtdbBind('author',db.ref('usersInformation').child(this.authorKey))
    //this.$rtdbBind('author',db.ref('pages').child(this.groupKey))
    this.$rtdbBind('post',db.ref('groups').child(this.groupKey).child('posts').child(this.postKey))
    //this.$rtdbBind('post',db.ref('pages').child(this.groupKey).child('posts').child(this.postKey))
    this.$rtdbBind('likes',db.ref('groups').child(this.groupKey).child('posts').child(this.postKey).child('likes'))
    this.$rtdbBind('views',db.ref('groups').child(this.groupKey).child('posts').child(this.postKey).child('views'))
    this.$rtdbBind('comments',db.ref('groups').child(this.groupKey).child('posts').child(this.postKey).child('comments'))
    }
    else if(this.type!='group') {
    this.$rtdbBind('author',db.ref('usersInformation').child(this.authorKey))
    //this.$rtdbBind('author',db.ref('pages').child(this.authorKey))
    this.$rtdbBind('post',db.ref('usersInformation').child(this.authorKey).child('posts').child(this.postKey))
    //this.$rtdbBind('post',db.ref('pages').child(this.authorKey).child('posts').child(this.postKey))
    this.$rtdbBind('likes',db.ref('usersInformation').child(this.authorKey).child('posts').child(this.postKey).child('likes'))
    this.$rtdbBind('views',db.ref('usersInformation').child(this.authorKey).child('posts').child(this.postKey).child('views'))
    this.$rtdbBind('comments',db.ref('usersInformation').child(this.authorKey).child('posts').child(this.postKey).child('comments'))
    }
    //let images =document.querySelectorAll(`#app > div > div.profile-view > div.profile__content > div.container > div.post-view > div.second-col > div.posts-list div.post-com.${this.postKey} > div.post-content > div.images div.image`)
    // add esc event to close image preview
    window.addEventListener('keydown', function(e) {
      if (e.keyCode==27) {
        let imagePreview = document.querySelectorAll(
          `.post-com .images-preview`
        );
        imagePreview.forEach(img => {
          img.classList.remove('show')
        });
      }
    })
    //
    //style image
    //`#app > div > div.profile-view > div.profile__content > div.container > div.post-view > div.second-col > div.posts-list > div.post-com.${this.postKey} > div.post-content > div.images > div.image`
    
    if (this.post.images!=undefined && this.post.images.length>0) {
      if (this.post.images.length%3==0) {
      let images=document.querySelectorAll(`div.post-com.${this.postKey} > div.post-content > div.images div.image`)
      images.forEach(image => {
        image.style.width='33.3%'
      });
    }
    else if (this.post.images.length%3==1) {
      let images=document.querySelectorAll(`div.post-com.${this.postKey} > div.post-content > div.images div.image`)
      if (this.post.images.length==1) {
        images[0].style.width='100%'
      }
      else {
      let fullIndex=this.post.images.length-1-1
      for (let index = 0; index <= fullIndex; index++) {
        images[index].style.width='33.3%'
      }
      images[this.post.images.length-1].style.width='100%'
      }
    }
    else if (this.post.images.length%3==2) {
      let images=document.querySelectorAll(`div.post-com.${this.postKey} > div.post-content > div.images div.image`)
      if (this.post.images.length==2) {
        images[0].style.width='50%'
        images[1].style.width='50%'
      }
      else {
        let fullIndex=this.post.images.length-1-1
        for (let index = 0; index <= fullIndex; index++) {
          images[index].style.width='33.3%'
        }
        images[this.post.images.length-1].style.width='50%'
        images[this.post.images.length-2].style.width='50%'
      }
    }
    }
    //style image
    if (this.$store.state.ukey!=this.authorKey) {
      let authorElement=document.querySelector(`div.post-com.${this.postKey} .post-header .author`)
      authorElement.style.cursor='pointer'
    }

  },
  /*
  created() {
    EventBus.$on("showCom", (value) => {
      this.showComment(value);
    });
  },
  */
  destroyed() {
    /*
    EventBus.$on("showCom", (value) => {
      this.showComment(value);
    });
    */
    window.removeEventListener('keydown', function(e) {
      if (e.keyCode==27) {
        let imagePreview = document.querySelectorAll(
          `.post-com .images-preview`
        );
        imagePreview.forEach(img => {
          img.classList.remove('show')
        });
      }
    })
  }
}
</script>

<style>
/* images preview */
.images-preview i {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color:white;
  transition: .1s;
}
.images-preview i:hover {
  background-color:white;
  color:black;
}
.images-preview {
  visibility: hidden;
  opacity: 0;
  transition:all .2s ease-in-out;
}
.images-preview.show {
  visibility: visible;
  opacity: 1;
}
/* images preview */
.post-com input {
  font-size: 15px;
  padding:5px;
  outline:none;
  border:none;
  border:1px solid gainsboro;
}
.post-com input:focus{
  border:1px solid orange;
}
.post-com textarea {
  border-color: gainsboro;
}
.post-com textarea:focus {
  outline: none !important;
  border-color: orange;
}
pre {
     white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    font-family: "Poppins", sans-serif;
    font-size: 14px;
}

.post-com {
  margin-bottom:25px;
  width: 100%;
  background-color:white;
  box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
}
/*header */
.post-com .post-header {
  width: 100%;
  height: 50px;
  padding:15px;
  border-bottom: 1px solid gainsboro;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-com .post-header .control i:hover{
  color:orangered;
  cursor: pointer;
}
.post-com .post-header .control {
  position: relative;
}
.post-com .post-header .control .drop-down {
  position: absolute;
  flex-direction: column;
  justify-content: center;
  width: 100px;
  background-color:rgb(240, 186, 85);
  box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
  left:-77px;
  top:35px;
  border-radius: 3px;
  display: none;
  transition:.1s;
}
.post-com .post-header .control .drop-down.show {
  display: flex;
}
.post-com .post-header .control .drop-down span{
  color:white;
  font-weight: 500;
  padding:7px;
  font-size: 13.5px;
  cursor: pointer;
  transition: .1s;
}
.post-com .post-header .control .drop-down span:hover{
  color:orange;
  background-color:whitesmoke;
  border-left:2px solid orange;
}
.post-com .post-header .control .drop-down::before {
  border-bottom-color: rgb(240, 186, 85);
}
.post-com .post-header .author{
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.post-com .post-header .author .avatar{
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 9px;
}
.post-com .post-header .author .infor{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.post-com .post-header .author .infor .username{
  font-size: 16px;
  font-weight: 800;
}
.post-com .post-header .author .infor .time{
  font-size: 14px;
}
/*content */
.post-com .post-content {
  width: 100%;
  padding:15px;
  border-bottom: 1px solid gainsboro;
  display: flex;
  flex-direction: column;
}
.post-com .post-content .images{
  width: 99.9%;
  display: flex;
  flex-wrap: wrap;
  margin:0 auto;
}
.post-com .post-content .images .image{
  margin:0;
}
.post-com .post-content .images .image img{
  width: 100%;
  object-fit: cover;
}
/*react */
.post-com .post-react {
  width: 100%;
  padding:15px;
  border-bottom: 1px solid gainsboro;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.post-com .post-react .left,.post-com .post-react .right{
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-around;
}
.post-com .post-react .right {
  justify-content: flex-end;
}
.post-com .post-react .left div,.post-react .right div{
  color:grey;
}
.post-com .post-react .left div:hover,.post-react .right div:hover{
  color:orangered;
  cursor: pointer;
}
.post-com .post-react .left .likes.liked,.post-com .post-react .left .comments.active {
  color:orangered;
}
/*comments */
.post-com .post-comments {
  width: 100%;
  display: none;
  transition: .1s;
  justify-content: center;
  flex-direction: column;
}
.post-com .post-comments.show {
  display:flex;
}
/* input comment */
.post-com .post-input-comment {
  padding:15px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: none;
}
.post-com .post-input-comment.show {
  display:flex;
}
</style>