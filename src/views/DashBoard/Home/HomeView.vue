<template>
  <div id='home-view' class="home-view">
    <make-post/>
    <make-group-form/>
    <make-page-form/>
    <div class="container">
    <div class="first-col">
      <!--<button @click='toMyPage' class="btn btn-sm btn-link">My Page</button>-->
      <div style='marginBottom:25px;width:100%;height:40px;display:flex;alignItems:center;boxShadow:1px 1px 4px rgba(0,0,0,0.4);overflow:hidden;borderRadius:3px' class="search-bar">
        <input v-model='searchInput' @keypress.enter="search" placeholder="Search something..." style='fontSize:15px;padding:0 10px;width:80%;height:100%;outline:none;backgroundColor:white;' type="text">
        <div @click='search' class='btn-search' style='color:white;width:20%;height:100%;display:flex;justifyContent:center;alignItems:center;'><i class="fas fa-search"></i></div>
      </div>
      <router-view></router-view>
      <div class="short-intro">
        <div style='width:100%;maxHeight:90px;overflow:hidden' class="short-bg">
          <img style='width:100%;height:100%;objectFit:cover' :src="$store.state.coverImg">
        </div>
        <div style='marginBottom:20px;marginTop:-30px;display:flex;justifyContent:center;alignItems:center;width:100%;height:85px' class="short-ava">
          <img style='width:90px;heigth:90px;borderRadius:50%;border:3px solid white;' :src="$store.state.avatarImg">
        </div>
        <div style='fontSize:15px;marginBottom:2px' >
          <span style='fontWeight:800;'>{{$store.state.username}}</span><span style='fontSize:14px'> ({{$store.state.role}})</span>
        </div>
        <div style='color:grey'><i style='color:orangered' class="fas fa-map-marker-alt"></i> {{$store.state.location}}</div>
        <div style='borderBottom:1px solid gainsboro;display:flex;alignItems:center;justifyContent:space-around;width:100%;height:80px'>
          <div style='heigth:100%;width:45%;display:flex;justifyContent:space-between;;flexDirection:column;alignItems:center'>
            <span style='fontSize:14.5px;fontWeight:700'>Friends</span>
            <span>{{userFriend.length}}</span>
          </div>
          <hr style='height:60%;border:1px solid gainsboro'/>
          <div style='heigth:100%;width:45%;display:flex;justifyContent:space-between;;flexDirection:column;alignItems:center'>
            <span style='fontSize:14.5px;fontWeight:700'>Follows</span>
            <span>{{userFollow.length}}</span>
          </div>
        </div>
        <button @click='$router.push({name:"post",params:{key:$store.state.ukey}})' style='{textDecoration:none;color:black;padding:10px;}' class="btn btn-link btn-sm">View Profile</button>
      </div>
      <!-- -->
      <!-- -->
      <div v-if='$store.state.type!="page"' class="people-overview">
        <h5>People you may know</h5>
        <recommend-person :type='"home"' v-show='person.type!="page" && $store.state.ukey!=person[".key"]' v-for='person in people' :ukey="person['.key']" :key="person['.key']"/>
        <!--
        <div @click='viewProfile(person[".key"])' v-for='person in people' :key="person['.key']" class="person" v-show='$store.state.ukey!=person[".key"] && !userFriend.find((user)=> (user[".value"]==person[".key"]))'>
          <div style='width:30px;height:30px;borderRadius:50%;overflow:hidden' class='person-avatar'>
            <img style='width:100%;height:100%;objectFit:cover' :src="person.avatarImg">
          </div>
          <div style='width:45%;fontSize:14px;fontWeight:800' class='person-username'>
            <div>{{person.username}}</div>
            <div style='fontSize:10px;color:grey;fontWeight:lighter'>Mutual {{  (person[".key"]) | getMutualFriend() }}</div>
          </div>
          <button :disabled='userFriend.find((user)=> (user[".value"]==person[".key"]))||userFriendRequesting.find((user)=> (user[".value"]==person[".key"]))||userFriendRequested.find((user)=> (user[".value"]==person[".key"]))' @click='$store.dispatch("sentFriendRequest",person[".key"]),$store.dispatch("follow",person[".key"])' style='width:30px;height:30px;display:flex;justifyContent:center;alignItems:center;fontSize:13px;' class="add-fr btn btn-warning btn-sm"><i class="fas fa-user-plus"></i></button>
        </div>
        -->
      </div>
      <!-- -->
      <!-- -->
      <div v-if='$store.state.type!="page"' class="pages-introduce">
              <h5 style='fontWeight:bolder;border:none;padding:0;'>Create a Page</h5>
              <div>Want to create and manage your page for mutiple purposes. Let's try.</div>
              <button @click='showMakePageForm' style='color:white' class="btn btn-outline-warning">Try now</button>
      </div>
      <!-- -->
      <!-- -->
      <div class="pages-overview">
        <h5>Popular Pages</h5>
        <recommend-person :type='"home"' v-show='person.type=="page"' v-for='person in people' :ukey="person['.key']" :key="person['.key']"/>
      </div>
      <!-- -->
    </div>
    <div class="second-col">
      <story-area/>
      <div class="whatsnew">
        <div style='width:95%;margin:0 auto;paddingBottom:10px;borderBottom:1px solid silver' class='wn-f-row center'>
          <div @click='$router.push({name:"post",params:{key:$store.state.ukey}})' onMouseOut='this.style.opacity="1"' onMouseOver='this.style.opacity="0.8"' style='cursor:pointer;maxWidth:40px;maxHeight:40px;borderRadius:50%;overflow:hidden'><img style='width:100%;height:100%;objectFit:cover' :src="$store.state.avatarImg" alt="Ava image"></div>
          <div @click='showMakePost' onMouseOut='this.style.opacity="1"' onMouseOver='this.style.opacity="0.8"' style='cursor:pointer;width:100%;padding:0 10px;height:40px;'><input disabled style='cursor:pointer;width:100%;height:100%;outline:none;border:none;backgroundColor:white;borderRadius:50px;border:1px solid silver;padding:0 10px;' :placeholder='"What is new "+$store.state.username+" ?"' type="text"></div>
        </div>
        <div style='width:95%;margin:0 auto;paddingTop:10px' class='wn-s-row center'>
          <button @click='showMakePost' style='color:white;width:33%' class="btn btn-sm btn-warning">
            <i class="fas fa-images"></i>
          </button>
          <button @click='showMakePost' style='color:white;width:33%' class="btn btn-sm btn-success">
            <i class="fas fa-video"></i>
          </button>
          <button @click='showMakePost' style='color:white;width:33%' class="btn btn-sm btn-danger">
            <i class="fas fa-grin"></i>
          </button>
        </div>
      </div>
      <!--
      <h5 style='color:grey;margin:0 0 25px 0;borderBottom:3px solid orange;position:relative'>Posts <i style='position:absolute;right:10px;cursor:pointer' onMouseOver="this.style.color='orange'" onMouseOut="this.style.color='unset'" class="fas fa-filter"></i></h5>
      -->
      <div class="posts-list">
        <post-com :class='post.key' v-for='post in $store.state.filterPosts' :key='post.key' :postKey='post.key' :authorKey='post.author' :postImages="post.images"/>
        <div style='fontSize:14px;padding:0 0 25px 0' v-if='$store.state.filterPosts.length==0'>You have no post in current. Press see more to load more posts. You can add more friend, follow page, join some group to get new post from them.</div>
      </div>
      <button @click='loadPost' style='minWidth:30%;margin:0 auto' class="btn btn-sm btn-secondary">See more</button>
    </div>
    <div class="third-col">
      <!-- -->
      <div class="post-introduce">
              <h5 style='fontWeight:bolder;border:none;padding:0;'>Want to share your everything</h5>
              <div>Post your post now. Add your image, share your day and iteract with another people.</div>
              <button @click='showMakePost' style='color:white;fontWeight:400;backgroundColor:orange;borderColor:orange' class="btn btn-warning">Post it now</button>
      </div>
      <!-- -->
      <div class="group-introduce">
              <h5 style='fontWeight:bolder;border:none;padding:0;'>Connect more</h5>
              <div>Join a group to connect with more people, make more discussion, with your favorite topic, hobbies, skill. Why not ?</div>
              <button @click='findGr' style='color:white' class="btn btn-primary">Find</button>
              <button @click='showMakeGroupForm' style='color:white' class="btn btn-primary">Create</button>
      </div>
      <!-- -->
      <div class="group-overview">
        <h5>Active Groups</h5>
        <recommend-group v-for='group in groups' :key='group[".key"]' :class='group[".key"]' :gKey='group[".key"]'/>
      </div>
      <!-- -->
    </div>
    </div>
    <footer-bar/>
  </div>
