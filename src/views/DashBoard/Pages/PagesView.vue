<template>
  <div class="page-view" :key='$route.params.key'>
      <div class="page__cover">
          <img :src="page.coverImg" alt="Cover img">
      </div>
      <div class="page__content ">
          <div class="page__header">
              <div class="container">
                  <div class="inf">
                  <div class='avatar'>
                      <img :src="page.avatarImg">
                  </div>
                  <div class="detail">
                      <div class="username"><strong>{{page.username}}</strong></div>
                      <div class="date" style='fontSize:14px'>Create at {{page.registerDate}}</div>
                  </div>
              </div>
              <div class="more-inf">
                  <button @click='$store.dispatch("follow",$route.params.key)' v-if='!peopleFollowed.find(user=> user[".value"]==$store.state.ukey)' class="btn btn-danger btn-sm market">
                      Like
                  </button>
                  <button @click='$store.dispatch("unfollow",$route.params.key)' v-if='peopleFollowed.find(user=> user[".value"]==$store.state.ukey)' class="btn btn-dark btn-sm market">
                      Unlike
                  </button>
                  <button @click='contactPage' class="btn btn-success btn-sm market">
                      Contact
                  </button>
                  <div class="follows">
                      <span>Likes</span>
                      <span ><strong>{{peopleFollowed.length}}</strong></span>
                  </div>
              </div>
              </div>
          </div>
          <div style='height:auto;minHeight:55vh;marginBottom:25px;display:flex;flexWrap:wrap;justifyContent:space-between' class="container">
              <div class="first-col">
                  <div class="about">
                      <h5>About this page</h5>
                      <div style='fontSize:15px;padding:15px'>{{page.description}}</div>
                  </div>
                  <div class="people-liked">
                      <h5>People who likes this page</h5>
                      <div class="people-list">
                          <recommend-person :class='{"this-is-me":person[".value"]==$store.state.ukey}' v-for='person in peopleFollowed' :type='"page"' :ukey="person['.value']" :key="person['.key']"/>
                      </div>
                  </div>
              </div>
              <div class="second-col">
                  <div class='post'>
                      <h5 style='marginBottom:25px'>Post</h5>
                      <div v-if='posts.length>0' class="posts-list">
                        <post-com :class='post.key' v-for='post in posts' :key='post.key' :postKey='post.key' :authorKey='post.author' :postImages="post.images"/>
                      </div>
                      <div v-if='posts.length==0'>
                          This page hasn't post any post yet.
                      </div>
                  </div>
              </div>
          </div>
          <!--
          <div style='height:auto;minHeight:55vh;marginBottom:25px' class="container">
              <div class="page__nav">
                  <div @click='isSelect="Post"' class="post" :class="{active:isSelect=='Post'}">Post</div>
                  <div @click='isSelect="About"' class="about" :class="{active:isSelect=='About'}">About</div>
                  <div @click='isSelect="Friends"' class="friends-list" :class="{active:isSelect=='Friends'}">Friends</div>
                  <div @click='isSelect="Image"' class="images" :class="{active:isSelect=='Image'}">Image</div>
                  <div @click='isSelect="Credits"' class="credits" :class="{active:isSelect=='Credits'}">Credits</div>
                  <div @click='isSelect="See more"' class="more" :class="{active:isSelect=='See more'}">See more <ion-icon style="marginLeft:5px" name="chevron-down-outline"></ion-icon></div>
              </div>
              <router-view></router-view>
          </div>
          -->
          <footer-bar/>
      </div>
  </div>
</template>

