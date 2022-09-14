<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="4">
              <el-input v-model="siftRoleName" clearable placeholder="角色名称" maxlength="20"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button type="primary" @click="getList(true)">查询</el-button>
              <el-button type="success" @click="dialog = !dialog">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table border stripe height="600" :data="roleList" size="mini" v-loading="tableLoading"
          element-loading-text="加载中" element-loading-spinner="el-icon-loading">
            <el-table-column label="角色ID" prop="id" align="center"></el-table-column>
            <el-table-column label="权限标识" prop="role" align="center"></el-table-column>
            <el-table-column label="角色名称" prop="name" align="center"></el-table-column>
            <el-table-column label="菜单权限" prop="menus" width="200" show-overflow-tooltip align="center"></el-table-column>
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
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialog" title="角色管理" @open="handleBeforeOpen" @close="handleBeforeClose"
    width="50%">
      <div class="form">
        <el-form :model="roleForm" ref="roleForm" :rules="roleRules" label-position="left" label-width="100px">
          <el-form-item v-show="false">
            <el-input v-model="roleForm.id"></el-input>
          </el-form-item>
          <el-form-item label="权限标识" prop="role">
            <el-row>
              <el-col :span="22">
                <el-input v-model="roleForm.role" clearable placeholder="权限标识" maxlength="20"></el-input>
              </el-col>
              <el-col :span="1" :offset="1">
                <el-tooltip content="多个身份以“,”分隔">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" clearable placeholder="角色名称" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="菜单权限" prop="menus">
            <el-tree 
            node-key="id"
            ref="tree"
            show-checkbox
            :data="menuTree"
            :expand-on-click-node="false" 
            :render-after-expand="false"
            @check-change="handleTreeClick"></el-tree>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer" slot="footer">
        <el-button block type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAllMenu} from '@/api/menu'
import { getRoleList, updateRoleInfo, addRole, delRole } from '@/api/role'
  export default {
    name: '',
    data() {
      return {
        siftRoleName: '',
        tableLoading: false,
        roleList: [],
        dialog: false,
        roleForm: {
          id: '',
          role: '',
          name: '',
          menus: '',
          menuList: []
        },
        roleRules: {
          role: [
            { required: true, message: '请输入权限标识', trigger: ['change', 'blur'] }
          ]
        },
        menuTree: [],
        defaultExpanded: [],
        defaultChecked: [],
      }
    },
    created() {
      this.$fullLoading.load()
      getAllMenu().then(res => {
        this.menuTree = res.data.data
      })
      this.getList(false)
    },
    methods: {
      getList(load) {
        this.tableLoading = load
        getRoleList({name: this.siftRoleName}).then(res => {
          this.roleList = res.data.data
          this.tableLoading = false
          this.$fullLoading.close()
        }).catch(err => {
          this.tableLoading = false
          this.$fullLoading.close()
        })
      },
      handleEdit(row) {
        this.dialog = !this.dialog
        this.$nextTick(() => {
          Object.keys(row).forEach(key => {
            this.$set(this.roleForm, key, row[key])
          })
        })
      },
      handleDel(row) {
        delRole(row.id).then(res => {
          console.log(res);
          if(res && res.data.code === 200) {
            this.getList(true)
          }
        })
      },
      handleBeforeOpen() {
        this.$nextTick(() => {
          this.tempValue = []
          if(typeof this.roleForm.menus == 'string') {
            this.setDefaultKey(this.roleForm.menus.split(','), this.menuTree)
          }
          this.roleForm.menuList = []
          const temp = [...new Set([...this.tempValue])]
          this.$refs.tree.setCheckedKeys(temp, true)
        })
      },
      handleBeforeClose() {
        this.$refs.roleForm.resetFields()
        this.$refs.tree.setCheckedKeys([], true)
      },
      handleTreeClick(tree, self, children) {
        if(self) {  // 选中
          this.roleForm.menuList.push(tree.id)
        }else {
          const index = this.roleForm.menuList.findIndex(el => {
            return el == tree.id
          })
          this.roleForm.menuList.splice(index, 1)
        }
      },
      handleSubmit() {
        this.$refs.roleForm.validate(valid => {
          if(valid) {
            this.roleForm.role = this.roleForm.role.toUpperCase()
            if(this.roleForm.id) {  // 修改
              updateRoleInfo(this.roleForm).then(res => {
                if(res && res.data.code === 200) {
                  this.dialog = false
                  this.getList(true)
                }
              })
            }else {     // 添加
              addRole(this.roleForm).then(res => {
                if(res && res.data.code === 200) {
                  this.getList(false)
                  this.$refs.roleForm.resetFields()
                  this.$refs.tree.setCheckedKeys([], true)
                }
              })
            }
          }
        })
      },
      setDefaultKey(array, menus) {
        for(let i = 0; i < array.length; i++) {
          for(let j = 0; j < menus.length; j++) {
            if(menus[j].children) {
              if(menus[j].children.length > 0) {
                this.setDefaultKey(array, menus[j].children)
              }else {
                if(menus[j].label == array[i]){
                  this.tempValue.push(menus[j].id)
                }else {
                  continue
                }
              }
            }else {
              if(menus[j].label == array[i]){
                this.tempValue.push(menus[j].id)
              }else {
                continue
              }
            }
          }
        }
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
    width: 500px;
  }
}
</style>