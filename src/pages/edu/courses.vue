<template>
  <div>
    <div class="wrap">
      <div class="content">
        <el-form label-width="100px" label-position="left" v-if="init">
          <el-form-item prop="year" label="学年">
            <el-select v-model="siftYear">
              <el-option v-for="year in yearList" :key="year" :value="year"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="type"  label="课程性质">
            <el-select v-model="siftType">
              <el-option value="理论课程"></el-option>
              <el-option value="实践课程"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="viewMore">查看</el-button>
          </el-form-item>
        </el-form>
        <div v-else>
          <div class="tools">
            <el-row>
              <el-col :span="3">
                <el-input v-model="siftName" clearable placeholder="课程名称" maxlength="50"></el-input>
              </el-col>
              <el-col :span="3" :offset="1">
                <el-select v-model="siftTime" clearable placeholder="学年">
                  <el-option v-for="year in yearList" :key="year" :value="year"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-button type="primary" icon="el-icon-search" @click="getList(true)">查询</el-button>
                <el-button type="primary" icon="el-icon-date" @click="dialog = !dialog">排课</el-button>
                <el-button type="primary" icon="el-icon-date" @click="cDialog = true">自动排课</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table">
            <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-table-column prop="subjectId" label="课程编号" align="center"></el-table-column>
              <el-table-column prop="subject" label="课程名称" align="center"></el-table-column>
              <el-table-column prop="teacher" label="授课教师" align="center"></el-table-column>
              <el-table-column prop="clazz" label="上课班级" align="center"></el-table-column>
              <el-table-column prop="room" label="授课教室" align="center"></el-table-column>
              <el-table-column prop="duration" label="课时" align="center"></el-table-column>
              <el-table-column prop="week" label="上课周" align="center"></el-table-column>
              <el-table-column prop="teachTime" label="上课时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.dayLabel + scope.row.timeLabel }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" icon="el-icon-edit">编辑</el-button>
                  <el-popconfirm title="是否删除此数据？" @confirm="handleDel(scope.row)" style="margin-left: 10px;">
                    <el-button slot="reference" type="text" class="err" icon="el-icon-delete">删除</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
            :total="total"
            :current-page.sync="current"
            :page-size.sync="size"
            :page-sizes="[10, 20, 50, 100, 300, 500]"
            layout="total, sizes, prev, pager, next, jumper"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    
    <el-dialog :visible.sync="dialog" title="课程安排">
      <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="100px">
        <el-form-item v-show="false">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item prop="subject" label="课程名称">
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.subject" clearable placeholder="课程名称" maxlength="50"></el-input>
            </el-col>
            <el-col :span="1">
              <el-button type="text" @click="subjectDialog = true">选</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="room" label="授课教室">
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.room" clearable placeholder="授课教室" maxlength="30"></el-input>
            </el-col>
            <el-col :span="1">
              <el-button type="text" @click="roomDialog = !roomDialog">选</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="timeStr" label="上课时间">
          <el-row>
            <el-col :span="10">
              <el-cascader :options="teachTime" v-model="form.timeStr" clearable placeholder="上课时间"
                style="width: 100%;"></el-cascader>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="weeks" label="上课周">
          <el-select v-model="form.weeks" clearable placeholder="上课时间" multiple>
            <el-option v-for="(item, index) in 20" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmit()">提交</el-button>
      </template>
    </el-dialog>

    <el-dialog :visible.sync="subjectDialog" title="选择课程">
      <subjectPage @selectSubject="selectSubject" />
      <div slot="footer" style="margin-top: 40px;">
        <el-button type="primary" @click="subjectDialog = false">确定</el-button>
      </div>
    </el-dialog>

    <!-- 选教室 -->
    <el-dialog :visible.sync="roomDialog" title="选择授课教室">
      <roomPage @selectRoom="selectRoom" />
      <div slot="footer" style="margin-top: 40px;">
        <el-button type="primary" @click="roomDialog = false">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="cDialog" title="学期开始时间">
      <el-date-picker v-model="start" type="date" clearable placeholder="学期开始时间"></el-date-picker>
      <div slot="footer">
        <el-button type="primary" @click="handleAuto()">排课</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import teachTime from '@/common/weeks'
  import subjectPage from '@/pages/edu/components/subjectPage.vue'
  import roomPage from '@/pages/edu/components/roomPage.vue'
  import {
    arrangeCourse,
    getCourseList,
    delCourse,
    getYearList
  } from '@/api/course'
  export default {
    components: {
      subjectPage,
      roomPage
    },
    data() {
      return {
        init: false,
        cDialog: false,
        start: '',
        form: {
          id: '',
          subjectId: '',
          subject: '',
          equipId: '',
          room: '',
          timeStr: '',
          week: '',
          weeks: [],
        },
        rules: {
          subject: [
            { required: true, message: '请选择课程名称' }
          ],
          room: [
            { required: true, message: '请选择授课教室' }
          ],
          timeStr: [
            { required: true, message: '请输入上课时间' }
          ],
          week: [
            { required: true, message: '请输入上课周' }
          ]
        },
        subjectDialog: false,
        roomDialog: false,
        yearList: []
      }
    },
    mixins: [mixin],
    computed: {
      teachTime() {
        return teachTime
      }
    },
    created() {
      const curdate = new Date()
      const year = curdate.getFullYear()
      this.siftTime = curdate.getMonth() < 6 ? `${(year - 1)}-${year}-2` : `${(year)}-${(year + 1)}-1`
      this.getList(false)
      this.getYList()
    },
    methods: {
      selectSubject(row) {
        this.form.subjectId = row.id
        this.form.subject = row.name
        this.form.weeks = row.timeStr.split(',')
      },
      selectRoom(row) {
        this.form.equipId = row.id
        this.form.room = row.position + row.name
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if(valid) {
            this.form.auto = '0'
            this.form.week = this.form.weeks + ''
            this.form.day = this.form.timeStr[0] % 7
            this.form.time = this.form.timeStr[1] - 1
            arrangeCourse(this.form).then(res => {
              if(res.data.code === 200) {
                this.$refs.form.resetFields()
                this.getList(true)
                this.getYList()
              }
            })
          }
        })
      },
      handleAuto() {
        this.form.auto = '1'
        this.form.start = new Date(this.start).getTime()
        arrangeCourse(this.form).then(res => {
          if(res.data.code === 200) {
            this.getList(true)
            this.cDialog = false
            this.getYList()
          }
        })
      },
      getList(load) {
        this.loading = load
        const params = {}
        params.size = this.size
        params.current = this.current
        params.siftName = this.siftName
        params.siftTime = this.siftTime
        getCourseList(params).then(res => {
          this.loading = false
          const { code, data } = res.data
          if(code === 200) {
            this.tableData = data.list
            this.total = data.total
          }
        }).catch(() => {
          this.loading = false
        })
      },
      getYList() {
        getYearList().then(res => {
          if(res.data.code === 200) {
            this.yearList = res.data.data
          }
        })
      },
      handleDel(row) {
        delCourse(row.id).then(res => {
          if(res.data.code === 200) {
            this.getList(true)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    &::v-deep .el-form {
      margin: 100px 0 0 200px;
    }
  }

  ::v-deep .el-col {
    text-align: center;
  }
</style>