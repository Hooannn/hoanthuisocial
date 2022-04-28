<template>
  <div class="post-comment">
      <post-report :type='"comment"' :postKey='postKey' :commentKey='commentKey'/>
      <div class="comment-header">
        <div class="author">
          <div class="avatar"><img style='width:100%;height:100%;objectFit:cover' :src="author.avatarImg"></div>
          <div class="infor">
            <div style='fontSize:15px' class="username">{{author.username}}</div>
            <div style='fontSize:13px;color:grey' v-if='comment.time==null||comment.time==undefined'>Loading...</div>
            <div  class="time" v-if='comment.time!=null||comment.time!=undefined'>{{getTime}}</div>
          </div>
        </div>
        <div class="control">
            <i @click='showControl' class="grey fas fa-ellipsis-v"></i>
            <div class="drop-down">
                <span @click='deleteComment' v-if='$store.state.ukey==authorCommentKey || $store.state.ukey==authorPostKey ||$route.name=="group-manage-post"'>Delete</span>
                <span @click='showReport' v-if='$store.state.ukey!=authorCommentKey'>Report</span>
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
import PostReport from './PostReport.vue'
export default {
  components: { PostReport },
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
    computed: {
      getTime() {
        let time=(new Date().getTime()-(-this.comment.time))/1000
        time = parseInt(time, 10);
        let hours   = Math.floor(time / 3600);
        let minutes = Math.floor((time - (hours * 3600)) / 60);
        let seconds = time - (hours * 3600) - (minutes * 60);
        let days=Math.floor(hours/24)
        let weeks=Math.floor(days/7)
        let months=Math.floor(weeks/4)
        let years=Math.floor(months/12)
        if (years!=0) {
          if (years==1) {
            return `A year ago.`
          }
          else  {
            return `${years} years ago.`
          }
        }
        if (minutes==0 && hours==0) {
          if (seconds==1||seconds==0) {
            return `A second ago.`
          }
          else {
            return `${seconds} seconds ago.`
          }
        }
        else if (hours==0 && minutes!=0) {
          if (minutes==1) {
            return `A minute ago.`
          }
          else {
            return `${minutes} minutes ago.`
          }
        }
        else if (days==0 && hours!=0) {
          if (hours==1) {
            return `A hour ago.`
          }
          else {
            return `${hours} hours ago.`
          }
        }
        else if (weeks==0 && days!=0) {
          if (days==1) {
            return `A day ago.`
          }
          else {
            return `${days} days ago.`
          }
        }
        else if (months==0 && weeks!=0) {
          if (weeks==1) {
            return `A week ago.`
          }
          else {
            return `${weeks} weeks ago.`
          }
        }
        else if (years==0 && months!=0) {
          if (months==1) {
            return `A month ago.`
          }
          else {
            return `${months} months ago.`
          }
        }
      }
    },
    methods: {
        showReport() {
            let comment=document.querySelector(`div.post-com.${this.postKey} > div.post-comments.show > div.${this.commentKey} > div.cover`)
            comment.classList.add('show')
        },
        showControl() {
            let dd=document.querySelector(`div.post-com.${this.postKey} > div.post-comments.show > div.post-comment.${this.commentKey} > div.comment-header > div.control > div`)
            dd.classList.toggle('show')
        },
        deleteComment() {
          this.$bvModal.msgBoxConfirm('You want to delete this comment ?',{
          title: 'Delete',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Confirm',
          cancelTitle: 'Cancle',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        }) 
        .then(value => {
          if (value==true) {
            this.$store.dispatch('loading')
            db.ref('postsData').child(this.postKey).child('comments').child(this.commentKey).remove()
              .then(()=> {
                //let comment=document.querySelector(`div.post-com.${this.postKey} > div.post-comments >div.post-comment.${this.commentKey}`)
                //comment.remove()
                this.$store.dispatch('unload')
              })
              .catch(err=> console.log(err))
          }
        })
        .catch(err => {
          if (err==false) {
            return
          }
        })
            
        }
    },
    mounted() {
        this.$rtdbBind('author',db.ref('usersInformation').child(this.authorCommentKey))
        this.$rtdbBind('comment',db.ref('postsData').child(this.postKey).child('comments').child(this.commentKey))
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