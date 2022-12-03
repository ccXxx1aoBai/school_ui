<template>
  <div>
    <div class="content">
      <div class="tools">
        <el-row>
          <el-col :span="3">
            <el-select v-model="siftDept" placeholder="所属学院" clearable>
              <el-option v-for="item in deptList" :key="item.id" :value="item.id" :label="item.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3" :offset="1">
          <el-input v-model="siftName" placeholder="班级名称" clearable maxlength="30"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" @click="getList(true)">查询</el-button>
          <el-button type="primary" @click="dialog = !dialog">新增</el-button>
          <el-button type="primary">导出</el-button>
        </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-table-column prop="id" label="班级编号" align="center"></el-table-column>
          <el-table-column prop="name" label="班级名称" align="center"></el-table-column>
          <el-table-column prop="dept" label="所属学院" align="center"></el-table-column>
          <el-table-column prop="teacher" label="班主任" align="center"></el-table-column>
          <el-table-column prop="volume" label="班级人数" align="center"></el-table-column>
          <el-table-column prop="year" label="年级" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="12">
                  <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                </el-col>
                <el-col :span="12">
                  <el-popconfirm title="是否删除此数据？" @confirm="handleDel(scope.row)">
                    <el-button slot="reference" class="err" type="text" icon="el-icon-delete">删除</el-button>
                  </el-popconfirm>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog :visible.sync="dialog" title="班级管理" @close="beforeClose">
      <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="100px">
        <el-form-item v-show="false">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item prop="dept" label="所属学院">
          <el-row>
            <el-col :span="6">
              <el-select v-model="form.deptId" clearable placeholder="所属学院" @change="changeDept">
                <el-option v-for="item in deptList" :key="item.id" :value="item.id + ''" :label="item.label"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="major" label="专业名称" v-if="form.deptId">
          <el-row>
            <el-col :span="6">
              <el-select v-model="form.majorId" clearable placeholder="专业名称" @change="changeMajor">
                <el-option v-for="item in majorList" :key="item.id" :value="item.id + ''" :label="item.label"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="teacher" label="班主任">
          <el-row>
            <el-col :span="6">
              <el-input v-model="form.teacher" clearable placeholder="班主任" disabled style="width: 100%;"></el-input>
            </el-col>
            <el-col :span="1" style="text-align: center;">
              <el-button type="text" @click="teachDialog = !teachDialog">选</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="index" label="班级序号">
          <el-input-number v-model="form.index" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item prop="year" label="年级">
          <el-row>
            <el-col :span="6">
              <el-select v-model="form.year" clearable placeholder="年级">
                <el-option v-for="item in terms" :key="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </template>
    </el-dialog>

    <!-- 选老师 -->
    <el-dialog :visible.sync="teachDialog" title="选择授课教师">
      <teachPage @selectTeacher="selectTeacher" />
      <div slot="footer" style="margin-top: 40px;">
        <el-button type="primary" @click="teachDialog = false">确定</el-button>
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
    getClazzList,
    addClazz,
    updateClazz,
    delClazz
  } from '@/api/clazz'
  import teachPage from '@/pages/edu/components/teachPage.vue'
  export default {
    name: '',
    components: {
      teachPage
    },
    data() {
      return {
        deptList: [],
        majorList: [],
        form: {
          id: '',
          deptId: '',
          dept: '',
          majorId: '',
          major: '',
          teacherId: '',
          teacher: '',
          index: '',
          year: ''
        },
        rules: {
          dept: [
            { required: true, message: '请选择学院', trigger: ['change', 'blur'] }
          ],
          major: [
            { required: true, message: '请选择专业', trigger: ['change', 'blur'] }
          ],
          teacher: [
            { required: true, message: '请选择班主任', trigger: ['change', 'blur'] }
          ],
          year: [
            { required: true, message: '请选择年级', trigger: ['change', 'blur'] }
          ]
        },
        teachDialog: false
      }
    },
    mixins: [mixin],
    computed: {
      terms() {
        const terms = []
        const date = new Date()
        for(let i = 0; i < 5; i++) {
          terms.unshift((date.getFullYear() - i) + '级')
        }
        return terms
      }
    },
    watch: {
      pagination() {
        this.getList(true)
      }
    },
    created() {
      getDepartmentList().then(res => {
        this.deptList = res.data.data
      })
      this.getList(false)
    },
    methods: {
      getList(load) {
        this.loading = load
        const params = {
          current: this.current,
          size: this.size,
          name: this.siftName,
          dept: this.siftDept
        }
        getClazzList(params).then(res => {
          this.loading = false
          const {total, list} = res.data.data
          this.tableData = list
          this.total = total
        }).catch(() => {
          this.loading = false
        })
      },
      changeDept(id) {
        this.majorList = []
        const obj = this.deptList.find(item => {
          return item.id == id
        })
        this.$set(this.form, 'dept', obj.label)
        this.$set(this.form, 'majorId', '')
        obj.children.forEach(item => {
          this.majorList.push(item)
        })
      },
      changeMajor(id) {
        const obj = this.majorList.find(item => {
          return item.id == id
        })
        this.$set(this.form, 'major', obj.label)
      },
      selectTeacher(row) {
        this.$set(this.form, 'teacher', row.name)
        this.$set(this.form, 'teacherId', row.id)
      },
      handleEdit(row) {
        this.$nextTick(() => {
          this.dialog = true
          const obj = this.deptList.find(item => {
            return item.id == row.deptId
          })
          this.majorList = obj.children
          Object.keys(row).forEach(key => {
            this.$set(this.form, key, row[key])
          })
        })
      },
      handleDel(row) {
        delClazz(row.id).then(res => {
          if(res.data.code === 200) {
            this.getList(true)
          }
        })
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if(valid) {
            this.form.name = this.form.major + this.form.index + '班'
            if(this.form.id) {
              updateClazz(this.form).then(res => {
                if(res.data.code === 200) {
                  this.dialog = false
                  this.getList(true)
                }
              })
            }else {
              addClazz(this.form).then(res => {
                if(res.data.code === 200) {
                  this.$refs.form.resetFields()
                  this.getList(true)
                  this.form.deptId = ''
                  this.form.majorId = ''
                }
              })
            }
          }
        })
      },
      beforeClose() {
        this.$refs.form.resetFields()
        this.form.deptId = ''
        this.form.majorId = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>