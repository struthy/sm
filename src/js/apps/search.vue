<template>
  <div class="modal-container modal-container__search" :class="classObject" role="document">
    <div class="modal-results-top">
      <div class="modal-container__innerSearch">
        <form action="/search">
          <div class="form-contents">
            <label :class="classObject">Search</label>
            <input
              placeholder="Type here..."
              type="search"
              title="search"
              class="search-form-input"
              name="title"
              v-model="searchTerm"
              required="required"
            />
          </div>
        </form>

        <div
          class="paginate-bottom flex"
          v-if="results.length !== 0 && searchTerm !== '' && !showLoading"
        >
          <p class="paginate-info">
            Showing
            <span>{{ results.length }}</span>
            results of {{totalResults}}
          </p>
          <div class="paginate-container" v-if="results.length >= 1">
            <a
              v-for="(page, i) in pages"
              :key="`pager_${page}`"
              @click="changePage(page); selectItem(i);"
              :class="{ active: i === activeItem}"
            >{{ page }}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-results--container">
      <div
        class="modal-results flex"
        v-if="results.length === 0 || (searchTerm !== '' && !showLoading)"
      >
        <articleCardBlock
          v-for="(item, index) in results"
          :content="item"
          :index="index"
          :key="`result_${index}`"
        />

        <div
          class="result-block--no-results"
          v-if="results.length === 0 && searchTerm !== '' && !showLoading"
        >No Results Found</div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "./../util/debounce";
import searchService from "./../services/searchService";
// import loadingOverLay from "./components/loadingOverlay.vue";
import articleCardBlock from "./components/articleCardBlock.vue";

export default {
  components: {
    // loadingOverLay,
    articleCardBlock
  },
  data() {
    return {
      results: [],
      totalResults: "",
      currentPage: 1,
      itemTypes: [],
      itemTypesWithHeading: [],
      pageFilter: "",
      activeItem: 0,
      activeClass: false,
      filters: {
        filterType: [
          {
            pageFilter: "All",
            selected: "true"
          },
          {
            pageFilter: "Categories",
            selected: "false"
          },
          {
            pageFilter: "News",
            selected: "false"
          }
        ]
      },
      pageType: "",
      selectedType: "All",
      searchTerm: "",
      pages: 0,
      showLoading: false
    };
  },
  watch: {
    searchTerm: debounce(function() {
      if (this.searchTerm === "") return;

      let _ = this;
      this.showLoading = true;
      searchService(
        _.searchTerm,
        _.currentPage,
        _.pageType,
        _.totalResults
      ).then(data => {
        _.results = data.Results;
        _.totalResults = data.TotalResults;
        _.currentPage = data.CurrentPage;
        _.pages = data.Pages;
        _.pageType = data.PageType;
        _.showLoading = false;
      });
    }, 500)
  },
  computed: {
    isAllActive() {
      return this.selectedType === "All";
    },

    classObject: function() {
      if (this.searchTerm !== "") {
        return {
          active: (this.activeClass = true)
        };
      } else {
        return {
          active: (this.activeClass = false)
        };
      }
    }
  },
  methods: {
    changePage(page) {
      // update page of items
      let _ = this;
      this.showLoading = true;
      this.activeClass = !this.activeClass;
      searchService(_.searchTerm, page, _.PageType, _.totalResults).then(
        data => {
          _.results = data.Results;
          _.totalResults = data.TotalResults;
          _.currentPage = data.CurrentPage;
          _.pages = data.Pages;
          _.PageType = data.PageType;
          _.showLoading = false;
        }
      );
    },
    getQueryString: function(queryString) {
      let uri = window.location.search.substring(1);
      let params = new URLSearchParams(uri);
      return params.get(queryString);
    },
    selectItem(i) {
      this.activeItem = i;
    }
  }
};
</script>
