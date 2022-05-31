<template>
  <div class="digital-clock">
      <div class="dc-date center">
          <div :key='day' class="card-date day">{{day}}</div>
          <div :key='date' class="card-date date">{{date}}</div>
          <div :key='month' class="card-date month">{{month}}</div>
          <div :key='year' class="card-date year">{{year}}</div>
      </div>
      <div class="dc-time center">
          <div :key='hour' class="card-date hour">{{hour}}</div>
          <div :key='minute' class="card-date minute">{{minute}}</div>
          <div >
              <div style='animation:none' :key='second' class="card-date second">{{second}}</div>
              <div :key='getTimeType' class="card-date time-type">{{getTimeType}}</div>
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
    animation:flip 1s linear;
}
.digital-clock .card-date.second,.digital-clock .card-date.time-type {
    height: 45px;
    margin:5 0;
    width: 45px;
}
@keyframes flip {
    0% {
        transform: rotateX(0);
    }
    50% {
        transform: rotateX(90deg);
    }
    100% {
        transform: rotateX(0);
    }
}
@media only screen and (max-width: 768px) {
    .digital-clock .card-date {
        margin:10px;
        font-size: 20px;
        width: 60px;
        height: 80px;
    }
    .digital-clock .card-date.second,.digital-clock .card-date.time-type {
        height: 35px;
        width: 30px;
    }
}
</style>