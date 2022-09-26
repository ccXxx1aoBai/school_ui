<template>
  <div>
    <div class="content">
      <div class="tools">
        <el-row>
          <el-col :span="3">
            <el-input v-model="filterName" placeholder="职工姓名" clearable maxlength="20"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button type="primary">查询</el-button>
            <el-button type="primary">新增</el-button>
            <el-button type="primary">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="dataList" border v-loading="tableLoading" element-loading-text="加载中"
      element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-spinner="el-icon-loading">
        <el-table-column prop="id" label="职工编号" align="center"></el-table-column>
        <el-table-column prop="name" label="职工姓名" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
        <el-table-column prop="birth" label="生日" align="center"></el-table-column>
        <el-table-column prop="status" label="职工状态" align="center"></el-table-column>
        <el-table-column prop="type" label="工种" align="center"></el-table-column>
        <el-table-column prop="joinUs" label="入职时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <div style="display: flex;">
              <div style="width: 100%;">
                <el-button type="text" icon="el-icon-edit">编辑</el-button>
              </div>
              <div style="width: 100%;">
                <el-popconfirm title="是否删除此职工？">
                  <el-button slot="reference" type="text" style="color: #e03131;" icon="el-icon-delete">删除</el-button>
                </el-popconfirm>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      :total="total"
      :page-size.sync="size"
      :page-sizes="[10, 20, 50, 100, 200, 500]"
      :current-page="current"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import {getEmployeeList} from '@/api/employee'
  export default {
    name: '',
    data() {
      return {
        filterName: '',
        tableLoading: true,
        dataList: [{}],
        total: 0,
        size: 10,
        current: 1,
      }
    },
    computed: {
      pageSize() {
        const {current, size} = this
        return {current, size}
      }
    },
    watch: {
      pageSize() {
        this.getList(true)
      }
    },
    created() {
      this.getList(false)
    },
    methods: {
      getList(load) {
        this.tableLoading = load
        getEmployeeList({current: this.current, size: this.size, type: 0, name: this.filterName}).then(res => {
          console.log(res);
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      handleCurrentChange(page) {
        this.getList(true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>