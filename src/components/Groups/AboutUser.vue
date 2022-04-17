<template>
  <div class="about-user">
      <div style='width:30px;height:30px;overflow:hidden;borderRadius:50%;marginRight:5px'>
          <img style='width:100%;heigth:100%;objectFit:cover' :src="user.avatarImg">
      </div>
      <div @click='viewProfile' class="username">
          {{user.username}}
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props:{
        ukey:String
    },
    data() {
        return {
            user:{}
        }
    },
    methods: {
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
}
.about-user .username:hover {
    cursor: pointer;
    text-decoration-line: underline;
}
</style>