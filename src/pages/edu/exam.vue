<template>
  <div>
    <div class="wrap">
      <div class="tree">
        <el-tree :data="tree" node-key="id" accordion :default-expanded-keys="[0]"
        :expand-on-click-node="false" @node-click="handleTreeClick" />
      </div>
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-input v-model="siftName" placeholder="课程名称" clearable maxlength="40"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-date-picker v-model="siftTime" align="center" clearable placeholder="考试时间" format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
            <el-col :span="5" :offset="2">
              <el-button type="primary">查询</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="id" label="计划编号" align="center"></el-table-column>
            <el-table-column prop="name" label="课程名称" align="center"></el-table-column>
            <el-table-column prop="classes" label="考试班级" align="center"></el-table-column>
            <el-table-column prop="teacher" label="监考老师" align="center"></el-table-column>
            <el-table-column prop="room" label="考场" align="center"></el-table-column>
            <el-table-column prop="startTime" label="考试时间" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-check">同意</el-button>
                <el-button type="text" icon="el-icon-close" class="err">拒绝</el-button>
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

    
  </div>
</template>

<script>
  import {
    getDepartmentList
  } from '@/api/department'
  import mixin from '@/mixin'
  export default {
    name: '',
    data() {
      return {
        tree: [
          {id: 0, label: '全部', name: '全部', children: []}
        ],
        examForm: {
          id: ''
        }
      }
    },
    created() {
      getDepartmentList().then(res => {
        this.tree[0].children = res.data.data
      })
    },
    mixins: [mixin],
    methods: {
      handleTreeClick(tree) {
        const arr = []
        if(tree.children && tree.children.length > 0) {
          tree.children.forEach(item => {
            arr.push(item.id)
          })
        }else {
          arr.push(tree.id)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .tree{
    width: 350px;
    height: 100%;
    margin-top: 10px;
    overflow-y: auto;

    ::v-deep .el-tree{
      width: 200px;
      margin: auto;
    }
  }
</style>