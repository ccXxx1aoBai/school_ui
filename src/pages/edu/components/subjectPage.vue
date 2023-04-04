<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="6">
              <el-input v-model="siftName" placeholder="课程名称" clearable maxlength="30"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-input v-model="siftClazz" placeholder="上课班级" clearable maxlength="30"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button icon="el-icon-search" type="primary" @click="getList(true)">查询</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="400" :data="tableData" size="mini" v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"  @selection-change="selectRow" ref="table">
            <el-table-column align="center" width="40">
              <template slot-scope="scope">
                <el-radio v-model="select" :label="scope.row" @change="selectRow(scope.row)">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="课程名称"></el-table-column>
            <el-table-column align="center" prop="teacher" label="授课教师"></el-table-column>
            <el-table-column align="center" prop="clazz" label="上课班级"></el-table-column>
            <el-table-column align="center" prop="duration" label="课时"></el-table-column>
            <el-table-column align="center" prop="timeStr" label="上课时间(周)"></el-table-column>
          </el-table>
          <el-pagination
          :total="total"
          :page-size.sync="size"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          :current-page.sync="current"
          layout="total, sizes, prev, pager, next, jumper"
          style="bottom: 80px;"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import {
    getSubjectList,
  } from '@/api/subject'
  export default {
    data() {
      return {
        deptList: [],
        select: ''
      }
    },
    mixins: [mixin],
    created() {
      this.getList(false)
    },
    methods: {
      getList(load) {
        this.loading = load
        const params = {}
        params.size = this.size
        params.current = this.current
        params.siftClazz = this.siftClazz
        params.siftName = this.siftName
        getSubjectList(params).then(res => {
          this.loading = false
          const { code, data } = res.data
          if(code === 200) {
            this.total = data.total
            this.tableData = data.list
          }
        }).catch(err => {
          this.loading = false
        })
      },
      selectRow(row) {
        this.$emit('selectSubject', row || {id: '', name: ''})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form {
    width: 400px;
  }
</style>