</template>

<script>
import router from '../../../router/router'
import FooterCom from '../../../components/General/FooterCom.vue'
import FooterBar from '../../../components/General/FooterBar.vue'
import MakePost from '../../../components/General/MakePost.vue'
import RecommendGroup from '../../../components/General/RecommendGroup.vue'
import RecommendPerson from '../../../components/General/RecommendPerson.vue'
import PostCom from '../../../components/Post/PostCom.vue'
import MakeGroupForm from '../../../components/Groups/MakeGroupForm.vue'
import db from './../../../plugins/firebase'
import MakePageForm from '@/components/Page/MakePageForm.vue'
import StoryArea from '@/components/Stories/StoryArea.vue'
export default {
  components: { FooterCom, PostCom, RecommendPerson, MakePost, RecommendGroup, MakeGroupForm, MakePageForm, FooterBar, StoryArea },
  data() {
    return {
      searchInput:'',
      userFollow:[],
      userFollowing:[],
      //
      people:[],
      postsData:[],
      groups:[],
      // friend handle
      userFriend:[],
      //
      newPosts:[],
      myGroups:[],
    }
  },
  methods: {
    scrollEvent(e) {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.loadPost()
      }
      else {
        return
      }
      /*
      let home=document.getElementById('home-view')
      console.log(home.scrollHeight)
      console.log(home.scrollTop)
      */
    },
    filterPosts(postsData) {
      let filterPosts=[]
      postsData.forEach(post => {
        if (this.userFollowing.find(user=>user[".value"]==post.author) && post.type=='user-post') {
          filterPosts.push(post)
        }
        if (this.myGroups.find(group=>group.groupKey==post.groupKey) && post.type=='group-post') {
          filterPosts.push(post)
        }
      });
      return filterPosts.sort(() => Math.random() - 0.5)
    },
    search() {
        if (this.searchInput=='') {
          return
        }
        this.$router.push({name:'filter',query:{q:this.searchInput}})
        this.searchInput=''
    },
    findGr() {
      let searchInput=document.querySelector('#app > div.dash-board > div.home-view > div.container > div.first-col > div.search-bar > input[type=text]')
      searchInput.focus()
    },
    showMakePost() {
      let makePost=document.querySelector('#app > div.dash-board > div.home-view > div.cover')
      makePost.classList.add('show')
    },
    showMakeGroupForm() {
      let mgForm=document.querySelector('#app > div.dash-board > div.home-view > div.make-group-form.cover')
      mgForm.classList.toggle('show')
    },
    showMakePageForm() {
      let mgPage=document.querySelector('#app > div.dash-board > div.home-view > div.make-page-form.cover')
      mgPage.classList.toggle('show')
    },
    loadPost() {
      let index=0
      if (this.$store.state.postsData[this.$store.state.postsData.length-1].time!=null&&this.$store.state.postsData[this.$store.state.postsData.length-1].time!=undefined) {
        index=this.$store.state.postsData[this.$store.state.postsData.length-1].time
      }
      this.$store.dispatch('loading')
      this.$rtdbBind('newPosts',db.ref('postsData').orderByChild('time').startAt(index+1).limitToFirst(10)).then(()=>{
        this.$store.state.postsData=[...this.$store.state.postsData,...this.newPosts]
        let filter=this.filterPosts(this.newPosts)
        this.$store.state.filterPosts=[...this.$store.state.filterPosts,...filter]
        this.$store.dispatch('unload')
      }).catch(err=>{
        alert(err)
        this.$store.dispatch('unload')
      })
    }
    /*
    toMyPage() {
      this.$store.dispatch('setRole', "Page")
      this.$store.dispatch('setUsername', "hoanthui's Social Official")
      this.$store.dispatch('setUkey', "-N-lHls7CAaaSJX8Pm7o")
      this.$store.dispatch('setType', "page")
      this.$store.dispatch('setAvatar', "https://imgkub.com/images/2022/04/16/hoanthui.png")
      this.$store.dispatch('setCover', "https://idgadvertising.com/wp-content/uploads/2020/09/iStock-1199773764-scaled.jpg")
    }
    */
  },
  filters: {
    getMutualFriend:function(contactKey) {
      let mutualFriend=[]
      let targetFriend=[]
      this.people.forEach(person => {
        if (person['.key']==contactKey) {
          targetFriend=person.friends.isfriend
          targetFriend=Object.keys(targetFriend).map((key)=>({key:key,value:targetFriend[key]}))
        }
      });
      this.userFriend.forEach(myfr => {
        targetFriend.forEach(tarfr => {
          if (myfr['.value']==tarfr['value']) {
            mutualFriend.push(myfr['.value'])
          }
        });
      });
      return mutualFriend.length
    }
  },
  mounted() {
    document.documentElement.scrollTop=0
    this.$store.dispatch('loading')
    this.$rtdbBind('postsData',db.ref('postsData').orderByChild('time').limitToFirst(10)).then(()=>{
      this.$store.state.postsData=[...this.postsData]
      let filter=this.filterPosts(this.postsData)
      this.$store.state.filterPosts=[...filter]
      this.loadPost()
      this.$store.dispatch('unload')
    }).catch(err=>{
      alert(err)
      this.$store.dispatch('unload')
    })
    this.$rtdbBind('groups',db.ref('groups'))
    this.$rtdbBind('userFriend',db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('isfriend'))
    this.$rtdbBind('userFollow',db.ref('usersInformation').child(this.$store.state.ukey).child('follows').child('followed'))
    this.$rtdbBind('userFollowing',db.ref('usersInformation').child(this.$store.state.ukey).child('follows').child('following'))
    this.$rtdbBind('people',db.ref('usersInformation'))
    this.$rtdbBind('myGroups',db.ref('usersInformation').child(this.$store.state.ukey).child('groups'))
  },
  beforeRouteLeave(to,from,next) {
    this.$store.state.postsData=[]
    this.$store.state.filterPosts=[]
    next()
  },
  created() {
    window.addEventListener('scroll', this.scrollEvent)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent)
  }
}
</script>

