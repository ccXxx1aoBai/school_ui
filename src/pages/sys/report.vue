<template>
  <div>
    <div class="content">
      <div class="tools">
        <el-row>
          <el-col :span="3">
            <el-input v-model="siftName" placeholder="举报原因" maxlength="20" clearable></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="primary" icon="el-icon-search" @click="getList(true)">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-table-column label="被举报人" prop="obj" align="center"></el-table-column>
          <el-table-column label="举报人" prop="reporter" align="center"></el-table-column>
          <el-table-column label="被举报次数" prop="count" align="center"></el-table-column>
          <el-table-column label="处罚状态" prop="status" align="center"></el-table-column>
          <el-table-column label="举报时间" prop="time" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleDeal(scope.row)">处罚</el-button>
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
    <el-dialog :visible.sync="dialog" title="处罚">
      <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="100px">
        <el-form-item label="处罚类型" prop="type">
          <el-select v-model="form.type" placeholder="处罚类型" clearable>
            <el-option value="0" label="禁言"></el-option>
            <el-option value="1" label="封号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处罚时长" prop="time">
          <el-select v-model="form.time" clearable placeholder="处罚时长">
            <el-option label="1小时" value="1"></el-option>
            <el-option label="6小时" value="6"></el-option>
            <el-option label="12小时" value="12"></el-option>
            <el-option label="一天" value="24"></el-option>
            <el-option label="三天" value="72"></el-option>
            <el-option label="五天" value="120"></el-option>
            <el-option label="一周" value="168"></el-option>
            <el-option label="一月" value="720"></el-option>
            <el-option label="三月" value="2160"></el-option>
            <el-option label="半年" value="4320"></el-option>
            <el-option label="一年" value="8760"></el-option>
            <el-option label="永久" value="876000"></el-option>
          </el-select>
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
import {
  getReportList,
  addBan
} from '@/api/report'
import moment from 'moment'
export default {
  data() {
    return {
      item: {},
      form: {
        userId: '',
        type: '',
        time: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  mixins: [mixin],
  created() {
    this.getList(false)
  },
  methods: {
    getList(load) {
      this.loading = load
      const params = {}
      params.size = this.size
      params.current = this.current
      params.siftName = this.siftName
      getReportList(params).then(res => {
        this.loading = false
        const { code, data } = res.data
        if(code === 200) {
          this.tableData = data.list
          this.total = data.total
        }
      }).catch(err => {
        this.loading = false
      })
    },
    handleDeal(row) {
      this.item = row
      this.dialog = true
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          const params = {}
          params.userId = this.item.user_id
          params.type = this.form.type
          const curdate = new Date()
          params.start = moment(curdate).format('YYYY-MM-DD HH:mm:ss')
          curdate.setHours(curdate.getHours() + parseInt(this.form.time))
          params.end = moment(curdate).format('YYYY-MM-DD HH:mm:ss')
          addBan(params).then(res => {
            if(res.data.code === 200) {
              this.$refs.form.resetFields()
              this.dialog = false
              this.getList(true)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>