<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-input placeholder="字典名称" clearable v-model="siftLabel"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-input placeholder="字典标识" clearable v-model="siftValue"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button type="primary" @click="getDictList(true)">查询</el-button>
              <el-button type="primary" @click="dialog = !dialog">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table :data="dictList" border v-loading="loading" element-loading-text="加载中" height="660"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="id" label="字典编号" align="center"></el-table-column>
            <el-table-column prop="label" label="字典名称" align="center"></el-table-column>
            <el-table-column prop="value" label="字典标识" align="center"></el-table-column>
            <el-table-column prop="type" label="字典类型" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                <el-popconfirm title="删除删除此条数据？" @confirm="handleDel(scope.row)">
                  <el-button type="text" icon="el-icon-delete" slot="reference" style="color: #DA281F;padding: 0 15px;">删除</el-button>
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

    <el-dialog :visible.sync="dialog" title="字典管理" @close="beforeClose">
      <el-form :model="dictForm" :rules="dictRules" ref="dictForm" label-position="left" label-width="100px"
      style="width: 50%;">
        <el-form-item v-show="false">
          <el-input v-model="dictForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="label" label="字典名称">
          <el-input v-model="dictForm.label" placeholder="字典名称" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="value" label="字典标识">
          <el-input v-model="dictForm.value" placeholder="字典唯一标识" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="字典类型">
          <el-input v-model="dictForm.type" placeholder="字典类型" clearable maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addDict,
  getDict
} from '@/api/dict'
export default {
  data() {
    return {
      siftLabel: '',
      siftValue: '',
      dictList: [],
      loading: false,
      total: 0,
      current: 1,
      size: 10,
      dialog: false,
      dictForm: {
        id: '',
        label: '',
        value: '',
        type: ''
      },
      dictRules: {
        label: [
          { required: true, message: '请输入字典名称', trigger: ['change', 'blur'] }
        ],
        value: [
          { required: true, message: '请输入字典标识', trigger: ['change', 'blur'] }
        ],
        type: [
          { required: true, message: '请输入字典类型', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  computed: {
    pagination() {
      const {current, size} = this
      return {current, size}
    }
  },
  watch: {
    pagination() {
      this.getDictList(true)
    }
  },
  created() {
    this.getDictList(true)
  },
  methods: {
    getDictList(load) {
      this.loading = load
      const params = {}
      params.label = this.siftLabel
      params.value = this.siftValue
      params.size = this.size
      params.current = this.current
      getDict(params).then(res => {
        this.total = res.data.data.total
        this.dictList = res.data.data.list
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleEdit(row) {

    },
    handleDel(row) {

    },
    handleSubmit() {
      this.$refs.dictForm.validate(valid => {
        if(valid) {
          this.$fullLoading.load('正在提交...')
          if(this.dictForm.id) {

          }else {
            addDict(this.dictForm).then(res => {
              if(res.data.code === 200) {
                this.$refs.dictForm.resetFields()
              }
              this.$fullLoading.close()
            }).catch(() => {
              this.$fullLoading.close()
            })
          }
        }
      })
    },
    beforeClose() {
      this.$refs.dictForm.resetFields()
    }
  }
}
</script>

<style scoped lang="scss">

</style>