<template>
  <div>
    <div class="content">
      <div class="tools">
        <el-row>
          <el-col :span="3">
            <el-input v-model="siftName" placeholder="发布人" clearable maxlength="20"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="siftStatus" placeholder="状态" clearable>
              <el-option value="0" label="已拒绝"></el-option>
              <el-option value="1" label="待审核"></el-option>
              <el-option value="2" label="已通过"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-date-picker v-model="startTime" placeholder="开始时间" clearable value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-date-picker v-model="endTime" placeholder="结束时间" clearable value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="primary" icon="el-icon-search" @click="getList(true)">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-table-column label="发帖人" prop="author" align="center"></el-table-column>
          <el-table-column label="专业班级" prop="clazz" align="center"></el-table-column>
          <el-table-column label="审核状态" prop="statusLabel" align="center"></el-table-column>
          <el-table-column label="发布时间" prop="createTime" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-check" @click="handleApprove(scope.row)">审核</el-button>
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

    <el-dialog :visible.sync="dialog" title="发帖审核" top="15px">
      <el-descriptions colon :column="1" :labelStyle="{width: '100px'}">
        <el-descriptions-item label="发帖人">{{ item.name }}</el-descriptions-item>
        <el-descriptions-item label="发帖内容">
          <p class="html" v-html="item.content"></p>
        </el-descriptions-item>
        <el-descriptions-item label="图片">
          <div class="imgs">
            <el-image v-for="img in item.images ? JSON.parse(item.images) : []" 
            :key="img" :src="FILE_BASE_URL + img" :preview-src-list="previewList" 
            @click="previewImage(FILE_BASE_URL + img)"></el-image>
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <el-form :model="form" style="width: 550px;margin-top: 10px;" label-position="left" label-width="100px" ref="form">
        <el-form-item label="审核结果：" prop="result">
          <el-select v-model="form.result" clearable placeholder="审核结果">
            <el-option value="2" label="通过"></el-option>
            <el-option value="0" label="拒绝"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核意见：" prop="opinion" :rules="form.result == '0' ? rules : {}">
          <el-input type="textarea" v-model="form.opinion" clearable maxlength="200" placeholder="审核意见" :rows="3"></el-input>
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
  getForumList,
  forumApprove
} from '@/api/forum'
import moment from 'moment'
export default {
  data() {
    return {
      item: {},
      previewList: [],
      form: {
        opinion: '',
        result: '',
      },
      rules: {
        required: true,
        message: '请输入审核意见'
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
      params.current = this.current
      params.size = this.size
      params.siftName = this.siftName
      params.siftStatus = this.siftStatus
      params.startTime = this.startTime
      params.endTime = this.endTime
      getForumList(params).then(res => {
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
    handleApprove(row) {
      console.log(row);
      this.dialog = true
      this.item = row
    },
    previewImage(img) {
      if(this.previewList.length == 1) {
        this.$set(this.previewList, 0, img)
      }else {
        this.previewList.push(img)
      }
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          const params = {}
          params.forumId = this.item.id
          params.auditorId = this.$store.getters.uid
          params.result = this.form.result
          params.opinion = this.form.opinion
          params.time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          forumApprove(params).then(res => {
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
  .html {
    width: 300px;
    max-height: 200px;
    margin-bottom: 20px;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .imgs {
    display: flex;
    width: 300px;
    flex-wrap: wrap;

    &::v-deep .el-image {
      width: 100px;
      height: 100px;
      padding: 5px;
      box-sizing: border-box;
      
      img {
        border-radius: 8px;
      }
    }
  }
</style>