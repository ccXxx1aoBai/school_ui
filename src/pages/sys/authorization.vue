<template>
  <div>
    <div class="wrap">
      <div class="tree">
        <el-tree :data="tree" node-key="id"></el-tree>
      </div>
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="4">
              <el-input v-model="siftRoleName" clearable placeholder="角色名称"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-input v-model="siftUserName" placeholder="成员名称" clearable></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="600">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="角色ID" prop="roleId"></el-table-column>
            <el-table-column label="角色名称" prop="romeName"></el-table-column>
            <el-table-column label="拥有权限" prop="authorization"></el-table-column>
          </el-table>
          <el-pagination 
          style="margin-top: 20px"
          :total="total"
          :current-page="page"
          :page-size.sync="size"
          :page-sizes="[10, 20, 30, 50, 100]"
          @size-change="handleSizeChange"
          @current-page="handlePageChange"
          layout="total, sizes, prev, pager, next, jumper" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDepartmentList} from '@/api/department'
  export default {
    name: '',
    data() {
      return {
        siftRoleName: '',
        siftUserName: '',
        tree: [],
        total: 0,
        page: 1,
        size: 10
      }
    },
    computed: {
      pagination() {
        const {page, size} = this
        return {page, size}
      }
    },
    watch: {
      pagination(val) {
        this.getRoleList(true, val.page, val.size)
      },
    },
    created() {
      getDepartmentList().then(res => {
        this.tree = res.data.data
      })
    },
    methods: {
      getRoleList(load, page, size) {
        console.log(page, size);
      },
      handleSizeChange(size) {
        this.size = size
      },
      handlePageChange(page) {
        this.page = page
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  display: flex;
  margin: 20px 0;
  .tree{
    width: 450px;
    height: 100%;
    margin-top: 10px;
    overflow-y: auto;

    ::v-deep .el-tree{
      width: 200px;
    }
  }

  .content{
    width: 100%;

    .tools{
      margin: 10px 0;
    }
  }
}
</style>