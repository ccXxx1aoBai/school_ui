<template>
  <div>
    <div class="content">
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
          <el-col :span="3" :offset="1">
            <el-button type="primary" @click="getList(true)">查询</el-button>
            <el-button type="primary" @click="dialog = !dialog">新增</el-button>
            <el-button type="primary" @click="handleExport">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
      element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-spinner="el-icon-loading">
        <el-table-column prop="id" label="职工编号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="birth" label="生日" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="dept" label="所属学院" align="center"></el-table-column>
        <el-table-column prop="joinUs" label="入职时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <div style="display: flex;" slot-scope="scope">
            <div style="width: 100%;">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            </div>
            <div style="width: 100%;">
              <el-popconfirm title="是否删除此数据？" @confirm="handleDel(scope.row)">
                <el-button slot="reference" type="text" icon="el-icon-delete" style="color: #e03131">删除</el-button>
              </el-popconfirm>
            </div>
          </div>
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

    <el-dialog :visible.sync="dialog" title="教师管理" @close="beforeClose">
      <el-form :model="teacherForm" :rules="rules" ref="teacherForm" label-position="left" label-width="100px">
        <el-form-item v-show="false">
          <el-input v-model="teacherForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-row>
            <el-col :span="6">
              <el-input v-model="teacherForm.name" placeholder="姓名" clearable maxlength="20"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码：">
          <el-row>
            <el-col :span="6">
              <el-input v-model="teacherForm.phone" placeholder="手机号码" clearable maxlength="11"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="sex" label="性别：">
          <el-select v-model="teacherForm.sex" clearable>
            <el-option :value="1" label="男"></el-option>
            <el-option :value="0" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
          <el-date-picker v-model="teacherForm.birth" align="center" format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
          clearable placeholder="请选择"></el-date-picker>
        </el-form-item>
        <el-form-item prop="dept" label="所属学院：">
          <el-select v-model="teacherForm.dept" clearable>
            <el-option v-for="item in deptList" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="position" label="职称：">
          <el-row>
            <el-col :span="6">
              <el-select v-model="teacherForm.position" clearable filterable allow-create>
                <el-option v-for="item in positionList" :key="item" :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="1" style="margin-left: 10px;">
              <el-tooltip content="若无此职称，可自行输入">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div class="footer" slot="footer">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import {
    getDepartmentList
  } from '@/api/department'
  import {
    getTeacherList,
    addTeacher,
    updateTeacher,
    delTeacher
  } from '@/api/teacher'
  import {
    getPositionList
  } from '@/api/index'
  export default {
    name: '',
    data() {
      return {
        filterName: '',
        filterDept: '',
        filterPos: '',
        deptList: [],
        positionList: [],
        teacherForm: {
          id: '',
          name: '',
          phone: '',
          sex: '',
          birth: '',
          dept: '',
          position: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入', trigger: ['change', 'blur'] }
          ],
        }
      }
    },
    mixins: [mixin],
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
        this.loading = load
        const params = {
          current: this.current,
          size: this.size,
          name: this.filterName,
          dept: this.filterDept,
          position: this.filterPos
        }
        getTeacherList(params).then(res => {
          this.loading = false
          const {total, list} = res.data.data
          this.tableData = list
          this.total = total
        }).catch(() => {
          this.loading = false
        })
      },
      handleEdit(row) {
        this.dialog = !this.dialog
        this.$nextTick(() => {
          Object.keys(row).forEach(key => {
            if(this.teacherForm.hasOwnProperty(key)) {
              this.$set(this.teacherForm, key, row[key])
            }
          })
        })
      },
      handleDel(row) {
        delTeacher(row.id).then(res => {
          if(res.data.code === 200) {
            this.getList(true)
          }
        })
      },
      handleCurrentChange(page) {
        this.current = page
      },
      beforeClose() {
        this.$refs.teacherForm.resetFields()
      },
      handleSubmit() {
        this.$fullLoading.load()
        this.$refs.teacherForm.validate(valid => {
          if(valid) {
            if((this.teacherForm.id??'') == '') {
              // 添加
              addTeacher(this.teacherForm).then(res => {
                if(res.data.code === 200) {
                  this.$refs.teacherForm.resetFields()
                  this.getList(false)
                }
                this.$fullLoading.close()
              }).catch(() => {
                this.$fullLoading.close()
              })
            }else {
              // 修改
              updateTeacher(this.teacherForm).then(res => {
                if(res.data.code === 200) {
                  this.dialog = false
                  this.getList(false)
                }
                this.$fullLoading.close()
              }).catch(() => {
                this.$fullLoading.close()
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>