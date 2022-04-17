<template>
  <div class="members-view">
      <h5 style='display:flex;alignItems:center'>Members <ion-icon style='marginLeft:5px;fontSize:8px' name="radio-button-on-outline"></ion-icon><span style='marginLeft:5px;color:grey;fontSize:16px'>{{membersData.length}}</span></h5>
      <div class="staffs">
          <h5>Staffs</h5>
          <recommend-person v-for='user in staffs' :class='user[".key"]' :key='user[".key"]' :type="'page'" :ukey="user.key"/>
      </div>
      <div class="members">
          <h5>Members</h5>
          <recommend-person v-for='user in members' :class='user[".key"]' :key='user[".key"]' :type="'page'" :ukey="user.key"/>
      </div>
      <div class="pages">
          <h5>Pages</h5>
          <recommend-person v-for='user in pages' :class='user[".key"]' :key='user[".key"]' :type="'page'" :ukey="user.key"/>
      </div>
  </div>
</template>

<script>
import RecommendPerson from '../../../components/General/RecommendPerson.vue'
import db from '../../../plugins/firebase'
export default {
  components: { RecommendPerson },
    data() {
        return {
            membersData:[],
            members:[],
            staffs:[],
            pages:[]
        }
    },
    watch: {
        membersData() {
            this.members=[]
            this.staffs=[]
            this.pages=[]
            this.membersData.forEach(member => {
                if (member.role=="staff") {
                    this.staffs.push(member)
                }
                if (member.role=="member") {
                    this.members.push(member)
                }
                if (member.role=="page") {
                    this.pages.push(member)
                }
            });
        }
    },
    mounted() {
        this.$rtdbBind('membersData',db.ref('groups').child(this.$route.params.key).child('members'))
    }
}
</script>

<style>
.members-view {
    width: 50%;
    display: flex;
    flex-direction: column;
}
.members-view .recommend-person{
    display: flex;
    width:100%;
    justify-content: space-around;
    padding:10px 0;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    align-items: center;
    cursor: pointer;
}
.members-view .staffs,.members-view .members,.members-view .pages{
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
</style>