<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="4">
              <el-select v-model="siftRole" clearable placeholder="用户角色">
                <el-option :label="role.name" :value="role.role" v-for="role in roleList" :key="role.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-input v-model="siftName" placeholder="用户名称" clearable ></el-input>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-button type="primary" icon="el-icon-search" @click="getList(true)">查询</el-button>
              <el-button type="primary" icon="el-icon-printer" @click="handleExport('user')">导出</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="600" :data="tableData" size="mini" v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column label="ID" prop="id" align="center"></el-table-column>
            <el-table-column label="用户名称" prop="username" align="center"></el-table-column>
            <el-table-column label="账号状态" prop="enable" align="center">
              <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.lock ? 'info' : 'primary'">{{scope.row.lock ? '冻结' : '正常'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="角色名称" prop="name" align="center">
              <template slot-scope="scope">
                <el-select v-if="edit" v-model="roleName" clearable>
                  <el-option :label="role.name" :value="role.role" v-for="role in roleList" :key="role.id"></el-option>
                </el-select>
                <span v-else>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="300">
              <template slot-scope="scope">
                <div class="customBtn">
                  <el-button type="text" icon="el-icon-edit"
                  @click="handleChangeFinish(scope.row)">{{edit ? '完成' : '编辑'}}</el-button>
                  <!-- <el-popconfirm title="是否冻结此用户？" @confirm="handleLock(scope.row)">
                    <el-button style="color: #E39A09" type="text" slot="reference"
                    :icon="scope.row.lock ? 'el-icon-unlock' : 'el-icon-lock'">
                      {{scope.row.lock ? '解冻' : '冻结'}}
                    </el-button>
                  </el-popconfirm> -->
                  <!-- <el-popconfirm>
                    <el-button type="text" icon="el-icon-refresh" slot="reference">重置密码</el-button>
                  </el-popconfirm> -->
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
          :current-page.sync="current"
          :page-size.sync="size"
          :page-sizes="[10, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper" />
        </div>
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
    getUserList
  } from '@/api/user'
  import {
    getRoleList
  } from '@/api/role'
  export default {
    name: '',
    data() {
      return {
        roleList: [],
        tree: [],
        selectTree: [],
        tableLoading: false,
        tableData: [],
        roleName: '',
        edit: false,
      }
    },
    mixins: [mixin],
    watch: {
      pagination(val) {
        this.getList(true, val.page, val.size, [])
      },
    },
    created() {
      getDepartmentList().then(res => {
        this.tree = res.data.data
      })
      this.getList(true)
      getRoleList({name: ''}).then(res => {
        const {data} = res.data
        this.roleList = data
      })
    },
    methods: {
      getList(load) {
        this.loading = load
        const params = {}
        params.role = this.siftRole
        params.name = this.siftName
        params.current = this.current
        params.size = this.size
        params.classIds = this.siftRole
        getUserList(params).then(res => {
          const { code, data } = res.data
          if(code === 200) {
            this.total = data.total
            this.tableData = data.list
          }
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      },
      handleChangeFinish(row) {
        if(this.edit) {
          this.edit = false
          // 修改完成
        }else {
          this.edit = true
          this.roleName = row.name
        }
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

  .content{
    
    .customBtn{
      display: flex;
      & > * {
        width: 100%;
      }
    }
  }
}
</style>