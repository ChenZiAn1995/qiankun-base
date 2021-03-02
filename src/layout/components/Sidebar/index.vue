<script src="../../../router/index.js"></script>
<template>
  <div @mouseleave="focusMenu()">
    <!--  模块导航  -->
    <div class="main-sidebar" :class="{ 'has-logo': showLogo }">
      <logo v-if="showLogo" :collapse="isCollapse" />
      <el-scrollbar style="height: 100%;" wrap-class="scrollbar-wrapper" :noresize="false" :view-style="{ height: '100%' }">
        <div class="module-menu">
          <template v-for="(module, index) in menus">
            <div
              class="module-menu__item"
              :class="{ 'module-menu__acitve': activeMenusIdx === index }"
              :key="module.path"
              v-if="!module.hidden"
              @mouseenter="hoverMenu(index)"
            >
              {{ module.title }}
            </div>
          </template>
        </div>
      </el-scrollbar>
    </div>
    <!--  菜单导航  -->
    <div class="sub-sidebar" v-show="showSub || hoverMenusIdx">
      <div class="sub-sidebar-title">{{ loadSubMenus.title }}</div>
      <el-scrollbar
        style="height: 100%;"
        wrap-class="scrollbar-wrapper"
        :noresize="false"
        :view-style="{ height: '100%', 'border-right': '1px solid #ebedf0' }"
      >
        <div class="sub-menus-container">
          <template v-for="(subMenu, subMenuIdx) in loadSubMenus.children">
            <div class="sub-menu-group">
              <template v-if="subMenu.children && subMenu.children.length > 1">
                <div :key="subMenuIdx" class="sub-menu-group__title">{{ subMenu.title }}</div>
                <div class="sub-menus">
                  <template v-for="subMenuItem in subMenu.children">
                    <div class="sub-menu-item " @click="$router.push(subMenuItem.path)">
                      <div class="sub-menu-item__title sub-menu__hover" :class="{ 'sub-menu__active': activeMenu == subMenuItem.path }">
                        {{ subMenuItem.title }}
                      </div>
                    </div>
                  </template>
                </div>
              </template>
              <template v-else>
                <div v-if="subMenu.children" :key="subMenuIdx" class="sub-menu-group__title sub-menu__hover" @click="$router.push(subMenu.children[0].path)">
                  <div style="padding-left: 6px;" :class="{ 'sub-menu__active': activeMenu == subMenu.children[0].path }">{{ subMenu.children[0].title }}</div>
                </div>
                <div v-else :key="subMenuIdx" class="sub-menu-group__title sub-menu__hover" @click="$router.push(subMenu.path)">
                  <div style="padding-left: 6px;" :class="{ 'sub-menu__active': activeMenu == subMenu.path }">{{ subMenu.title }}</div>
                </div>
              </template>
            </div>
          </template>
        </div>
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
        return this.hoverMenusIdx !== null ? this.menus[this.hoverMenusIdx] : this.activeSubmenus
      }
    },
    watch: {
      '$route.path': {
        handler(n, o) {
          if (n) {
            let activeMenusIdx = this.menus.findIndex((el) => {
              if (n.search(el.path) != -1) {
                console.log('el:  selected: ', el)
              }
              return n.search(el.path) != -1 && el.path.search('/dashboard') == -1
            })
            this.activeMenusIdx = activeMenusIdx >= 0 && activeMenusIdx
            this.activeMenus(this.menus[activeMenusIdx])
          }
        },
        immediate: true
      }
    },
    data() {
      return {
        activeSubmenus: [],
        hoverMenusIdx: null,
        activeMenusIdx: null
      }
    },
    methods: {
      activeMenus(menu, menuIdx) {
        this.activeSubmenus = menu ? menu : []
        this.$store.commit('app/SET_ACTIVE_MENUS', menu)
        // this.$router.push('/client/old' + menu.children[0].path)
      },
      hoverMenu(idx) {
        console.log('this.menus[idx]: ', this.menus[idx])
        if (this.menus[idx].children && this.menus[idx].children.length > 0) {
          this.hoverMenusIdx = idx
        } else {
          this.hoverMenusIdx = null
        }
      },
      focusMenu() {
        this.hoverMenusIdx = null
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
      .module-menu__acitve {
        background-color: #fff;
        color: #333;
        &:hover {
          background-color: #fff;
          color: #333;
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
    background-color: #fff;
    .sub-sidebar-title {
      height: 50px;
      padding-left: 20px;
      line-height: 50px;
      font-size: 14px;
      font-weight: bold;
      border: 1px solid #ebedf0;
      color: #323233;
    }
    .sub-menus-container {
      font-size: 14px;
      padding: 10px 12px 27px;
      box-sizing: border-box;
      user-select: none;
      transition: all 1s ease 0s;
      .sub-menu-group {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ccc;
        color: $subMenuColor;
        min-height: 100%;
        .sub-menu-group__title {
          height: 40px;
          line-height: 32px;
          padding: 5px 0;
          box-sizing: border-box;
        }
        .sub-menus {
          .sub-menu-item {
            height: 40px;
            line-height: 32px;
            box-sizing: border-box;
            padding: 5px 0;
            overflow: hidden;
            border-radius: 6px;
          }
          .sub-menu-item__title {
            padding-left: 20px;
          }
        }
      }
    }
    .sub-menu__hover {
      cursor: pointer;
      &:hover {
        color: $subMenuHoverColor;
      }
    }
    .sub-menu__active {
      border-radius: 2px;
      background-color: $subMenuActiveBg;
    }
  }
</style>
