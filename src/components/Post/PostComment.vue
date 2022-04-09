<template>
  <div class="post-comment">
      <div class="comment-header">
        <div class="author">
          <div class="avatar"><img style='width:100%;height:100%;objectFit:cover' :src="author.avatarImg"></div>
          <div class="infor">
            <div style='fontSize:15px' class="username">{{author.username}}</div>
            <div class="time">{{comment.time}}</div>
          </div>
        </div>
        <div class="control">
            <i @click='showControl' class="grey fas fa-ellipsis-v"></i>
            <div class="drop-down">
                <span v-if='$store.state.ukey==authorCommentKey || $store.state.ukey==authorPostKey'>Delete</span>
                <span v-if='$store.state.ukey!=authorCommentKey'>Report</span>
            </div>
        </div>
      </div>
      <div class="comment-content">
        <div style='fontSize:14px;marginTop:10px' class="text">
          {{comment.content}}
        </div>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props: {
        authorCommentKey:String,
        commentKey:String,
        authorPostKey:String,
        postKey:String,
    },
    data() {
        return {
            author:{},
            comment:{}
        }
    },
    methods: {
        showControl() {
            let dd=document.querySelector(`div.post-com.${this.postKey} > div.post-comments.show > div.post-comment.${this.commentKey} > div.comment-header > div.control > div`)
            dd.classList.toggle('show')
        }
    },
    mounted() {
        this.$rtdbBind('author',db.ref('usersInformation').child(this.authorCommentKey))
        this.$rtdbBind('comment',db.ref('usersInformation').child(this.authorPostKey).child('posts').child(this.postKey).child('comments').child(this.commentKey))
    }
}
</script>

<style>
.post-comment {
    padding:20px 30px;
}
/* comment header */
.post-comment .comment-header {
  width: 100%;
  height: 35px;
  padding:15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-comment .comment-header .control i:hover{
  color:orangered;
  cursor: pointer;
}
.post-comment .comment-header .control {
  position: relative;
}
.post-comment .comment-header .control .drop-down {
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
.post-comment .comment-header .control .drop-down.show {
  display: flex;
}
.post-comment .comment-header .control .drop-down::before {
  border-bottom-color: rgb(240, 186, 85);
}
.post-comment .comment-header .control .drop-down span{
  color:white;
  font-weight: 500;
  padding:7px;
  font-size: 13.5px;
  cursor: pointer;
  transition: .1s;
}
.post-comment .comment-header .control .drop-down span:hover{
  color:orange;
  background-color:whitesmoke;
  border-left:2px solid orange;
}
.post-comment .comment-header .author{
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

}
.post-comment .comment-header .author .avatar{
  width: 25px;
  height: 25px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 9px;
}
.post-comment .comment-header .author .infor{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.post-comment .comment-header .author .infor .username{
  font-size: 14.5px;
  font-weight: 800;
}
.post-comment .comment-header .author .infor .time{
  font-size: 13px;
}
</style>