<style>
.home-view ::placeholder {
  font-size: 15px;
}
.home-view .btn-search {
  background-color:#FB5252;
  cursor:pointer;
}
.home-view .btn-search:hover {
  background-color:#fb5252e5;
}
.home-view .container{
    padding-top:80px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 50px;
    height: auto;
}
.home-view .container .first-col,.home-view .container .third-col{
    width: 22%;
    height: 100%;
    display: flex;
    flex-direction:column ;
}
.home-view .container .second-col {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction:column;
}
.home-view h5{
    margin:0;
    padding:unset;
    padding:20px;  
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 800;
}
/*1 column */
  /* Search Bar */
.home-view .first-col .search-bar input {
  border:none;
}
.home-view .first-col .search-bar input:focus {
  border:1px solid #FB5252;
}
  /* short introduce */
.home-view .first-col .short-intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    word-wrap: break-word;
    position: relative;
}
  /* people */
.home-view .first-col .people-overview {
    margin-top:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    word-wrap: break-word;
}
.home-view .first-col .people-overview div div .recommend-person{
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding:10px 0;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    align-items: center;
    cursor: pointer;
}
  /* pages introduce*/
.home-view .first-col .pages-introduce {
    margin-top:25px;
    border-radius: 2px;
    padding:15px;
    color:white;
    font-weight: 700;
    background:url('https://cdn.dribbble.com/users/1615584/screenshots/14795728/media/217c90aba448b05c6cab81a6891f071e.jpg?compress=1&resize=400x300') no-repeat;
    background-position:bottom;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
}
.home-view .first-col .pages-introduce *{
    margin:10px 0;
}
  /* pages overview*/
