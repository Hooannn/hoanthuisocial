<template>
  <div class="manage-delete">
    <h5>Deactivate Group</h5>
    <div style='width:80%;fontSize:16px;fontWeight:bolder'>Your feedback</div>
    <textarea placeholder="Feedback for us to improve the experience." style='width:80%;minHeight:100px'></textarea>
    <button @click='deactivateGroupConfirm' style='width:10%' class="btn btn-sm btn-danger">Deactivate</button>
  </div>
</template>

<script>
import db from '../../../../plugins/firebase'
export default {
    data() {
        return {
            group:{},
            members:[],
        }
    },
    methods: {
        deactivateGroupConfirm() {
            this.$bvModal.msgBoxConfirm('Confirm that you want to deactivate your group ?',{
              title: 'Please Confirm',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'danger',
              okTitle: 'Confirm',
              cancelTitle: 'Cancle',
              footerClass: 'p-2',
              hideHeaderClose: false,
              centered: true
            }) 
            .then(value => {
              if (value==true) {
                this.deactivateGroup()
              }
            })
            .catch(err => {
             if (err==false) {
               return
             }
            })
        },
        deactivateGroup() {
          this.$store.dispatch('loading')
          let noti={
            content: `Your group "${this.group.groupname}" has been deleted`,
            date: new Date().toLocaleString(),
            time: new Date().getTime(),
            status: "Unseen",
            type: "group-delete",
          }
          this.members.forEach(member => {
              db.ref('usersInformation').child(member.key).child('notifications').push(noti)
            });
          this.members.forEach(member => {
              db.ref('usersInformation').child(member.key).child('groups').get().then((res)=>{
              let resVal=res.val()
              resVal=Object.keys(resVal).map((key)=>({key:key,groupKey:resVal[key].groupKey}))
              let groupKey=resVal.find(ele=>ele.groupKey==this.$route.params.key).key
              db.ref('usersInformation').child(member.key).child('groups').child(groupKey).remove()
            })
          });
          db.ref('groups').child(this.group[".key"]).remove().then(()=>{
            this.$router.push({name:'dhome'})
            this.$bvToast.show('edit')
            this.$store.dispatch('unload')
          }).catch((err)=> {
            alert(err)
            this.$store.dispatch('unload')
          })
        }
    },
    mounted() {
        this.$rtdbBind('group',db.ref('groups').child(this.$route.params.key))
        this.$rtdbBind('members',db.ref('groups').child(this.$route.params.key).child('members'))
    }
}
</script>

<style>
.manage-delete {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  text-overflow: ellipsis;
  background-color: white;
  width: 100%;
  position: relative;
}
.manage-delete textarea{
  border:none;
  outline:none;
  border:1px solid gainsboro;
  padding:10px;
  font-size: 14px;
}
.manage-delete textarea:focus{
  border-color: orange;
}
.manage-delete *{
  margin:10px auto;
}
</style>