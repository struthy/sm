<template>
  <div class="container">
    <h1>Get the Weather boy</h1>
    <h2>{{ cityName }}</h2>

    <div>
      <ul v-for="(day, index) in daysOfForecasts" :key="index">
        <li>
          <label
          class="newsEvents__label"
          :value="day.dateString"
          >
            <input
              type="radio"
              class="newsEvents__radio"
              v-model="selectedDay"
              :value="day.dateString"
              :checked="index === 0"
            />
            {{ day.dateString }}
          </label>
          <ul>
            <li v-for="(forecast, index) in day.forecasts" :key="index" class="weather__details">
              {{ forecast.dt | moment("HH:mm") }}
              {{ forecast.weather[0].main }}
              <img v-bind:src="forecast.weather[0].icon | iconUrl" />
            </li>
          </ul>
        </li>
      </ul>
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
      descriptions: [],
      daysOfForecasts: [],
    };
  },
  computed: {
    APIURL: function () {
      return `http://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=${this.appId}`;
    },

    filteredDescriptions: function () {
      return this.descriptions.filter((x) => {
        return x;
      });
    },

    filteredForecasts: function() {
      var _this = this;
      return _this.daysOfForecasts.filter(function(x) {
        return x.dateString === _this.selectedDay;
      });
    }
  },
  

  filters: {
    iconUrl: function (value) {
      return `http://openweathermap.org/img/w/` + value + ".png";
    },
  },

  created() {
    var _vm = this;
    axios.get(this.APIURL).then((response) => {
      _vm.cityData = response.data.city;
      _vm.daysOfForecasts = response.data.list
        // map all the list items to a new object with a datestring property to filter/groupby
        // and a forecasts property with all the forecast information for that day
        .map((x, i, arr) => ({
          dateString: new Date(x.dt * 1000).toDateString(),
          forecasts: arr.filter((y) => {
            var d1 = new Date(x.dt * 1000).toDateString();
            var d2 = new Date(y.dt * 1000).toDateString();
            return d1 === d2;
          }),
        }))
        // filter out the duplicate days
        .filter(function (x, i, arr) {
          var firstOfTheDayIndex = arr
            .map((e) => e.dateString)
            .indexOf(x.dateString);
          return i === firstOfTheDayIndex;
        });
    });
  },


  methods: {
    activeItem: function(category) {
      if (this.selectedDay === category) {
        return true;
      } else {
        return "";
      }
    },
  }
};
</script>




