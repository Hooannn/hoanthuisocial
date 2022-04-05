<template>
  <div class="post-view">
      <div class='first-col'>
          <div class="social-accounts">
              <h5>Social Accounts</h5>
              <a target="_blank" :href='socialAccounts[0][".value"]' class="fb"><i style='marginRight:5px;borderRadius:50%;color:#3B5998' class="fab fa-facebook-f"></i>{{socialAccounts[0]['.value']}}</a>
              <a target="_blank" :href='socialAccounts[5][".value"]' class="yt"><i style='marginRight:5px;borderRadius:50%;color:#E50914' class="fab fa-youtube"></i>{{socialAccounts[5]['.value']}}</a>
              <a target="_blank" :href='socialAccounts[4][".value"]' class="tw"><i style='marginRight:5px;borderRadius:50%;color:#1DA1F2' class="fab fa-twitter"></i>{{socialAccounts[4]['.value']}}</a>
              <a target="_blank" :href='socialAccounts[1][".value"]' class="github"><i style='marginRight:5px;borderRadius:50%;color:black' class="fab fa-github"></i>{{socialAccounts[1]['.value']}}</a>
              <a target="_blank" :href='socialAccounts[3][".value"]' class="pinterest"><i style='marginRight:5px;borderRadius:50%;color:#792b2b;#E9EBEE' class="fab fa-pinterest"></i>{{socialAccounts[3]['.value']}}</a>
              <a target="_blank" :href='socialAccounts[2][".value"]' class="insta"><i style='marginRight:5px;borderRadius:50%;color:#CD486B;#E9EBEE' class="fab fa-instagram"></i>{{socialAccounts[2]['.value']}}</a>
          </div>
      </div>
      <div class='second-col'>
          <div class='make-post'>
              <div style='display:flex' class="content">
                  <div style='borderRadius:50%;width:35px;height:35px;overflow:hidden'><img style='width:100%;height:100%;objectFit:cover' :src="$store.state.avatarImg"></div>
                  <textarea style='minHeight:100px;width:100%;outline:none;border:none;marginLeft:10px;marginBottom:10px' :placeholder="placeholder" ></textarea>
              </div>
              <div style='width:100%;display:flex;justifyContent:flex-end' class="control">
                  <button style='color:white;fontWeight:900' class="btn btn-sm btn-warning">Upload Post</button>
              </div>
          </div>
          <div class="posts-list"></div>
      </div>
      <div class='third-col'>
          <div class="market-introduce">
              <h5 style='fontWeight:bolder'>Want to Sell your items</h5>
              <div>Post your items to the market for free. Just add it through the simple form. Then wait for another users pay for it. Try out ours bidding system.</div>
              <button style='color:white;fontWeight:400' class="btn btn-warning ">Try it now</button>
          </div>
      </div>
  </div>
</template>

<script>
import db from './../../../plugins/firebase'
export default {
    data() {
        return {
            socialAccounts:[],
            placeholder:'What is new, '+this.$store.state.username + " ?",
        }
    },
    mounted() {
        this.$rtdbBind('socialAccounts', db.ref('usersInformation').child(this.$store.state.ukey).child('socialAccounts'))
        
    }
}
</script>

<style>
.post-view {
    margin-top:50px;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.first-col,.third-col {
    width: 20%;
}
.second-col {
    width: 50%;
}
/* 1 */
/* social accounts */
.social-accounts {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color:white;
}
.social-accounts h5{
    padding:10px;  
    border-bottom: 1px solid rgba(0,0,0,0.2);
    font-size: 17px;
    font-weight: 800;
}
.social-accounts a{
    padding: 20px 10px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    text-decoration: none;
    display: flex;
    align-items: center;
    color:#792b2b;
}

/* 2 */
/* make post */
.make-post {
    width: 100%;
    background-color:white;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    padding:20px;    
}


/* 3 */
.market-introduce {
    padding:30px;
    color:white;
    font-weight: 700;
    background:url('https://imgkub.com/images/2022/04/06/image.png');
    background-position:bottom;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.market-introduce *{
    margin:10px 0;
}
</style>