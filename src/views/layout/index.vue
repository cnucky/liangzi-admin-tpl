<template>
  <div class="app-wrapper" :class="{hideSidebar: !sidebar.opened}">
      <side-bar class="sidebar-container"></side-bar>
      <div class="main-container">
          <nav-bar></nav-bar>
          <app-main></app-main>
      </div>
  </div>
</template>
<script>
import appMain from '@/views/layout/appmain'
import navBar from '@/views/layout/navbar'
import sideBar from '@/views/layout/sidebar'
export default {
  components: {
      navBar, sideBar, appMain
  },
  computed: {
    sidebar(){
      return this.$store.state.app.sidebar
    }
  }
}
</script>


<style lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

</style>


