<template>
  <div @click='closeDetail' class="cover">
      <div class="product-detail">
          <ion-icon @click='closeDetail_' onMouseOut='this.style.background="unset"' onMouseOver='this.style.background="rgba(0,0,0,0.1)"' style='position:absolute;top:0;left:0;padding:5px;fontSize:30px;cursor:pointer' name="return-down-back-outline"></ion-icon>
          <div class="first-col">
              <div class="images-detail">
                  <div class="image-show">
                      <!--<img v-for='(image) in productImages' :key='image[".key"]' :src="image['.value']">-->
                      <img :key='selectedImg' :src="productImages[selectedImg]['.value']">
                  </div>
                 <div style='position:relative;overflow:hidden' class='images-bar-container'>
                      <i @click='previousImg' class="fas fa-angle-left left"></i>    
                        <div class="images-bar">
                            <div class='image-item' :class='"image-item"+index' v-for='(image,index) in productImages' :key='image[".key"]'>
                                <img @click='selectImg(index)' :class='{"selected":productImages[selectedImg][".value"]==image[".value"]}' :src='image[".value"]'>
                            </div>
                        </div>
                      <i @click='nextImg' class="fas fa-angle-right right"></i>
                 </div>
              </div>
          </div>
          <div class="second-col">
              <div class="time-remaining">
                  <div v-if='currentBidding.username!="None"&& timeremain!=0'>This item will be bought by <span @click='$router.push({name:"post",params:{key:currentBidding[".key"]}})' style='fontWeight:bolder;cursor:pointer' onMouseOver="this.style.color='black'" onMouseOut="this.style.color='unset'"><img style='width:30px;height:30px;borderRadius:5px' :src="currentBidding.avatarImg"> {{currentBidding.username}}</span> in </div>
                  <div v-if='currentBidding.username!="None" && timeremain==0 && $store.state.ukey!=currentBidding[".key"]'>This item has been bought by <span @click='$router.push({name:"post",params:{key:currentBidding[".key"]}})' style='fontWeight:bolder;cursor:pointer' onMouseOver="this.style.color='black'" onMouseOut="this.style.color='unset'"><img style='width:30px;height:30px;borderRadius:5px' :src="currentBidding.avatarImg"> {{currentBidding.username}}</span></div>
                  <div v-if='timeremain!=0' style='fontSize:20px;color:red;fontWeight:bolder'>{{formatDate}}</div>
                  <div style='fontSize:16px;fontWeight:bold' v-if='currentBidding.username=="None" &&timeremain==0'>No one's bidded yet.</div>
                  <div style='fontSize:16px;fontWeight:bold' v-if='currentBidding.username!="None" && timeremain==0 && $store.state.ukey==currentBidding[".key"]'>You are owner of this item. Please fill out the confirm form.</div>
              </div>
              <div class="product-more-detail">
                  <div style='fontWeight:bolder;fontSize:16px'>Product name: <span style='color:orangered;fontSize:19px;fontWeight:unset'>{{product.title}}</span></div>
                  <div style='fontWeight:bolder;fontSize:16px'>Details: <span style='color:black;fontWeight:lighter'>{{product.detail}}</span></div>
                  <div style='fontWeight:bolder;fontSize:16px'>Start price: <span style='color:green;fontSize:17px'>{{product.startprice}}$</span></div>
                  <div style='fontWeight:bolder;fontSize:16px'>Current price: <span style='color:green;fontSize:17px'>{{product.currentprice}}$</span></div>
                  <div style='fontWeight:bolder;fontSize:16px'>Time to win: <span style='fontSize:17px;fontWeight:lighter'>{{product.timetowin}}h since the lasted bidding</span></div>
                  <div style='fontWeight:bolder;fontSize:16px'>Seller: <span onMouseOut='this.style.fontWeight="lighter"' onMouseOver='this.style.fontWeight="bolder"' @click='$router.push({name:"post",params:{key:author[".key"]}})' style='cursor:pointer;fontSize:17px;fontWeight:lighter'><img style='width:25px;height:25px;borderRadius:5px' :src="author.avatarImg"> {{author.username}}</span></div>
                  <div style='fontWeight:bolder;fontSize:16px'>Sell date: <span style='color:black;fontWeight:lighter'>{{product.date}}</span></div>
              </div>
              <div v-if='timeremain!=0' class="bidding-form">
                  <h6 style='fontWeight:bolder;fontSize:17px'>Start Bidding</h6>
                  <div>Email:</div>
                  <input style='border:none;outline:none;backgroundColor:rgba(255,255,255,0.1);color:white' type="text" v-model='user.email' disabled>
                  <div>Phone:</div>
                  <input style='border:none;outline:none;backgroundColor:rgba(255,255,255,0.1);color:white' type="text" v-model='user.phone' disabled>
                  <div>Bidding price</div>
                  <div style='display:flex;alignItems:center;justifyContent:center'>
                        <ion-icon @click='bidprice-=10' style='cursor:pointer;transition:.1s linear;marginRight:5px' onMouseOver='this.style.transform="scale(1.3)"' onMouseOut='this.style.transform="scale(1)"' name="remove-outline"></ion-icon>
                        <input :class='{lower:bidprice<=product.currentprice,enable:bidprice>product.currentprice}' v-model='bidprice' style='border:none;outline:none;backgroundColor:rgba(255,255,255,0.1);width:30%;textAlign:center;fontWeight:bolder' type="number">
                        <ion-icon @click='bidprice+=10' style='cursor:pointer;transition:.1s linear;marginLeft:5px' onMouseOver='this.style.transform="scale(1.3)"' onMouseOut='this.style.transform="scale(1)"' name="add-outline"></ion-icon>
                  </div>
                  <span style='color:red;fontWeight:bolder;fontSize:14px'>{{err}}</span>
                  <button @click='biddingConfirm' v-if='$store.state.ukey!=authorKey&&$store.state.ukey!=currentBidding[".key"]' :disabled='err!=null&&err.trim()!=""' class="btn btn-sm btn-danger">Bid</button>
                  <span style='color:green;fontWeight:bolder' v-if='$store.state.ukey==authorKey'>Your are the seller.</span>
                  <span style='color:green;fontWeight:bolder' v-if='$store.state.ukey==currentBidding[".key"]'>Your are the lastest bidder.</span>
              </div>
              <div v-if='timeremain==0&&currentBidding[".key"]==$store.state.ukey' class="bidding-form">
                  <h6 style='fontWeight:bolder;fontSize:17px'>Confirm</h6>
                  <div>Email:</div>
                  <input style='border:none;outline:none;backgroundColor:rgba(255,255,255,0.1);color:white' type="text" v-model='user.email' disabled>
                  <div>Phone:</div>
                  <input style='border:none;outline:none;backgroundColor:rgba(255,255,255,0.1);color:white' type="text" v-model='user.phone' disabled>
                  <div>Address:</div>
                  <input style='border:none;outline:none;backgroundColor:rgba(255,255,255,0.1);color:white' type="text" v-model='confirmAddress'>
                  <button style='color:white;fontWeight:bolder' @click='ownerConfirm' v-if='$store.state.ukey!=authorKey' class="btn btn-sm btn-warning">Confirm</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
