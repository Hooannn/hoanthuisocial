<template>
  <div class="manage-requests">
      <div class="member-requests">
          <h5 style='display:flex;alignItems:center'>Join Requests <ion-icon style='marginLeft:5px;fontSize:8px' name="radio-button-on-outline"></ion-icon><span style='color:grey;fontSize:smaller;marginLeft:5px'>{{requests.length}}</span></h5>
          <div style='width:100%;display:flex;flexWrap:wrap;'>
            <about-user :groupKey="$route.params.key" v-for='member in requests' :key='member[".value"]' :class="member['.value']" :ukey='member[".value"]'/>
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
            requests:[]
        }
    },
    mounted() {
        this.$rtdbBind('requests',db.ref('groups').child(this.$route.params.key).child('membersRequest'))
    }
}
</script>

<style>
.manage-requests .member-requests{
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