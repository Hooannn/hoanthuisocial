<template>
  <div class="console-view">
      <h5>Console</h5>
      <h5>Logs: </h5>
      <div style='padding:15px;color:green;fontWeight:bolder'>{{response}}</div>
      <span>_</span><input autocomplete="off" @keypress.enter="commandSent" v-model='command' style='background:transparent;outline:none;border:none;color:green;padding:15px;width:95%' type="text">
      <div style='padding:5px' v-for='log in logs' :key='log[".key"]' class="log">
          <span>[{{log.date}}] : </span><span>{{log.user}} {{log.type}}</span>
      </div>
  </div>
</template>

<script>
import db from '../../plugins/firebase'
import store from '../../store/store'
export default {
    data() {
        return {
            logsData:[],
            logs:[],
            response:'',
            command:''
        }
    },
    methods: {
        commandSent() {
            if (this.command==`/back`) {
                this.response='...Going back'
                this.$router.go(-1)
            }
            else {
                this.response='...unknown command'
            }
            this.command=''
        }
    },
    watch: {
        logsData() {
            this.logs=[]
            this.logsData.forEach(log => {
                this.logs.unshift(log)
            });
        }
    },
    mounted() {
        this.$rtdbBind('logsData',db.ref('logs'))
    },
    beforeRouteEnter(to,from,next) {
        if (store.state.role=="Admin") {
            next()
        }
        else next(false)
    }
}
</script>

<style>
.console-view {
    min-width: 100vw;
    min-height: 100vh;
    background-color:black;
    color:green;
}
</style>