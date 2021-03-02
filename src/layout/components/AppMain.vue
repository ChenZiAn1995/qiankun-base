<template>
  <section class="base-app-main">
    <transition name="fade-transform" mode="out-in">
      <!--   qiankun子应用挂载点   -->
      <div id="appContainer"></div>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.path
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/styles/variables.scss';
  .base-app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    min-width: $mainContainerMinWidth;
  }
  .fixed-header + .base-app-main {
    padding-top: 50px;
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
  #appContainer {
    padding: 20px;
    //background-color: #fff;
  }
</style>
