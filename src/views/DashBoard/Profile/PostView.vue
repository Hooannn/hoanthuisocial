<template>
  <div class="post-view">
      <div class='first-col'>
          <div class="social-accounts">
              <h5>Social Accounts</h5>
              <a v-if='socialAccounts.facebook!=""' target="_blank" :href='socialAccounts.facebook' class="fb"><i style='marginRight:5px;borderRadius:50%;color:#3B5998' class="fab fa-facebook-f"></i>{{socialAccounts.facebook}}</a>
              <a v-if='socialAccounts.youtube!=""' target="_blank" :href='socialAccounts.youtube' class="yt"><i style='marginRight:5px;borderRadius:50%;color:#E50914' class="fab fa-youtube"></i>{{socialAccounts.youtube}}</a>
              <a v-if='socialAccounts.twitter!=""' target="_blank" :href='socialAccounts.twitter' class="tw"><i style='marginRight:5px;borderRadius:50%;color:#1DA1F2' class="fab fa-twitter"></i>{{socialAccounts.twitter}}</a>
              <a v-if='socialAccounts.github!=""' target="_blank" :href='socialAccounts.github' class="github"><i style='marginRight:5px;borderRadius:50%;color:black' class="fab fa-github"></i>{{socialAccounts.github}}</a>
              <a v-if='socialAccounts.pinterest!=""' target="_blank" :href='socialAccounts.pinterest' class="pinterest"><i style='marginRight:5px;borderRadius:50%;color:#792b2b;#E9EBEE' class="fab fa-pinterest"></i>{{socialAccounts.pinterest}}</a>
              <a v-if='socialAccounts.instagram!=""' target="_blank" :href='socialAccounts.instagram' class="insta"><i style='marginRight:5px;borderRadius:50%;color:#CD486B;#E9EBEE' class="fab fa-instagram"></i>{{socialAccounts.instagram}}</a>
          </div>
      </div>
      <div class='second-col'>
          <h5 v-if='$store.state.ukey!=$route.params.key'>Posts</h5>
          <div v-if='$store.state.ukey==$route.params.key' class='make-post'>
              <div style='display:flex;flexDirection:column' class="content">
                  <div style='display:flex'>
                      <div style='borderRadius:50%;width:35px;height:35px;overflow:hidden'><img style='width:100%;height:100%;objectFit:cover' :src="user.avatarImg"></div>
                      <textarea v-model='postContent' style='fontSize:14px;minHeight:100px;width:100%;outline:none;border:none;marginLeft:10px;marginBottom:10px' :placeholder="placeholder" ></textarea>
                  </div>
                  <div style='display:flex;flexWrap:wrap;width:100%;justifyContent:space-around;backgroundColor:whitesmoke;boxShadow:0 0 2px rgba(0,0,0,0.5)' class="images-pre">
                      <div v-for='(img,index) in imagesUpload' :key='index' style='width:30%;padding:10px;maxHeight:100px;position:relative' class="image-pre">
                          <ion-icon @click='removeImg(img)' style='cursor:pointer;position:absolute;top:0;right:0;color:orangered;' onMouseOver='this.style.transform="scale(1.1)"' onMouseOut='this.style.transform="scale(1)"' name="close-circle-outline"></ion-icon>
                          <img style='width:100%;height:100%;objectFit:contain;' :src="img" >
                      </div>
                  </div>
              </div>
              <div style='width:100%;display:flex;justifyContent:flex-end;height:30px' class="control">
                  <ion-icon @click='uploadImages' style='height:100%;fontSize:30px;width:30px;backgroundColor:grey;color:white;borderRadius:2px;cursor:pointer' name="image-outline"></ion-icon>
                  <button @click='postPost' style='color:white;fontWeight:900;height:100%' class="btn btn-sm btn-warning">Post</button>
              </div>
          </div>
          <div v-if='posts.length>0' class="posts-list">
              <post-com :class='post.key' v-for='post in posts' :key='post.key' :postKey='post.key' :authorKey='post.author' :postImages="post.images"/>
          </div>
          <div>
              <span v-if='$route.params.key!=$store.state.ukey'>This user hasn't post any post yet.</span>
              <span v-if='$route.params.key==$store.state.ukey'>You haven't post any post yet.</span>
          </div>
      </div>
      <div class='third-col'>
          <div class="market-introduce">
              <h5 style='fontWeight:bolder'>Want to Sell your items</h5>
              <div>Post your items to the market for free. Just add it through the simple form. Then wait for another users pay for it. Try out ours bidding system.</div>
              <button @click='$router.push({name:"sell"})' style='color:white;fontWeight:400' class="btn btn-warning ">Try it now</button>
          </div>
          <div v-if='myMarket.length>0' class="new-item-market">
              <h5>New Item on Market</h5>
              <new-item-market v-for='item in myMarket' :key='item[".key"]' :itemImages='item.images' :title='item.title' :currentPrice='item.currentprice'></new-item-market>
          </div>
      </div>
  </div>
