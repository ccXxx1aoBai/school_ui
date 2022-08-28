<template>
  <div>
    <div class="wrap">
      <!-- <div class="tree">
        <el-tree :data="tree" node-key="id" accordion 
        :expand-on-click-node="false" @node-click="handleTreeClick" />
      </div> -->
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="4">
              <el-input v-model="siftRoleName" clearable placeholder="角色名称"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-input v-model="siftUserName" placeholder="用户名称" clearable></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="600" :data="roleList" size="mini">
            <el-table-column label="ID" prop="id" align="center"></el-table-column>
            <el-table-column label="用户ID" prop="uid" align="center"></el-table-column>
            <el-table-column label="用户名称" prop="username" align="center"></el-table-column>
            <el-table-column label="拥有权限" prop="authorization" align="center"></el-table-column>
            <el-table-column label="账号状态" prop="lock" align="center">
              <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.lock ? 'info' : 'primary'">{{scope.row.lock ? '冻结' : '正常'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="300">
              <template slot-scope="scope">
                <div class="customBtn">
                  <el-button type="text" icon="el-icon-edit">编辑</el-button>
                  <el-button type="text" icon="el-icon-refresh">重置密码</el-button>
                  <el-popconfirm title="是否冻结此用户？" @confirm="handleLock(scope.row)">
                    <el-button style="color: #E39A09" type="text" slot="reference"
                    :icon="scope.row.lock ? 'el-icon-unlock' : 'el-icon-lock'">
                      {{scope.row.lock ? '解冻' : '冻结'}}
                    </el-button>
                  </el-popconfirm>
                  <el-popconfirm title="是否删除此用户？" @confirm="handleDel(scope.row)">
                    <el-button style="color: #DA281F" type="text" icon="el-icon-delete" slot="reference">删除</el-button>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
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
        selectTree: [],
        roleList: [
          {
            id: '1',
            uid: '123',
            username: '张三',
            authorization: '学生',
            lock: true
          }
        ],
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
      handleTreeClick(tree) {
        console.log(tree, self, children);
      },
      handleLock(row) {

      },
      handleDel(row) {

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
      margin: auto;
    }
  }

  .content{
    width: 100%;

    .tools{
      margin: 10px 0;
    }
    .customBtn{
      display: flex;
      & > * {
        width: 100%;
      }
    }
  }
}
</style>