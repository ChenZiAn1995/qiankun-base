<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span class="no-redirect">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import pathToRegexp from 'path-to-regexp'

  export default {
    data() {
      return {
        levelList: []
      }
    },
    watch: {
      $route() {
        // this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        this.levelList = []
        let activeMenus = this.$store.getters.routes
        this.levelList.push(...this.getAllNodes(activeMenus))
        console.log('levelList: ', this.levelList)
        if (this.levelList.length <= 0) {
          this.levelList = [{ path: '/client/old/dashboard', title: '首页' }]
        }
      },
      getAllNodes(nodes) {
        let nodesGroup = []
        let node = nodes.find((el) => {
          return this.$route.path.search(el.path) !== -1
        })
        if (node) {
          nodesGroup.push(node)
        }
        if (node.children && node.children.length > 0) {
          nodesGroup.push(...this.getAllNodes(node.children))
        }
        return nodesGroup
      },
      pathCompile(path) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route
        let toPath = pathToRegexp.compile(path)
        return toPath(params)
      },
      handleLink(item) {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
