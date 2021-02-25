<template>
  <div @mouseleave="focusMenu()">
    <div class="main-sidebar" :class="{ 'has-logo': showLogo }">
      <logo v-if="showLogo" :collapse="isCollapse" />
      <el-scrollbar style="height: 100%;" wrap-class="scrollbar-wrapper" :noresize="false" :view-style="{ height: '100%' }">
        <div class="module-menu">
          <template v-for="(module, index) in menus">
            <div class="module-menu__item" :key="module.path" @click="activeMenus(module, index)" @mouseenter="hoverMenu(index)">
              {{ module.title }}
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
    <div class="sub-sidebar" v-show="showSub || activeSubmenus.length > 0 || activeMenusIdx">
      <div class="sub-menu-title">{{ loadSubMenus.title }}</div>
      <el-scrollbar style="height: 100%;" wrap-class="scrollbar-wrapper" :noresize="false" :view-style="{ height: '100%' }">
        <!--        <div class="sub-menu">-->
        <!--          <template v-for="subMenu in activeSubmenus">-->
        <!--            <div class="sub-menu__item" :key="subMenu.path">-->
        <!--              {{ subMenu.title }}-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </div>-->
        <el-menu :default-active="activeMenu" :collapse="isCollapse" :unique-opened="false" :collapse-transition="false" mode="vertical">
          <template v-for="(subMenu, subMenuIdx) in loadSubMenus.children">
            <el-submenu :index="`${subMenuIdx}`">
              <template slot="title">
                {{ subMenu.title }}
              </template>
              <template v-for="subMenuItem in subMenu.children">
                <el-menu-item :key="subMenuItem.path" class="menu-item">
                  <div :style="{ 'text-align': 'center' }" slot="title">{{ subMenuItem.title }}</div>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
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
      menus() {
        return this.$store.state.app.menus
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
      },
      loadSubMenus() {
        return this.activeMenusIdx !== null ? this.menus[this.activeMenusIdx] : this.activeSubmenus
      }
    },
    data() {
      return {
        activeSubmenus: [],
        activeMenusIdx: null
      }
    },
    methods: {
      activeMenus(menu, menuIdx) {
        this.activeSubmenus = menu ? menu : []
        this.activeMenusIdx = menuIdx
        this.$router.push(menu.children[0].path)
      },
      hoverMenu(idx) {
        this.activeMenusIdx = idx
      },
      focusMenu() {
        this.activeMenusIdx = null
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
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 14px;
    }
    .sub-menu {
      font-size: 12px;
      padding: 12px;
    }
  }
</style>
