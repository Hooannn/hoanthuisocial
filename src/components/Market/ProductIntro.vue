<template>
  <div class="product-intro">
      <div class="images-overview">
          <div class="image-overview">
              <i @click='previousImg' class="fas fa-angle-left left"></i>
              <i @click='nextImg' class="fas fa-angle-right right"></i>
              <img :key='imageShow' :class='{"slide-left":slide=="slide-left","slide-right":slide=="slide-right"}' style='width:100%;height:100%;objectFit:cover' :src="productImages[imageShow]['.value']">
          </div>
      </div>
      <div class="time-remain">
          {{formatDate}}
      </div>
      <div class="product-info">
          <div onMouseOut='this.style.backgroundColor="unset"' onMouseOver='this.style.backgroundColor="rgba(0,0,0,0.1)"' @click='$router.push({name:"post",params:{key:author[".key"]}})' style='cursor:pointer;width:100px;height:100%;display:flex;justifyContent:center;alignItems:center;flexDirection:column;' class="product-author">
              <div style='width:50px;height:50px;overflow:hidden;objectFit:cover;borderRadius:50%' class="author-avatar">
                  <img style='width:100%;height:100%;objectFit:cover' :src="author.avatarImg">
              </div>
              <div style='fontSize:13px' class="author-username">
                  {{author.username}}
              </div>
          </div>
          <div class="product-info-des">
              <div style='width:40%'>
                  <div style='fontWeight:bolder'>Product:</div>
                  <div style='fontWeight:bold;color:orangered;fontSize:16px'>{{product.title}}</div>
              </div>
              <div style='width:18%'>
                  <div style='fontWeight:bolder'>Start price: </div>
                  <div style='fontWeight:bold;color:green;fontSize:16px'>{{product.startprice}}$</div>
              </div>
              <div style='width:18%'>
                  <div style='fontWeight:bolder'>Current price: </div>
                  <div style='fontWeight:bold;color:green;fontSize:16px'>{{product.currentprice}}$</div>
              </div>
              <div style='width:18%'>
                  <div style='fontWeight:bolder'>Bidder: </div>
                  <div style='cursor:pointer' onMouseOver='this.style.color="orangered"' onMouseOut='this.style.color="unset"' @click='$router.push({name:"post",params:{key:currentBidding[".key"]}})'><img style='width:20px;height:20px;borderRadius:5px;' :src="currentBidding.avatarImg"> {{currentBidding.username}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props:{
        productKey:String,
        authorKey:String,
    },
    data() {
        return {
            timeremain:0,
            timeInterval:null,
            imageShow:0,
            biddingTime:{},
            product:{},
            productImages:[],
            author:{},
            currentBidding:{
                username:"None",
                avatarImg:null,
            },
            currentBiddingKey:'',
            slide:'',
            slideInterval:null,
        }
    },
    computed:{
        formatDate() {
            this.timeremain = parseInt(this.timeremain, 10);
            let hours   = Math.floor(this.timeremain / 3600);
            let minutes = Math.floor((this.timeremain - (hours * 3600)) / 60);
            let seconds = this.timeremain - (hours * 3600) - (minutes * 60);
            if (hours   < 10) {hours   = `0${hours}`}
            if (minutes < 10) {minutes = `0${minutes}`}
            if (seconds < 10) {seconds = `0${seconds}`}
            return `${hours}:${minutes}:${seconds}`
        },
    },
    methods: {
        nextImg() {
            this.slide='slide-right'
            this.imageShow++
            if (this.imageShow==this.productImages.length) {
                this.imageShow=0
            }
        },
        previousImg() {
            this.slide='slide-left'
            this.imageShow--
            if (this.imageShow==-1) {
                this.imageShow=this.productImages.length-1
            }
        },
        getTimeRemain() {
            if (this.biddingTime['.value']!=null&&this.biddingTime['.value']!=undefined) {
                if (this.timeremain==0) {
                    return
                }
                this.timeremain=(24*60*60)-(Math.floor((new Date().getTime()-this.biddingTime['.value'])/1000))
            }
            else {
                return
            }
        }
    },
    watch: {
        productImages() {
            this.imageShow=Math.floor(Math.random() * ((Math.floor(this.productImages.length-1)) - 0) + 0)
        },
        product(e) {
            clearInterval(this.timeInterval)
            this.currentBiddingKey=null
            this.timeremain=null
            this.currentBidding={
                username:"None",
                avatarImg:null,
            }
            this.$rtdbBind('currentBiddingKey',db.ref('market').child(this.productKey).child('currentbidding')).then(()=>{
                if (this.currentBiddingKey[".value"]!=undefined&&this.currentBiddingKey[".value"]!=null) {
                    this.$rtdbBind('currentBidding',db.ref('usersInformation').child(this.currentBiddingKey[".value"]))
                }
            })
            this.timeInterval=setInterval(this.getTimeRemain,1000)
        }
    },
    mounted() {
        let randomInterval=Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
        this.slideInterval=setInterval(this.nextImg,randomInterval)
        this.$rtdbBind('product',db.ref('market').child(this.productKey))
        this.$rtdbBind('productImages',db.ref('market').child(this.productKey).child('images'))
        this.$rtdbBind('author',db.ref('usersInformation').child(this.authorKey))
        this.$rtdbBind('biddingTime',db.ref('market').child(this.productKey).child('biddingtime'))
    },
    destroyed() {
        clearInterval(this.slideInterval)
        clearInterval(this.timeInterval)
    }
}
</script>

<style>
.product-intro {
    width: 80%;
    height: 330px;
    box-shadow: 0 0 2px rgba(0,0,0,0.3);
}
.product-intro .time-remain{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:red;
    font-size: 18px;
}
.product-intro .image-overview{
    width: 100%;
    height: 200px;
    position: relative;
    overflow: hidden;
}
.product-intro .image-overview img.slide-right {
    animation: slide-right .7s ease-in-out;
}
.product-intro .image-overview img.slide-left {
    animation: slide-left .7s ease-in-out;
}
@keyframes slide-left {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translate(0);
    }
}
@keyframes slide-right {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translate(0);
    }
}
.product-intro .product-info{
    width: 100%;
    height: 100px;
    position: relative;
    border-top: 0;
    display: flex;
    justify-content: space-between;
    background-color:rgb(245, 245, 245,0.5);
}
.product-intro .image-overview i{
    position: absolute;
    border:1px solid orange;
    border-left: none;
    color:orange;
    top:50%;
    transform: translateY(-50%);
    padding:2px;
    font-size: 25px;
    left:0;
    cursor: pointer;
}
.product-intro .image-overview .right{
    border-left: 1px solid rgb(255, 165, 0);
    border-right:none;
    left:unset;
    right:0;
}
.product-intro .image-overview i:hover {
    background-color: rgb(255, 165, 0,0.1);
}
.product-intro .product-info .product-info-des{
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    max-width: 80%;
}
.product-intro .product-info .product-info-des{
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    overflow: hidden;
    word-wrap: break-word;
    font-size: 14px;
}
</style>