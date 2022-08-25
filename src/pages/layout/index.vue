<template>
  <div>
    <el-container>
      <el-header>
        <div class="user">
          <div class="avatar">
            <img src="@/assets/avatar.png">
          </div>
          <div class="userinfo">
            <el-dropdown trigger="click">
              <span class="dropdown-label">用户名<i class="el-icon-arrow-down el-icon--right" /></span>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <i class="el-icon-user">个人中心</i>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-setting">系统设置</i>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-switch-button">退出系统</i>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu :menus="$store.getters.menus" />
        </el-aside>
        <el-main>
          <div class="router-tools">
            <div class="breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>学生</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="tabs">
              <div class="tab-wrap">
                <div class="tab-item" v-for="item in items" :key="item.name"
                :class="{'islink': item.path == curRouter}">
                  <router-link class="tab-link" :to="item.path">
                    <span>{{item.label}}</span>
                  </router-link>
                  <i class="el-icon-close"></i>
                </div>
              </div>
            </div>
          </div>
          <div>
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
  export default {
    components: { Menu },
    name: "",
    data() {
      return {
        items: [
          {
            path: "/index",
            name: "Index",
            label: "首页"
          },
          {
            path: "/student",
            name: "Student",
            label: "学生"
          }
        ]
      }
    },
    computed: {
      curRouter() {
        return this.$route.path
      }
    },
    mounted() {
      
    }
}
</script>

<style lang="scss" scoped>
.el-container{
  .el-header{
    background-color: #545c64;

    .user{
      display: flex;
      float: right;
      width: 200px;
      height: 100%;
      line-height: 60px;

      .avatar{
        width: 50px;
        height: 100%;
        margin: 0 10px;

        img{
          display: block;
          width: 48px;
          height: 48px;
          margin: 6px auto;
          border-radius: 5px;
        }
      }

      .userinfo{
        .dropdown-label{
          font-size: 18px;
          color: #ffffff;
        }
      }
    }
  }
  .el-aside{
    ::v-deep .el-menu {
      overflow: hidden;
      &:not(.el-menu--inline){
        height: calc(100vh - 60px);
      }

      .el-submenu .el-menu-item{
        width: 100%;
        min-width: 0;
      }
    }
  }
  
  .el-main{
    .router-tools{
      padding: 10px 0 0;
      box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: .2);

      .breadcrumb{
        margin: 10px;
      }

      .tabs{
        margin: 10px 0;
      }
      .tab-wrap{
        display: flex;
      }
      .tab-item{
        padding: 4px 8px;
        border-top: 1px solid #f5f5f5;
        border-right: 1px solid #f5f5f5;

        .tab-link{
          color: #333333;
          text-decoration: none;
        }

        span{
          padding-right: 5px;
        }
        .el-icon-close:hover{
          background-color: #c2c2c2;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      .tab-item.islink{
          box-shadow: 0 0 2px 1px rgba($color: #02ac49, $alpha: .2);
        }
    }
  }
}
</style>