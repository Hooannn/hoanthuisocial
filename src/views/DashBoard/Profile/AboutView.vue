<template>
  <div class="about-view">
      <div class="first-col">
          <div class="personal">
              <button v-if='$store.state.ukey==$route.params.key' style='marginTop:1px' @click='$router.push({name:"personal"})' class="btn btn-sm btn-secondary">Edit</button>
              <h5>Personal Info</h5>
              <div style='display:flex;justifyContent:space-between'><span style='fontWeight:bolder'>Member Since</span><span>{{user.registerDate}}</span></div>
              <div style='display:flex;justifyContent:space-between'><span style='fontWeight:bolder'>Lives in</span><span>Viet Nam</span></div>
              <div style='display:flex;justifyContent:space-between'><span style='fontWeight:bolder'>Birthday</span><span>{{user.dob}}</span> </div>
              <div style='display:flex;justifyContent:space-between'><span style='fontWeight:bolder'>Gender</span><span>{{user.gender}}</span></div>
              <div style='display:flex;justifyContent:space-between'><span style='fontWeight:bolder'>Status</span><span>{{user.statusrel}}</span></div>
              <div style='display:flex;justifyContent:space-between'><span style='fontWeight:bolder'>Email</span><span>{{user.email}}</span></div>
              <div style='display:flex;justifyContent:space-between'><span style='fontWeight:bolder'>Phone</span><span>{{user.phone}}</span></div>
          </div>
          <div class="social">
              <button v-if='$store.state.ukey==$route.params.key' style='marginTop:1px' @click='$router.push({name:"social-networks"})' class="btn btn-sm btn-secondary">Edit</button>
              <h5>Social Accounts</h5>
              <a v-if='socialAccounts.facebook!=""' target="_blank" :href='socialAccounts.facebook' class="fb"><i style='marginRight:5px;borderRadius:50%;color:#3B5998' class="fab fa-facebook-f"></i>{{socialAccounts.facebook}}</a>
              <a v-if='socialAccounts.youtube!=""' target="_blank" :href='socialAccounts.youtube' class="yt"><i style='marginRight:5px;borderRadius:50%;color:#E50914' class="fab fa-youtube"></i>{{socialAccounts.youtube}}</a>
              <a v-if='socialAccounts.twitter!=""' target="_blank" :href='socialAccounts.twitter' class="tw"><i style='marginRight:5px;borderRadius:50%;color:#1DA1F2' class="fab fa-twitter"></i>{{socialAccounts.twitter}}</a>
              <a v-if='socialAccounts.github!=""' target="_blank" :href='socialAccounts.github' class="github"><i style='marginRight:5px;borderRadius:50%;color:black' class="fab fa-github"></i>{{socialAccounts.github}}</a>
              <a v-if='socialAccounts.pinterest!=""' target="_blank" :href='socialAccounts.pinterest' class="pinterest"><i style='marginRight:5px;borderRadius:50%;color:#792b2b;#E9EBEE' class="fab fa-pinterest"></i>{{socialAccounts.pinterest}}</a>
              <a v-if='socialAccounts.instagram!=""' target="_blank" :href='socialAccounts.instagram' class="insta"><i style='marginRight:5px;borderRadius:50%;color:#CD486B;#E9EBEE' class="fab fa-instagram"></i>{{socialAccounts.instagram}}</a>
          </div>
      </div>
      <div class="second-col">
          <div style='borderRadius:2px;overflow:hidden;textOverflow:ellipsis;background-color:white;fontSize:13px;boxShadow:0px 0px 4px 1px rgba(0, 0, 0, 0.2)' class="about">
              <button v-if='$store.state.ukey==$route.params.key' style='width:100%;marginTop:1px;marginLeft:auto;marginRight:auto' @click='$router.push({name:"personal"})' class="btn btn-sm btn-secondary">Edit</button>
              <h5>About</h5>
              <pre style='max-width:100%;minHeight:50px;padding:20px;fontSize:15px;wordWrap:break-word;overflowX:auto'>{{user.description}}</pre>
          </div>
          <div class="work">
              <div class="education">
                  <h5>Education</h5>
                  <div style='padding:15px;overflow:hidden;wordWrap:break-word' v-for='(edu,index) in user.education' :key=index>
                      <div style='fontSize:16px;fontWeight:800;color:black;margin:5px 0'>{{edu.title}}</div>
                      <div style='fontSize:14px;margin:5px 0'>{{edu.from}} - {{edu.to}}</div>
                      <a :href='edu.website' target="_blank" style='fontSize:14px;margin:5px 0;cursor:pointer;color:blue'>{{edu.website}}</a>
                  </div>
              </div>
              <div class="employment">
                  <h5>Employment</h5>
                  <div style='padding:15px;overflow:hidden;wordWrap:break-word' v-for='(e,index) in user.employment' :key=index>
                      <div style='fontSize:16px;fontWeight:800;color:black;margin:5px 0'>{{e.title}}</div>
                      <div style='fontSize:14px;margin:5px 0'>{{e.from}} - {{e.to}}</div>
                      <a :href='e.website' target="_blank" style='fontSize:14px;margin:5px 0;cursor:pointer;color:blue'>{{e.website}}</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import db from './../../../plugins/firebase'
export default {
    data() {
        return {
            user:{},
            socialAccounts:{},
        }
    },
    mounted() {
        this.$rtdbBind('user',db.ref('usersInformation').child(this.$route.params.key))
        this.$rtdbBind('socialAccounts',db.ref('usersInformation').child(this.$route.params.key).child('socialAccounts'))
    }
}
</script>

<style>
pre {
     white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    font-family: "Poppins", sans-serif;
    margin:0;
    padding:0;
}
.about-view h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
.about-view {
    margin-top: 50px;
    margin-bottom: 50px;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.about-view .first-col {
    width: 18%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.about-view .second-col {
    width: 78%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
/* 1 */
/* Personal Info */
.personal {
    position: relative;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 2px;
  word-wrap: break-word;
  background-color: white;
}

.personal div {
  padding: 15px 10px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    font-size: 14px;
}
/* Social Accout */
.social {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    margin-top:25px;
    word-break: break-all;
    word-wrap: break-word;
}
.social a{
    padding: 20px 10px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    text-decoration: none;
    display: flex;
    align-items: center;
}
/* 2 */
/* About */

/* work */
.about-view .second-col .work {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top:25px;
    max-height: 0;
}
.about-view .second-col .work .education,.about-view .second-col .work .employment{
    width: 46%;
    display: flex;
    flex-direction: column;
    background-color: white;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    height: 100%;
}

</style>
