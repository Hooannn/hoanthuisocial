<template>
  <div class="prehome-view">
      <div class="pv-scroll-icon center" style='zIndex:10'>
          <ion-icon name="chevron-down-outline"></ion-icon>
          <ion-icon style='marginTop:-40px' name="chevron-down-outline"></ion-icon>
      </div>
      <div class="pv-navbar">
          <div class="container">
              <div class="pvn-logo">
                  <img @click='$router.push({name:"pre-home"})' style='height:100%;objectFit:contain;cursor:pointer' :src="logo" alt="Text logo">
              </div>
              <div class="pvn-navmobile center">
                  <ion-icon name="menu-outline"></ion-icon>
              </div>
              <div class="pvn-items">
                  <div v-for='i in item' :key='i' class="pvn-item">
                      {{i}}
                  </div>
                  <button @click='$router.push({name:"login"})' class='pvn-button'>JOIN</button>
              </div>
          </div>
      </div>
      <div class="pv-sec sec-1 center">
          <div class="pvs-content">
              <div ><img style='width:100%;objectFit:contain' :src="titles[0]" alt="header"></div>
              <div style='animationDelay:1.7s'>Fast and easy.</div>
              <div style='animationDelay:2.4s'>Connect to the whole world...</div>
              <div style='animationDelay:3.1s;fontSize:16px;justifyContent:end;marginTop:10px' class='center'>
                  <button @click='$router.push({name:"login"})' style='borderColor:lightcoral;color:lightcoral' class="pvn-button">GET START</button>
              </div>
          </div>
          <div class="pvs-image">
              <img :src="images[2]" alt="Image">
          </div>
      </div>
      <div class="pv-sec sec-2 center">
          <div class="pvs-image">
              <img :src="images[3]" alt="Image">
          </div>
          <div class="pvs-content">
              <div ><img style='width:100%;objectFit:contain' :src="titles[1]" alt="header"></div>
              <div style='animationDelay:1.7s'>Chat and video chat.</div>
              <div style='animationDelay:2.4s'>With you friends and family</div>
              <div style='animationDelay:3.1s;fontSize:16px;justifyContent:end;marginTop:10px' class='center'>
                  <button @click='$router.push({name:"login"})' style='borderColor:var(--orange);color:var(--orange)' class="pvn-button">TRY IT NOW</button>
              </div>
          </div>
      </div>
      <div class="pv-sec sec-3 center">
          <div class="pvs-content">
              <div ><img style='width:100%;objectFit:contain' :src="titles[2]" alt="header"></div>
              <div style='animationDelay:1.7s'>Use it everywhere</div>
              <div style='animationDelay:2.4s'>With any device...</div>
              <div style='animationDelay:3.1s;fontSize:16px;justifyContent:end;marginTop:10px' class='center'>
                  <button @click='$router.push({name:"login"})' style='borderColor:var(--dark);color:var(--dark)' class="pvn-button">JOIN US</button>
              </div>
          </div>
          <div class="pvs-image">
              <img :src="images[4]" alt="Image">
          </div>
      </div>
      <div class="pv-pages-info">
          <digital-clock/>
          <div class="container">
              <div class="pvpi-users">
                <vue-ellipse-progress :progress="getUserProcess||0" :color="'orange'" emptyColor="lightblue" emptyColorFill="white" :size="120" lineMode="in 15" 
                :legend="true" :legendValue="getOnlineUsers||0" animation="reverse 1000 600" fontColor="black" :half="false" fontSize="17px" :thickness="13"
                emptyThickness="10%"/>
                <span style=';fontSize:17px' slot="legend-value">/{{getTotalUsers}} users</span>
                <p style='color:slategrey;marginTop:5px;' slot="legend-caption">USERS ONLINE</p>
              </div>
              <div class="pvpi-pages">
                <vue-ellipse-progress :progress="getPageProcess||0" :color="'orange'" emptyColor="lightblue" emptyColorFill="white" :size="120" lineMode="in 15" 
                :legend="true" :legendValue="getOnlinePages||0" animation="reverse 1000 600" fontColor="black" :half="false" fontSize="17px" :thickness="13"
                emptyThickness="10%"/>
                <span style=';fontSize:17px' slot="legend-value">/{{getTotalPages}} pages</span>
                <p style='color:slategrey;marginTop:5px;' slot="legend-caption">PAGES ACTIVE</p>
              </div>
              <div class="pvpi-groups">
                <vue-ellipse-progress :progress="100" :color="'orange'" emptyColor="lightblue" emptyColorFill="white" :size="120" lineMode="in 15" 
                :legend="true" :legendValue="groups.length" animation="reverse 1000 600" fontColor="black" :half="false" fontSize="17px" :thickness="13"
                emptyThickness="10%"/>
                <span style=';fontSize:17px' slot="legend-value">/{{groups.length}} groups</span>
                <p style='color:slategrey;marginTop:5px;' slot="legend-caption">GROUPS ACTIVE</p>
              </div>
          </div>
      </div>
      <div class="pv-top-rates">
          <div class="container">
              <div class="pvtr-item pvtr-user">
                  <div class='pvtri-title'>Famous Profile</div>
                  <div v-if='!getFamousUser' class="pv-loader"></div>
                  <div class='pvtri-container' v-if='getFamousUser'>
                    <div class='pvtri-detail' >
                        <div style='position:relative' class='pvtri-image'>
                            <img :src="getFamousUser.avatarImg" alt="Avatar img">
                            <div :style='{backgroundColor:getFamousUser.status=="Online" ? "green":"gray" }' style='width:15px;height:15px;borderRadius:50%;position:absolute;right:-5px;bottom:-5px;'></div>
                        </div>
                        <div class='pvtri-name' >
                            <span>{{getFamousUser.username}}</span>
                            <span >Follows: {{Object.keys(getFamousUser.follows.followed).length}}</span>
                        </div>
                    </div>
                    <div class='pvtri-des'>
                        "{{getFamousUser.description}}"
                    </div>
                  </div>
              </div>
              <div class="pvtr-item pvtr-page">
                  <div class='pvtri-title'>Most Popular Page</div>
                  <div v-if='!getFamousPage' class="pv-loader"></div>
                  <div class='pvtri-container' v-if='getFamousPage'>
                      <div class='pvtri-detail' >
                        <div style='position:relative' class='pvtri-image'>
                            <img :src="getFamousPage.avatarImg" alt="Avatar img">
                            <div :style='{backgroundColor:getFamousPage.status=="Online" ? "green":"gray" }' style='width:15px;height:15px;borderRadius:50%;position:absolute;right:-5px;bottom:-5px;'></div>
                        </div>
                        <div class='pvtri-name' >
                            <span>{{getFamousPage.username}}</span>
                            <span >Likes: {{Object.keys(getFamousPage.follows.followed).length}}</span>
                        </div>
                      </div>
                      <div class='pvtri-des'>
                        "{{getFamousPage.description}}"
                      </div>
                  </div>
              </div>
              <div class="pvtr-item pvtr-group">
                  <div class='pvtri-title'>Most Active Group</div>
                  <div v-if='!getFamousGroup' class="pv-loader"></div>
                  <div v-if='getFamousGroup' class='pvtri-container'>
                      <div class='pvtri-detail' >
                        <div class='pvtri-image'>
                            <img :src="getFamousGroup.avatarImg" alt="Avatar img">
                        </div>
                        <div class='pvtri-name' >
                            <span>{{getFamousGroup.groupname}}</span>
                            <span>Members: {{Object.keys(getFamousGroup.members).length}}</span>
                        </div>
                      </div>
                      <div class='pvtri-des'>
                        "{{getFamousGroup.description}}"
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <footer-bar/>
  </div>
