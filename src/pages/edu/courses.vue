<template>
  <div>
    <div class="wrap">
      <div class="content">
        <el-form label-width="100px" label-position="left" v-if="init">
          <el-form-item prop="year" label="学年">
            <el-select v-model="siftYear">
              <el-option label="2022-2023学年"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="type"  label="课程性质">
            <el-select v-model="siftType">
              <el-option label="理论课程"></el-option>
              <el-option label="实践课程"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="viewMore">查看</el-button>
            <el-button  type="primary" size="mini" plain>新增</el-button>
          </el-form-item>
        </el-form>
        <div v-else>
          <div class="tools">
            <el-row>
              <el-col :span="3">
                <el-input v-model="siftName" clearable placeholder="课程名称" maxlength="50"></el-input>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-button type="primary">查询</el-button>
                <el-button type="primary">新增</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table">
            <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
              <el-table-column></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        siftYear: '',
        siftType: '',
        init: true
      }
    },
    methods: {
      viewMore() {
        this.init = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    &::v-deep .el-form {
      margin: 100px 0 0 200px;
    }
  }
</style>