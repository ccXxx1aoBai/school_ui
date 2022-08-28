<template>
  <div>
    <el-container>
      <el-container>
        <el-aside width="200px">
          <div class="title">
            <img src="@/assets/icon.png">
            <span>智慧校园</span>
          </div>
          <Menu :menus="$store.getters.menus" />
        </el-aside>
        <el-main>
          <div class="header">
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
                  :class="{'islink': item.name == curRouterName}">
                    <router-link class="tab-link" :to="item.path">
                      <span>{{item.label}}</span>
                    </router-link>
                    <i class="el-icon-close"></i>
                  </div>
                </div>
              </div>
            </div>
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
          </div>
          <div class="box">
            <div style="background-color: #fff;margin: 10px;padding: 10px;">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </div>
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
          }
        ]
      }
    },
    computed: {
      curRouterName() {
        return this.$route.name
      }
    },
    watch: {
      $route(val) {
        const arr = [...this.$store.getters.routes]
        const obj = arr.find(route => {
          return route.name == val.name
        })
        const key = this.items.findIndex(item => {
          return item.name == obj.name
        })
        if(key === -1) {
          this.items.splice(this.items.length, 0, obj)
        }
      }
    },
    mounted() {
      
    }
}
</script>

<style lang="scss" scoped>
.el-container{

  .el-aside{
    background-color: #545c64;

    .title{
      width: 100%;
      line-height: 72px;
      color: #ffffff;
      height: 72px;

      img{
        width: 40px;
        height: 40px;
        padding: 0 10px;
        vertical-align: middle;
      }

      span{
        font-size: 20px;
        font-weight: 600;
        vertical-align: middle;
      }
    }

    ::v-deep .el-menu {
      overflow: hidden;
      border: none;

      &:not(.el-menu--inline){
        height: 100vh;
      }

      .el-submenu .el-menu-item{
        width: 100%;
        min-width: 0;
      }
    }
  }
  
  .el-main{
    overflow: hidden;
    padding: 0;

    .header{
      display: flex;
      .router-tools{
        width: 100%;

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

      .user{
        display: flex;
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
            margin: 12px auto;
            border-radius: 5px;
          }
        }

        .userinfo{
          .dropdown-label{
            line-height: 72px;
            font-size: 18px;
            color: #000000;
          }
        }
      }
      
    }
    .box{
      width: 100%;
      background: #c5c5c5;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>