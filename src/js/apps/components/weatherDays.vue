<template>
   <div >
      <ul class="weather__days"
        v-for="(day, index) in daysOfForecasts"
        :key="index"
        
      >
        <li class="weather__day">
          <label
            class="newsEvents__label"
            :value="day.dateString"
            >
            <input
              type="radio"
              class="newsEvents__radio"
              v-bind:class="day.dateString"
              v-model="selectedDay"
              :value="day.dateString"
            />
            {{ day.dateString }}
          </label>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  name: "weatherDaysComponent",
  props: {
    content: { type: Object, required: true },
    index: { type: Number, default: 0 }
  }
};
</script>