.home-view .first-col .pages-overview {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    word-wrap: break-word;
}
.home-view .first-col .pages-overview .recommend-person{
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding:10px 0;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    align-items: center;
    cursor: pointer;
}
/*2 colum */
  /* posts-list */
.home-view .second-col .whatsnew {
  background-color:white;
  border-radius: 3px;
  box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
  padding:15px 0;
  margin-bottom: 25px;
}
.home-view .second-col .whatsnew input::placeholder {
  font-size: 14px;
}
/*3 cloum */
  /* post introduce */
.home-view .third-col .post-introduce {
    border-radius: 2px;
    padding:15px;
    color:white;
    font-weight: 700;
    background:url('http://static.ybox.vn/2018/1/12/1cfe025a-f7a2-11e7-98d4-56c566ee3692.jpeg') no-repeat;
    background-position:bottom;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
}
.home-view .third-col .post-introduce *{
    margin:10px 0;
}
  /* group introduce */
.home-view .third-col .group-introduce {
    margin-top:25px;
    border-radius: 2px;
    padding:15px;
    color:white;
    font-weight: 700;
    background:url('https://i.pinimg.com/originals/ba/45/64/ba45640767d3711ed5b6de14ca353f2b.jpg') no-repeat;
    background-position:center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
}
.home-view .third-col .group-introduce *{
    margin:10px 0;
}
  /* group overview */
.home-view .third-col .group-overview {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    word-wrap: break-word;
}
/** */
/*  */
@media only screen and (max-width: 768px) {
    .home-view {
      max-width: 100vw;
      max-height: 100vh;
    }
    .home-view .container .first-col,.home-view .container .second-col,.home-view .container .third-col {
        width: 95%;
        display: flex;
        font-size: 13px;
        margin:0 auto;
        margin-bottom: 25px;
    }
    .home-view .container .second-col {
      order:99;
    }
    .home-view .container .first-col h5,.home-view .container .second-col h5,.home-view .container .third-col h5{
        font-size: 14px;
        padding:10px;
    }
    .home-view .container {
      padding-top:50px;
    }
    .home-view .first-col .pages-introduce {
      background-size: cover;
    }
    #app > div.dash-board > div.home-view > div.container > div.second-col > div div {
      font-size: 12px;
    }
}
</style>