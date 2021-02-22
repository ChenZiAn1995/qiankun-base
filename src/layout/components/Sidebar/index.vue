<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar style="height: 100%;" wrap-class="scrollbar-wrapper" :noresize="false" :view-style="{ height: '100%' }">
      <div>
        <p>12</p>
      </div>
      <!--      <el-menu-->
      <!--        :default-active="activeMenu"-->
      <!--        :collapse="isCollapse"-->
      <!--        :background-color="variables.menuBg"-->
      <!--        :text-color="variables.menuText"-->
      <!--        :unique-opened="false"-->
      <!--        :active-text-color="variables.menuActiveText"-->
      <!--        :collapse-transition="false"-->
      <!--        mode="vertical"-->
      <!--      >-->
      <!--        <template v-for="route in sidebarList">-->
      <!--          <el-menu-item :key="route.path" class="menu-item">-->
      <!--            <div :style="{ 'text-align': 'center' }" slot="title">{{ route.title }}</div>-->
      <!--          </el-menu-item>-->
      <!--        </template>-->
      <!--        <sidebar-item v-for="route in sidebarList" :key="route.path" :item="route" :base-path="route.path" />-->
      <!--      </el-menu>-->
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'
  export default {
    components: { SidebarItem, Logo },
    computed: {
      ...mapGetters(['sidebar']),
      sidebarList() {
        return this.$store.state.app.sidebarList
      },
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-scrollbar__wrap {
    height: 100%;
  }
  .menu-item {
    &:hover {
      .sidebar-item {
        display: block;
      }
    }
  }
  .sidebar-item {
    width: 132px;
    display: none;
    position: fixed;
    left: 92px;
    top: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 1;
  }
</style>
