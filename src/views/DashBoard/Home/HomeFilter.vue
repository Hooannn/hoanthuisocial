<template>
  <div class="home-filter">
      <div class='result'>
        <button @click='$router.go(-1)' style='color:black;width:100%' class="btn-sm btn btn-link">Clear</button>
        <recommend-person style='border:none;transtition:.1s' :type="'page'" v-for='u in users' :ukey="u['.key']" :key="u['.key']"/>
        <recommend-group style='border:none;transtition:.1s' v-for='group in groups' :key='group[".key"]' :class='group[".key"]' :gKey='group[".key"]'/>
        <div style='padding:10px;fontSize:14px' v-if='users.length==0 && groups.length==0'>We don't find anything. Try again.</div>
      </div>
  </div>
</template>

<script>
import RecommendGroup from '../../../components/General/RecommendGroup.vue'
import RecommendPerson from '../../../components/General/RecommendPerson.vue'
import db from '../../../plugins/firebase'
export default {
  components: { RecommendPerson, RecommendGroup },
  data() {
    return {
      usersData:[],
      users:[],
      groupsData:[],
      groups:[],
    }
  },
  watch: {
    usersData() {
      this.users=[]
      this.usersData.forEach(user => {
        if (user.username
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "")
              .includes(
                this.$route.query.q.toLowerCase().trim().replace(/\s+/g, "")
              )) {
          this.users.push(user)
        }
      });
    },
    groupsData() {
      this.groups=[]
      this.groupsData.forEach(group => {
        if (group.groupname
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "")
              .includes(
                this.$route.query.q.toLowerCase().trim().replace(/\s+/g, "")
              )||"groups".includes(this.$route.query.q.toLowerCase().trim().replace(/\s+/g, ""))) {
          this.groups.push(group)
        }
      });
    }
  },
  mounted() {
    this.$rtdbBind('usersData',db.ref('usersInformation'))
    this.$rtdbBind('groupsData',db.ref('groups'))
  }
}
</script>

<style>
.home-filter {
  margin-top:-25px;
  margin-bottom: 25px;
}
.home-filter .result{
  background-color:white;
  box-shadow: 0 0 3px rgba(0,0,0,0.3);
}
.home-filter .result .recommend-person{
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding:10px 0;
    align-items: center;
    cursor: pointer;
}
.home-filter .result .recommend-person:hover,.home-filter .result .recommend-group:hover{
    background-color:rgb(247, 196, 189);
}
</style>