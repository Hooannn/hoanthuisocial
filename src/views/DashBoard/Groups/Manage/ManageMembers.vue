<template>
  <div class="manage-members">
      <div class="manage-staffs">
          <h5 style='display:flex;alignItems:center'>Staffs <ion-icon style='marginLeft:5px;fontSize:8px' name="radio-button-on-outline"></ion-icon><span style='color:grey;fontSize:smaller;marginLeft:5px'>{{staffs.length}}</span></h5>
          <div style='width:100%;display:flex;flexWrap:wrap;'>
            <about-user :groupKey="$route.params.key" v-for='member in staffs' :key='member.key' :class="member.key" :ukey='member.key'/>
          </div>
      </div>
      <div style='marginTop:25px' class="manage-members">
          <h5 style='display:flex;alignItems:center'>Members <ion-icon style='marginLeft:5px;fontSize:8px' name="radio-button-on-outline"></ion-icon><span style='color:grey;fontSize:smaller;marginLeft:5px'>{{members.length}}</span></h5>
           <div style='width:100%;display:flex;flexWrap:wrap;'>
            <about-user :groupKey="$route.params.key" v-for='member in members' :key='member.key' :class="member.key" :ukey='member.key'/>
          </div>
      </div>
      <div style='marginTop:25px' class="manage-pages">
          <h5 style='display:flex;alignItems:center'>Pages <ion-icon style='marginLeft:5px;fontSize:8px' name="radio-button-on-outline"></ion-icon><span style='color:grey;fontSize:smaller;marginLeft:5px'>{{pages.length}}</span></h5>
           <div style='width:100%;display:flex;flexWrap:wrap;'>
            <about-user :groupKey="$route.params.key" v-for='member in pages' :key='member.key' :class="member.key" :ukey='member.key'/>
          </div>
      </div>
  </div>
</template>

<script>
import db from '../../../../plugins/firebase'
import AboutUser from '../../../../components/Groups/AboutUser.vue'
export default {
    components: {
        AboutUser
    },
    data() {
        return {
            membersData:[],
            staffs:[],
            members:[],
            pages:[],
        }
    },
    watch: {
        membersData() {
            this.staffs=[]
            this.members=[]
            this.pages=[]
            this.membersData.forEach(member => {
                if (member.role=='staff') {
                    this.staffs.push(member)
                }
                if (member.role=='member') {
                    this.members.push(member)
                }
                if (member.role=='page') {
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
.manage-members .manage-staffs,.manage-members .manage-members,.manage-members .manage-pages{
  display: flex;
  flex-direction: column;
  font-size: 13px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  text-overflow: ellipsis;
  background-color: white;
  width: 100%;
  justify-content: center;
}
</style>