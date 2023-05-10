<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-input placeholder="学号" clearable maxlength="20" v-model="siftId"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-select v-model="siftSubject" placeholder="课程" clearable>
                <el-option v-for="subject in subjectList" :key="subject.id" :value="subject.id" :label="subject.name"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-select v-model="siftTime" placeholder="开课年级" clearable>
                <el-option v-for="grade in gradeList" :key="grade" :value="grade" :label="grade + '级'"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-button type="primary" icon="el-icon-search" @click="getList(true)">查询</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="dialog = true">成绩录入</el-button>
              <el-button type="primary" icon="el-icon-upload" @click="exportExcel('score')">成绩导出</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="600" :data="tableData" size="mini" v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="studentId" label="学号" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="score" label="成绩" align="center"></el-table-column>
            <el-table-column prop="subject" label="课程" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                <el-popconfirm title="是否删除此数据？" style="margin-left: 20px;" @confirm="handleDel(scope.row)">
                  <el-button slot="reference" type="text" icon="el-icon-delete" class="err">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination 
          style="margin-top: 20px"
          :total="total"
          :current-page.sync="current"
          :page-size.sync="size"
          :page-sizes="[10, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper" />
        </div>
      </div>
    </div>
    
    <el-dialog :visible.sync="dialog" title="成绩录入" @opened="afterOpen" @close="beforeClose">
      <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="80px">
        <el-form-item prop="subjectId" label="课程">
          <el-select v-model="form.subjectId" clearable placeholder="课程" @change="remoteData('')"
          :disabled="form.id != ''">
            <el-option v-for="sub in subjectList" :key="sub.id" :value="sub.id" :label="sub.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="studentId" label="学生" v-if="form.name">
          <el-input v-model="form.name" disabled style="width: 210px;"></el-input>
        </el-form-item>
        <el-form-item prop="studentId" label="学生" v-else>
          <el-select v-model="form.studentId" clearable placeholder="学生" filterable remote :remote-method="remoteData"
          :disabled="form.id != ''">
            <el-option v-for="st in studentList" :key="st.id" :value="st.id" :label="st.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="score" label="分数">
          <el-input-number v-model="form.score" :step="0.5" :min="0" :max="100" placeholder="分数"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSubmit()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from '@/mixin'
import {
  getGradeList,
  getScoreList,
  getStundentList,
  addScore,
  updateScore,
  delScore,
} from '@/api/score'
export default {
  data() {
    return {
      subjectList: [],
      gradeList: [],
      form: {
        studentId: '',
        subjectId: '',
        score: 0,
      },
      rules: {

      },
      studentList: []
    }
  },
  mixins: [mixin],
  created() {
    const id = 'DFDFEAAAFHNXa1bcf55a5c0022fc8519' || this.$store.getters.uid
    getGradeList(id).then(res => {
      const { code, data } = res.data
      if(code === 200) {
        this.gradeList = data.grade
        this.subjectList = data.subject
      }
    })
    this.getList(true)
  },
  methods: {
    getList(load) {
      this.loading = load
      const params = {}
      params.size = this.size
      params.current = this.current
      params.siftId = this.siftId
      params.siftSubject = this.siftSubject
      params.siftTime = this.siftTime
      getScoreList(params).then(res => {
        this.loading = false
        const { code, data } = res.data
        if(code === 200) {
          this.total = data.total
          this.tableData = data.list
        }
      }).catch(() => {
        this.loading = false
      })
    },
    remoteData(query) {
      console.log(query);
      const params = {}
      params.subjectId = this.form.subjectId
      params.name = query
      getStundentList(params).then(res => {
        const { code, data } = res.data
        if(code === 200) {
          this.studentList = data
        }
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          if((this.form.id ?? '') == '') {
            addScore(this.form).then(res => {
              const { code } = res.data
              if(code === 200) {
                this.$refs.form.resetFields()
                this.getList(true)
              }
            })
          }else {
            updateScore(this.form).then(res => {
              const { code } = res.data
              if(code === 200) {
                this.$refs.form.resetFields()
                this.dialog = false
                this.getList(true)
              }
            })
          }
        }
      })
    },
    handleEdit(row) {
      this.dialog = true
      this.$nextTick(() => {
        Object.keys(row).forEach(key => {
          this.$set(this.form, key, row[key])
        })
      })
    },
    handleDel(row) {
      delScore(row.id).then(res => {
        const { code } = res.data
        if(code === 200) {
          this.getList(true)
        }
      })
    },
    afterOpen() {
      console.log(this.form);
      this.remoteData('')
    },
    beforeClose() {
      this.$set(this.form, 'id', '')
      this.$set(this.form, 'name', '')
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>