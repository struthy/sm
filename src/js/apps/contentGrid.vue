<template>
  <section class="filter-grid grid side-primary">
    <div class="filter-grid--side side"></div>
    <div class="filter-grip__top-heading flex">
      <div class="filter-grid__heading flex">
        <h2>{{ title }}</h2>
        <select class="filter-grid__select" v-model="tag" @change="onChange($event)">
          <option v-for="(t, index) in tags" :key="index">{{ t.Name }}</option>
        </select>
      </div>
    </div>
    <div class="filter-grid__word">Explore</div>
    <div class="filter-grip__top-main">
      <div class="filter-grid__position flex">
        <ul class="filter-grid__filters filter-grid__filters--b flex">
          <template v-for="t in tags">
            <li :class="{ active: t.active }" v-on:click="tagFilter(t.Name)">
              {{ t.Name }}
              <span>{{ t.Count }}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="side filter-grid__side"></div>
    <div class="filter-grid__main">
      <ul class="filter-grid__all-cards flex">
        <li class="filter-grid__card" v-for="item in items">
          <div class="filter-grid__inner">
            <div class="filter-grid__top">
              <div class="filter-grid__img">
                <a :href="item.Url">
                  <img source v-bind:srcset="item.ImageUrl" :alt="item.Title" />
                </a>
              </div>

              <div class="filer-grid__content">
                <h5>{{ item.Title }}</h5>
                {{ item.Synopsis }}
              </div>
            </div>
            <div class="filter-grid__bottom">
              <a :href="item.Url">read more</a>
            </div>
          </div>
        </li>
      </ul>

      <div class="filter-grid__loading flex">
        <div class="filter-grid__pagination">
          showing
          <span>{{ items.length }}</span> of
          <span>{{ itemsTotal }}</span>
        </div>
        <label for="file">progress:</label>
        <progress class="progress" id="unique" :value="progress" max="100">{{ progress }}%</progress>
        <button
          class="btn btn--load-more"
          v-if="items.length < itemsTotal"
          v-on:click="loadMore()"
        >load more</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: [],
      items: [],
      tags: [],
      tag: "",
      itemsTotal: 0,
      pageSize: null,
      page: 1,
      pageId: null,
      componentIndex: null,
      allText: "All",
    };
  },
  mounted() {
    this.pageId = this.$el.parentNode.dataset.pageid;
    this.componentIndex = this.$el.parentNode.dataset.componentindex;

    axios
      .get(
        `/umbraco/api/contentgridapi/get?pageId=${this.pageId}&componentIndex=${this.componentIndex}&initialLoad=true`
      )
      .then((response) => {
        this.title = response.data.Title;
        this.items = response.data.Items;
        this.tags = response.data.Tags;
        this.tag = response.data.PreselectedTag;
        this.pageSize = parseInt(response.data.PageSize);
        this.itemsTotal = parseInt(response.data.ItemsTotal);
        this.tags.forEach((x) => {
          if (x.Name === response.data.PreselectedTag) x.active = true;
        });
      });
  },

  computed: {
    progress: function () {
     
      return (
        (((this.pageSize < this.itemsTotal ? this.pageSize : this.itemsTotal) *
          this.page) /
          this.itemsTotal) *
        100
      );
    },
  },

  methods: {
    loadMore() {
         let encodedTag =encodeURIComponent(this.tag)
      axios
        .get(
          `/umbraco/api/contentgridapi/get?pageId=${
            this.pageId
          }&componentIndex=${this.componentIndex}&tag=${encodedTag}&page=${this
            .page + 1}`
        )
        .then((response) => {
          this.page++;
          this.items = this.items.concat(response.data.Items);
        });
    },
    tagFilter(tag) {
      this.tags.forEach((x) => {
        if (x.Name === tag) {
          x.active = true;
        } else {
          x.active = false;
        }
      });
      this.tag = encodeURIComponent(tag);
      let encodedTag =encodeURIComponent(tag)
      this.page = 1;
      axios
        .get(
          `/umbraco/api/contentgridapi/get?pageId=${this.pageId}&componentIndex=${this.componentIndex}&tag=${encodedTag}&page=${this.page}`
        )
        .then((response) => {
          this.items = response.data.Items;
          this.itemsTotal = response.data.ItemsTotal;
        });
    },

    onChange(event) {
      let tag = this.tag;
      this.tagFilter(tag);
    },
  },
};
</script>
