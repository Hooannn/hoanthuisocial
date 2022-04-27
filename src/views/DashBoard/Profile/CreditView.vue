<template>
  <div class="credit-view">
      <h5>Credit</h5>
      <div class="credit">
        <div style='padding:30px'>
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Current credit:</div>
          <input v-model='currentVal[".value"]' style='padding:5px;width:300px' type="number" disabled><br>
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Deposit:</div>
          <input v-model='depositVal' style='padding:5px;width:300px' type="number"><br>
          <span style='color:red;fontWeight:bolder;fontSize:14px'>{{err1}}</span><br>
          <button :disabled='err1!=""&&err1!=null' @click='deposit' class="btn-sm btn btn-success">Deposit</button>
          <div style='padding:5px;fontSize:15px;fontWeight:700'>Withdraw</div>
          <input v-model='withdrawVal' style='padding:5px;width:300px' type="number"><br>
          <span style='color:red;fontWeight:bolder;fontSize:14px'>{{err2}}</span><br>
          <button :disabled='err2!=""&&err2!=null' @click='withdraw' class="btn-sm btn btn-danger">Withdraw</button>
        </div>
      </div>
  </div>
</template>

<script>
import db from '../../../plugins/firebase'
export default {
    data() {
        return {
            currentVal:{},
            depositVal:0,
            withdrawVal:0,
            err1:'',
            err2:''
        }
    },
    methods: {
        deposit() {
            if (this.depositVal==0 || this.depositVal==null) {
                this.err1="Please enter the value."
                return
            }
            else {
                this.$bvModal.msgBoxConfirm(`Your deposit value is ${this.depositVal}$.`,{
                    title: 'Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    okTitle: 'Confirm',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        let newCredit=parseInt(this.currentVal[".value"],10)+parseInt(this.depositVal,10)
                        this.$store.dispatch('loading')
                        db.ref('usersInformation').child(this.$store.state.ukey).child('credit').set(newCredit).then(()=>{
                            this.depositVal=0
                            this.$bvToast.show('edit')
                            this.$store.dispatch('unload')
                        }).catch(err=>{
                            alert(err)
                            this.$store.dispatch('unload')
                        })
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
            }
        },
        withdraw() {
            if (this.withdrawVal==0 || this.withdrawVal==null) {
                this.err2="Please enter the value."
                return
            }
            else {
                this.$bvModal.msgBoxConfirm(`Your withdraw value is ${this.withdrawVal}$.`,{
                    title: 'Confirm',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Confirm',
                    cancelTitle: 'Cancle',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }) 
                .then(value => {
                    if (value==true) {
                        let newCredit=parseInt(this.currentVal[".value"],10)-parseInt(this.withdrawVal,10)
                        this.$store.dispatch('loading')
                        db.ref('usersInformation').child(this.$store.state.ukey).child('credit').set(newCredit).then(()=>{
                            this.withdrawVal=0
                            this.$bvToast.show('edit')
                            this.$store.dispatch('unload')
                        }).catch(err=>{
                            alert(err)
                            this.$store.dispatch('unload')
                        })
                    }
                })
                .catch(err => {
                    if (err==false) {
                        return
                    }
                })
            }
        }
    },
    watch: {
        withdrawVal(e) {
            this.err2=''
            if (e>this.currentVal[".value"]) {
                this.err2=`You don't have enought money.`
            } 
        },
        depositVal(e) {
            this.err1=''
        }
    },
    mounted() {
        this.$rtdbBind('currentVal',db.ref('usersInformation').child(this.$store.state.ukey).child('credit'))
    }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.credit-view .credit * {
    margin:5px 0;
}
.credit-view .credit input {
    outline:none;
    border: none;
    border:1px solid gainsboro;
    padding:10px;
    font-size: 15px;
}
.credit-view .credit input:focus {
    border-color: orange;
}
.credit-view .credit{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom:25px;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border-radius: 2px;
    text-overflow: ellipsis;
    background-color: white;
}
.credit-view h5 {
  margin: 0;
  padding: unset;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  font-weight: 800;
}
/*  */
@media only screen and (max-width: 768px) {
    .credit-view {
        width: 95%;
        margin:0 auto;
    }
}
</style>