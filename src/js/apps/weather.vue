<template>
  <div class="container">
    <h1>Get the Weather boy</h1>
    <h2>{{ cityName }}</h2>

    <div v-for="day in daysOfForecasts">
      <h5>{{ day.dateString }}</h5>
      <ul>
        <li v-for="forecast in day.forecasts" class="weather__details">
          {{ forecast.dt | moment("HH:mm") }}
          {{ forecast.weather[0].main }}
          <img v-bind:src="forecast.weather[0].icon | iconUrl" />
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
      selectedType: [],
      descriptions: [],
      daysOfForecasts: [],
    };
  },
  computed: {
    APIURL: function () {
      return `http://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=${this.appId}`;
    },
    isAllActive() {
      return this.selectedType === "All";
    },
    filteredDescriptions: function () {
      return this.descriptions.filter((x) => {
        return x;
      });
    },
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
};
</script>




