<template>
  <div class="footer">
    <div class="bottom">
      Copyright© 2021 - {{nowYear}} | Author Sol | All Rights Reserved | Power by <a class="vueLink" href="https://github.com/vuejs/vue-hackernews-2.0/">官方 HackerNews Demo</a> & <a class="vueLink" href="https://ssr.vuejs.org/zh/">官方 SSR</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MyFooter',
    created() {
      this.nowYear = new Date().getFullYear()
    }
  }
</script>
<style scoped lang="stylus">
  .footer
    position absolute
    left 0
    bottom 0
    width 100%
    background-color #222
    color #ccc
    .bottom
      width 100%
      height 80px
      line-height 80px
      text-align center
      color #777
      background-color #000
      .vueLink
        color #42b983
</style>
