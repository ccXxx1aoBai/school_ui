<template>
  <div>
    <div v-for="menu in menus" :key="menu.name">
      <el-submenu :index="menu.name" v-if="menu.children && menu.children.length > 0">
        <template slot="title">
          <span>{{menu.label}}</span>
        </template>
        <ChildrenMenu :menus="menu.children" />
      </el-submenu>

      <el-menu-item v-else :index="menu.path">{{menu.label}}</el-menu-item>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ChildrenMenu',
    props: {
      menus: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="" scoped>
  
</style>