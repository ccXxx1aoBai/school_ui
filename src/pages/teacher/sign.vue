<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-input v-model="siftName" placeholder="课程名称" maxlength="40" clearable></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button icon="el-icon-search" type="primary" @click="getDataList(true)">查询</el-button>
              <!-- <el-button icon="el-icon-printer" type="primary" @click="handleExport('sign')">导出</el-button> -->
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="600" :data="tableData" size="mini" v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="subject" label="课程名称" align="center"></el-table-column>
            <el-table-column prop="start" label="开始时间" align="center"></el-table-column>
            <el-table-column prop="end" label="结束时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button icon="el-icon-view" type="text" @click="detail(scope.row)">详情</el-button>
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

    <el-dialog :visible.sync="dialog" :title="item.name">
      <el-descriptions colon :column="1">
        <el-descriptions-item label="课程名称">{{ item.subject }}</el-descriptions-item>
        <el-descriptions-item label="开始时间">{{ item.start }}</el-descriptions-item>
        <el-descriptions-item label="结束时间">{{ item.end }}</el-descriptions-item>
        <el-descriptions-item label="未签到学生">
          <div style="display: flex;flex-wrap: wrap;width: 80%;max-height: 300px;overflow-y: auto;">
            <div v-for="info in item.noSignList" :key="info.id" style="margin: 0 10px;">
              <el-tooltip :content="info.id + info.name" placement="top">
                <el-avatar :src="info.avatar"></el-avatar>
              </el-tooltip>
            </div>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import mixin from '@/mixin'
import {
  getSignRecord
} from '@/api/subject'
export default {
  data() {
    return {
      item: {}
    }
  },
  mixins: [mixin],
  created() {
    this.getDataList(false)
  },
  methods: {
    getDataList(load) {
      this.loading = load
      const params = {}
      params.current = this.current
      params.size = this.size
      params.siftName = this.siftName
      // params.id = this.$store.getters.uid
      params.id = 'BDDDDAEBJBSYb00e5d7175f84d5a58e1'
      getSignRecord(params).then(res => {
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
    detail(row) {
      console.log(row);
      this.dialog = true
      this.$nextTick(() => {
        this.item = row
        this.item.noSignList.forEach(item => {
          item.avatar = this.FILE_BASE_URL + item.avatar
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>