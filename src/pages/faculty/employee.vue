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
            <el-button type="primary" @click="dialog = !dialog">新增</el-button>
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
        <el-table-column prop="type" label="所属类别" align="center"></el-table-column>
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

    <el-dialog :visible.sync="dialog" title="职工管理" @open="beforeOpen" @close="beforeClose">
      <el-form :model="empForm" :rules="rules" ref="empForm" label-position="left" label-width="100px">
        <el-form-item v-show="false">
          <el-input v-model="empForm.id"></el-input>
        </el-form-item>
        <el-form-item label="职工姓名：" prop="name">
          <el-row>
            <el-col :span="6">
              <el-input v-model="empForm.name" placeholder="职工姓名" clearable maxlength="10"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-row>
            <el-col :span="6">
              <el-input v-model="empForm.phone" placeholder="手机号码" clearable maxlength="11"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="职工性别：" prop="sex">
          <el-radio-group v-model="empForm.sex">
            <el-radio :value="1" label="男"></el-radio>
            <el-radio :value="0" label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日：" prop="birth">
          <el-date-picker v-model="empForm.birth" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          placeholder="请选择">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属类别：" prop="type">
          <el-select v-model="empForm.type" allow-create filterable clearable>
            <el-option></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="footer" slot="footer">
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getEmployeeList} from '@/api/employee'
  export default {
    name: '',
    data() {
      return {
        filterName: '',
        tableLoading: false,
        dataList: [{}],
        total: 0,
        size: 10,
        current: 1,
        dialog: false,
        empForm: {
          id: '',
          name: '',
          phone: '',
          sex: '',
          birth: '',
          type: ''
        },
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
      },
      beforeClose() {
        this.$refs.empForm.resetFields()
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>