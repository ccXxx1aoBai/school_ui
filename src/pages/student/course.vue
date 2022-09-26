<template>
  <div>
    <div class="tools">
      <el-row :gutter="0">
        <el-col :span="2">
          <el-select v-model="year">
            <el-option :value="2019" label="2019学年"></el-option>
            <el-option :value="2020" label="2020学年"></el-option>
            <el-option :value="2021" label="2021学年"></el-option>
            <el-option :value="2022" label="2022学年"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="term">
            <el-option :value="1" label="第一学期"></el-option>
            <el-option :value="2" label="第二学期"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="type">
            <el-option :value="1" label="理论课"></el-option>
            <el-option :value="2" label="实验课"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-table :data="tableData" border>
        <el-table-column prop="time" width="80px" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.time.split('-')[0]}}</p>
            <p>至</p>
            <p>{{scope.row.time.split('-')[1]}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="col1" label="星期一" align="center"></el-table-column>
        <el-table-column prop="col2" label="星期二" align="center"></el-table-column>
        <el-table-column prop="col3" label="星期三" align="center"></el-table-column>
        <el-table-column prop="col4" label="星期四" align="center"></el-table-column>
        <el-table-column prop="col5" label="星期五" align="center"></el-table-column>
        <el-table-column prop="col6" label="星期六" align="center"></el-table-column>
        <el-table-column prop="col7" label="星期天" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        year: new Date().getFullYear(),
        term: 1,
        type: 1,
        tableData: [
          {
            time: '08:30-10:05',
            col1: '高数',
            col4: '英语',
          },{
            time: '10:25-12:00',
            col1: '高数',
            col4: '英语',
          },{
            time: '14:00-15:35',
            col1: '高数',
            col4: '英语',
          },{
            time: '15:55-17:30',
            col2: '高数',
            col3: '英语',
          },{
            time: '19:00-20:35',
            col1: '高数',
            col5: '英语',
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.tools {
  margin-bottom: 20px;

  &::v-deep .el-col{
    margin: 0 10px;
  }
}
.content{
  width: 90%;
  margin: auto;
}
</style>