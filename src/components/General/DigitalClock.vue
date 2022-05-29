<template>
  <div class="digital-clock">
      <div class="dc-date center">
          <div class="card-date day">{{day}}</div>
          <div class="card-date date">{{date}}</div>
          <div class="card-date month">{{month}}</div>
          <div class="card-date year">{{year}}</div>
      </div>
      <div class="dc-time center">
          <div class="card-date hour">{{hour}}</div>
          <div class="card-date minute">{{minute}}</div>
          <div >
              <div class="card-date second">{{second}}</div>
              <div class="card-date time-type">{{getTimeType}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            day:'',
            date:'',
            month:'',
            year:'',
            hour:'',
            minute:'',
            second:'',
            week:['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            timerID:null
        }
    },
    computed:{
        getTimeType() {
            if (this.hour>12&&this.hour<=24) {
                return "PM"
            }
            else return "AM"
        }
    },
    methods:{
        updateTime() {
            let cd = new Date();
            this.hour=this.zeroPadding(cd.getHours(), 2)
            this.minute=this.zeroPadding(cd.getMinutes(), 2)
            this.second=this.zeroPadding(cd.getSeconds(), 2)
            this.day=this.week[cd.getDay()]
            this.date=this.zeroPadding(cd.getDate(), 2)
            this.month=this.zeroPadding(cd.getMonth()+1, 2)
            this.year=this.zeroPadding(cd.getFullYear(), 4)
        },
        zeroPadding(num, digit) {
            let zero = '';
            for(let i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    },
    mounted() {
        this.timerID=setInterval(this.updateTime,1000)
    },
    destroyed() {
        clearInterval(this.timerID)
    }
}
</script>

<style>
.digital-clock {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding:15px 0;
}
.digital-clock .dc-date .card-date {
    color:black;
    background-color:whitesmoke;
}
.digital-clock .dc-time .card-date {
    color:white;
    background-color:var(--dark);
}
.digital-clock .card-date {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 90px;
    font-weight: bold;
    margin:10px 20px;
    font-size: 30px;
    box-shadow: 0 0 3px 2px rgba(0,0,0,0.3);
}
.digital-clock .card-date.second,.digital-clock .card-date.time-type {
    height: 45px;
    margin:5 0;
    width: 45px;
}
</style>