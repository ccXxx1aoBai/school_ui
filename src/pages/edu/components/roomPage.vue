<template>
  <div>
    <div class="tools">
      <el-row>
        <el-col :span="3">
          <el-input v-model="siftName" placeholder="教室名称" clearable maxlength="20"></el-input>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-button type="primary" @click="getRoomList(true)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="400"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
      @selection-change="selectRow" ref="table">
      <el-table-column align="center" width="40">
        <template slot-scope="scope">
          <el-radio v-model="select" :label="scope.row" @change="selectRow(scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column label="教室名称" prop="name" align="center"></el-table-column>
      <el-table-column label="教室位置" prop="name" align="center">
        <template slot-scope="scope">
          {{scope.row.position}}
        </template>
      </el-table-column>
      <el-table-column label="座位数" prop="volume" align="center"></el-table-column>
      <el-table-column label="教室描述" prop="description" align="center"></el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :current-page.sync="current"
      :page-size.sync="size"
      :page-sizes="[10, 20, 50, 100, 200, 500]"
      layout="total, sizes, prev, pager, next, jumper"
      style="bottom: 80px;"></el-pagination>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import {
    getRoom
  } from '@/api/room'
  export default {
    name: '',
    data() {
      return {
        select: ''
      }
    },
    mixins: [mixin],
    watch: {
      pagination() {
        this.getRoomList(true)
      }
    },
    created() {
      this.getRoomList(true)
    },
    methods: {
      getRoomList(load) {
        this.loading = load
        const params = {
          current: this.current,
          size: this.size,
          siftName: this.siftName
        }
        getRoom(params).then(res => {
          const {list, total} = res.data.data
          this.tableData = list
          this.total = total
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      selectRow(row) {
        this.$emit('selectRoom', row || {id: '', name: ''})
      }
    }
  }
</script>