<script>
import db from '../../../plugins/firebase'
import FooterCom from '../../../components/General/FooterCom.vue'
import FooterBar from '../../../components/General/FooterBar.vue'
import PostCom from '../../../components/Post/PostCom.vue'
import RecommendPerson from '../../../components/General/RecommendPerson.vue'
export default {
    components: {
        FooterCom,
        PostCom,
        RecommendPerson,
        FooterBar
    },
    data() {
        return {
            postsData:[],
            page:{},
            posts:[],
            peopleFollowed:[],
            profileKey:'',
            messagesData:[],
            messageKey:null,
        }
    },
    watch:{
        page() {
            if (this.page.type=="user") {
                this.$router.push({name:'post',params:{key:this.$route.params.key}})
            }
            else {
                return
            }
        },
        postsData() {
            this.posts=[]
            this.postsData.forEach(post => {
                if (post.author==this.$route.params.key && post.type=='user-post') {
                    this.posts.unshift(post)
                }
            });
        },
        messagesData() {
            this.messageKey=null
            this.messagesData.forEach(message => {
                if (message['user1']==this.$store.state.ukey && message['user2']==this.$route.params.key) {
                    this.messageKey=message[".key"]
                }
                else if (message['user2']==this.$store.state.ukey && message['user1']==this.$route.params.key) {
                    this.messageKey=message[".key"]
                }
            });
        }
    },
    methods: {
        contactPage() {
            if (this.messageKey==null) {
                //create new conversation
                this.$store.dispatch('loading')
                let newConversation= {
                    user1:this.$store.state.ukey,
                    user2:this.$route.params.key,
                }
                db.ref('messagesData').push(newConversation).then((res)=>{
                    this.$store.dispatch('addMsgData', res.key)
                    this.$store.dispatch('unload')
                }).catch((err)=>{
                    alert(err)
                    this.$store.dispatch('unload')
                })
            }
            else {
                this.$store.dispatch('addMsgData', this.messageKey)
            }
        }
    },
    mounted() {
        document.documentElement.scrollTop=0
        this.$store.dispatch('loading')
        this.$rtdbBind('messagesData',db.ref('messagesData'))
        this.$rtdbBind('postsData',db.ref('postsData'))
        this.$rtdbBind('peopleFollowed',db.ref('usersInformation').child(this.$route.params.key).child('follows').child('followed'))
        this.$rtdbBind('page',db.ref('usersInformation').child(this.$route.params.key))
        .then(()=> {
            this.$store.dispatch('unload')
        })
        .catch(() => {
            this.$store.dispatch('unload')
        })
        this.profileKey=this.$route.params.key
    }
}
</script>

<style>
.page-view h5 {
    margin:0;
    padding:unset;
    padding:20px;  
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 800;
}
.page-view {
    width: 100%;
    min-height: 100vh;
    height: auto;
    display: flex;
    flex-direction: column;
}
.page__cover {
    padding-top:50px;   
    height: 350px;
}
.page__cover img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.page__content {
    width: 100%;
    height: auto;
}
.page__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color:white;
}
.page__header .container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.page__header .container .inf,.page__header .container .more-inf {
    display: flex;
    height: 100%;
    align-items: center;
    width: 400px;
}
.page__header .container .inf .detail{
    margin-left:130px;
}
.page__header .container .inf .avatar{
    width: 120px;
    height: 120px;
    border:2px solid white;
    border-radius: 50%;
    position: absolute;
    top:-25px;
}
.page__header .container .inf .avatar img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.page__header .container .inf .avatar .status{
    width:23px;
    height:23px;
    border-radius: 50%;
    position:absolute;
    bottom:0px;
    right:10px;
    background-color:grey;
}
.page__header .container .more-inf {
    display: flex;
    justify-content: space-between;
    width: 250px;
}
.page__header .container .more-inf div{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.page__content .container .first-col .about {
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

.page__content .container .first-col .people-liked {
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
.page__content .container .first-col .people-liked .people-list div div .recommend-person{
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding:10px 0;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    align-items: center;
    cursor: pointer;
}
.page__content .container .first-col .people-liked .people-list div.this-is-me div .recommend-person{
    cursor: unset;
}
#app > div.dash-board > div.page-view > div.page__content > div.container > div.first-col {
    width: 30%;
    display: flex;
    flex-direction: column;
}
#app > div.dash-board > div.page-view > div.page__content > div.container > div.second-col {
    width: 65%;
    display: flex;
    flex-direction: column;
}
/* */
@media only screen and (max-width: 768px) {
    .page-view {
        max-height: 100vh;
        max-width: 100vw;
    }
    #app > div.dash-board > div.page-view > div.page__content > div.container > div.first-col,
    #app > div.dash-board > div.page-view > div.page__content > div.container > div.second-col {
        width: 95%;
        display: flex;
        font-size: 13px;
        margin:0 auto;
        margin-bottom: 25px;
    }
    #app > div.dash-board > div.page-view > div.page__content > div.page__header > div {
        flex-direction: column;
    }
    .page__header .container .inf,.page__header .container .more-inf {
        width: 95%;
    }
    .container .first-col h5,.container .second-col h5{
        font-size: 14px;
        padding:10px;
    }
    #app > div.dash-board > div.page-view > div.page__content > div.container > div.second-col > div > div div {
        font-size: 12px;
    }
    #app > div.dash-board > div.page-view > div.page__content > div.page__header > div {
        font-size: 14px;
    }
    .page__cover {
        padding-top:35px;   
        height: 200px;
    }
    .page__header .container .inf .avatar{
        width: 70px;
        height: 70px;
        top:-15px;
        left:5px;
        border:1px solid white;
    }
}
</style>