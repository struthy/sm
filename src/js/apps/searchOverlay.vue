<template>
  <div>
    <a class="nav-desktop__search" data-modal @click="open = !open">
      <svg class="icon">
        <use xlink:href="/int-src/dist/img/sprite.svg#icon-search" />
      </svg>
    </a>
    <modal :open="open" @closed="close()">
      <search class="modal__content" />
    </modal>
  </div>
</template>
<script>
import search from "./search.vue";
import modal from "./components/modal.vue";
export default {
  components: {
    search,
    modal
  },
  data: function() {
    return {
      open: false
    };
  },
  methods: {
    close: function() {
      this.open = false;
    }
  }
};
</script>