<template>
  <div class="content">
    <div class="tools">
      <el-row>
          <el-col :span="3">
            <el-input v-model="siftName" placeholder="学生姓名" clearable></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="getList(true)" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="handleExport('stay')" icon="el-icon-folder">导出</el-button>
          </el-col>
        </el-row>
    </div>
    <div class="table">
      <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column prop="id" label="学号" align="center"></el-table-column>
        <el-table-column prop="name" label="学生姓名" align="center"></el-table-column>
        <el-table-column prop="room" label="房间号" align="center"></el-table-column>
        <el-table-column prop="bed" label="床位号" align="center"></el-table-column>
        <el-table-column label="操作" align="center">

        </el-table-column>
      </el-table>
      <el-pagination
      :total="total"
      :current-page.sync="current"
      :page-size.sync="size"
      :page-sizes="[10, 20, 50, 100, 200, 500]"
      layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixin'
export default {
  data() {
    return {
      
    }
  },
  mixins: [mixin],
  created() {
    
  },
  methods: {

  }
}
</script>

<style lang="" scoped>
  
</style>