</template>

<script>
import DigitalClock from '@/components/General/DigitalClock.vue'
import FooterBar from '@/components/General/FooterBar.vue'
import db from '@/plugins/firebase'
import { VueEllipseProgress } from "vue-ellipse-progress";
import inn1 from '@/assets/images/inn1.png'
import inn2 from '@/assets/images/inn2.png'
import inn3 from '@/assets/images/inn3.png'
import inn4 from '@/assets/images/inn4.png'
import inn5 from '@/assets/images/inn5.png'
import inn6 from '@/assets/images/inn6.png'
import h1 from '@/assets/images/h1.png'
import h2 from '@/assets/images/h2.png'
import h3 from '@/assets/images/h3.png'
import textlogo from '@/assets/images/textlogo.png'
import carousel from 'vue-owl-carousel'
export default {
    components:{carousel,VueEllipseProgress,DigitalClock,FooterBar},
    data() {
        return {
            images:[
                inn1,inn2,inn3,inn4,inn5,inn6
            ],
            logo:textlogo,
            titles:[
                h1,
                h2,
                h3
            ],
            item:[
                "ABOUT","FEATURE","CONTACT","HELP"
            ],
            users:[],
            groups:[]
        }
    },
    computed:{
        getTotalUsers() {
            let totalUsers=0
            this.users.forEach(u => {
                if (u.type=='user') {
                    totalUsers++
                }
            });
            return totalUsers
        },
        getOnlineUsers() {
            let onlineUsers=0
            this.users.forEach(u => {
                if (u.type=='user'&& u.status=="Online") {
                    onlineUsers++
                }
            });
            if (onlineUsers==0) {
                return "0"
            }
            return onlineUsers
        },
        getUserProcess() {
            return Math.floor((this.getOnlineUsers/this.getTotalUsers)*100)
        },
        getTotalPages() {
            let totalPages=0
            this.users.forEach(u => {
                if (u.type=='page') {
                    totalPages++
                }
            });
            return totalPages
        },
        getOnlinePages() {
            let onlinePages=0
            this.users.forEach(u => {
                if (u.type=='page'&& u.status=="Online") {
                    onlinePages++
                }
            });
            if (onlinePages==0) {
                return "0"
            }
            return onlinePages
        },
        getPageProcess() {
            return Math.floor((this.getOnlinePages/this.getTotalPages)*100)
        },
        getFamousUser() {
            let maxFollow=0
            let famousUser={}
            this.users.forEach(u => {
                if (u.follows&&u.follows.followed&&u.type=='user') {
                    if (Object.keys(u.follows.followed).length>=maxFollow) {
                        maxFollow=Object.keys(u.follows.followed).length
                        famousUser=u
                    }
                }
                else console.log('no follow')
            });
            return famousUser
        },
        getFamousPage() {
            let maxFollow=0
            let famousPage={}
            this.users.forEach(u => {
                if (u.follows&&u.follows.followed&&u.type=='page') {
                    if (Object.keys(u.follows.followed).length>=maxFollow) {
                        maxFollow=Object.keys(u.follows.followed).length
                        famousPage=u
                    }
                }
                else console.log('no follow')
            });
            return famousPage
        },
        getFamousGroup() {
            let maxFollow=0
            let famousGroup={}
            this.groups.forEach(gr => {
                if (gr.members) {
                    if (Object.keys(gr.members).length>=maxFollow) {
                        maxFollow=Object.keys(gr.members).length
                        famousGroup=gr
                    }
                }
            });
            return famousGroup
        }
    },
    methods:{
        onScroll(e) {
            console.log(document.documentElement.scrollTop)
            if (document.documentElement.scrollTop<=50) {
                document.querySelector('#app > div.prehome-view > div.pv-sec.sec-2.center').classList.remove('active')
            }
            if (document.documentElement.scrollTop>50) {
                document.querySelector('#app > div.prehome-view > div.pv-sec.sec-2.center').classList.add('active')
            }
            if (document.documentElement.scrollTop<=870) {
                document.querySelector('#app > div.prehome-view > div.pv-sec.sec-3.center').classList.remove('active')
            }
            if (document.documentElement.scrollTop>870) {
                document.querySelector('#app > div.prehome-view > div.pv-sec.sec-3.center').classList.add('active')
            }
            if (document.documentElement.scrollTop<=1400) {
                document.querySelector('#app > div.prehome-view > div.pv-pages-info').classList.remove('active')
                document.querySelector('#app > div.prehome-view > div.pv-scroll-icon').classList.remove('hide')
            }
            if (document.documentElement.scrollTop>1400) {
                document.querySelector('#app > div.prehome-view > div.pv-pages-info').classList.add('active')
                document.querySelector('#app > div.prehome-view > div.pv-scroll-icon').classList.add('hide')
            }
        }
    },
    mounted() {
        document.documentElement.scrollTop=0
        document.addEventListener('scroll', this.onScroll)
        this.$store.dispatch('loading')
        this.$rtdbBind('users',db.ref('usersInformation')).then(()=>{
            this.$rtdbBind('groups',db.ref('groups')).then(()=>{
                this.$store.dispatch('unload')
            }).catch(err=>{this.$store.dispatch('unload')})
        }).catch(err=>{this.$store.dispatch('unload')})
    },
    destroyed() {
        document.removeEventListener('scroll',this.onScroll)
    }
}
</script>