export default {
    props:{
        productImages:Array,
        productKey:String,
        authorKey:String,
        author:Object,
        currentBidding:Object,
        timeremain:Number,
        //currentBiddingKey:Object,
    },
    data() {
        return {
            selectedImg:0,
            product:{},
            timeInterval:null,
            address:'',
            user:{},
            bidprice:0,
            err:''
        }
    },
    computed: {
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
        biddingConfirm() {
            this.$bvModal.msgBoxConfirm(`Are you sure you want to bid this item with ${this.bidprice}$.`,{
                title: 'Bidding',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'Confirm',
                cancelTitle: 'Cancle',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            }).then(value => {
                if (value==true) {
                    this.bidding()
                    //noti soon
                }
            }).catch(err => {
                if (err==false) {
                    return
                }
            })
        },
        bidding() {
            this.$store.dispatch('loading')
            let realtimePrice
            let realtimetowin
            db.ref('market').child(this.productKey).child('currentprice').get().then(res=>{
                realtimePrice=res.val()
                db.ref('market').child(this.productKey).child('timetowin').get().then(res=>{
                    realtimetowin=res.val()
                    if (this.bidprice>realtimePrice && this.user.credit>this.bidprice) {
                    //bidding logic
                        //set credit
                        let newCredit=this.user.credit-this.bidprice
                        this.$store.state.credit=newCredit
                        db.ref('usersInformation').child(this.$store.state.ukey).child('credit').set(newCredit)
                        //return credit to old bidder
                        let oldCredit=realtimePrice
                        db.ref('market').child(this.productKey).child('currentbidding').get().then(res=>
                            {
                                if (res.val()) {
                                    let ukey=res.val()
                                    db.ref('usersInformation').child(ukey).child('credit').get().then(res=>{
                                        oldCredit+=res.val()
                                        db.ref('usersInformation').child(ukey).child('credit').set(oldCredit)
                                    })
                                }
                            }
                        )
                        //
                        //set time to win
                        if (realtimetowin>1) {
                            let newtimetowin=realtimetowin-1
                            db.ref('market').child(this.productKey).child('timetowin').set(newtimetowin).then(()=>{
                                //set bidding time
                                db.ref('market').child(this.productKey).child('biddingtime').set(new Date().getTime()).then(()=>{
                                    //set current bidding
                                    db.ref('market').child(this.productKey).child('currentbidding').set(this.$store.state.ukey).then(()=>{
                                        //set current price
                                        db.ref('market').child(this.productKey).child('currentprice').set(this.bidprice).then(()=>{
                                            //done call unload
                                            this.$store.dispatch('unload')
                                        })
                                    })
                                })
                            })
                        }
                        else if (realtimetowin<=1){
                            //set bidding time
                            db.ref('market').child(this.productKey).child('biddingtime').set(new Date().getTime()).then(()=>{
                                //set current bidding
                                db.ref('market').child(this.productKey).child('currentbidding').set(this.$store.state.ukey).then(()=>{
                                    //set current price
                                    db.ref('market').child(this.productKey).child('currentprice').set(this.bidprice).then(()=>{
                                        //done call unload
                                        this.$store.dispatch('unload')
                                    })
                                })
                            })
                        }
                    }
                    else if (this.bidprice<=realtimePrice || this.user.credit<this.bidprice) {
                        return
                    }
                }).catch(err=>{
                    console.log(err)
                    this.$store.dispatch('unload')
                })
            }).catch(err=>{
                console.log(err)
                this.$store.dispatch('unload')
            })
        },
        count() {
            this.timeInterval--
        },
        closeDetail_() {
            let productDetailCover=document.querySelector(`.product-intro.${this.productKey} .cover`)
            productDetailCover.classList.remove('show')
        },
        closeDetail(e) {
            let productDetailCover=document.querySelector(`.product-intro.${this.productKey} .cover`)
            if  (
                    e.target==productDetailCover

                ) {
                productDetailCover.classList.remove('show')
            }
        },
        selectImg(i) {
            this.selectedImg=i
        },
        nextImg() {
            let imagesBar=document.querySelector(`#app > div.dash-board > div.market-view > div > div.second-col > div > div.product-intro.${this.productKey} > div.cover.show > div > div.first-col > div.images-detail > div div.images-bar`)
            let imageItem=document.querySelector(`#app > div.dash-board > div.market-view > div > div.second-col > div > div.product-intro.${this.productKey} > div.cover.show > div > div.first-col > div > div div.images-bar > div.image-item`)
            imagesBar.scrollLeft=imagesBar.scrollLeft+imageItem.offsetWidth
            this.selectedImg++
            if (this.selectedImg==this.productImages.length) {
                imagesBar.scrollLeft=0
                this.selectedImg=0
            }
        },
        previousImg() {
            this.selectedImg--
            let imagesBar=document.querySelector(`#app > div.dash-board > div.market-view > div > div.second-col > div > div.product-intro.${this.productKey} > div.cover.show > div > div.first-col > div.images-detail > div div.images-bar`)
            let imageItem=document.querySelector(`#app > div.dash-board > div.market-view > div > div.second-col > div > div.product-intro.${this.productKey} > div.cover.show > div > div.first-col > div > div div.images-bar > div.image-item`)
            imagesBar.scrollLeft=imagesBar.scrollLeft-imageItem.offsetWidth
            if (this.selectedImg==-1) {
                this.selectedImg=this.productImages.length-1
                imagesBar.scrollLeft=this.productImages.length*imageItem.offsetWidth
            }
        },
    },
    watch: {
        bidprice(e) {
            this.err=''
            if (e<0) {
                this.bidprice=0
            }
            if (e<=this.product.currentprice) {
                this.err="Bidding price is lower."
            }
            if (e>this.user.credit) {
                this.err="You don't have enough money."
            }
        },
        timeremain(e) {
            if (e<=0) {
                clearInterval(this.timeInterval)
                this.timeremain=0
            }
        }
    },
    mounted() {
        this.$rtdbBind('product',db.ref('market').child(this.productKey))
        this.$rtdbBind('user',db.ref('usersInformation').child(this.$store.state.ukey))
        this.bidprice=parseInt(this.product.currentprice,10)+10
        this.timeInterval=setInterval(this.count,1000)
    },
    destroyed() {
        clearInterval(this.timeInterval)
    }
}
</script>

