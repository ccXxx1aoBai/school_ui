<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools" style="display: flex;justify-content: flex-end;">
          <el-button type="primary" icon="el-icon-plus" @click="dialog = true">请假</el-button>
        </div>
        <div class="table">
          <el-table stripe height="600" :data="tableData" size="mini" v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="id" label="假条编号" align="center"></el-table-column>
            <el-table-column prop="type" label="请假类型" align="center"></el-table-column>
            <el-table-column prop="day" label="请假天数" align="center"></el-table-column>
            <el-table-column prop="reason" label="原因" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="flow" label="当前节点" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-view">详情</el-button>
                <el-button type="text" icon="el-icon-delete" class="warn" @click="handleCancel(scope.row)">流程取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialog" title="请假">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="left">
        <el-form-item prop="id" label="假条编号">
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item prop="type" label="请假类型">
          <el-select v-model="form.type" clearable placeholder="请假类型">
            <el-option value="0" label="事假"></el-option>
            <el-option value="1" label="病假"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="day" label="请假天数">
          <el-input-number v-model="form.day" placeholder="请假天数" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item prop="reason" label="请假原因">
          <el-input type="textarea" placeholder="请假原因" v-model="form.reason" maxlength="200" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import { mapGetters } from 'vuex'
  import {
    addLeave,
    getLeaveList
  } from '@/api/leave'
  export default {
    data() {
      return {
        form: {
          id: '',
          name: '',
          type: '',
          day: 0,
          reason: ''
        },
        rules: {
          type: [
            { required: true, message: '请选择请假类型' }
          ],
          day: [
            { required: true, message: '请输入请假天数' }
          ],
          reason: [
            { required: true, message: '请输入请假原因' }
          ]
        }
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
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if(valid) {
            this.$fullLoading.load()
            this.form.userId = this.uid
            addLeave(this.form).then(res => {
              this.$fullLoading.close()
              if(res.data.code === 200) {
                this.geneId()
                this.$refs.form.resetFields()
              }
            })
          }
        })
      },
      getList(load) {
        this.loading = load
        getLeaveList(this.uid).then(res => {
          const { code, data } = res.data
          if(code === 200) {
            this.total = data.total
            this.tableData = data.list
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