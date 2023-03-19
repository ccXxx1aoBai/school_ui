<template>
  <div>
    <div class="content">
      <div class="tools">
        <el-row>
          <el-col :span="6">
            <el-select v-model="siftDept" placeholder="所属学院" clearable>
              <el-option v-for="item in deptList" :key="item.id" :value="item.deptId" :label="item.label"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" :offset="1">
          <el-input v-model="siftName" placeholder="班级名称" clearable maxlength="30"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" @click="getList(true)">查询</el-button>
        </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="441"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-table-column align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked" @change="selectClazz(scope.row)">&nbsp;</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="班级名称" align="center"></el-table-column>
          <el-table-column prop="dept" label="所属学院" align="center"></el-table-column>
          <el-table-column prop="year" label="年级" align="center"></el-table-column>
        </el-table>
        <el-pagination
        :total="total"
        :page-size.sync="size"
        :current-page.sync="current"
        :page-sizes="[10, 20, 50, 100, 200, 500]"
        layout="total, sizes, prev, pager, next, jumper"
        style="bottom: 80px;"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import {
    getDepartmentList
  } from '@/api/department'
  import {
    getClazzList,
  } from '@/api/clazz'
  export default {
    name: '',
    data() {
      return {
        deptList: [],
        majorList: [],
        select: '',
        selectRows: []
      }
    },
    mixins: [mixin],
    computed: {
      terms() {
        const terms = []
        const date = new Date()
        for(let i = 0; i < 5; i++) {
          terms.unshift((date.getFullYear() - i) + '级')
        }
        return terms
      }
    },
    watch: {
      pagination() {
        this.getList(true)
      }
    },
    created() {
      getDepartmentList().then(res => {
        this.deptList = res.data.data
      })
      this.getList(false)
    },
    methods: {
      getList(load) {
        this.loading = load
        const params = {
          current: this.current,
          size: this.size,
          siftName: this.siftName,
          siftDept: this.siftDept
        }
        getClazzList(params).then(res => {
          this.loading = false
          const {total, list} = res.data.data
          this.tableData = list
          this.total = total
        }).catch(() => {
          this.loading = false
        })
      },
      changeDept(id) {
        this.majorList = []
        const obj = this.deptList.find(item => {
          return item.id == id
        })
        this.$set(this.form, 'dept', obj.label)
        this.$set(this.form, 'majorId', '')
        obj.children.forEach(item => {
          this.majorList.push(item)
        })
      },
      selectClazz(row) {
        const index = this.selectRows.findIndex(item => {
          return item.name == row.name
        })
        if(row.checked) {
          if(index == -1) {
            this.selectRows.push(row)
          }
        }else {
          this.selectRows.splice(index, 1)
        }
        this.$emit('selectClazz', this.selectRows)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>