<style>
#app > div.dash-board > div.market-view > div > div.second-col > div > div.product-intro > div.cover.show > div > div.second-col > div.bidding-form > div:nth-child(7) > input.lower {
    color:red;
}
#app > div.dash-board > div.market-view > div > div.second-col > div > div.product-intro > div.cover.show > div > div.second-col > div.bidding-form > div:nth-child(7) > input.enable {
    color:green;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.product-intro .cover.show{
    visibility: visible;
    opacity: 1;
}
.product-intro .product-detail {
    height: 800px;
    width: 1200px;
    background-color:white;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    display: flex;
    flex-wrap: wrap;
    border-top:5px solid salmon;
    position: relative;
    overflow-y:auto;
}
#app > div.dash-board > div.market-view > div > div.second-col > div div.product-intro > div.cover.show > div > div.first-col {
    width: 60%;
    display: flex;
    flex-direction: column;
    height: 100%;
}
#app > div.dash-board > div.market-view > div > div.second-col > div div.product-intro > div.cover.show > div > div.second-col {
    width: 40%;
    display: flex;
    flex-direction: column;
    height: 100%;
}
/* first col */
    /* images detail */
.product-intro .product-detail .first-col .images-detail {
    width: 100%;
    height: 90%;
    margin:auto 0;
}
.product-intro .product-detail .first-col .images-detail .image-show{
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.product-intro .product-detail .first-col .images-detail .image-show img{
    object-fit: contain;
    padding:5px;
    min-width: 100%;
    height: 100%;
    animation: zoom 0.4s linear;
    -webkit-user-drag: none;
}
@keyframes zoom {
    0% {
        width: 0;
        height: 0;
    }
    100% {
        min-width: 100%;
        height: 100%;
    }
}
.product-intro .product-detail .first-col .images-detail .images-bar {
    height: 20%;
    display: flex;
    overflow-x: auto;
    position: relative;
}
.product-intro .product-detail .first-col .images-detail .images-bar-container i{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    color:orange;
    border:1px solid orange;
    padding:5px;
    left:2.5px;
    cursor: pointer;
    z-index: 10;
}
.product-intro .product-detail .first-col .images-detail .images-bar-container i:hover{
    background-color:rgba(255,255,255,0.1);
}
.product-intro .product-detail .first-col .images-detail .images-bar-container .right{
    left:unset;
    right: 2.5px;
}
.product-intro .product-detail .first-col .images-detail .images-bar .image-item{
    min-width: 20%;
    width: 20%;
    max-height: 150px;
    padding:0 2.5px;
    overflow: hidden;
}
.product-intro .product-detail .first-col .images-detail .images-bar .image-item img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
    cursor: pointer;
}
.product-intro .product-detail .first-col .images-detail .images-bar .image-item img.selected{
    border-bottom:3px solid orange;
}
/* second col */
    /* more detail */
