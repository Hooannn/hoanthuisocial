<template>
  <div class="stories-area" >
    <div class="sa-create">
      <img :src="$store.state.avatarImg" alt="Image">
      <div class="sac-icon">
        <ion-icon name="add-circle"></ion-icon>
        <div>New story</div>
      </div>
      <div class="sac-cover"></div>
    </div>
    <div v-if='!load && stories.length>0' class="sa-container">
      <carousel :responsive="{0:{items:1},500:{items:2},768:{items:1},990:{items:2},1200:{items:3}}" class='sac-carousel' style='position:relative' :dots="false" :autoplay="false" :nav="false" :items=3>
        <template slot="prev"><span class="prev"><ion-icon onMouseOut='this.style.fontSize="25px"' onMouseOver='this.style.fontSize="28px"' style='zIndex:5;fontSize:25px;position:absolute;left:0;top:50%;transform:translateY(-50%);cursor:pointer;color:orangered' class='previous-icon' name="chevron-back-circle-outline"></ion-icon></span></template>
          <story-card v-for='(s,index) in stories' :key='"Story"+index' :story='s'/>
        <template slot="next"><span class="next"><ion-icon onMouseOut='this.style.fontSize="25px"' onMouseOver='this.style.fontSize="28px"' style='zIndex:5;fontSize:25px;position:absolute;right:0;top:50%;transform:translateY(-50%);cursor:pointer;color:orangered' class='next-icon' name="chevron-forward-circle-outline"></ion-icon></span></template>
      </carousel>
    </div>
    <div v-if='load' class="sa-container center">
      <div class='sac-loader'></div>
    </div>
    <div v-if='!load && stories.length==0' class="sa-container center">
      <span>You have no stories in current.</span>
    </div>
  </div>
</template>

<script>
import store from '@/store/store'
import client from '@/plugins/filestack'
import db from '@/plugins/firebase'
import carousel from 'vue-owl-carousel'
import StoryCard from './StoryCard.vue'
export default {
    components:{carousel,StoryCard},
    data() {
      return {
        stories:[],
        load:true,
        file:null,
      }
    },
    watch:{
      "$store.state.file" (val) {
        this.file = val
      },
      stories() {
        this.stories.forEach(story => {
          if (this.isOverADay(story.time)) {
            db.ref('stories').child(story[".key"]).update({
              status:"expired",
            })
          }
        });
      }
    },
    methods:{
      // onCh(e) {
      //   let file = e.target.files[0]
      //   var video = document.createElement('video');
      //   video.preload = 'metadata';

      //   video.onloadedmetadata = function() {
      //     window.URL.revokeObjectURL(video.src);
      //     var duration = video.duration;
      //     console.log(duration)
      //   }
      //   video.src = URL.createObjectURL(file);;
      // },
      isOverADay(date) {
        let now = new Date()
        let then = new Date(date)
        let diff = now.getTime() - then.getTime()
        if (diff > 86400000) {
          return true
        }
        return false
      },
      uploadFiles() {
        const options = {
            accept: ["image/*","video/*"],
            maxFiles: 1,
            uploadInBackground: false,
            onUploadDone: (res) => {
            let file=res.filesUploaded[0]
            if (file.mimetype.substring(0,5)=='image') {
              store.state.file={
                url:file.url,
                duration:15
              }
            }
            else if (file.mimetype.substring(0,5)=='video') {
              var video = document.createElement('video');
              video.preload = 'metadata';
              video.onloadedmetadata = function() {
                window.URL.revokeObjectURL(video.src);
                var duration = video.duration;
                store.state.file={
                  url:file.url,
                  duration:duration
                }
              }
              video.src = file.url;
            }
          },
        };
      client.picker(options).open();
      }
    },
    mounted() {
      this.$rtdbBind('stories',db.ref('stories').orderByChild("status").equalTo("active")).then(()=>{
        this.stories = this.stories.sort((a,b)=>{
          return b.time - a.time
        })
        this.load=false
      }).catch(err=>{
        console.log(err)
        this.load=false
      })
    }
}
</script>

<style>
.stories-area .sac-loader {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border:8px solid lightblue;
  border-top-color:#fff;
  animation: spin3 .5s linear infinite;
}
.stories-area {
  display: flex;
  align-items: center;
  height: 220px;
  width: 100%;
  background-color:rgba(255,255,255,0.5);
  border-radius: 3px;
  box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
  margin-bottom: 25px;
  overflow: hidden;
}
.stories-area .sa-create {
  min-height: 200px;
  min-width: 120px;
  height: 200px;
  width: 120px;
  border-radius: 5px;
  margin:0 10px;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0,0,0,0.4);
  position: relative;
  cursor: pointer;
}
.stories-area .sa-create:hover .sac-cover {
  opacity: 1;
  visibility: visible;
}
.stories-area .sa-create .sac-cover {
  width: 100%;
  height: 100%;
  background-color:rgba(0,0,0,0.2);
  position: absolute;
  top:0;
  left:0;
  z-index: 10;
  visibility: hidden;
  opacity: 0;
  transition: .2s linear;
}
.stories-area .sa-create:hover img {
  transform: scale(1.03);
}
.stories-area .sa-create img {
  width: 100%;
  height:100%;
  object-fit: cover;
  transition: .2s linear;
}
.stories-area .sa-create .sac-icon {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  position: absolute;
  top:0;
  left:0;
  color:white;
}
.stories-area .sa-create .sac-icon ion-icon {
  font-size: 37px;
  color:orange;
}
/* */
.stories-area .sa-container {
  height: 100%;
  width: 75%;
  align-items: center;
  display: flex;
}
.stories-area .sa-container .sac-carousel {
  height: 220px;
  width: 100%;
  display: flex;
  align-items: center;
}
/* */
/*  */
@media only screen and (max-width: 1200px) {
  /* For mobile phones: */
    .stories-area .sa-container {
      width: 70%;
    }
}
@media only screen and (max-width: 990px) {
  /* For mobile phones: */
    .stories-area .sa-container {
      width: 60%;
    }
}
@media only screen and (max-width: 360px) {
  /* For mobile phones: */
    .stories-area .sa-container {
      width: 50%;
    }
}
@media only screen and (max-width: 768px) {
    .stories-area .sa-container {
      width: 70%;
    }
}
@media only screen and (max-width: 450px) {
    .stories-area .sa-container {
      width: 65%;
    }
}
@media only screen and (max-width: 400px) {
    .stories-area .sa-container {
      width: 60%;
    }
}
</style>