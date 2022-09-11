<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="4">
              <el-input v-model="siftRoleName" clearable placeholder="角色名称"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button type="primary">查询</el-button>
              <el-button type="success">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="600" :data="roleList" size="mini">
            <el-table-column label="角色ID" prop="id" align="center"></el-table-column>
            <el-table-column label="角色名称" prop="role" align="center"></el-table-column>
            <el-table-column label="角色别名" prop="name" align="center"></el-table-column>
            <el-table-column label="人数" prop="count" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="300">
              <template slot-scope="scope">
                <div class="customBtn">
                  <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-popconfirm title="是否删除该角色？" @confirm="handleDel(scope.row)">
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

    <el-dialog :visible.sync="dialog" title="角色权限分配">
      <div class="form">
        <el-form :model="role" label-position="left" label-width="100px">
          <el-form-item label="角色名称" prop="role">
            <el-input v-model="role.role" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色别名" prop="name">
            <el-input v-model="role.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="菜单权限" prop="menu">
            <el-tree :data="menuTree" :expand-on-click-node="false" show-checkbox></el-tree>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getDepartmentList} from '@/api/department'
  export default {
    name: '',
    data() {
      return {
        siftRoleName: '',
        menuTree: [
          {
            id: 1,
            label: '首页',
          },{
            id: 2,
            label: '权限管理',
            children: [
              {
                id: 3,
                label: '用户管理'
              },{
                id: 4,
                label: '角色管理'
              },{
                id: 5,
                label: '菜单管理'
              }
            ]
          },{
            id: 6,
            label: '系统管理',
            children: [
              {
                id: 7,
                label: '系统日志'
              }
            ]
          }
        ],
        roleList: [
          {
            id: '1',
            role: 'student',
            name: '学生',
            count: 1342
          }
        ],
        total: 0,
        page: 1,
        size: 10,
        dialog: false,
        role: {
          role: '',
          name: '',
        }
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
      handleEdit(row) {
        console.log(row);
        this.dialog = !this.dialog
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
  .content{
    width: 90%;
    margin: auto;
    padding: 10px 0;

    .tools{
      margin: 10px 0;
    }
    .customBtn{

      & > * {
        margin: auto 10px;
      }
    }
  }
}
.el-dialog {
  .el-form{
    width: 300px;
  }
}
</style>