.product-intro .product-detail .second-col .time-remaining {
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
}
.product-intro .product-detail .second-col .product-more-detail {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
}
.product-intro .product-detail .second-col .bidding-form {
    height: 37%;
    display: flex;
    flex-direction: column;
    width: 85%;
    align-items: center;
    justify-content: space-around;
    background-color:#313131;
    color:white;
    margin:0 auto;
}

/*  */
@media only screen and (max-width: 768px) {
    .product-intro .product-detail {
        height: auto;
        width: 100vw;
        max-height: 100vh;
        overflow-y:auto;
    }
    #app > div.dash-board > div.market-view > div > div.second-col > div div.product-intro > div.cover.show > div > div.first-col {
        width: 95%;
        margin-bottom: 10px;
    }
    #app > div.dash-board > div.market-view > div > div.second-col > div div.product-intro > div.cover.show > div > div.second-col {
        width: 95%;
    }
    #app > div.dash-board > div.market-view > div > div.second-col > div div.product-intro > div.cover.show > div > div.second-col>div{
        margin-bottom: 10px;
    }
    .product-intro .product-detail .second-col .product-more-detail>div {
        margin:5px;
    }
    .product-intro .product-detail .second-col .bidding-form {
        width: 100%;
    }
    .product-intro .product-detail .second-col .bidding-form input{
        width: 60%;
    }
}
@media only screen and (max-height: 800px) {
    .product-intro .product-detail {
        max-height: 100vh;
        width: 100vw;
        overflow-y:auto;
    }
}
</style>