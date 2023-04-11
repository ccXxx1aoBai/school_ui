<template>
  <div>
    <div class="register">
      <el-container style="height: 100vh;">
        <el-header height="100px">
          <span class="header_title"></span>
        </el-header>
        <el-main>
          <div class="body">
            <div class="form">
              <el-form>
                <el-form-item label="学号：">
                  <span>{{ username }}</span>
                </el-form-item>
                <el-form-item label="姓名：">
                  <span>{{ name }}</span>
                </el-form-item>
                <el-form-item label="院系：">
                  <span>{{ dept }}</span>
                </el-form-item>
                <el-form-item label="专业班级：">
                  <span>{{ `${major}0${clazz}班` }}</span>
                </el-form-item>
                <el-form-item label="班主任：">
                  <span>{{ teacher }}</span>
                </el-form-item>
                <el-form-item>
                  <el-tag>B501</el-tag>
                </el-form-item>
              </el-form>
              <el-button type="primary" style="width: 200px;margin: 20px auto;" @click="active = 1">提交</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
    }
  },
  computed: {
    ...mapGetters(['uid', 'name', 'username', 'dept', 'major', 'clazz', 'teacher'])
  }
}
</script>

<style scoped lang="scss">
  .register {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/bg.jpg');
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center center;
    overflow: hidden;

    .header_title {
      display: flex;
      align-items: center;
      width: 60%;
      margin: 10px auto 0;

      &::before {
        content: "";
        display: inline-block;
        width: 310px;
        height: 70px;
        background-image: url('@/assets/title_logo.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 0 0;
        margin: 10px 10px 0 0;
      }

      &::after {
        content: "预报到系统";
        margin: 10px 0 0 20px;
        color: #ffffff;
        font-size: 34px;
        letter-spacing: 4px;
      }
    }

    .body {
      width: 50%;
      height: 100%;
      margin: auto;
      padding: 30px 30px 0;
      background-color: rgba($color: #ffffff, $alpha: .7);
      border-radius: 14px;
      box-shadow: 0 6px 12px rgba($color: #000000, $alpha: .3);
      box-sizing: border-box;

      &::v-deep .is-process {
        color: #409eff;
      }

      &::v-deep .el-step__head.is-process {
        border-color: #409eff;
      }

      .form {
        width: 300px;
        margin: 50px auto;
      }
    }
  }
</style>