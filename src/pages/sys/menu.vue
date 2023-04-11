<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-input placeholder="菜单名称" clearable v-model="siftName"></el-input>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button type="primary" @click="getList(true)">查询</el-button>
              <el-button type="primary" @click="dialog = !dialog">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table row-key="id" :tree-props="{hasChildren: 'hasChildren', children: 'children'}" :data="tableData"
          border v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" 
          element-loading-background="rgba(0, 0, 0, 0.8)" height="660">
            <el-table-column prop="id" label="编号" align="center"></el-table-column>
            <el-table-column prop="label" label="别名" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="path" label="URL" align="center"></el-table-column>
            <el-table-column prop="component" label="组件" align="center"></el-table-column>
            <el-table-column prop="icon" label="图标" align="center">
              <template slot-scope="scope">
                <i :class="`el-icon-${scope.row.icon}`"></i>
              </template>
            </el-table-column>
            <el-table-column prop="lock" label="是否锁定" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.disabled ? 'info' : 'primary'">{{scope.row.disabled ? '是' : '否'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                <el-popconfirm title="是否删除此菜单？" @confirm="handleDel(scope.row)">
                  <el-button type="text" style="color: #DA281F;padding: 0 15px;" 
                  slot="reference" icon="el-icon-delete">删除</el-button>
                </el-popconfirm>
                <el-popconfirm title="是否锁定此菜单？" @confirm="handleLock(scope.row)">
                  <el-button type="text" style="color: #E18A3B" slot="reference" 
                  :icon="scope.row.disabled ? 'el-icon-unlock' : 'el-icon-lock'">
                    {{scope.row.disabled ? '解锁' : '锁定'}}
                  </el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
          :total="total"
          :current-page.sync="page"
          :page-size="size"
          :page-sizes="[20, 30, 50, 100, 200]"
          layout="total"
          @size-change="handleSizeChange" />
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialog" title="菜单管理" @open="dialogBeforeOpen" 
    @close="dialogBeforeClose">
      <el-row>
        <el-col :span="7">
          <el-form :model="menuForm" ref="menuForm" :rules="menuRules" label-position="left" label-width="80px">
            <el-form-item prop="label" label="菜单名称">
              <el-input maxlength="20" v-model="menuForm.label" placeholder="菜单名称" clearable></el-input>
            </el-form-item>
            <el-form-item prop="icon" label="菜单图标">
              <el-popover trigger="click" placement="bottom-start" v-model="popShow">
                <el-input slot="reference" v-model="menuForm.icon" placeholder="点击选择图标" readonly clearable>
                  <i slot="prefix" :class="`el-icon-${menuForm.icon}`"></i>
                </el-input>
                <div class="icon-list">
                  <div v-for="(icon, index) in icons" :key="index" style="width: 100%;display: flex;flex-wrap: wrap;">
                    <div v-for="i in icon" :key="i.label" style="width: 25%;margin: auto;padding: 8px 0 0;" 
                    @click="handleSelectIcon(i), popShow = !popShow">
                      <i :class="i.icon"></i>
                      <span style="padding: 0 5px">{{i.label}}</span>
                    </div>
                  </div>
                </div>
              </el-popover>
            </el-form-item>
            <el-form-item prop="parent" label="上级菜单">
              <el-cascader :options="options" v-model="menuForm.parent" :props="{ checkStrictly: true }" 
              @change="handleCasChange" clearable />
            </el-form-item>
            <el-form-item prop="name" label="路由名称">
              <el-input maxlength="30" v-model="menuForm.name" placeholder="路由名称" clearable></el-input>
            </el-form-item>
            <el-form-item prop="path" label="路由路径">
              <el-input placeholder="路由路径" v-model="menuForm.path" clearable maxlength="30"></el-input>
            </el-form-item>
            <el-form-item prop="component" label="组件路径">
              <el-row>
                <el-col :span="22">
                  <el-input maxlength="40" v-model="menuForm.component" placeholder="组件路径" clearable></el-input>
                </el-col>
                <el-col :span="1" :offset="1">
                  <el-tooltip content="组件路径，例：菜单管理，在pages目录下页面路径为@/pages/sys/menu，则此处填pages/sys/menu">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="roles" label="菜单权限">
              <el-select v-model="menuForm.roles" clearable multiple>
                <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.role"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="sort" label="排序编号">
              <el-input-number :min="0" v-model="menuForm.sort" controls-position="right"></el-input-number>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="footer" slot="footer">
        <el-button @click="handleSubmit" type="primary">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getMenuList,
    updateMenu,
    addMenu,
    delMenu,
    lockMenu
  } from '@/api/menu'
  import {
    getRoleOption
  } from '@/api/role'
  import icons from '@/utils/icons'
  export default {
    name: '',
    data() {
      return {
        siftName: '',
        loading: false,
        tableData: [],
        total: 0,
        page: 1,
        size: 100,
        options: [],
        dialog: false,
        menuForm: {
          label: '',
          icon: '',
          parent: '',
          path: '',
          component: '',
          roles: [],
          sort: ''
        },
        menuRules: {
          label: [
            { required: true, message: '请输入菜单名称', trigger: ['change', 'blur'] }
          ],
          name: [
            { required: true, message: '请输入路由名称', trigger: ['change', 'blur'] }
          ],
        },
        popShow: false,
        prefix: 'el-icon-search',
        roleList: [],
        role: '',
        selectIcon: false
      }
    },
    computed: {
      icons() {
        return icons
      }
    },
    watch: {
      size(val) {
        this.getList(true)
      }
    },
    created() {
      this.getList(true)
      getRoleOption().then(res => {
        console.log(res);
        const {data} = res.data
        this.roleList = data
      })
    }, 
    methods: {
      getList(load) {
        this.loading = load
        getMenuList({}).then(res => {
          console.log(res.data);
          this.tableData = res.data.data
          this.total = res.data.data.length
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      },
      handleSizeChange(size) {
        this.size = size
      },
      handleEdit(row) {
        this.dialog = true
        this.$nextTick(() => {
          Object.keys(row).forEach(key => {
            this.$set(this.menuForm, key, row[key])
          })
          const {roles} = row
          this.menuForm.roles = []
          if(roles.indexOf(',') !== -1) {
            this.menuForm.roles = roles.split(',')
          }else {
            this.menuForm.roles.push(roles)
          }
        })
      },
      handleDel(row) {
        delMenu(row.id).then(res => {
          if(res && res.data.code === 200) {
            this.getList(true)
          }
        })
      },
      handleLock(row) {
        lockMenu(row.id).then(res => {
          if(res && res.data.code === 200) {
            this.getList(true)
          }
        })
      },
      dialogBeforeOpen() {
        this.$nextTick(() => {
          this.setOptions(this.tableData)
        })
      },
      dialogBeforeClose() {
        this.$refs.menuForm.resetFields()
      },
      handleSelectIcon(icon) {
        this.menuForm.icon = icon.label
        this.prefix = icon.icon
      },
      handleCasChange(node) {
        this.menuForm.parent = node ? node[0] : ''
      },
      handleSubmit() {
        this.$refs.menuForm.validate(valid => {
          if(valid) {
            if(this.menuForm.id) {  // 修改
              updateMenu(this.menuForm).then(res => {
                if(res && res.data.code === 200) {
                  this.getList(false)
                  this.dialog = false
                }
              })
            }else { // 添加
              addMenu(this.menuForm).then(res => {
                if(res && res.data.code === 200) {
                  this.getList(false)
                  this.$refs.menuForm.resetFields()
                }
              })
            }
          }
        })
      },
      // 身份下拉菜单
      setOptions(data) {
        for(let i = 0; i < data.length; i++) {
          if(data[i].children.length > 0) {
            this.options.splice(i, 0, {value: data[i].id, label: data[i].label, children: []})
            for(let j = 0; j < data[i].children.length; j++) {
              this.options[i].children.splice(j, 0, {value: data[i].children[j].id, label: data[i].children[j].label})
            }
          }else {
            this.options.splice(i, 0, {value: data[i].id, label: data[i].label})
          }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
.content{
  width: 90%;
  margin: auto;

  .tools{
    margin-bottom: 30px;
  }
}
.icon-list{
  display: flex;
  width: 700px;
  flex-direction: row;
  flex-wrap: wrap;
  user-select: none;
  cursor: pointer;
  font-size: 14px;
  height: 350px;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 8px;
    height: 0;
    background-color: #eeeeee;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #dddddd;
    border-radius: 10px;
    &:hover{
      background-color: #c5c5c5;
    }
  }
}
::v-deep .is-scrolling-none{
  &::-webkit-scrollbar{
    width: 10px;
    height: 4px;
    margin-right: 5px;
    background-color: #eeeeee;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #dddddd;
    border-radius: 10px;
    &:hover{
      background-color: #c5c5c5;
    }
  }
}
</style>