</template>

<script>
import PostCom from '../../../components/Post/PostCom.vue'
import db from './../../../plugins/firebase'
import client from '../../../plugins/filestack'
import NewItemMarket from '../../../components/Profile/NewItemMarket.vue'
export default {
  firebase:{
      market:db.ref('market')
  },
  components: { PostCom,NewItemMarket },
    data() {
        return {
            socialAccounts:{},
            posts:[],
            postsData:[],
            placeholder:'What is new, '+this.$store.state.username + " ?",
            postContent:'',
            imagesUpload:[],
            user:{},
            myfollowers:[],
            market:[],
            myMarket:[],
        }
    },
    methods: {
        postPost() {
            //handle add notification soon
            if ((this.postContent==null || this.postContent.trim()=='') && (this.imagesUpload.length==0)) {
                this.$bvToast.show('alert-empty-blog')
            }
            else {
                let newPost= {
                    author:this.$store.state.ukey,
                    date:new Date().toLocaleString(),
                    time: -(new Date().getTime()),
                    content:this.postContent,
                    images:this.imagesUpload,
                    type:'user-post'
                }
                this.$store.dispatch('loading')
                db.ref('postsData').push(newPost).then(res => {
                    this.$store.dispatch('unload')
                    db.ref('postsData').child(res.key).child('key').set(res.key)
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
                .catch(()=> {
                    this.$store.dispatch('unload')
                })
                this.postContent=''
                this.imagesUpload=[]
            }
        },
        removeImg(img) {
            let index=this.imagesUpload.indexOf(img)
            this.imagesUpload.splice(index,1)
        },
        uploadImages() {
            const options = {
            accept: ["image/*"],
            maxFiles: 20,
            uploadInBackground: false,
            onUploadDone: (res) => {
            let images = res.filesUploaded.map((item) => item.url);
            if (images.length == 1 ) {
                this.imagesUpload.push(images[0]);
            } else if (images.length > 1 ) {
                this.imagesUpload = [...this.imagesUpload, ...images];
            }
            },
            };
            client.picker(options).open();
        }
    },
    watch: {
        market() {
            this.myMarket=[]
            this.market.forEach(item => {
                if (item.author==this.$route.params.key) {
                    this.myMarket.unshift(item)
                }
            });
        },
        postsData() {
            this.posts=[]
            this.postsData.forEach(post => {
                if (post.author==this.$route.params.key && post.type=='user-post') {
                    this.posts.unshift(post)
                }
            });
        }
    },
    mounted() {
        this.$rtdbBind('user', db.ref('usersInformation').child(this.$route.params.key))
        this.$rtdbBind('socialAccounts', db.ref('usersInformation').child(this.$route.params.key).child('socialAccounts'))
        this.$rtdbBind('postsData',db.ref('postsData'))
        this.$rtdbBind('myfollowers',db.ref('usersInformation').child(this.$store.state.ukey).child('follows').child('followed'))
    }
}
</script>

<style>
pre {
     white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    margin:0;
    padding:0;
}
.post-view .second-col h5 {
    margin:0;
    padding:unset;
    padding:20px;  
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 800;
    margin-bottom: 25px;
}
.post-view {
    margin-top:50px;
    margin-bottom:50px;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.post-view .first-col,.post-view .third-col {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction:column ;
}
.post-view .second-col {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction:column;
}
/* 1 */
/* social accounts */
.social-accounts {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    word-break: break-all;
    word-wrap: break-word;
}
.social-accounts h5{
    margin:0;
    padding:unset;
    padding:20px;  
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 800;
}
.social-accounts a{
    padding: 20px 10px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    text-decoration: none;
    display: flex;
    align-items: center;
}

/* 2 */
/* make post */
.make-post {
    width: 100%;
    background-color:white;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    padding:20px;
    margin-bottom: 25px;   
}
.posts-list {
    width: 100%;
    display: flex;
    flex-direction: column;
}

/* 3 */
.market-introduce {
    padding:30px;
    color:white;
    font-weight: 700;
    background:url('https://imgkub.com/images/2022/04/06/image.png');
    background-position:bottom;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
}
.market-introduce *{
    margin:10px 0;
}
.new-item-market {
    margin-top:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
}
.new-item-market h5{
    margin:0;
    padding:unset;
    padding:20px;  
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 800;
}

/*  */
@media only screen and (max-width: 768px) {
    .post-view .first-col,.post-view .third-col,.post-view .second-col {
        width: 95%;
        display: flex;
        font-size: 13px;
        margin:0 auto;
        margin-bottom: 25px;
    }
    .post-view .first-col h5,.post-view .third-col h5,.post-view .second-col h5{
        font-size: 14px;
        padding:10px;
    }
}
</style>