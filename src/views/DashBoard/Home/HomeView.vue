<template>
  <div class="home-view ">
    <div class="container">
    <div class="first-col">
      <!-- -->
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
        <div style='color:grey'><i style='color:orangered'  class="fas fa-map-marker-alt"></i> {{$store.state.location}}</div>
        <div style='borderBottom:1px solid gainsboro;display:flex;alignItems:center;justifyContent:space-around;width:100%;height:80px'>
          <div style='heigth:100%;width:45%;display:flex;justifyContent:space-between;;flexDirection:column;alignItems:center'>
            <span style='fontSize:14.5px;fontWeight:700'>Friends</span>
            <span>0</span>
          </div>
          <hr style='height:60%;border:1px solid gainsboro'/>
          <div style='heigth:100%;width:45%;display:flex;justifyContent:space-between;;flexDirection:column;alignItems:center'>
            <span style='fontSize:14.5px;fontWeight:700'>Follows</span>
            <span>0</span>
          </div>
        </div>
        <button @click='$router.push({name:"post",params:{key:$store.state.ukey}})' style='{textDecoration:none;color:black;padding:10px;}' class="btn btn-link btn-sm">View Profile</button>
      </div>
      <!-- -->
      <!-- -->
      <div class="people-overview">
        <h5>People</h5>
        <div @click='$router.push({name:"post",params:{key:person[".key"]}})' v-for='person in people' :key="person['.key']" class="person" v-show='$store.state.ukey!=person[".key"]'>
          <div style='width:30px;height:30px;borderRadius:50%;overflow:hidden' class='person-avatar'>
            <img style='width:100%;height:100%;objectFit:cover' :src="person.avatarImg">
          </div>
          <div style='width:45%;fontSize:14px;fontWeight:800' class='person-username'>
            {{person.username}}
          </div>
          <div @click='$router.go("#")' style='borderRadius:2px;width:30px;height:30px;display:flex;justifyContent:center;alignItems:center;boxShadow:0px 0px 5px rgba(0,0,0,0.3)' class="add-fr"><i class="fas fa-user-plus"></i></div>
        </div>
      </div>
      <!-- -->
    </div>
    <div class="second-col">
      <div style='width:100%;height:40px;display:flex;alignItems:center;boxShadow:1px 1px 4px rgba(0,0,0,0.4);overflow:hidden;borderRadius:3px' class="search-bar">
        <input placeholder="Search something..." style='fontSize:15px;padding:0 10px;width:80%;height:100%;border:none;outline:none;backgroundColor:white;' type="text">
        <div class='btn-search' style='color:white;width:20%;height:100%;display:flex;justifyContent:center;alignItems:center;'><i class="fas fa-search"></i></div>
      </div>
      <div class="posts-list">
        <post-com :class='post.key' v-for='post in posts' :key='post.key' :postKey='post.key' :authorKey='post.author' :postImages="post.images"/>
      </div>
    </div>
    <div class="third-col">
      <!-- -->
      <div class="post-introduce">
              <h5 style='fontWeight:bolder;border:none;padding:0;'>Want to share your everything</h5>
              <div>Post your post now. Add your image, share your day and iteract with another people.</div>
              <button style='color:white;fontWeight:400;backgroundColor:orange;borderColor:orange' class="btn btn-warning">Post it now</button>
      </div>
      <!-- -->
    </div>
    </div>
    <footer-com/>
  </div>
</template>

<script>
import FooterCom from '../../../components/General/FooterCom.vue'
import PostCom from '../../../components/Post/PostCom.vue'
import db from './../../../plugins/firebase'
export default {
  components: { FooterCom, PostCom },
  data() {
    return {
      people:[],
      posts:[],
    }
  },
  watch: {
    people() {
      this.posts=[]
      this.people.forEach(person => {
        person.posts=Object.keys(person.posts).sort().map((key) => ({
          key: person.posts[key].key,
          author: person.posts[key].author,
          content: person.posts[key].content,
          comments:person.posts[key].comments,
          date:person.posts[key].date,
          time:person.posts[key].time,
          likes:person.posts[key].likes,
          images:person.posts[key].images,
        }));
      person.posts.forEach(post => {
        this.posts.push(post)
      });
      });
    }
  },
  mounted() {
    this.$rtdbBind('people',db.ref('usersInformation'))
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
    padding-top:100px;
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
.home-view .first-col .people-overview .person{
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding:10px 0;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    align-items: center;
    cursor: pointer;
}
.home-view .first-col .people-overview .person .add-fr:hover{
    cursor: pointer;
    background-color:orange;
    color:white;
}
/*2 colum */
  /* posts-list */

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

/** */

</style>