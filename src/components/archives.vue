<template>
  <div class="archives">
    <div>
      <p class="title">基本信息</p>
      <div class="content">
        <div class="row">
          <div style="width: 100%;">
            <div class="row">
              <p>学号：{{ data.id }}</p>
              <p>姓名：{{ data.name }}</p>
              <p>性别：{{ data.sex }}</p>
            </div>
            <div class="row">
              <p>民族：{{ data.nation }}</p>
              <p>出生日期：{{ data.birth }}</p>
              <p>年级：{{ data.grade }}</p>
            </div>
            <div class="row">
              <p>手机号码：{{ data.phone }}</p>
              <p>邮箱：{{ data.email }}</p>
            </div>
          </div>
          <div class="avatar">
            <img src="@/assets/avatar.png">
          </div>
        </div>
        <div class="row">
          <p>学院：{{ data.dept }}</p>
          <p>专业：{{ data.major }}</p>
          <p>班级：{{ data.clazz }}</p>
        </div>
        <div class="row">
          <p>班主任：{{ data.name }}</p>
          <p>手机号码：{{ data.phone }}</p>
          <p>邮箱：{{ data.email }}</p>
        </div>
        <div class="row">
          <p>在校住址：{{ data.address }}</p>
        </div>
        <div class="row">
          <p>家庭住址：{{ data.address }}</p>
        </div>
      </div>
    </div>
    <div>
      <p class="title">获奖信息</p>
      <div class="content">
        <div class="row">
          <el-collapse accordion style="width: 100%;">
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Archives',
    props: {
      data: {
        type: Object,
        default: () => {},
      }
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .archives {
    width: 70%;
    height: calc(100vh - 200px);
    margin: 25px auto 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
      height: 0;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #dfdfdf;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: #F5F5F5;
    }
    
    .title {
      display: inline-block;
      padding: 2px 30px;
      background-color: #1ba398;
      border-radius: 20px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }

    .content {
      margin: 10px 0;
    }

    .row {
      display: flex;
      width: 100%;

      p {
        width: 100%;
        padding: 8px 0;
      }
    }

    .avatar {
      flex: 0 0 84px;
      border: 4px solid #a2d9d5;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>