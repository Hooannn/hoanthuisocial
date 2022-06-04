<template>
  <div class="story-detail-cover">
        <div class="sd-sidebar"></div>
        <div v-if='load' class="sd-main center">
            <div class='sdm-loader'></div>
        </div>
        <div v-if='!load' class="sd-main center">
            <div class="sdm-story">
                <div :style="{'--duration':story.duration+'s'}" class="sdms-duration"></div>
            </div>
        </div>
  </div>
</template>

<script>
import router from '@/router/router'
import db from '@/plugins/firebase'
export default {
    data() {
        return {
            story:{},
            load:true,
        }
    },
    methods:{
        getStory() {
            this.$rtdbBind('story',db.ref('stories').child(this.$route.params.id)).then(()=>{
                this.load = false
                this.setTimeLeave()
            }).catch(err=>{
                console.log(err)
            })
        },
        setTimeLeave() {
            setTimeout(() => {
                router.go(-1)
            }, (this.story.duration * 1000));
        }
    },
    mounted() {
        this.getStory()
    }
}
</script>

<style>
.story-detail-cover {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.8);
    z-index: 9999;
    display: flex;
}
.story-detail-cover .sd-sidebar {
    width: 30%;
    height: 100%;
}
.story-detail-cover .sd-main {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
}
.story-detail-cover .sd-main .sdm-loader {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border:8px solid lightblue;
    border-top-color:#fff;
    animation: spin3 .5s linear infinite;
}
.story-detail-cover .sd-main .sdm-story {
    height: 800px;
    width: 425px;
    background-color:#313131;
    box-shadow: 0 0 2px solid white;
    border-radius: 5px;
    position: relative;
}
.story-detail-cover .sd-main .sdm-story .sdms-duration {
    position:absolute;
    top:10px;
    left:50%;
    transform: translateX(-50%);
    width:90%;
    height: 6px;
    background-color:silver;
    overflow: hidden;
    border-radius: 20px;
}
.story-detail-cover .sd-main .sdm-story .sdms-duration::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    animation: move var(--duration) linear;
}
@keyframes move {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}
</style>