<template>
  <div style='width:80%' class="group-about-view">
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
</template>

<script>
import db from '../../../plugins/firebase'
import AboutUser from '../../../components/Groups/AboutUser.vue'
export default {
    components: {
        AboutUser
    },
    data() {
        return {
            group:{},
            members:[],
            rules:[],
        }
    },
    mounted() {
        this.$rtdbBind('members', db.ref('groups').child(this.$route.params.key).child('members')).then(()=> {
          if (this.members.find(user=>user.key==this.$store.state.ukey)) {
            this.$rtdbBind('group',db.ref('groups').child(this.$route.params.key))
            this.$rtdbBind('rules',db.ref('groups').child(this.$route.params.key).child('rules'))
          }
          else {
            this.$router.push({name:'group'})
          }
        })
    }
}
</script>

<style>
.group-about-view .about{
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
#app > div.dash-board > div.group-view > div.group__content > div.container > div.group-about-view > div.about > div {
    padding:15px;
    font-size: 15px;
}
.group-about-view .rules {
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
.group-about-view .rules .rule{
    padding: 15px;
    font-size: 15px; 
}
.group-about-view .staffs {
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
.group-about-view .active-members {
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
@media only screen and (max-width: 768px) {
    .group-about-view {
        max-width: 100vw;
        max-height: 100vh;
    }
    #app > div.dash-board > div.group-view > div.group__content > div.container > div.group-about-view > div.staffs > div div.about-user{
        padding:10px;
    }
    #app > div.dash-board > div.group-view > div.group__content > div.container > div.group-about-view > div.active-members > div div.about-user{
        padding:10px;
    }
    .group-about-view>div>div{
        padding:0;
        font-size: 14px;
    }   
}
</style>