<template>
  <div class="communities-view">
      <h5 v-if='$store.state.type!="page"'>My Page</h5>
      <div v-if='pages.length==0 && $store.state.type!="page"'>You don't have any page. Want to create one ?<button @click='$router.push({name:"dhome"})' class="btn btn-sm btn-link">Create page</button></div>
      <div v-for='page in pages' :key="page.pageKey" v-show='$store.state.type!="page"' class="my-page" :class='page[".key"]'>
          <div class="pages">
              <recommend-person :type='"home"' :ukey="page.pageKey"/>
          </div>
          <div class="pages-info">
              <div style='position:relative;display:flex;justifyContent:space-between;alignItems:center;height:100%' >
                  <div style='userSelect:text;maxWidth:80%;'>
                      <div>Email:{{page.account.email}}</div>
                      <div style='display:flex;alignItems:center' class='page-password'>Password:******</div><i @click='showPassword(page[".key"],page.account.password)' class="fas fa-low-vision"></i>
                  </div>
                  <button style='color:orange' class="btn btn-link btn-sm"><i class="fas fa-cog"></i></button>
              </div>
          </div>
      </div>
      <h5>My Group</h5>
      <div v-if='groups.length==0'>You aren't a member in any groups. Want to find one ? <button @click='$router.push({name:"dhome"})' class="btn btn-sm btn-link">Find group</button> Or just create your own group.<button @click='$router.push({name:"dhome"})' class="btn btn-sm btn-link">Create group</button></div>
      <div v-for='group in groups' :key='group.groupKey' class="my-group" :class='group[".key"]'>
          <div class="groups">
              <recommend-group :class='group.groupKey' :gKey='group.groupKey'/>
          </div>
          <div class="groups-info">
              <div style='display:flex;justifyContent:center;alignItems:center;height:100%;' >You are {{group.role}} of this group.</div>
          </div>
      </div>
  </div>
</template>

<script>
import store from '../../../store/store'
import db from '../../../plugins/firebase'
import RecommendPerson from '@/components/General/RecommendPerson.vue'
import RecommendGroup from '@/components/General/RecommendGroup.vue'
import MakePageForm from '@/components/Page/MakePageForm.vue'
import MakeGroupForm from '@/components/Groups/MakeGroupForm.vue'
export default {
  components: { RecommendPerson, RecommendGroup, MakePageForm, MakeGroupForm },
    data() {
        return {
            pages:[],
            groups:[],
        }
    },
    methods: {
        showPassword(pageKey,password) {
            let passwordE=document.querySelector(`#app > div.dash-board > div.profile-view > div.profile__content > div.container > div.communities-view.router-view > div.my-page.${pageKey} > div.pages-info > div > div > div.page-password`)
            if (passwordE.innerHTML=='Password:******') {
                passwordE.innerHTML=`Password:${password}`
            }
            else if (passwordE.innerHTML==`Password:${password}`) {
                passwordE.innerHTML='Password:******'
            }
        },
    },
    mounted() {
        this.$rtdbBind('pages',db.ref('usersInformation').child(this.$store.state.ukey).child('pages'))
        this.$rtdbBind('groups',db.ref('usersInformation').child(this.$store.state.ukey).child('groups'))
    },
    beforeRouteEnter(to,from,next) {
        if (store.state.ukey==to.params.key) {
            next()
        }
        else next(false)
    }
}
</script>

<style>
#app > div.dash-board > div.profile-view > div.profile__content > div.container > div.communities-view.router-view > div.my-page > div.pages-info > div > div > i {
    font-size: 12px;
    cursor: pointer;
    position: absolute;
    right: 30px;
    top:50%;
    transform: translateY(-50%);
}
#app > div.dash-board > div.profile-view > div.profile__content > div.container > div.communities-view.router-view > div.my-page > div.pages-info > div > div > i:hover {
    color: orange;
}
.communities-view h5 {
    margin:0;
    padding:unset;
    padding:20px;  
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 800;
}
.communities-view h6 {
    margin:0;
    padding:unset;
    padding:10px;  
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 15px;
    width: 100%;
}
.communities-view .my-page, .communities-view .my-group {
    display: flex;
    width: 70%;
    margin:0 auto;
    flex-wrap: wrap;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    word-wrap: break-word;
    margin-top: 25px;
}
.communities-view .my-page .pages, .communities-view .my-group .groups{
    width: 30%;
    border-right:2px solid gainsboro;
}
.communities-view .my-page .pages-info, .communities-view .my-group .groups-info{
    width: 70%;
}
#app > div.dash-board > div.profile-view > div.profile__content > div.container > div.communities-view.router-view > div.my-page > div.pages > div > div > div {
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding:10px 0;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    align-items: center;
    cursor: pointer;
}

/*  */
@media only screen and (max-width: 768px) {
    .communities-view .my-page, .communities-view .my-group {
        flex-direction: column;
    }
    .communities-view .my-page .pages, .communities-view .my-group .groups{
        width: 100%;
        border:none;
    }
    .communities-view .my-page .pages-info, .communities-view .my-group .groups-info{
        width: 100%;
    }
}
</style>