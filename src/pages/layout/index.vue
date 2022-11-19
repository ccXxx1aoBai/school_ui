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
              <div class="tabs" v-if="items.length > 0">
                <div class="tab-wrap">
                  <div class="tab-item" v-for="(item, index) in items" :key="index"
                  :class="{'islink': item.name == curRouterName}">
                    <router-link class="tab-link" :to="item.path">
                      <span>{{item.label}}</span>
                    </router-link>
                    <i class="el-icon-close" @click="closeTab(item)" v-if="index != 0"></i>
                  </div>
                </div>
              </div>
            </div>
            <div style="display: flex;flex: 0 0 48px;justify-content: center;align-items: center;margin: 0 20px;">
              <el-badge :value="count">
                <el-button type="text" style="color: #333;">
                  <i class="el-icon-bell" style="font-size: 24px;" @click="drawer = !drawer"></i>
                </el-button>
              </el-badge>
            </div>
            <div class="user" style="margin-right: 0;">
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
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <transition name="fade" style="overflow: hidden;">
      <div class="drawer" v-show="drawer">
        <div class="drawer_title">
          <h1>消息中心</h1>
          <el-button type="text" icon="el-icon-document-remove" style="margin: 0 10px;">全部已读</el-button>
          <i class="el-icon-close" @click="drawer = false"></i>
        </div>
        <div class="drawer_body">
          <el-row>
            <el-col :span="8">
              <el-select v-model="noticeType" placeholder="消息类型" style="margin-left: 10px;">
                <el-option value="0" label="全部"></el-option>
                <el-option value="1" label="通知"></el-option>
                <el-option value="2" label="消息"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-select v-model="readStatus" placeholder="消息类型" style="margin-left: 10px;">
                <el-option value="0" label="全部"></el-option>
                <el-option value="1" label="未读"></el-option>
                <el-option value="2" label="已读"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <div style="width: 100%;height: 1px;background-color: #eee;margin: 10px 0 5px;"></div>
          <div class="notice_list">
            <div class="notice_list_item">
              <div class="notice_list_item_title">
                <span class="marker"></span>
                <span class="text">放假通知</span>
                <span class="btn" @click="handleChangeNoticeStatus">已读</span>
              </div>
              <div class="notice_list_item_label">
                <el-tag effect="plain">校级通知</el-tag>
                <span>4小时前</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
  export default {
    components: { Menu },
    name: "",
    data() {
      return {
        items: [],
        drawer: false,
        noticeType: '0',
        readStatus: '1',
      }
    },
    computed: {
      curRouterName() {
        return this.$route.name
      },
      count() {
        console.log(this.$store);
        return this.$store.getters.notice_total
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
    created() {
      this.items.splice(1, 0, this.$store.getters.routes[0])
    },
    mounted() {
      // 解决刷新后当前路由无tab
      const index = this.items.findIndex(item => {
        return item.name == this.$route.name
      })
      if(index == -1) {
        const route = this.$store.getters.routes.find(route => {
          return route.name == this.$route.name
        })
        this.items.push(route)
      }
    },
    methods: {
      closeTab(obj) {
        const index = this.items.findIndex(item => {
          return item.name == obj.name
        })
        if(index != -1) {
          this.items.splice(index, 1)
          this.$router.push(this.items[index - 1].path)
        }
      },
      handleChangeNoticeStatus() {

      }
    }
}
</script>

<style lang="scss" scoped>
.el-container{
  overflow: hidden;
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
      background-color: #ffffff;
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
      position: relative;
      width: calc(100% - 20px);
      height: calc(100vh - 100px);
      background: #ffffff;
      margin: 10px;
      overflow-y: auto;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: rgba($color: #000000, $alpha: .1);

        &:hover {
          background-color: rgba($color: #000000, $alpha: .3);
        }
      }

      &::-webkit-scrollbar-track {
        border-radius: 8px;
        background-color: rgba($color: #000000, $alpha: .1);
      }

      ::v-deep .el-pagination{
        position: absolute;
        bottom: 30px;
        right: 20px;
      }
    }
  }
}
.notice_list {
  width: 100%;

  &_item {
    width: 100%;
    padding: 5px 16px 10px;
    box-sizing: border-box;

    &:nth-child(n-1) {
      border-bottom: 1px solid #f5f5f5;
    }

    &_title {
      display: flex;
      justify-content: start;
      align-items: center;
      
      .marker {
        display: inline-block;
        flex: 0 0 6px;
        height: 6px;
        border-radius: 50%;
        margin-right: 5px;
        background-color: #00a679;
      }

      .text {
        width: 100%;
        font-size: 16px;
      }
      .btn {
        display: none;
        margin-right: 10px;
        color: #00a679;
        font-size: 12px;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
      }

      &:hover .btn{
        display: block;
      }
    }

    &_label {
      display: flex;
      margin-top: 8px;

      span:last-child {
        width: 100%;
        color: #999;
        font-size: 12px;
        text-align: right;
      }
    }
  }
}
.drawer {
  position: absolute;
  top: 72px;
  right: 0;
  width: 400px;
  height: calc(100vh - 72px);
  background-color: #fff;
  z-index: 999;
  box-shadow: 0 0 2px rgba($color: #000000, $alpha: .3);

  &_title {
    display: flex;
    align-items: center;
    height: 60px;
    line-height: 60px;
    padding-left: 10px;
    box-shadow: 0 0 2px rgba($color: #000000, $alpha: .3);

    h1 {
      width: 100%;
    }

    i {
      margin-right: 10px;
      font-size: 20px;

      &:hover {
        color: #00a679;
      }
    }
  }

  &_body {
    padding-top: 10px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all .8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  right: -400px;
}
.fade-enter-to {
  right: 0;
}
</style>