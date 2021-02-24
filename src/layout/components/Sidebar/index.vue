<template>
  <div>
    <div class="main-sidebar" :class="{ 'has-logo': showLogo }">
      <logo v-if="showLogo" :collapse="isCollapse" />
      <el-scrollbar style="height: 100%;" wrap-class="scrollbar-wrapper" :noresize="false" :view-style="{ height: '100%' }">
        <div class="module-menu">
          <template v-for="route in sidebarList">
            <div class="module-menu__item" :key="route.path" @click="goTo(route)">
              {{ route.title }}
            </div>
          </template>
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
        <!--      </el-menu>-->
      </el-scrollbar>
    </div>
    <div class="sub-sidebar" v-show="showSub">
      <div class="sub-menu-title">系统功能</div>
      <el-scrollbar style="height: 100%;" wrap-class="scrollbar-wrapper" :noresize="false" :view-style="{ height: '100%' }">
        <div class="sub-menu">
          <template v-for="route in sidebarList">
            <div class="sub-menu__item" :key="route.path">
              {{ route.title }}
            </div>
          </template>
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
        <!--      </el-menu>-->
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'
  export default {
    props: {
      showSub: {
        type: Boolean,
        default: true
      }
    },
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
    },
    data() {
      return {}
    },
    methods: {
      goTo(route) {
        console.log(route)
        this.$router.push(route.path)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/styles/variables.scss';
  .main-sidebar {
    height: 100%;
    width: $sideBarWidth;
    background-color: $menuBg;
    .module-menu {
      .module-menu__item {
        height: 40px;
        line-height: 40px;
        color: $menuText;
        font-size: 14px;
        text-align: center;
        user-select: none;
        cursor: pointer;
        &:hover {
          color: $menuHoverText;
          background-color: $menuHoverBg;
        }
      }
    }
  }
  .sub-sidebar {
    position: fixed;
    left: $sideBarWidth;
    top: 0;
    bottom: 0;
    width: $subSideBarWidth;
    height: 100%;
    z-index: 1001;
    overflow: hidden;
    background-color: skyblue;
    .sub-menu-title {
      font-size: 14px;
      padding: 20px;
      height: 50px;
      line-height: 50px;
    }
    .sub-menu {
      font-size: 12px;
      padding: 12px;
    }
  }
</style>
