<template>
  <div>
    <div class="tools">
      <el-row>
        <el-col :span="3">
          <el-input v-model="filterName" placeholder="教师姓名" clearable maxlength="20"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select v-model="filterDept" placeholder="所属学院" clearable>
            <el-option v-for="item in deptList" :key="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select v-model="filterPos" placeholder="职位" clearable>
            <el-option v-for="item in positionList" :key="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-button type="primary" @click="getList(true)">查询</el-button>
          <el-button type="primary" @click="dialog = !dialog">新增</el-button>
          <el-button type="primary">导出</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" border v-loading="tableLoading" element-loading-text="加载中"
      element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-spinner="el-icon-loading">
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-radio v-model="select" :label="scope.row" @change="selectTeacher(scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
      <el-table-column prop="dept" label="所属学院" align="center"></el-table-column>
      <el-table-column prop="position" label="职称" align="center"></el-table-column>
    </el-table>
    <el-pagination
    :total="total"
    :page-size.sync="size"
    :page-sizes="[10, 20, 50, 100, 200, 500]"
    :current-page="current"
    layout="total, sizes, prev, pager, next, jumper"
    style="bottom: 80px;"
    ></el-pagination>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import {
    getDepartmentList
  } from '@/api/department'
  import {
    getTeacherList
  } from '@/api/teacher'
  import {
    getPositionList
  } from '@/api/index'
  export default {
    name: '',
    data() {
      return {
        select: '',
        filterName: '',
        filterDept: '',
        filterPos: '',
        deptList: [],
        positionList: []
      }
    },
    mixins: [mixin],
    watch: {
      pagination() {
        this.getList(true)
      }
    },
    created() {
      getDepartmentList().then(res => {
        res.data.data.forEach(item => {
          this.deptList.push(item.name)
        })
      })
      getPositionList().then(res => {
        this.positionList = res.data.data;
      })
      this.getList(false)
    },
    methods: {
      getList(load) {
        this.tableLoading = load
        const params = {
          current: this.current,
          size: this.size,
          name: this.filterName,
          dept: this.filterDept,
          position: this.filterPos
        }
        getTeacherList(params).then(res => {
          this.tableLoading = false
          const {total, list} = res.data.data
          this.tableData = list
          this.total = total
        }).catch(() => {
          this.tableLoading = false
        })
      },
      selectTeacher(row) {
        this.$emit('selectTeacher', row)
      }
    }
  }
</script>