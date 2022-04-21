<template>
<div>
    <div v-if='type=="page"'>
        <div @click='viewProfile(person[".key"])' class="recommend-person">
          <div style='width:30px;height:30px;borderRadius:50%;overflow:hidden' class='person-avatar'>
            <img style='width:100%;height:100%;objectFit:cover' :src="person.avatarImg">
          </div>
          <div style='width:45%;fontSize:14px;fontWeight:800' class='person-username'>
            <div>{{person.username}}</div>
            <div v-if="person.type!='page' && person['.key']!=$store.state.ukey" style='fontSize:10px;color:grey;fontWeight:lighter'>Mutual {{mutualFriend.length}}</div>
            <div v-if="person.type=='page'" style='fontSize:10px;color:grey;fontWeight:lighter'>Like {{userFollowed.length}}</div>
          </div>
          <button v-if='$store.state.type!="page"&&person.type!="page" && !userFriend.find((user)=> (user[".value"]==person[".key"])) && person[".key"]!=$store.state.ukey' :disabled='userFriend.find((user)=> (user[".value"]==person[".key"])) || userFriendRequesting.find((user)=> (user[".value"]==person[".key"])) || userFriendRequested.find((user)=> (user[".value"]==person[".key"]))' @click='$store.dispatch("sentFriendRequest",person[".key"]),$store.dispatch("follow",person[".key"])' style='width:30px;height:30px;display:flex;justifyContent:center;alignItems:center;fontSize:13px;' class="add-fr btn btn-warning btn-sm"><i class="fas fa-user-plus"></i></button>
          <button v-if='person.type=="page"' :disabled='userFollowed.find((user)=> (user[".value"]==$store.state.ukey))' @click='$store.dispatch("follow",person[".key"])' style='width:30px;height:30px;display:flex;justifyContent:center;alignItems:center;fontSize:13px;' class="add-fr btn btn-primary btn-sm"><i class="fas fa-thumbs-up"></i></button>
        </div>
    </div>
    <div v-if='type=="home"'>
        <div @click='viewProfile(person[".key"])' class="recommend-person" v-if='!userFriend.find((user)=> (user[".value"]==person[".key"]))'>
          <div style='width:30px;height:30px;borderRadius:50%;overflow:hidden' class='person-avatar'>
            <img style='width:100%;height:100%;objectFit:cover' :src="person.avatarImg">
          </div>
          <div style='width:45%;fontSize:14px;fontWeight:800' class='person-username'>
            <div>{{person.username}}</div>
            <div v-if="person.type!='page' && person['.key']!=$store.state.ukey" style='fontSize:10px;color:grey;fontWeight:lighter'>Mutual {{mutualFriend.length}}</div>
            <div v-if="person.type=='page'" style='fontSize:10px;color:grey;fontWeight:lighter'>Like {{userFollowed.length}}</div>
          </div>
          <button v-if='$store.state.type!="page"&&person.type!="page" && !userFriend.find((user)=> (user[".value"]==person[".key"])) && person[".key"]!=$store.state.ukey' :disabled='userFriend.find((user)=> (user[".value"]==person[".key"])) || userFriendRequesting.find((user)=> (user[".value"]==person[".key"])) || userFriendRequested.find((user)=> (user[".value"]==person[".key"]))' @click='$store.dispatch("sentFriendRequest",person[".key"]),$store.dispatch("follow",person[".key"])' style='width:30px;height:30px;display:flex;justifyContent:center;alignItems:center;fontSize:13px;' class="add-fr btn btn-warning btn-sm"><i class="fas fa-user-plus"></i></button>
          <button v-if='person.type=="page" && !userFollowed.find((user)=> (user[".value"]==$store.state.ukey))' :disabled='userFollowed.find((user)=> (user[".value"]==$store.state.ukey))' @click='$store.dispatch("follow",person[".key"])' style='width:30px;height:30px;display:flex;justifyContent:center;alignItems:center;fontSize:13px;' class="add-fr btn btn-primary btn-sm"><i class="fas fa-thumbs-up"></i></button>
        </div>
    </div>
</div>
  
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props: {
        ukey:String,
        type:String,
    },
    data() {
        return {
            person:{},
            userFriend:[],
            targetFriend:[],
            mutualFriend:[],
            userFriendRequesting:[],
            userFriendRequested:[],
            userFollowed:[],
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
        this.$rtdbBind('userFollowed',db.ref('usersInformation').child(this.ukey).child('follows').child('followed'))
    },
    methods: {
        viewProfile(key) {
            if (this.person.type!='page' && this.ukey!=this.$store.state.ukey) {
                this.$router.push({name:'post',params:{key:key}})
            }
            else if (this.person.type=='page') {
                this.$router.push({name:'pages',params:{key:key}})
            }
        }
    },
}
</script>

<style>

</style>