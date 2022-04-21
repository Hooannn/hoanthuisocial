<template>
  <div class="staffs-view">
      <div class="first-col">
      <div class="manage">
        <h5>Manage</h5>
        <div
          v-for="(manage, index) in manages"
          :key="index"
          @click="$router.push({ name: manage.name })"
            :class='{selected:$route.name==manage.name}'
        >{{manage.title}}
        <span style='marginLeft:5px;fontWeight:bold;fontSize:13px' v-if='manage.title=="Members"'>({{members.length}})</span>
        <span style='display:flex;justifyContent:center;alignItems:center;fontWeight:bold;borderRadius:2px;position:absolute;color:white;backgroundColor:red;right:5px;fontSize:13px;width:18px;height:18px' v-show='request.length>0' v-if='manage.title=="Join Requested"'>{{request.length}}</span>
        <span style='marginLeft:5px;fontWeight:bold;fontSize:13px' v-if='manage.title=="Posts"'>({{posts.length}})</span>
        <span style='display:flex;justifyContent:center;alignItems:center;fontWeight:bold;borderRadius:2px;position:absolute;color:white;backgroundColor:red;right:5px;fontSize:13px;width:18px;height:18px' v-show='notifications.length>0' v-if='manage.title=="Notifications"'>{{notifications.length}}</span>
        </div>
      </div>
    </div>
    <div class="second-col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import db from '../../../../plugins/firebase'
export default {
  data() {
    return {
      members:[],
      request:[],
      posts:[],
      notifications:[],
      manages: [
        { title: `Notifications`, name: "group-manage-notifications" },
        { title: "Information", name: "group-manage-info" },
        { title: "Posts", name: "group-manage-post" },
        { title: `Members` , name: "group-manage-members" },
        { title: `Join Requested`, name: "group-manage-members-request" },
        { title: `Deactive Group`, name: "group-manage-delete" },
      ],
    };
  },
  mounted() {
    this.$rtdbBind('members', db.ref('groups').child(this.$route.params.key).child('members')).then(()=> {
          if (this.members.find(user=>user.key==this.$store.state.ukey)) {
            this.$rtdbBind('request', db.ref('groups').child(this.$route.params.key).child('membersRequest'))
            this.$rtdbBind('posts', db.ref('groups').child(this.$route.params.key).child('posts'))
            this.$rtdbBind('notifications', db.ref('groups').child(this.$route.params.key).child('notifications'))
            this.$router.push({name:'group-manage-info'})
          }
          else {
            this.$router.push({name:'group'})
          }
    })
    
  }
};
</script>

<style>
.staffs-view {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#app > div.dash-board > div.group-view > div.group__content > div.container > div.staffs-view > div.first-col {
  width: 18%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#app > div.dash-board > div.group-view > div.group__content > div.container > div.staffs-view > div.second-col {
  width: 78%;
  height: 100%;
}
/* 1 col */
/* your details */
.manage {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 2px;
  text-overflow: ellipsis;
  background-color: white;
  width: 100%;
  justify-content: center;
  position: relative;
}
.manage h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
.manage div {
  padding: 15px 10px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
}
.manage div.selected, .manage div:hover {
  border-right:2px solid #ff7555;
  color:#ff7555;
}
/* 2 col */

/*  */
@media only screen and (max-width: 768px) {
  .staffs-view {
      margin:0
  }
  #app > div.dash-board > div.group-view > div.group__content > div.container > div.staffs-view > div.first-col,
  #app > div.dash-board > div.group-view > div.group__content > div.container > div.staffs-view > div.second-col {
    width: 95%;
    margin:0 auto;
    margin-top:25px;
    font-size: 15px;
  }
}
</style>