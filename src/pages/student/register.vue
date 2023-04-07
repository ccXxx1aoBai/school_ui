<template>
  <div>
    <div class="register">
      <el-container style="height: 100vh;">
        <el-header height="100px">
          <span class="header_title"></span>
        </el-header>
        <el-main>
          <div class="body">
            <el-steps :active="active" process-status="process" align-center finish-status="success">
              <el-step title="信息完善">
              </el-step>
              <el-step title="选择寝室"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
            <div class="form">
              <el-form :model="form">
                <el-form-item label="" prop="">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="" prop="">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      form: {
        
      }
    }
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
    }
  }
</style>