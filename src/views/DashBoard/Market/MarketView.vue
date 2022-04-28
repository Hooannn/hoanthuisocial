<template>
  <div class="market-view">
      <router-view></router-view>
      <div class="container">
          <div class="first-col">
            <div style='marginBottom:25px;width:100%;height:40px;display:flex;alignItems:center;boxShadow:1px 1px 4px rgba(0,0,0,0.4);overflow:hidden;borderRadius:3px' class="search-bar">
                <input v-model='inputFilter' placeholder="Search product..." style='fontSize:15px;padding:0 10px;width:80%;height:100%;outline:none;backgroundColor:white;' type="text">
                <div class='btn-search' style='color:white;width:20%;height:100%;display:flex;justifyContent:center;alignItems:center;'><i class="fas fa-search"></i></div>
            </div>
            
            <div class="short-intro">
                <div style='width:100%;maxHeight:90px;overflow:hidden' class="short-bg">
                    <img style='width:100%;height:100%;objectFit:cover' :src="$store.state.coverImg">
                </div>
                <div style='marginBottom:20px;marginTop:-30px;display:flex;justifyContent:center;alignItems:center;width:100%;height:85px' class="short-ava">
                    <img style='width:90px;heigth:90px;borderRadius:50%;border:3px solid white;' :src="$store.state.avatarImg">
                </div>
                <div style='fontSize:15px;marginBottom:2px' >
                    <span style='fontWeight:800;'>{{$store.state.username}}</span><span style='fontSize:14px'> ({{$store.state.role}})</span>
                </div>
                <div style='fontWeight:800;fontSize:14px;marginBottom:2px;color:green' class="credit">
                    Credit: {{credit[".value"]}}$
                </div>
                <div style='color:grey'><i style='color:orangered'  class="fas fa-map-marker-alt"></i> {{$store.state.location}}</div>
                <button @click='$router.push({name:"post",params:{key:$store.state.ukey}})' style='{textDecoration:none;color:black;padding:5px;}' class="btn btn-link btn-sm">View Profile</button>
                <button @click='$router.push({name:"sell"})' style='{textDecoration:none;color:black;padding:5px;}' class="btn btn-sm btn-link">Sell something</button>
            </div>
            <div class="category">
                <h5>Category</h5>
                <div style='width:80%;display:flex;flexDirection:column;alignItems:center' class="check-box">
                    <div style='width:100%;padding:5px;fontSize:15px' v-for='(type,index) in types' :key='index'>
                        <input class="form-check-input" :id='type.name' type="checkbox">
                        <img style='width:30px;height:30px' :src="type.icon" class="icon">
                        <label style='marginLeft:5px' class="form-check-label" :for="type.name">{{type.name}}</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="second-col">
            <h5 style='color:grey;borderBottom:3px solid orange'>Market</h5>
            <div class="market-overview">
                <product-intro v-for='product in market' :key='product[".key"]' :class='product[".key"]' :productKey="product['.key']" :authorKey="product.author"/>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import techicon from '../../../assets/icons/market-caterogy/tech.png'
import moreicon from '../../../assets/icons/market-caterogy/trolley.png'
import clothes from '../../../assets/icons/market-caterogy/shirt.png'
import db from '../../../plugins/firebase'
import ProductIntro from '@/components/Market/ProductIntro.vue'
export default {
  components: { ProductIntro },
    data() {
        return {
            types:[
                {name:"Technology",icon:techicon},
                {name:"Clothes",icon:clothes},
                {name:"More",icon:moreicon},
            ],
            market:[],
            credit:{},
            inputFilter:'',
        }
    },
    mounted() {
        this.$store.dispatch('loading')
        this.$rtdbBind('market',db.ref('market').orderByChild('time')).then(()=>{this.$store.dispatch('unload')}).catch(()=>{this.$store.dispatch('unload')})
        this.$rtdbBind('credit',db.ref('usersInformation').child(this.$store.state.ukey).child('credit')).then(()=>{this.$store.dispatch('unload')}).catch(()=>{this.$store.dispatch('unload')})
    }
}
</script>

<style>
.market-view ::placeholder {
  font-size: 15px;
}
.market-view h5{
    margin:0;
    padding:unset;
    padding:20px;  
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 800;
    width: 100%;
}
.market-view .container{
    padding-top:80px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 50px;
    height: auto;
}
.market-view .container .first-col{
    width: 20%;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.market-view .container .second-col{
    width: 75%;
    display: flex;
    flex-direction: column;
    height: 100%;
}
/*1 column */
    /* Search Bar */
.market-view .first-col .search-bar input {
  border:none;
}
.market-view .first-col .search-bar input:focus {
  border:1px solid #FB5252;
}
.market-view .btn-search {
  background-color:#FB5252;
  cursor:pointer;
}
.market-view .btn-search:hover {
  background-color:#fb5252e5;
}
    /* short introduce */
.market-view .first-col .short-intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    word-wrap: break-word;
    position: relative;
}
    /* caterogy */
.market-view .first-col .category {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
    word-wrap: break-word;
    position: relative;
}
/* second col */
 /* market overview */
.market-view .container .second-col .market-overview{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top:25px;
}


/*  */
@media only screen and (max-width: 768px) {
    .market-view .container .first-col{
        width: 95%;
        margin:0 auto;
    }
    .market-view .container .second-col{
        width: 95%;
        margin:0 auto;
    }
    .market-view {
        max-width: 100vw;
        max-height: 100vh;
    }
    .market-view .container {
        padding-top: 50px;
    }
}
</style>