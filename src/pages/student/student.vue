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
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import {
    getDepartmentList
  } from '@/api/department'
  export default {
    name: '',
    data() {
      return {
        deptList: [],
        majorList: [],
        filterDept: '',
        filterMajor: ''
      }
    },
    mixins: [mixin],
    created() {
      getDepartmentList().then(res => {
        console.log(res);
        res.data.data.forEach(item => {
          const {deptId, dept} = item
          this.deptList.push({deptId, dept})
          item.children.forEach(child => {
            const {majorId, major} = child
            this.majorList.push({majorId, major})
          })
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  
</style>