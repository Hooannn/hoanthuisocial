<template>
  <div @click='close' style='visibility:visible;opacity:1' class="cover">
      <div class="market-sell">
          <h5>Post Item To Market<ion-icon @click='close_' onMouseOver='this.style.backgroundColor="rgba(0,0,0,0.1)"' onMouseOut='this.style.backgroundColor="unset"' style='color:orangered;position:absolute;right:0;padding:5px;fontSize:30px;top:0;cursor:pointer' name="return-up-back-outline"></ion-icon></h5>
          <div>Type:</div>
          <select v-model="type" >
              <option value="More">More</option>
              <option value="Technology">Technology</option>
              <option value="Clothes">Clothes</option>
          </select>
          <div>Product name:</div>
          <input placeholder="Enter your product name..." v-model='productName' type="text">
          <div>Product description:</div>
          <textarea placeholder="Enter your product desciption..." style='min-height:50px' v-model='productDes'/>
          <div>Start price: ($)</div>
          <input placeholder="Enter your product start price..." v-model='startPrice' type="number">
          <div>Time to win: (hours)</div>
          <input placeholder="Enter the time to bidder to win" v-model='timetowin' type="number">
          <div>Images</div>
          <div style='display:flex;flexDirection:column;alignItems:center'>
              <a target="_blank" :href="image" v-for='(image,index) in imgsUpload' :key='index' class="btn btn-sm btn-link">{{image}}</a>
          </div>
          <button @click='uploadImgs' style='width:150px;' class="btn btn-sm btn-dark">Upload Images</button>
          <button @click='postItemConfirm' style='width:150px;' class="btn btn-sm btn-danger">Post Item</button>
      </div>
  </div>
</template>

<script>
import db from '../../../plugins/firebase'
import client from '../../../plugins/filestack'
export default {
    data() {
        return {
            type:'More',
            productName:'',
            productDes:'',
            startPrice:null,
            timetowin:null,
            imgsUpload:[],
        }
    },
    methods: {
        close(e) {
            if (e.target==document.querySelector('#app > div.dash-board > div.market-view > div.cover')) {
                this.$router.go(-1)
            }
        },
        close_() {
            this.$router.go(-1)
        },
        removeImg(img) {
            let index=this.imgsUpload.indexOf(img)
            this.imgsUpload.splice(index,1)
        },
        uploadImgs() {
            const options = {
                accept: ["image/*"],
                maxFiles: 20,
                uploadInBackground: false,
                onUploadDone: (res) => {
                let images = res.filesUploaded.map((item) => item.url);
                if (images.length == 1 ) {
                    this.imgsUpload.push(images[0]);
                } else if (images.length > 1 ) {
                    this.imgsUpload = [...this.imgsUpload, ...images];
                }
            },
            };
        client.picker(options).open();
        },
        postItem() {
            if (this.productName==null || this.productName.trim()=='' ||
                this.productDes==null || this.productDes.trim()=='' ||
                this.startPrice==null || this.timetowin==null ||
                this.imgsUpload.length==0
            ) {
                this.$bvToast.show('alert-no-change')
            }
            else {
                this.$store.dispatch('loading')
                let item={
                    author:this.$store.state.ukey,
                    detail:this.productDes,
                    date:new Date().toLocaleString(),
                    images:this.imgsUpload,
                    startprice:this.startPrice,
                    currentprice:this.startPrice,
                    time:new Date().getTime(),
                    type:this.type,
                    title:this.productName
                }
                db.ref('market').push(item).then(()=>{
                    this.$store.dispatch('unload')
                }).catch((err)=>{
                    console.log(err)
                    this.$store.dispatch('unload')
                })
            }
        },
        postItemConfirm() {
            this.$bvModal.msgBoxConfirm(`Are you sure you want to post this item to market ?`,{
                title: 'Sell',
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
                    this.postItem()
                    //noti soon
                }
            }).catch(err => {
                if (err==false) {
                    return
                }
            })
        }
    }
}
</script>

<style>
.market-view .cover h5 {
    padding:10px;
    font-size: 16px;
    position: relative;
    color:orangered;
}
.market-view .cover {
    min-width: 100vw;
    min-height: 100vh;
    background-color:rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0;
    left:0;
    z-index: 15;
}
.cover .market-sell {
    width: 600px;
    background-color: rgb(226, 239, 243);
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    border-top: 5px solid salmon;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: auto;
    overflow-y:auto;
}
.cover .market-sell>*:not(h5){
    width: 80%;
    margin: 5px 0;
}
.cover .market-sell div {
    font-weight: bold;
    font-size: 16px;
}
.cover .market-sell input,.cover .market-sell select,.cover .market-sell textarea{
    border:none;
    outline:none;
    border:1px solid gainsboro;
    background:transparent;
    padding:8px 10px;
}
</style>