<template>
  <div @click='viewProfile(person[".key"])' class="recommend-person" v-show='$store.state.ukey!=person[".key"] && !userFriend.find((user)=> (user[".value"]==person[".key"]))'>
          <div style='width:30px;height:30px;borderRadius:50%;overflow:hidden' class='person-avatar'>
            <img style='width:100%;height:100%;objectFit:cover' :src="person.avatarImg">
          </div>
          <div style='width:45%;fontSize:14px;fontWeight:800' class='person-username'>
            <div>{{person.username}}</div>
            <div style='fontSize:10px;color:grey;fontWeight:lighter'>Mutual {{mutualFriend.length}}</div>
          </div>
          <button :disabled='userFriend.find((user)=> (user[".value"]==person[".key"]))||userFriendRequesting.find((user)=> (user[".value"]==person[".key"]))||userFriendRequested.find((user)=> (user[".value"]==person[".key"]))' @click='$store.dispatch("sentFriendRequest",person[".key"]),$store.dispatch("follow",person[".key"])' style='width:30px;height:30px;display:flex;justifyContent:center;alignItems:center;fontSize:13px;' class="add-fr btn btn-warning btn-sm"><i class="fas fa-user-plus"></i></button>
        </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props: {
        ukey:String
    },
    data() {
        return {
            person:{},
            userFriend:[],
            targetFriend:[],
            mutualFriend:[],
            userFriendRequesting:[],
            userFriendRequested:[],
        }
    },
    watch: {
        targetFriend() {
            this.mutualFriend=[]
            this.userFriend.forEach(myfr => {
                this.targetFriend.forEach(tarfr => {
                    if (myfr[".value"]==tarfr[".value"]) {
                        this.mutualFriend.push(myfr[".value"])
                    }
                });
            });
        }
    },
    mounted() {
        this.$rtdbBind('person',db.ref('usersInformation').child(this.ukey))
        this.$rtdbBind('targetFriend',db.ref('usersInformation').child(this.ukey).child('friends').child('isfriend'))
        this.$rtdbBind('userFriend',db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('isfriend'))
        this.$rtdbBind('userFriendRequesting',db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('friendrequesting'))
        this.$rtdbBind('userFriendRequested',db.ref('usersInformation').child(this.$store.state.ukey).child('friends').child('friendrequested'))
    },
    methods: {
        viewProfile(key) {
            this.$router.push({name:'post',params:{key:key}})
        }
    },
}
</script>

<style>

</style>