<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-input v-model="siftName" placeholder="课程名称" clearable maxlength="30"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-input v-model="siftClazz" placeholder="上课班级" clearable maxlength="30"></el-input>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button icon="el-icon-search" type="primary" @click="getList(true)">查询</el-button>
              <el-button icon="el-icon-plus" type="primary" @click="dialog = true">新增</el-button>
              <el-button icon="el-icon-upload" type="primary" @click="importDialog = true">导入</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="600" :data="tableData" size="mini" v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column align="center" prop="name" label="课程名称"></el-table-column>
            <el-table-column align="center" prop="teacher" label="授课教师"></el-table-column>
            <el-table-column align="center" prop="clazz" label="上课班级" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="grade" label="上课年级"></el-table-column>
            <el-table-column align="center" prop="duration" label="课时"></el-table-column>
            <el-table-column align="center" prop="timeStr" label="上课时间(周)"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="6" :offset="6">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                  </el-col>
                  <el-col :span="4">
                    <el-popconfirm title="是否删除此数据？" @confirm="handleDel(scope.row)">
                      <el-button slot="reference" type="text" class="err" icon="el-icon-delete">删除</el-button>
                    </el-popconfirm>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
          :total="total"
          :page-size.sync="size"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          :current-page.sync="current"
          layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
    </div>
    
    <el-dialog :visible.sync="dialog" title="课程管理">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="left">
        <el-form-item prop="name" label="课程名称">
          <el-input clearable type="textarea" :rows="3" placeholder="课程名称" v-model="form.name" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item prop="teacher" label="授课教师">
          <el-row>
            <el-col :span="22">
              <el-input clearable placeholder="授课教师" v-model="form.teacher" maxlength="20"></el-input>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="text" @click="teachDialog = true">选</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="clazz" label="上课班级">
          <el-row>
            <el-col :span="22">
              <el-input clearable placeholder="上课班级" v-model="form.clazz" maxlength="40"></el-input>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="text" @click="clazzDialog = true">选</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="time" label="上课时间">
          <el-select v-model="form.time" clearable placeholder="上课时间" multiple>
            <el-option v-for="(item, index) in 20" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="year" label="上课学期">
          <el-row>
            <el-col :span="20">
              <el-input v-model="form.year" clearable maxlength="20" placeholder="上课学期"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-tooltip placement="top">
                <div slot="content">
                  <p>说明：</p>
                  <p>“2022-2023-1”表示2022年秋季学期</p>
                  <p>“2022-2023-2”表示2023年春季学期</p>
                </div>
                <i class="el-icon-info"></i>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="importDialog" title="学生信息导入">
      <el-upload
        class="upload-demo"
        drag
        action="#"
        accept=".xls,.xlsx"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="beforeUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传.xls、.xlsx文件</div>
      </el-upload>
    </el-dialog>

    <!-- 选老师 -->
    <el-dialog :visible.sync="teachDialog" title="选择授课教师">
      <teachPage @selectTeacher="selectTeacher" />
      <div slot="footer" style="margin-top: 40px;">
        <el-button type="primary" @click="teachDialog = false">确定</el-button>
      </div>
    </el-dialog>

    <!-- 选学生 -->
    <el-dialog :visible.sync="clazzDialog" title="选择上课班级">
      <clazzPage @selectClazz="selectClazz" />
      <div slot="footer" style="margin-top: 40px;">
        <el-button type="primary" @click="clazzDialog = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import { mapGetters } from 'vuex'
  import {
    addSubject,
    getSubjectList,
    updateSubject,
    delSubject
  } from '@/api/subject'
  import {
    importData
  } from '@/api'
  import teachPage from '@/pages/edu/components/teachPage.vue'
  import clazzPage from '@/pages/edu/components/clazzPage.vue'
  export default {
    components: {
      teachPage,
      clazzPage
    },
    data() {
      return {
        deptList: [],
        importDialog: false,
        form: {
          id: '',
          name: '',
          teacherId: '',
          teacher: '',
          clazz: '',
          time: [],
          timeStr: '',
          year: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入课程名称' }
          ],
          teacher: [
            { required: true, message: '请选择授课教师' }
          ],
          clazz: [
            { required: true, message: '请选择上课班级' }
          ],
          time: [
            { required: true, message: '请选择上课时间' }
          ],
          year: [
            { required: true, message: '请输入上课学期' }
          ]
        },
        teachDialog: false,
        clazzDialog: false,
        type: '0'
      }
    },
    mixins: [mixin],
    computed: {
      ...mapGetters(['uid'])
    },
    created() {
      this.getList(false)
    },
    methods: {
      selectTeacher(row) {
        this.form.teacherId = row.id
        this.form.teacher = row.name
      },
      selectClazz(row) {
        console.log(row);
        let clazzs = ''
        row.forEach(item => {
          clazzs += item.name + ','
        })
        this.$set(this.form, 'clazz', clazzs.substring(0, clazzs.length - 1))
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if(valid) {
            this.form.timeStr = this.form.time.toString()
            if((this.form.id ?? '') == '') {
              addSubject(this.form).then(res => {
                if(res.data.code === 200) {
                  this.getList(true)
                  this.$refs.form.resetFields()
                }
              })
            }else {
              updateSubject(this.form).then(res => {
                if(res.data.code === 200) {
                  this.getList(true)
                  this.$refs.form.resetFields()
                  this.dialog = false
                }
              })
            }
          }
        })
      },
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
      handleEdit(row) {
        this.dialog = true
        this.$nextTick(() => {
          Object.keys(row).forEach(key => {
            this.$set(this.form, key, row[key])
          })
          this.$set(this.form, 'time', row.timeStr.split(','))
        })
      },
      handleDel(row) {
        delSubject(row.id).then(res => {
          if(res.data.code === 200) {
            this.getList(true)
          }
        })
      },
      beforeUpload(file) {
        const type = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
        if(!type.includes(file.raw.type)) {
          this.$message.error("文件格式错误")
          return false
        }
        importData({ file: file.raw, uid: this.uid, type: 'subject' }).then(res => {
          if(res.data.code === 200) {
            this.$fullLoading.close()
            this.getList(false)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form {
    width: 400px;
  }
</style>