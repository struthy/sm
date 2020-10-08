<template>
  <div class="result-block">
    <a :href="content.url" class="result-block__image square-image">
      <picture>
        <source v-bind:srcset="content.ImageUrl" media="(min-width: 0)" />
        <!--[if IE 9]></video><![endif]-->


        <img class="square-image__image" />
      </picture>
      <span v-if="content.PageType" class="grid-3__imgTag">
        <!-- {{
        content.PageType
        }}-->
      </span>
    </a>
    <div class="grid-3__txt">
      <a :href="content.Url" class="grid-3__title">{{ content.Title }}</a>
      <p>{{content.Snippet.slice(0, 80)}}</p>
      <div class="grid-3__link">
        <a :href="content.Url" class="btn btn--link">{{ content.CustomLinkTitle }}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "articleCardComponent",
  props: {
    content: { type: Object, required: true },
    index: { type: Number, default: 0 }
  }
};
</script>
