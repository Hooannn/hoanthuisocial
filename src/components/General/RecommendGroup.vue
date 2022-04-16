<template>
    <div @click='viewGroup(group[".key"])' class="recommend-group">
          <div style='width:30px;height:30px;borderRadius:50%;overflow:hidden' class='group-avatar'>
            <img style='width:100%;height:100%;objectFit:cover' :src="group.coverImg">
          </div>
          <div style='width:45%;fontSize:14px;fontWeight:800' class='group-username'>
            <div>{{group.groupname}}</div>
            <div style='fontSize:10px;color:grey;fontWeight:lighter'>Members {{members.length}}</div>
          </div>
          <button @click='$store.dispatch("sentGroupRequest",gKey)' v-if='!members.find(user => user.key==$store.state.ukey)' :disabled='membersRequest.find(user => user[".value"]==$store.state.ukey)' style='width:30px;height:30px;display:flex;justifyContent:center;alignItems:center;fontSize:13px;' class="add-fr btn btn-info btn-sm"><i class="fas fa-sign-in-alt"></i></button>
    </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
  props:{
    gKey:String,
  },
  data() {
    return {
      group: {},
      members:[],
      membersRequest:[],
    }
  },
  methods: {
    viewGroup(key) {
      this.$router.push({name:'group',params:{key:key}})
    }
  },
  mounted() {
    this.$rtdbBind('group',db.ref('groups').child(this.gKey))
    this.$rtdbBind('members',db.ref('groups').child(this.gKey).child('members'))
    this.$rtdbBind('membersRequest',db.ref('groups').child(this.gKey).child('membersRequest'))
  }
}
</script>

<style>
.recommend-group {
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding:10px 0;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    align-items: center;
    cursor: pointer;
}
</style>