<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-input v-model="siftName" maxlength="30" clearable placeholder="自习室名称"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button type="primary" icon="el-icon-search" @click="getList(true)">查询</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="dialog = true">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="600" :data="tableData" size="mini" v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="volume" label="座位数" align="center"></el-table-column>
            <el-table-column label="开放状态" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status == '1' ? 'success' : 'info'">{{ scope.row.status == '1' ? '开放' : '关闭' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="开放时间" align="center">
              <template slot-scope="scope">
                <div>开放：{{ scope.row.startTime }}</div>
                <div>关闭：{{ scope.row.endTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-row>
                  <el-col>
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">修改</el-button>
                  </el-col>
                  <el-col>
                    <el-popconfirm title="是否删除此数据？" @confirm="handleDel(scope.row)">
                      <el-button slot="reference" type="text" icon="el-icon-delete" class="err">删除</el-button>
                    </el-popconfirm>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination 
          style="margin-top: 20px"
          :total="total"
          :current-page="current"
          :page-size.sync="size"
          :page-sizes="[10, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper" />
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialog" title="自习室管理">
      <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="100px">
        <el-form-item prop="name" label="自习室名称">
          <el-row>
            <el-col :span="20">
              <el-input maxlength="30" clearable v-model="form.name" placeholder="自习室名称"></el-input>
            </el-col>
            <el-col :span="1" style="margin-left: 10px;">
              <el-tooltip content="自习室名称一般由自习室位置+门牌号组成">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="volume" label="可容纳人数">
          <el-input-number clearable v-model="form.volume" :min="1" placeholder="可容纳人数"></el-input-number>
        </el-form-item>
        <el-form-item prop="startTime" label="开始时间">
          <el-time-select clearable placeholder="开始时间" value-format="HH:mm" 
          v-model="form.startTime" :picker-options="{
            start: '08:00',
            step: '00:10',
            end: '21:30'
          }"></el-time-select>
        </el-form-item>
        <el-form-item prop="endTime" label="结束时间">
          <el-time-select clearable placeholder="结束时间" value-format="HH:mm" 
          v-model="form.endTime" :picker-options="endOptions"></el-time-select>
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
  addStudyRoom,
  getStudyList,
  delStudyRoom
} from '@/api/study'
export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        volume: 1,
        startTime: '',
        endTime: '',
        time: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入自习室名称' }
        ],
        volume: [
          { required: true, message: '请输入自习室座位数' }
        ],
        startTime: [
          { required: true, message: '请选择自习室开放时间' }
        ],
        endTime: [
          { required: true, message: '请选择自习室关闭时间' }
        ]
      }
    }
  },
  mixins: [mixin],
  computed: {
    endOptions() {
      const endOptions = {
        start: '08:00',
        step: '00:10',
        end: '21:30'
      }
      if(this.form.startTime) {
        endOptions.start = this.form.startTime
      }
      return endOptions
    }
  },
  created() {
    this.getList(true)
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          addStudyRoom(this.form).then(res => {
            if(res.data.code === 200) {
              this.$set(this.form, 'id', '')
              this.$refs.form.resetFields()
              this.getList(true)
              this.dialog = false
            }
          })
        }
      })
    },
    getList(load) {
      this.loading = load
      const params = {}
      params.size = this.size
      params.current = this.current
      params.siftName = this.siftName
      getStudyList(params).then(res => {
        this.loading = false
        const { code, data } = res.data
        if(code === 200) {
          this.total = data.total
          this.tableData = data.list
        }
      }).catch(e => {
        this.loading = false
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
      delStudyRoom(row.id).then(res => {
        if(res.data.code === 200) {
          this.getList(true)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 450px;
}
</style>