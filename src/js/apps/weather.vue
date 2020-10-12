<template>
  <div class="container">
    <h2 class="weather__heading">{{ cityName }}</h2>
    <h3 class="weather__heading">Whats the Weather Like Oot There?</h3>
    <div>
      <ul class="weather__days">
        <li v-for="(day, index) in daysOfForecasts"
        :key="'day-'+ index"
        class="weather__day">

          <label
            class="weather__label"
            :value="day.dateString" 
            :class="day === selectedDay ? 'active' : ''"
          >
            <input
              type="radio"
              v-model="selectedDay"
              :value="day"
            />
            <div>
            <span>{{ day.dateString | moment("ddd") }}</span>
            <span class="weather__date">{{ day.dateString | moment("MM-DD-YY") }}</span>
            </div>
          </label>
          
        </li>
      </ul>
    </div>

    <div class="weather__details">
      <div>
        <ul class="weather__details">
          <li v-for="(forecast, index) in selectedDay.forecasts" :key="'forecast-'+ index">
           
            {{ forecast.dt | moment("HH:mm") }}
            {{ forecast.weather[0].main }}
             
            <img alt="forecast.weather.main" v-bind:src="forecast.weather[0].icon | iconUrl" />
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      cityName: "Glasgow",
      appId: "63739a03352f0a8eb85911fac41e3c50",
      cityData: {},
      selectedDay: [],
      isActive: false,
      daysOfForecasts: [],
    };
  },
  computed: {
    APIURL: function() {
      return `https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=${this.appId}`;
    },

    //// not used yet, but might come in handy
    filteredForecasts: function() {
      var _this = this;
      return _this.daysOfForecasts.filter(function(x) {
        return x.dateString === _this.selectedDay;
      });
    },
  },

  // good for string transforms
  filters: {
    iconUrl: function(value) {
      return `https://openweathermap.org/img/w/` + value + ".png";
    },
  },

  created() {
    var _vm = this;
    axios.get(this.APIURL).then((response) => {
      _vm.cityData = response.data.city;
      _vm.daysOfForecasts = response.data.list
        // map all the list items to a new object with a datestring property to filter/groupby
        // and a forecasts property with all the forecast information for that day
        // unix timestamp is number of sec of sometime in past but js handles timestaps in milliseconds - x 1000 js understands
        .map((x, i, arr) => ({
          dateString: new Date(x.dt * 1000).toDateString(),
          forecasts: arr.filter((y) => {
            var d1 = new Date(x.dt * 1000).toDateString();
            var d2 = new Date(y.dt * 1000).toDateString();
            return d1 === d2;
          }),
        }))
        // filter out the duplicate days (by property not string)
        .filter(function(x, i, arr) {
          var distinctDayIndex = arr
          .map((y) => y.dateString)
          .indexOf(x.dateString);
          return i === distinctDayIndex;
          // returns object
        });

        // set today as selectedDay
        this.selectedDay = this.daysOfForecasts[0]
    });
  },

};
</script>
