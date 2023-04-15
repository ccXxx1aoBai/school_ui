<template>
  <div>
    <div class="wrap">
      <el-table :data="tableData" height="700" v-loading="loading" element-loading-text="拼命加载中" 
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" border>
        <el-table-column prop="id" label="日志编号" align="center" width="200"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="operation" label="操作人" align="center"></el-table-column>
        <el-table-column prop="address" label="IP" align="center" width="200"></el-table-column>
        <el-table-column prop="method" label="API" align="center" width="200"></el-table-column>
        <el-table-column prop="params" label="参数" align="center" width="200"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="description" label="操作描述" align="center" width="200"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="opType" label="操作类型" align="center" width="100"></el-table-column>
        <el-table-column prop="userAgent" label="客户端信息" align="center" width="200"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="time" label="执行时间" align="center" width="200">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.time).toLocaleString()}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      :total="total"
      :current-page="current"
      :page-size.sync="size"
      :page-sizes="[20, 50, 100, 300, 500]"
      @current-change="handlePageChange"
      layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import {
    getLogList
  } from '@/api/sys'
  export default {
    name: '',
    data() {
      return {

      }
    },
    mixins: [mixin],
    created() {
      this.getList(true, this)
    },
    methods: {
      getList(load) {
        this.loading = load
        const params = {}
        params.current = this.current
        params.size = this.size
        getLogList(params).then(res => {
          this.loading = false
          const { list, total } = res.data.data
          this.tableData = list
          this.total = total
        }).catch(err => {
          this.loading = false
        })
      },
      handlePageChange(page) {
        this.page = page
      }
    }
  }
</script>

<style lang="scss" scoped>
::v-deep .is-scrolling-none{
  &::-webkit-scrollbar{
    width: 10px;
    height: 4px;
    margin-right: 5px;
    background-color: #eeeeee;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #dddddd;
    border-radius: 10px;
    &:hover{
      background-color: #c5c5c5;
    }
  }
}
</style>