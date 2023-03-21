<template>
  <div>
    <div class="wrap">
      <div class="content">
        <el-form label-width="100px" label-position="left" v-if="init">
          <el-form-item prop="year" label="学年">
            <el-select v-model="siftYear">
              <el-option value="2022-2023学年"></el-option>
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
                  <el-option value="2022-2023学年"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-button type="primary" icon="el-icon-search">查询</el-button>
                <el-button type="primary" icon="el-icon-date" @click="dialog = !dialog">排课</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="table">
            <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-table-column prop="id" label="课程编号" align="center"></el-table-column>
              <el-table-column prop="name" label="课程名称" align="center"></el-table-column>
              <el-table-column prop="teacher" label="授课教师" align="center"></el-table-column>
              <el-table-column prop="type" label="课程性质" align="center"></el-table-column>
              <el-table-column prop="room" label="授课教室" align="center"></el-table-column>
              <el-table-column prop="clazz" label="上课班级" align="center"></el-table-column>
              <el-table-column prop="teachTime" label="上课时间" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" icon="el-icon-edit">编辑</el-button>
                  <el-button type="text" class="err" icon="el-icon-delete">删除</el-button>
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
        <el-form-item prop="name" label="课程名称">
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.name" clearable placeholder="课程名称" maxlength="50"></el-input>
            </el-col>
            <el-col :span="1">
              <el-button type="text" disabled>选</el-button>
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
        <el-form-item prop="teacher" label="授课教师">
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.teacher" clearable placeholder="授课教师" maxlength="30"></el-input>
            </el-col>
            <el-col :span="1">
              <el-button type="text" @click="teachDialog = !teachDialog">选</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="clazz" label="上课班级">
          <el-row>
            <el-col :span="10">
              <el-input v-model="form.clazz" clearable placeholder="上课班级" maxlength="50"></el-input>
            </el-col>
            <el-col :span="1">
              <el-button type="text" @click="clazzDialog = !clazzDialog">选</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="type" label="课程性质">
          <el-radio-group v-model="form.type">
            <el-radio :label="0">考查</el-radio>
            <el-radio :label="1">考试</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="teachTime" label="上课时间">
          <el-row>
            <el-col :span="10">
              <el-cascader :options="teachTime" v-model="form.teachTime" clearable placeholder="上课时间"
                style="width: 100%;"></el-cascader>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="start" label="开始周数">
          <el-input-number v-model="form.start" :max="form.end" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item prop="end" label="结束周数">
          <el-input-number v-model="form.end" :min="form.start"></el-input-number>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary">提交</el-button>
      </template>
    </el-dialog>

    <!-- 选教室 -->
    <el-dialog :visible.sync="roomDialog" title="选择授课教室">
      <roomPage @selectRoom="selectRoom" />
      <div slot="footer" style="margin-top: 40px;">
        <el-button type="primary" @click="roomDialog = false">确定</el-button>
      </div>
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
      <clazzPage @selectTeacher="selectTeacher" />
      <div slot="footer" style="margin-top: 40px;">
        <el-button type="primary" @click="clazzDialog = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import teachTime from '@/common/weeks'
  import roomPage from '@/pages/edu/components/roomPage.vue'
  import teachPage from '@/pages/edu/components/teachPage.vue'
  import clazzPage from '@/pages/edu/components/clazzPage.vue'
  export default {
    name: '',
    components: {
      roomPage,
      teachPage,
      clazzPage
    },
    data() {
      return {
        init: false,
        form: {
          id: '',
          name: '',
          room: '',
          teacher: '',
          clazz: '',
          type: '',
          teachTime: '',
          start: 1,
          end: 17
        },
        rules: {
          name: [
            { required: true, message: '请选择课程名称', trigger: ['change', 'blur'] }
          ],
          room: [
            { required: true, message: '请选择授课教室', trigger: ['change', 'blur'] }
          ],
          teacher: [
            { required: true, message: '请选择授课教师', trigger: ['change', 'blur'] }
          ],
          clazz: [
            { required: true, message: '请选择上课班级', trigger: ['change', 'blur'] }
          ],
          type: [
            { required: true, message: '请选择课程性质', trigger: ['change', 'blur'] }
          ],
          teachTime: [
            { required: true, message: '请选择上课时间', trigger: ['change', 'blur'] }
          ],
          start: [
            { required: true, message: '请输入开始周数', trigger: ['change', 'blur'] }
          ],
          end: [
            { required: true, message: '请输入结束周数', trigger: ['change', 'blur'] }
          ]
        },
        roomDialog: false,
        teachDialog: false
      }
    },
    mixins: [mixin],
    computed: {
      teachTime() {
        return teachTime
      }
    },
    mounted() {
    },
    methods: {
      viewMore() {
        if(this.siftYear != '') {
          this.init = false
        }else {
          this.$message({
            message: '请选择学年',
            type: 'error'
          })
        }
      },
      selectRoom(row) {
        this.form.roomId = row.id
        this.form.room = row.position + row.name
      },
      selectTeacher(row) {
        this.form.teacherId = row.id
        this.form.teacher = row.name
      },
      selectClazz(row) {

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