<style>
.prehome-view .pv-top-rates .pvtr-item .pv-loader {
  width: 40px;
  height: 40px;
  border:10px solid rgb(230, 227, 227);
  border-top-color:var(--cyan);
  border-radius: 50%;
  animation: spin3 .5s linear infinite;
  margin:0 auto;
}
.prehome-view {
    width: 100vw;
    min-height: 100vh;
    padding-top:70px;
    background-color: #ffffff;
    font-family: 'Raleway', sans-serif;
    background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);
    overflow-x:hidden;
}
.prehome-view .pv-scroll-icon {
    z-index:10;
    position: fixed;
    bottom:100px;
    left:50%;
    transform: translateX(-50%);
    font-size: 55px;
    animation:scroll-appear 1.5s ease-in-out infinite;
    flex-direction: column;
    color:var(--secondary);
}
.prehome-view .pv-scroll-icon.hide {
    display: none;
}
.prehome-view .pv-navbar {
    height: 70px;
    width: 100%;
    background-color: white;
    box-shadow: 0 0 3px 3px rgba(0,0,0,0.3);
    position: absolute;
    z-index: 10;
    top:0;
    left:0;
}
.prehome-view .pv-navbar .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}
.prehome-view .pv-navbar .container .pvn-logo {
    width: 40%;
    height: 70%;
}
.prehome-view .pv-navbar .container .pvn-items {
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.prehome-view .pv-navbar .container .pvn-navmobile {
    display: none;
}
.pvn-button {
    border-radius: 70px;
    border:none;
    outline:none;
    background: transparent;
    border:2px solid var(--orange);
    width: 120px;
    padding:5px 0;
    font-weight: bolder;
    color:var(--orange);
    cursor: pointer;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.4);
    transition:.2s linear;
}
.pvn-button:focus {
    color:orangered;
    border-color: orangered;
    outline:none;
}
.pvn-button:hover {
    box-shadow: none;
    background-color:rgb(250, 241, 226);
}
.prehome-view .pv-navbar .container .pvn-items .pvn-item {
    font-weight: bolder;
    transition: .2s linear;
    cursor: pointer;
}
.prehome-view .pv-navbar .container .pvn-items .pvn-item:hover {
    color:orangered;
}
.prehome-view .pv-sec {
    height: 700px;
    width: 100%;
    box-shadow: 0 0 3px 1px rgba(0,0,0,0.3);
}
.prehome-view .pv-sec.sec-1 {   
    transform: translateX(-100%);
    animation: slide-right-hero 1s linear forwards;
}
.prehome-view .pv-sec.sec-1 .pvs-content {
    color:white;
    background-color: #d3d3d3;
    background-image: linear-gradient(315deg, #d3d3d3 0%, #57606f 74%);
}
.prehome-view .pv-sec.sec-2 {   
    transform: translateX(100%);
    transition:1s linear;
}
.prehome-view .pv-sec.sec-2.active {
    transform: translateX(0);
}
.prehome-view .pv-sec.sec-2.active .pvs-content {
    display: flex;
}
.prehome-view .pv-sec.sec-2 .pvs-content {
    display: none;
    background-color: #f6ecc4;
    background-image: linear-gradient(315deg, #f6ecc4 0%, #f7d4d4 74%);
}
.prehome-view .pv-sec.sec-3 {   
    transform: translateX(-100%);
    transition:1s linear;
}
.prehome-view .pv-sec.sec-3.active {
    transform: translateX(0);
}
.prehome-view .pv-sec.sec-3.active .pvs-content {
    display: flex;
}
.prehome-view .pv-sec.sec-3 .pvs-content {
    display: none;
    color:slategray;
    background-color: #ffffff;
    background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);
}
.prehome-view .pv-sec .pvs-image {
    width: 80%;
    height: 100%;
}
.prehome-view .pv-sec .pvs-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.prehome-view .pv-sec .pvs-content {
    width: 20%;
    height: 100%;
    flex-direction: column;
    display: flex;
    font-size: 23px;
    padding:0 15px;
    justify-content: center;
}
.prehome-view .pv-sec .pvs-content div {
    opacity: 0;
    animation: text-appear .7s linear forwards;
    animation-delay: 1s;
    font-style: italic;
}
.prehome-view .pv-sec .pvs-content div:first-child{
    width: 90%;
    margin:10px 0;
}
.prehome-view .pv-sec .pvs-content div:not(div:first-child) {
    padding:0 20px;
}
/**/
.prehome-view .pv-pages-info {
    padding:25px 0;
    width: 100%;
    box-shadow: 0 0 2px 2px rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    font-family: "Poppins", sans-serif;
    transform:translateY(-50px);
    opacity: 0;
    transition:1s linear;
    background-color:rgba(255,255,255,0.7);
}
.prehome-view .pv-pages-info.active {
    opacity: 1;
    transform: translateY(0);
}
.prehome-view .pv-pages-info .container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: bolder;
} 
/**/
/**/
.prehome-view .pv-top-rates {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: "Poppins", sans-serif;
}
.prehome-view .pv-top-rates .pvtr-item {
    padding:15px;
    margin:15px 0;
    box-shadow: 1px 1px 4px rgba(0,0,0,0.3);
    background-color:white;
    border-radius: 10px;
}
.prehome-view .pv-top-rates .pvtr-item .pvtri-title{
    font-size: 20px;
    color:lightslategray;
    padding:5px 0;
    font-weight: bolder;
}
.prehome-view .pv-top-rates .pvtr-item .pvtri-container {
    display:flex;
    align-items: center;
    flex-wrap:wrap;
    justify-content:space-between;
}
.prehome-view .pv-top-rates .pvtr-item .pvtri-container .pvtri-des {
    max-width: 300px;
    padding:10px;
    border:1px solid silver;
    border-radius: 5px;
}
.prehome-view .pv-top-rates .pvtr-item .pvtri-container .pvtri-detail {
    display:flex;
    align-items: center;
}
.prehome-view .pv-top-rates .pvtr-item .pvtri-container .pvtri-detail .pvtri-image{
    width: 100px;
    height: 100px;
}
.prehome-view .pv-top-rates .pvtr-item .pvtri-container .pvtri-detail .pvtri-image img{
    width: 100%;
    border-radius: 10px;
    height: 100%;
    object-fit:cover;
}
.prehome-view .pv-top-rates .pvtr-item .pvtri-container .pvtri-detail .pvtri-name{
    display:flex;
    flex-direction:column;
    margin-left:10px;
}
.prehome-view .pv-top-rates .pvtr-item .pvtri-container .pvtri-detail .pvtri-name span:nth-child(1) {
    font-weight: bolder;
    font-size: 18px;
}
.prehome-view .pv-top-rates .pvtr-item .pvtri-container .pvtri-detail .pvtri-name span:nth-child(2) {
    font-style: italic;
}
/**/
/* animation */
@keyframes slide-right-hero {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
@keyframes text-appear {
    0% {
        opacity: 0;
        transform: translateY(200px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes scroll-appear {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: translateX(-50%) translateY(0);
    }
}

/* responsive */
@media only screen and (max-width: 1280px) {
    
}
@media only screen and (max-width: 1190px) {
    .prehome-view .pv-pages-info {
        flex-direction: column;
    }
    .prehome-view .pv-sec .pvs-image {
        width: 70%;
    }
    .prehome-view .pv-sec .pvs-content {
        width: 30%;
    }
}
@media only screen and (max-width: 768px) {
    .prehome-view {
        padding-top:55px;
    }
    .prehome-view .pv-sec .pvs-image {
        width: 100%;
    }
    .prehome-view .pv-sec .pvs-content {
        width: 100%;
        font-size: 16px;
    }
    .prehome-view > .pv-sec > .pvs-content > div:nth-child(1) {
        width: 200px;
    }
    .prehome-view .pv-pages-info .container {
        flex-direction: column;
    }
    .prehome-view .pv-top-rates .pvtr-item .pvtri-container {
        flex-direction: column;
    }
    .prehome-view .pv-top-rates .pvtr-item .pvtri-container .pvtri-detail,
    .prehome-view .pv-top-rates .pvtr-item .pvtri-container .pvtri-des {
        margin:10px 0;
    }
    .prehome-view .pv-navbar {
        height: 55px;
    }
    .prehome-view .pv-navbar .container {
        justify-content: space-between;
        width: 95%;
    }
    .prehome-view .pv-navbar .container .pvn-logo {
        display: none;
    }
    .prehome-view .pv-navbar .container .pvn-items div {
        display: none;
    }
    .prehome-view .pv-navbar .container .pvn-items {
        width: auto;
    }
    .prehome-view .pv-navbar .container .pvn-navmobile {
       display: flex;
       font-size: 30px;
       height: 100%;
    }
    .prehome-view .pv-sec {
        flex-direction: column;
    }
    #app > div.prehome-view > div.pv-sec.sec-2.center.active > div.pvs-image {
        order: 2;
    }
}
@media only screen and (max-width: 575px) {
    #app > div.prehome-view > div.pv-top-rates > div > div.pvtr-item {
        width: 95%;
        margin-left: auto;
        margin-right: auto;
    }
}
/*  */
</style>