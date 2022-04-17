<template>
  <div class="manage-info">
      <div class="group-description">
          <h5>Group Description</h5>
            <div style='width:100%;padding:30px'>
            <div style='fontSize:14px;fontWeight:800'>Description Here</div>
            <textarea v-model='description' style='width:100%;min-height:100px;margin:10px 0;padding:10px' :placeholder="group.description" ></textarea>
          </div>
      </div>
      <div class="group-rules">
          <h5>Group Rule</h5>
          <div class='rule' v-for='(rule,index) in newRules' :key='index'>
              <input class='rule-input' v-model='rule.input' type="text">
          </div>
      </div>
      <button @click='saveChanges' class="btn btn-sm btn-danger">Save Changes</button>
  </div>
</template>

<script>
import db from '../../../../plugins/firebase'
export default {
    data() {
        return {
            group:{},
            description:'',
            rules:[],
            newRules:[],
        }
    },
    methods: {
        saveChanges() { 
            this.$store.dispatch('loading')
            db.ref('groups').child(this.$route.params.key).child('rules').set(this.newRules)
            .then(()=> {
                this.$store.dispatch('unload')
            })
            .catch((err)=>{
                this.$store.dispatch('unload')
            })
        }
    },
    watch: {
        group() {
            this.description=this.group.description
            this.newRules=[]
        }
    },
    mounted() {
        this.$rtdbBind('group', db.ref('groups').child(this.$route.params.key))
        this.$rtdbBind('rules', db.ref('groups').child(this.$route.params.key).child('rules'))
    }
}
</script>

<style>
.manage-info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.manage-info .group-description, .manage-info .group-rules{
    margin-bottom:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color: white;
    width: 100%;
}
</style>