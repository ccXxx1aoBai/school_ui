<template>
  <div>
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu 
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
            <el-menu-item index="1">首页</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
.el-container{
  .el-header{
    background-color: #545c64;
  }
  .el-aside{
    height: calc(100vh - 60px);
    .el-menu{
      height: 100%;
    }
  }
}
</style>