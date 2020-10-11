<template>
  <div class="container">
    <h1>Get the Weather boy</h1>
    <h2>{{ city }}</h2>

    <div class="weather__days">
      <label v-for="(day, i) in distinctDayDates" :key="i">
        <input type="radio" v-model="selectedType" :value="day" />
        {{ day }}
      </label>
    </div>

    <ul>
      <li class="weather__details">
        <!-- <ul>
          <li v-for="(day, i) in days" :key="'B' + i">
            {{ day | moment(" h:mm:ss a") }}
          </li>
        </ul> -->
        <ul>
          <li v-for="(description, i) in filteredDescriptions" :key="'A' + i">
            {{ description }}
          </li>
        </ul>
      </li>
    </ul>

    <!-- <p v-for="(temp, i) in temps" :key="'B' + i">
      {{ temp }}
    </p> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      allItems: [],
      days: [],
      times: [],
      city: [],
      weather: {},
      temps: [],
      descriptions: [],
      selectedType: [],
    };
  },

  // https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=63739a03352f0a8eb85911fac41e3c50

  created() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=GLasgow&appid=63739a03352f0a8eb85911fac41e3c50`
      )
      .then((response) => {
        this.allItems = response.data;
        this.city = response.data.city.name;
        this.days = response.data.list.map(function(x) {
          return x.dt;
        });
        this.temps = response.data.list.map(function(x) {
          return Math.round(x.main.temp);
        });
        this.descriptions = response.data.list.map(function(x) {
          return x.weather[0].description;
        });
      });
  },

  computed: {
    distinctDayDates: function() {
      return this.days
        .map((x) => new Date(x * 1000).toDateString())
        .filter((x, i, arr) => arr.indexOf(x) == i);
    },

    isAllActive() {
      return this.selectedType === "All";
    },
    filteredDescriptions: function() {
      var _this = this;
      return _this.descriptions.filter(function(x) {
        return x;
      });
    },
  },

  methods: {
    // activeItem: function(category) {
    //   if (this.selectedType === category) {
    //     return "isActive";
    //   } else {
    //     return "";
    //   }
    // },
  },
};
</script>
