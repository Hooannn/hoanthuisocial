<template>
  <div class="story-detail-cover">
        <div @click='$router.go(-1)' class="sdc-close center"><ion-icon name="close-circle-outline"></ion-icon></div>
        <div class="sd-sidebar"></div>
        <div v-if='load' class="sd-main center">
            <div class='sdm-loader'></div>
        </div>
        <div v-if='!load' class="sd-main center">
            <div class="sdm-story center">
                <div :style="{'--duration':story.duration+'s'}" class="sdms-duration"></div>
                <div class="sdms-info">
                    <div class="sdmsi-ava">
                        <img style='width:100%;height:100%;objectFit:cover' :src="$route.query.i" alt="Avatar">
                    </div>
                    <div class="sdmsi-username">
                        <span>{{$route.query.u}}</span>
                    </div>
                    <div class="sdmsi-time">
                        <span>{{getTime}}</span>
                    </div>
                </div>
                <div v-if='story.type=="image"' class="sdms-content">
                    <img style='width:100%;height:100%;objectFit:cover' :src="story.images[0]" alt="Image">
                </div>
                <div v-if='story.type=="video"' class="sdms-content">
                    <video autoplay style='width:100%;height:100%;objectFit:cover;pointerEvents:none' :src="story.videos[0]" alt="Video"></video>
                </div>
                <div v-if='story.author==$store.state.ukey' class="sdms-owner">
                    <div class="sdmso-react">
                        <div v-for='(e,index) in emojis' :key='"sdmso-react"+index' class="sdmso-r-i">
                            <div class='center' style='width:15px;height:15px;borderRadius:15px;overflow:hidden;marginRight:3px'><img style='width:102%;height:102%;objectFit:cover' :src="e" alt="Emoji"></div>
                            <div v-if='index==0'>{{story.reacts.likes}}</div>
                            <div v-if='index==1'>{{story.reacts.loves}}</div>
                            <div v-if='index==2'>{{story.reacts.hahas}}</div>
                            <div v-if='index==3'>{{story.reacts.wows}}</div>
                            <div v-if='index==4'>{{story.reacts.sads}}</div>
                            <div v-if='index==5'>{{story.reacts.angries}}</div>
                        </div>
                    </div>        
                    <div class="sdmso-views">{{views.length}} views</div>        
                </div>
                <div class="sdms-bottom">
                    <div @click='reactStory(index)' v-for='(e,index) in emojis' :key="'react'+index" class="sdmsb-reaction">
                        <img style='width:102%;height:102%;objectFit:cover' :src="e" alt="Emoji">
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import like from '@/assets/icons/Story/like.png'
import love from '@/assets/icons/Story/love.png'
import haha from '@/assets/icons/Story/haha.png'
import wow from '@/assets/icons/Story/wow.png'
import sad from '@/assets/icons/Story/sad.png'
import angry from '@/assets/icons/Story/angry.png'
import router from '@/router/router'
import db from '@/plugins/firebase'
export default {
    data() {
        return {
            story:{},
            views:[],
            load:true,
            timer:null,
            emojis:[
                like,love,haha,wow,sad,angry    
            ]
        }
    },
    computed:{
      getTime() {
        let time=(new Date().getTime()-(this.story.time))/1000
        time = parseInt(time, 10);
        let hours   = Math.floor(time / 3600);
        let minutes = Math.floor((time - (hours * 3600)) / 60);
        let seconds = time - (hours * 3600) - (minutes * 60);
        let days=Math.floor(hours/24)
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
        else  {
            return "This story has been expired."
        }
      }
    },
    methods:{
        getStory() {
            this.$rtdbBind('story',db.ref('stories').child(this.$route.params.id)).then(()=>{
                this.getViews()
            }).catch(err=>{
                console.log(err)
            })
        },
        getViews() {
            this.$rtdbBind('views',db.ref('stories').child(this.$route.params.id).child('views')).then(()=>{
                this.load = false
                this.setTimeLeave()
            }).catch(err=>{
                console.log(err)
            })
        },
        setTimeLeave() {
            this.timer=setTimeout(() => {
                router.go(-1)
            }, (this.story.duration * 1000));
        },
        reactStory(index) {
            if (index==0) {
                document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(1)').style.animation='pop-up .7s linear'
                setTimeout(() => {
                    document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(1)').style.animation=''
                }, 700);
                db.ref('stories').child(this.$route.params.id).child('reacts').child("likes").set(this.story.reacts.likes++)
            }
            else if (index==1) {
                document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(2)').style.animation='pop-up .7s linear'
                setTimeout(() => {
                    document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(2)').style.animation=''
                }, 700);
                db.ref('stories').child(this.$route.params.id).child('reacts').child("loves").set(this.story.reacts.loves++)
            }
            else if (index==2) {
                document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(3)').style.animation='pop-up .7s linear'
                setTimeout(() => {
                    document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(3)').style.animation=''
                }, 700);
                db.ref('stories').child(this.$route.params.id).child('reacts').child("hahas").set(this.story.reacts.hahas++)
            }
            else if (index==3) {
                document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(4)').style.animation='pop-up .7s linear'
                setTimeout(() => {
                    document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(4)').style.animation=''
                }, 700);
                db.ref('stories').child(this.$route.params.id).child('reacts').child("wows").set(this.story.reacts.wows++)
            }
            else if (index==4) {
                document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(5)').style.animation='pop-up .7s linear'
                setTimeout(() => {
                    document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(5)').style.animation=''
                }, 700);
                db.ref('stories').child(this.$route.params.id).child('reacts').child("sads").set(this.story.reacts.sads++)
            }
            else if (index==5) {
                document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(6)').style.animation='pop-up .7s linear'
                setTimeout(() => {
                    document.querySelector('div.story-detail-cover > div.sd-main.center > div > div.sdms-bottom > div:nth-child(6)').style.animation=''
                }, 700);
                db.ref('stories').child(this.$route.params.id).child('reacts').child("angries").set(this.story.reacts.angries++)
            }
        }
    },
    mounted() {
        this.getStory()
    },
    destroyed() {
        clearTimeout(this.timer)
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
    background-color: rgba(0,0,0,0.83);
    z-index: 9999;
    display: flex;
}
.story-detail-cover .sdc-close {
    position: absolute;
    top: 10px;
    left:10px;
    color:silver;
    cursor: pointer;
    font-size: 40px;
    transition: .4s linear;
}
.story-detail-cover .sdc-close:hover {
    color:orange;
    transform: rotate(90deg);
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
.story-detail-cover .sd-main .sdm-story .sdms-info {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    left:30px;
    top:30px;
    color:white;
    align-items: center;
}
.story-detail-cover .sd-main .sdm-story .sdms-info .sdmsi-ava {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}
.story-detail-cover .sd-main .sdm-story .sdms-info .sdmsi-username {
    font-weight: bold;
}
.story-detail-cover .sd-main .sdm-story .sdms-info .sdmsi-time {
    font-size: 15px;
    color:silver;
}
.story-detail-cover .sd-main .sdm-story .sdms-content {
    max-height: 85%;
    width: 100%;
    overflow: hidden;
}
.story-detail-cover .sd-main .sdm-story .sdms-owner {
    width: 90%;
    display: flex;
    justify-content: space-between;
    bottom: 70px;
    align-items: center;
    position: absolute;
    color:white;
    font-size: 14px;
    font-weight: bolder;
}
.story-detail-cover .sd-main .sdm-story .sdms-owner .sdmso-react {
    display: flex;
    align-items: center;
    gap: 8px;
}
.story-detail-cover .sd-main .sdm-story .sdms-owner .sdmso-react .sdmso-r-i {
    display: flex;
    align-items: center;
}
.story-detail-cover .sd-main .sdm-story .sdms-bottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    bottom: 10px;
    align-items: center;
    position: absolute;
}
.story-detail-cover .sd-main .sdm-story .sdms-bottom .sdmsb-reaction {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    transition: .2s linear;
}
@keyframes pop-up {
    0% {
        transform: translateY(0);
        opacity: 1;
        pointer-events: none;
    }
    100% {
        transform: translateY(-20px);
        opacity: 0;
        pointer-events: none;
    }
}
.story-detail-cover .sd-main .sdm-story .sdms-bottom .sdmsb-reaction:hover {
    transform: scale(1.1);
}
</style>