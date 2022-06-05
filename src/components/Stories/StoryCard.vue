<template>
  <div @click='viewStory' class="story-card">
      <div style='width:100%;height:100%' v-if='load' class="sc-loader center">
          <div class="scl-load"></div>
      </div>
      <div v-if='!load' class="sc-inner">
          <div v-if='story.type=="image"' class="sci-cover">
            <img style='width:100%;height:100%;objectFit:cover' :src="story.images[0]" alt="Cover img">
          </div>
          <div v-if='story.type=="video"' class="sci-cover">
            <video preload="metadata" style='width:100%;height:100%;objectFit:cover;pointerEvents:none' :src="story.videos[0]"></video>
          </div>
          <div :style='{borderColor:isSeen ? "slategray":"orange"}' class="sci-author-avatar">
            <img style='width:100%;height:100%;objectFit:cover' :src="author.avatarImg" alt="Avatar">
          </div>
          <div class="sci-author-name">
            <span>{{author.username}}</span>
          </div>
      </div>
  </div>
</template>

<script>
import db from '@/plugins/firebase'
export default {
    props:{
      story:Object
    },
    data() {
        return {
            load:true,
            author:{},
            isSeen:false,
        }
    },
    methods:{
        viewStory() {
            db.ref('stories').child(this.story[".key"]).child('views').child(this.$store.state.ukey).set(true).then(()=>{
                this.$router.push({name:"story",params:{id:this.story[".key"]},query:{i:this.author.avatarImg,u:this.author.username}})
            }).catch(err=>{
                alert(err)
            })
        },
        getAuthor() {
            this.$rtdbBind('author',db.ref('usersInformation').child(this.story.author)).then(()=>{
                db.ref('stories').child(this.story[".key"]).child('views').child(this.$store.state.ukey).once('value').then(snap=>{
                    this.isSeen=snap.val()
                    this.load = false
                }).catch(err=>{
                    alert(err)
                })
            }).catch(err=>{
                console.log(err)
            })
        },
    },
    mounted() {
        this.getAuthor()
    }
}
</script>

<style>
.story-card .sc-loader .scl-load{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border:8px solid lightblue;
    border-top-color:#fff;
    animation: scl-load .5s linear infinite;
}
@keyframes scl-load{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
.story-card {
  height: 200px;
  width: 120px;
  background-color:white;
  margin:0 auto;
  box-shadow: 0 0 4px rgba(0,0,0,0.4);
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
.story-card:hover .sci-cover{
    opacity: 0.7;
    filter: blur(1px);
}
.story-card:hover .sci-cover img,
.story-card:hover .sci-cover video{
    transform: scale(1.05);
}
.story-card .sc-inner {
    height: 100%;
    width: 100%;
}
.story-card .sc-inner .sci-cover {
    height: 100%;
    width: 100%;
    opacity: 0.9;
}
.story-card .sc-inner .sci-author-avatar {
    height: 35px;
    width: 35px;
    position: absolute;
    top:10px;
    left:20px;
    overflow: hidden;
    border:3px solid;
    border-radius: 50%;
    z-index: 10;
}
.story-card .sc-inner .sci-author-name {
    position: absolute;
    bottom:5px;
    left:50%;
    color:white;
    transform: translateX(-50%);
    font-weight: bolder;
    font-size: 15px;
}
</style>