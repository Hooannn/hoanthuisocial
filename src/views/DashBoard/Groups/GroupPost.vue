<template>
  <div class="group-post">
      <div style='width:75%' class='first-col'>
          <div class='make-post'>
              <div style='display:flex;flexDirection:column' class="content">
                  <div style='display:flex'>
                      <div style='borderRadius:50%;width:35px;height:35px;overflow:hidden'><img style='width:100%;height:100%;objectFit:cover' :src="user.avatarImg"></div>
                      <textarea v-model='postContent' style='fontSize:14px;minHeight:100px;width:100%;outline:none;border:none;marginLeft:10px;marginBottom:10px' :placeholder="placeholder" ></textarea>
                  </div>
                  <div style='display:flex;flexWrap:wrap;width:100%;justifyContent:space-around;padding:15px' class="images-pre">
                      <div v-for='(img,index) in imgsUpload' :key='index' style='width:30%;marginTop:10px' class="image-pre">
                          <img style='width:100%;height:100%;objectFit:cover;border:2px solid orange' :src="img" @click='removeImg(img)'>
                      </div>
                  </div>
              </div>
              <div style='width:100%;display:flex;justifyContent:flex-end;height:30px' class="control">
                  <ion-icon @click='uploadImages' style='height:100%;fontSize:30px;width:30px;backgroundColor:grey;color:white;borderRadius:2px;cursor:pointer' name="image-outline"></ion-icon>
                  <button @click='postPost' style='color:white;fontWeight:900;height:100%' class="btn btn-sm btn-warning">Post</button>
              </div>
          </div>
          <h5>Posts</h5>
          <div class="posts-list">
              <post-com :groupKey='$route.params.key' :type='"group-post"' :class='post.key' v-for='post in posts' :key='post.key' :postKey='post.key' :authorKey='post.author' :postImages="post.images"/>
          </div>
      </div>
      <div style='width:20%' class='second-col'>
          <div class="short-about">
                <h5>About</h5>
                <div>
                    {{group.description}}
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import PostCom from '../../../components/Post/PostCom.vue'
import db from './../../../plugins/firebase'
import client from '../../../plugins/filestack'
export default {
  components: { PostCom },
  data() {
        return {
            group:{},
            members:[],
            posts:[],
            placeholder:'Want to share something, '+this.$store.state.username + " ?",
            postContent:'',
            imgsUpload:[],
            user:{}
        }
  },
  methods: {
      uploadImages() {
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
      },
      postPost() {
            if ((this.postContent==null || this.postContent.trim()=='') && (this.imgsUpload.length==0)) {
                this.$bvToast.show('alert-empty-blog')
            }
            else {
                let newPost= {
                    author:this.$store.state.ukey,
                    date:new Date().toLocaleString(),
                    time: new Date().getTime(),
                    content:this.postContent,
                    images:this.imgsUpload,
                }
                this.$store.dispatch('loading')
                db.ref('groups').child(this.$route.params.key).child('posts').push(newPost).then(res => {
                    db.ref('groups').child(this.$route.params.key).child('posts').child(res.key).child('key').set(res.key)
                    this.$store.dispatch('unload')
                    this.$bvToast.show('new-blog')
                    //member noti
                    let mnoti={
                        content:`${this.$store.state.username} has post a new post in ${this.group.groupname}.`,
                        date:new Date().toLocaleString(), 
                        time:new Date().getTime(),
                        status:'Unseen',
                        type:'group-new-blog',
                        ukey:this.$store.state.ukey,
                        postKey:res.key,
                    }
                    this.members.forEach(member => {
                        if (member.key!=this.$store.state.ukey) {
                            db.ref('usersInformation').child(member.key).child('notifications').push(mnoti)
                        }
                    });
                    //group noti
                    let gnoti={
                        content:`${this.$store.state.username} has post a new post.`,
                        date:new Date().toLocaleString(), 
                        time:new Date().getTime(),
                        status:'Unseen',
                        type:'group-new-blog',
                        ukey:this.$store.state.ukey,
                        postKey:res.key,
                    }
                    db.ref('groups').child(this.$route.params.key).child('notifications').push(gnoti)
                })
                .catch(()=>this.$store.dispatch('unload'))
                this.postContent=''
                this.imgsUpload=[]
            }
    },
      removeImg(img) {
          let index=this.imgsUpload.indexOf(img)
          this.imgsUpload.splice(index,1)
      }
  },
  mounted() {
      this.$rtdbBind('user', db.ref('usersInformation').child(this.$store.state.ukey))
      this.$rtdbBind('group', db.ref('groups').child(this.$route.params.key))
      this.$rtdbBind('members', db.ref('groups').child(this.$route.params.key).child('members'))
      this.$rtdbBind('posts', db.ref('groups').child(this.$route.params.key).child('posts'))
  }
}
</script>

<style>
.group-post {
    margin-top:50px;
    margin-bottom:50px;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
/*  1 */
.group-post .first-col {
    height: 100%;
    display: flex;
    flex-direction:column;
}
.group-post .first-col .make-post{
    background-color:white;
    width: 100%;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    padding:20px;
    margin-bottom: 25px;   
}

/*  2 */
.group-post .second-col {
    height: 100%;
    display: flex;
    flex-direction:column;
}
.group-post .second-col .short-about {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    border-radius: 2px;
    background-color:white;
}
.group-post .second-col .short-about div{
    font-size: 14px;
    padding:15px;
}
</style>