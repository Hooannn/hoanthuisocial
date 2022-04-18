<template>
  <div class="about-user">
      <div style='width:30px;height:30px;overflow:hidden;borderRadius:50%;marginRight:5px'>
          <img style='width:100%;heigth:100%;objectFit:cover' :src="user.avatarImg">
      </div>
      <div @click='viewProfile' class="username">
          {{user.username}}
      </div>
      <i v-show='$store.state.ukey!=ukey'  @click='showControl' style='marginLeft:5px;cursor:pointer' v-if='$route.name=="group-manage-members" || $route.name=="group-manage-members-request"' class="fas fa-ellipsis-h group-member-control"></i>
      <div class="control">
          <span @click='setRole' v-if='$route.name=="group-manage-members"'>Set Role</span>
          <span @click='banUser' v-if='$route.name=="group-manage-members"'>Ban</span>
          <span @click='acceptReq' v-if='$route.name=="group-manage-members-request"'>Accept</span>
          <span @click='refuseReq' v-if='$route.name=="group-manage-members-request"'>Refuse</span>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props:{
        ukey:String,
        groupKey:String
    },
    data() {
        return {
            user:{}
        }
    },
    methods: {
        // handle manage-group-member
        setRole() {

        },
        banUser() {
            let payload={
                groupKey:this.groupKey,
                targetKey:this.ukey
            }
            let currentUser=document.querySelector(`div.member-requests div.about-user.${this.ukey}`)
            this.$store.dispatch('banUser',payload)
            currentUser.remove()
        },
        acceptReq() {
            let payload={
                groupKey:this.groupKey,
                targetKey:this.ukey
            }
            let currentUser=document.querySelector(`div.member-requests div.about-user.${this.ukey}`)
            this.$store.dispatch('acceptGroupRequest',payload)
            currentUser.remove()
        },
        refuseReq() {
            let payload={
                groupKey:this.groupKey,
                targetKey:this.ukey
            }
            let currentUser=document.querySelector(`div.member-requests div.about-user.${this.ukey}`)
            this.$store.dispatch('refuseGroupRequest',payload)
            currentUser.remove()
        },
        ////
        showControl() {
            let control=document.querySelector(`.about-user.${this.ukey} .control`)
            control.classList.toggle('show')
        },
        viewProfile() {
            if (this.user.type=='user') {
                this.$router.push({name:'post',params:{key:this.ukey}})
            }
            else if (this.user.type=='page') {
                this.$router.push({name:'pages',params:{key:this.ukey}})
            }
            else {
                return
            }
        }
    },
    mounted() {
        this.$rtdbBind('user',db.ref('usersInformation').child(this.ukey))
    }
}
</script>

<style>
.about-user {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    padding:15px 0; 
    position: relative;
}
.about-user .username:hover {
    cursor: pointer;
    text-decoration-line: underline;
}
#app > div.dash-board > div.group-view > div.group__content > div.container > div.staffs-view > div.second-col > div > div > div > div i:hover {
    color:orangered;
}
.about-user .control{
    flex-direction: column;
    background-color:white;
    border-radius: 2px;
    box-shadow: 0 0 3px rgba(0,0,0,0.3);
    display: flex;
    position: absolute;
    visibility: hidden;
    opacity: 0;
    right:0;
    top:75%;
    z-index: 10;
}
.about-user .control.show{
    visibility: visible;
    opacity: 1;
}
.about-user .control span{
    padding:8px;
    cursor: pointer;
    transition:.1s;
}
.about-user .control span:hover{
    border-left: 1px solid salmon;
    color:salmon; 
}
</style>