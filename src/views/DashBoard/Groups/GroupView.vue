<template>
  <div class="group-view" :key='$route.params.key'>
      <div class="group__cover">
          <img :src="group.avatarImg" alt="Cover img">
      </div>
      <div class="group__content ">
          <div class="group__header">
              <div class="container">
                  <div class="inf">
                    <div class="detail">
                      <div class="username"><strong style='fontSize:20px'>{{group.groupname}}</strong></div>
                      <div class="date" style='fontSize:14px'>Active at {{group.registerDate}}</div>
                    </div>
                  </div>
              <div class="more-inf">
                  <button @click='$store.dispatch("sentGroupRequest",$route.params.key)' v-if='!members.find(user => user.key==$store.state.ukey) && !membersRequest.find(user => user[".value"]==$store.state.ukey)' class="btn btn-danger btn-sm">Join</button>
                  <button @click='$store.dispatch("leaveGroup",$route.params.key)' v-if='members.find(user => user.key==$store.state.ukey)' class="btn btn-secondary btn-sm">Leave</button>
                  <button @click='$store.dispatch("cancleGroupRequest",$route.params.key)' v-if='membersRequest.find(user => user[".value"]==$store.state.ukey)' class="btn btn-secondary btn-sm">Cancle</button>
                  <div class="members">
                      <span>Members</span>
                      <span ><strong>{{members.length}}</strong></span>
                  </div>
              </div>
              </div>
          </div>
          <div style='height:auto;minHeight:55vh;marginBottom:25px;display:flex;flexDirection:column;alignItems:center' class="container">
              <div v-if='!members.find(user => user.key==$store.state.ukey)' class="first-col non-member">
                  <div class="about">
                      <h5>About this group</h5>
                      <div>{{group.description}}</div>
                  </div>
                  <div class="rules">
                      <h5>Rules</h5>
                      <div v-for='(rule,index) in rules' :key='index' class='rule'>
                          <span style='fontWeight:bold'>{{(index+1)}}.</span> <span style='marginLeft:5px'>{{rule[".value"]}}</span>
                      </div>
                  </div>
                  <div class="staffs">
                      <h5>Staffs</h5>
                      <div style='width:100%;display:flex;flexWrap:wrap;' class="users-overview">
                          <about-user v-show='member.role=="staff"' v-for='member in members' :key='member[".key"]' :class="member['.key']" :ukey='member.key'/>
                      </div>
                  </div>
                  <div class="active-members">
                      <h5>Active Members</h5>
                      <div style='width:100%;display:flex;flexWrap:wrap;' class="users-overview">
                          <about-user v-for='member in members' :key='member[".key"]' :class="member['.key']" :ukey='member.key'/>
                      </div>
                  </div>
              </div>
              <div v-if='members.find(user => user.key==$store.state.ukey)' class="member-nav is-member">
                  <div @click='$router.push({name:"group-about"})' class="group-about" :class="{active:$route.name=='group-about'}">About</div>
                  <div @click='$router.push({name:"group-post"})' class="group-post" :class="{active:$route.name=='group-post'}">Post</div>
                  <div @click='$router.push({name:"members"})' class="members" :class="{active:$route.name=='members'}">Members ({{members.length}})</div>
                  <div v-if='members.find(user => (user.key==$store.state.ukey && user.role=="staff"))' @click='$router.push({name:"manage"})' class="staff" :class="{active:$route.name=='manage'}">Manage</div>
              </div>
              <router-view></router-view>
          </div>
          <!--
          <div style='height:auto;minHeight:55vh;marginBottom:25px' class="container">
              <div class="group__nav">
                  <div @click='isSelect="Post"' class="post" :class="{active:isSelect=='Post'}">Post</div>
                  <div @click='isSelect="About"' class="about" :class="{active:isSelect=='About'}">About</div>
                  <div @click='isSelect="Friends"' class="friends-list" :class="{active:isSelect=='Friends'}">Friends</div>
                  <div @click='isSelect="Image"' class="images" :class="{active:isSelect=='Image'}">Image</div>
                  <div @click='isSelect="Credits"' class="credits" :class="{active:isSelect=='Credits'}">Credits</div>
                  <div @click='isSelect="See more"' class="more" :class="{active:isSelect=='See more'}">See more <ion-icon style="marginLeft:5px" name="chevron-down-outline"></ion-icon></div>
              </div>
              <router-view></router-view>
          </div>
          -->
          <footer-com/>
      </div>
  </div>
</template>

<script>
import db from '../../../plugins/firebase'
import FooterCom from '../../../components/General/FooterCom.vue'
import AboutUser from '../../../components/Groups/AboutUser.vue'
export default {
    components: {
        FooterCom,
        AboutUser,
    },
    data() {
        return {
            group:{},
            profileKey:'',
            members:[],
            rules:[],
            membersRequest:[],
        }
    },
    watch: {
        members() {
            if (this.members.find(user=>user.key==this.$store.state.ukey)) {
                this.$router.push({name:'group-post'})
            }
            else {
                return
            }
        }
    },
    mounted() {
        this.$rtdbBind('group',db.ref('groups').child(this.$route.params.key))
        this.$rtdbBind('members',db.ref('groups').child(this.$route.params.key).child('members'))
        this.$rtdbBind('membersRequest',db.ref('groups').child(this.$route.params.key).child('membersRequest'))
        this.$rtdbBind('rules',db.ref('groups').child(this.$route.params.key).child('rules'))
        this.profileKey=this.$route.params.key
    }
}
</script>

<style>
.group-view h5 {
    margin:0;
    padding:unset;
    padding:20px;  
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 800;
}
.group-view {
    width: 100%;
    min-height: 100vh;
    height: auto;
    display: flex;
    flex-direction: column;
}
.group__cover {
    padding-top:50px;   
    height: 350px;
}
.group__cover img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.group__content {
    width: 100%;
    height: auto;
}
.group__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color:white;
}
.group__header .container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.group__header .container .inf,.group__header .container .more-inf {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    width: 200px;
}
.group__header .container .more-inf {
    display: flex;
    width: 200px;
}
.group__header .container .more-inf div{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.group__content .container .first-col{
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
}
.group__content .container .first-col .about {
    margin-top:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    width: 100%;
}
.group__content .container .first-col .about div{
    padding:15px;
    font-size: 15px;
}
.group__content .container .first-col .rules {
    margin-top:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    width: 100%; 
}
.group__content .container .first-col .rules .rule{
    padding: 15px;
    font-size: 15px; 
}
.group__content .container .first-col .staffs {
    margin-top:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    width: 100%;
    max-height: 400px;
    overflow-y:auto;
}
.group__content .container .first-col .active-members {
    margin-top:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    width: 100%;
    max-height: 400px;
    overflow-y:auto;
}
.group__content .container .member-nav {
    width: 100%;
    justify-content: space-around;
    display: flex;
    align-items: center;
    height: 40px;
}
.group__content .container .member-nav div{
    height: 100%;
    width: 15%;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(0,0,0,0.4);
    cursor: pointer;
}
.group__content .container .member-nav div.active{
    background-color:rgba(128, 128, 128, 0.158);
    border-bottom:3px solid orange;
    color:orangered;
    font-weight: 900;
}
.group__content .container .member-nav div:hover{
    background-color:rgba(128, 128, 128, 0.158);
}
</style>