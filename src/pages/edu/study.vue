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
              <el-button type="primary" icon="el-icon-search">查询</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="dialog = true">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="600" :data="tableData" size="mini" v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="" label="" align="center"></el-table-column>
            <el-table-column prop="" label="" align="center"></el-table-column>
            <el-table-column prop="" label="" align="center"></el-table-column>
            <el-table-column prop="" label="" align="center"></el-table-column>
            <el-table-column prop="" label="" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template>
                <el-button type="text" icon="el-icon-edit"></el-button>
                <el-button type="text" icon="el-icon-delete"></el-button>
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
        <el-form-item prop="start" label="开始时间">
          <el-time-select clearable placeholder="开始时间" value-format="HH:mm" 
          v-model="form.start" :picker-options="{
            start: '08:00',
            step: '00:10',
            end: '21:30'
          }"></el-time-select>
        </el-form-item>
        <el-form-item prop="end" label="结束时间">
          <el-time-select clearable placeholder="结束时间" value-format="HH:mm" 
          v-model="form.end" :picker-options="endOptions"></el-time-select>
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
  getStudyList
} from '@/api/study'
export default {
  data() {
    return {
      form: {
        name: '',
        volume: 1,
        start: '',
        end: '',
        time: ''
      },
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
      if(this.form.start) {
        endOptions.start = this.form.start
      }
      return endOptions
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          addStudyRoom(this.form).then(res => {
            if(res.data.code === 200) {
              this.$refs.form.resetFiedlds()
            }
          })
        }
      })
    },
    getDataList(load) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 450px;
}
</style>