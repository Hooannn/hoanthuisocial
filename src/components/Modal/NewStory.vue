<template>
  <div @click='close_' class="new-story-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">New Story</h4>
        <button @click='close' type="button" class="close" >&times;</button>
      </div>
      <div class="modal-body">
        <div v-if='file' class="mb-story-preview center">
            <div :style="{'--duration':file.duration+'s'}" class="mbsp-duration"></div>
            <div class="mbsp-container center">
                <img v-if='file.type=="image"' style='pointerEvents:none' :src="file.url" alt="Image">
                <video loop v-if='file.type=="video"' style='pointerEvents:none' autoplay :src="file.url"></video>
            </div>
        </div>
        <div v-if='!file' class="mb-story-preview center">
            <div>Upload an image or video</div>
        </div>
      </div>
      <div class="modal-footer">
        <button @click='uploadStory' type="button" class="btn btn-secondary btn-sm" >Upload</button>
        <button @click='createStory' :disabled='file==null||file==undefined' type="button" class="btn btn-primary btn-sm" >Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/store'
import client from '@/plugins/filestack'
import db from '@/plugins/firebase'
export default {
    data() {
        return {
            file:null
        }
    },
    watch:{
      "$store.state.file" (val) {
        this.file = val
      }
    },
    methods:{
      close() {
        this.file==null
        this.$store.state.file==null
        document.querySelector('#app div.new-story-modal').classList.remove('show');
      },
      close_(e) {
        if (e.target==document.querySelector('#app div.new-story-modal')) {
          this.close();
        }
      },
      uploadStory() {
        const options = {
            accept: ["image/*","video/*"],
            maxFiles: 1,
            uploadInBackground: false,
            onUploadDone: (res) => {
            let file=res.filesUploaded[0]
            if (file.mimetype.substring(0,5)=='image') {
              store.state.file={
                type:'image',
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
                  type:'video',
                  url:file.url,
                  duration:duration
                }
              }
              video.src = file.url;
            }
          },
        };
        client.picker(options).open();
      },
      createStory() {
        let newStory
        if (this.file.type=='image') {
          newStory={
            author:this.$store.state.ukey,
            date:new Date().toLocaleString(),
            duration:this.file.duration,
            status:'active',
            time:new Date().getTime(),
            type:this.file.type,
            images:[
              this.file.url
            ],
            reacts:{
              angries:0,
              hahas:0,
              wows:0,
              likes:0,
              loves:0,
              sads:0,
            }
          }
        }
        else if (this.file.type=="video") {
          newStory={
            author:this.$store.state.ukey,
            date:new Date().toLocaleString(),
            duration:this.file.duration,
            status:'active',
            time:new Date().getTime(),
            type:this.file.type,
            videos:[
              this.file.url
            ],
            reacts:{
              angries:0,
              hahas:0,
              wows:0,
              likes:0,
              loves:0,
              sads:0,
            }
          }
        }
        this.$store.dispatch('loading')
        db.ref('stories').push(newStory).then(()=>{
          this.$store.dispatch('unload')
          this.close();
        }).catch((err)=>{
          this.$store.dispatch('unload')
          alert(err.message);
        })
      }
    }
}
</script>

<style>
.new-story-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: none;
  justify-content: center;
  align-items: center;
}
.new-story-modal.show {
  display: flex;
}
.new-story-modal .modal-content {
  width: 500px;
  height: auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  animation: fadeIn .5s linear;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(200%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.new-story-modal .modal-header {
  border-bottom: 1px solid #e5e5e5;
}
.new-story-modal .modal-title {
  font-size: 17px;
  font-weight: bold;
}
.new-story-modal .modal-body {
  padding: 20px;
}
.new-story-modal .modal-body .mb-story-preview {
    margin:0 auto;
    width: 250px;
    height: 450px;
    background-color: #d3d3d3;
    border-radius: 5px;
    position: relative;
    margin-bottom: 10px;
}
.new-story-modal .modal-body .mb-story-preview .mbsp-duration {
    position: absolute;
    top:10px;
    width: 95%;
    height: 7px;
    left:50%;
    transform: translateX(-50%);
    border-radius: 10px;
    overflow: hidden;
    background-color: silver;
}
.new-story-modal .modal-body .mb-story-preview .mbsp-duration::after {
    content:"";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    animation: mbsp-duration-animation var(--duration) linear infinite;
}
.new-story-modal .modal-body .mb-story-preview .mbsp-container {
  width: 100%;
  height: 95%;
}
.new-story-modal .modal-body .mb-story-preview .mbsp-container img,
.new-story-modal .modal-body .mb-story-preview .mbsp-container video {
  max-height: 100%;
  width: 100%;
  object-fit: cover;
}
@keyframes mbsp-duration-animation {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  } 
}
.new-story-modal .modal-footer {
  border-top: 1px solid #e5e5e5;
  padding: 10px;
}
.new-story-modal .modal-footer button {
  margin-right: 10px;
}

</style>