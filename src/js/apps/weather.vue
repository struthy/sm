<template>
  <div>
    <h1>Get the Weather boy</h1>
    {{ city }}

    <ul>
      <li v-for="(day, index) in distinctDayDates" :key="index">
        {{ day | moment("ddd") }}
        <!-- {{ day | moment("ddd, MMMM Do YYYY, h:mm:ss a") }} -->
      </li>
    </ul>

    <!-- <p v-for="(sun, index) in weather" :key="index">{{ sun.temp }}</p> -->
    <p v-for="(description, index) in descriptions" :key="index">
      {{ description }}
    </p>

    <p v-for="(temp, index) in temps" :key="index">
      {{ temp }}
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      allItems: [],
      days: [],
      city: [],
      weather: {},
      temps: [],
      descriptions: [],
    };
  },

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
  },
};
</script>
