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
      <carousel class='sac-carousel' style='position:relative' :autoHeight="true" :dots="false" :autoplay="false" :nav="false" :items=3>
        <story-card v-for='(s,index) in stories' :key='"Story"+index' :story='s'/>
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
import db from '@/plugins/firebase'
import carousel from 'vue-owl-carousel'
import StoryCard from './StoryCard.vue'
export default {
    components:{carousel,StoryCard},
    data() {
      return {
        stories:[],
        load:true,
      }
    },
    mounted() {
      this.$rtdbBind('stories',db.ref('stories')).then(()=>{
        this.stories = this.stories.sort((a,b)=>{
          return b.createdAt - a.createdAt
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
  width: 100%;
}
.stories-area .sa-container .sac-carousel {
  height: 220px;
  display: flex;
  align-items: center;
}
/* */
</style>