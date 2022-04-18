<template>
  <div class="manage-info">
      <div class="group-description">
          <h5>Description</h5>
            <div style='width:100%;padding:30px'>
            <div style='fontSize:14px;fontWeight:800'>Description Here</div>
            <textarea v-model='description' style='width:100%;min-height:100px;margin:10px 0;padding:10px' :placeholder="group.description" ></textarea>
          </div>
      </div>
      <div class="group-rules">
          <h5 style='position:relative'>Rules <button @click='addRule()' style='position:absolute;right:10px;top:50%;transform:translateY(-50%)' class="btn btn-sm btn-light">Add</button></h5>
          <div class='rule' v-for='(rule,index) in newRules' :key='index'>
              <div style='padding:10px;fontSize:14.5px;fontWeight:bolder'>{{index+1}}.</div><input class='rule-input' v-model='rule.input' type="text"><button @click='removeRule(index)' class="btn btn-sm btn-light">Remove</button>
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
        addRule() {
            let index=this.newRules.length
            let newRule={
                index:index,
                input:'',
            }
            this.newRules.push(newRule)
        },
        removeRule(index) {
            this.newRules.splice(index,1)
        },
        saveChanges() {
            /*
            this.$store.dispatch('loading')
            db.ref('groups').child(this.$route.params.key).child('rules').set(this.newRules)
            .then(()=> {
                this.$store.dispatch('unload')
            })
            .catch((err)=>{
                this.$store.dispatch('unload')
            })
            */
           let finalRules=[]
           this.newRules.forEach(rule => {
               if (rule.input.trim()!='' && rule.input!=null) {
                   finalRules.push(rule.input)
               }
            });
            this.$store.dispatch('loading')
            db.ref('groups').child(this.$route.params.key).child('rules').set(finalRules)
            .then(()=> {
                this.$store.dispatch('unload')
                this.$bvToast.show('edit')
            })
            .catch((err)=>{
                alert(err)
                this.$store.dispatch('unload')
            })
            db.ref('groups').child(this.$route.params.key).child('description').set(this.description)
            .then(()=> {
                this.$store.dispatch('unload')
                this.$bvToast.show('edit')
            })
            .catch((err)=>{
                alert(err)
                this.$store.dispatch('unload')
            })
        }
    },
    watch: {
        group() {
            this.description=this.group.description
            this.newRules=[]
            this.rules.forEach(rule => {
                let newRule={
                    index:parseInt(rule[".key"]),
                    input:rule[".value"]
                }
                this.newRules.push(newRule)
            });
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
    position: relative;
}
.manage-info .group-rules .rule{
    width: 100%;
    display: flex;
    justify-content: center;
    margin:15px 0;
}
.manage-info .group-rules .rule input{
    width: 80%;
    outline:none;
    border:none;
    border:1px solid gainsboro;
    padding:10px 15px;
    font-size: 15px;
}
.manage-info .group-rules .rule input:focus{
    border-color: orange;
}
</style>