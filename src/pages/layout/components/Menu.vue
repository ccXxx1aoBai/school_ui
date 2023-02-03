<template>
  <div>
    <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :default-active="activeIndex">
      <ChildrenMenu :menus="menus" />
    </el-menu>
  </div>
</template>

<script>
import ChildrenMenu from './ChildrenMenu.vue';
  export default {
    components: { ChildrenMenu },
    props: {
      menus: {
        type: Array,
        default: () => []
      }
    },
    name: "Menu",
    data() {
      return {
      }
    },
    computed: {
      activeIndex() {
        return this.$route.path
      }
    }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-menu[role=menubar] {
    height: calc(100vh - 70px) !important;
    padding-bottom: 10px;
    box-sizing: border-box;
    overflow-y: auto !important;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
</style>