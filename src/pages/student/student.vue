<template>
  <div>
    <div class="content">
      <div class="tools">
        <el-row>
          <el-col :span="3">
            <el-input v-model="siftName" placeholder="学生姓名" clearable></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="filterDept" placeholder="所属学院" clearable>
              <el-option v-for="item in deptList" :key="item.deptId" :value="item.deptId" :label="item.dept"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="filterMajor" placeholder="专业" clearable>
              <el-option v-for="item in majorList" :key="item.majorId" :value="item.majorId" :label="item.major"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-button type="primary" @click="getList(true)" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="dialog = true" icon="el-icon-upload">导入</el-button>
            <el-button type="primary" @click="handleExport('student')" icon="el-icon-folder">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-table-column label="学号" prop="id" align="center" width="160"></el-table-column>
          <el-table-column label="姓名" prop="name" align="center" width="120"></el-table-column>
          <el-table-column label="性别" prop="sex" align="center" width="100">
            <template slot-scope="scope">
              {{ scope.row.sex == '1' ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column label="学院" prop="dept" align="center" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column label="专业" prop="major" align="center" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column label="班级" prop="clazz" align="center" width="90"></el-table-column>
          <el-table-column label="年级" prop="grade" align="center" width="100"></el-table-column>
          <el-table-column label="手机号码" prop="phone" align="center" width="150"></el-table-column>
          <el-table-column label="邮箱" prop="email" align="center" width="180"></el-table-column>
          <el-table-column label="家庭住址" prop="address" align="center" width="280" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="12">
                  <el-button type="text" icon="el-icon-edit" disabled>编辑</el-button>
                </el-col>
                <el-col :span="12">
                  <el-popconfirm title="是否删除此数据？" @confirm="handleDel(scope.row)">
                    <el-button slot="reference" type="text" icon="el-icon-delete" class="err">删除</el-button>
                  </el-popconfirm>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          :current-page.sync="current"
          :page-size.sync="size"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          layout="total, sizes, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>

    <el-dialog :visible.sync="dialog" title="学生信息导入">
      <el-upload
        class="upload-demo"
        drag
        action="#"
        accept=".xls,.xlsx"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="beforeUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传.xls、.xlsx文件</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import {
    getDepartmentList
  } from '@/api/department'
  import {
    getStudent,
    delStudent
  } from '@/api/student'
  import Archives from '@/components/archives.vue'
  import { 
    importData,
  } from '@/api'
  import { mapGetters } from 'vuex'
  export default {
    components: { Archives },
    data() {
      return {
        deptList: [],
        majorList: [],
        filterDept: "",
        filterMajor: "",
        student: {},
      }
    },
    mixins: [mixin],
    computed: {
      ...mapGetters(['uid'])
    },
    created() {
      getDepartmentList().then(res => {
        console.log(res)
        res.data.data.forEach(item => {
          const { deptId, dept } = item
          this.deptList.push({ deptId, dept })
          item.children.forEach(child => {
            const { majorId, major } = child
            this.majorList.push({ majorId, major })
          })
        })
      })
      this.getList(false)
    },
    methods: {
      beforeUpload(file) {
        const type = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
        if(!type.includes(file.raw.type)) {
          this.$message.error("文件格式错误")
          return false
        }
        this.$fullLoading.load()
        importData({ file: file.raw, uid: this.uid, type: 'student' }).then(res => {
          if(res.data.code === 200) {
            this.$fullLoading.close()
            this.getList(false)
          }
        })
      },
      getList(load) {
        this.loading = load
        const params = {
          current: this.current,
          size: this.size,
          siftName: this.siftName,
          deptId: this.filterDept,
          majorId: this.filterMajor
        }
        getStudent(params).then(res => {
          const { list, total } = res.data.data
          this.tableData = list
          this.total = total
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      handleDel(row) {
        delStudent(row.id).then(res => {
          if(res.data.code == 200) {
            this.getList(true)
          }
        })
      },
    }
}
</script>

<style lang="scss" scoped>
  .dialog-custom-body {
    width: 50%;
    margin: auto;
  }
</style>