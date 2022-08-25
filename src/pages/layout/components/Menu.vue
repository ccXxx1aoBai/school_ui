<template>
  <div>
    <el-menu router background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="activeIndex">
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

<style lang="" scoped>
  
</style>