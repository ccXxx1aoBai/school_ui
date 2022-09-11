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
              <el-button type="primary">查询</el-button>
              <el-button type="primary">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table row-key="id" :tree-props="{hasChildren: 'hasChildren', children: 'children'}" :data="tableData"
          border v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" 
          element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="id" label="编号" align="center"></el-table-column>
            <el-table-column prop="label" label="别名" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="path" label="URL" align="center"></el-table-column>
            <el-table-column prop="component" label="组件" align="center"></el-table-column>
            <el-table-column prop="icon" label="图标" align="center">
              <template slot-scope="scope">
                <i :class="scope.row.icon"></i>
              </template>
            </el-table-column>
            <el-table-column prop="lock" label="是否锁定" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.lock ? 'info' : 'primary'">{{scope.row.lock ? '是' : '否'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="dialog = !dialog">编辑</el-button>
                <el-popconfirm title="是否删除此菜单？">
                  <el-button type="text" style="color: #DA281F;padding: 0 15px;" 
                  slot="reference" icon="el-icon-delete">删除</el-button>
                </el-popconfirm>
                <el-popconfirm title="是否锁定此菜单？">
                  <el-button type="text" style="color: #E18A3B" slot="reference" 
                  :icon="scope.row.lock ? 'el-icon-unlock' : 'el-icon-lock'">
                    {{scope.row.lock ? '解锁' : '锁定'}}
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
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" />
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialog" title="菜单管理" @opened="dialogOpened">
      <el-row>
        <el-col :span="7">
          <el-form label-position="left" label-width="80px">
            <el-form-item prop="label" label="菜单名称">
              <el-input placeholder="菜单名称" clearable></el-input>
            </el-form-item>
            <el-form-item prop="icon" label="菜单图标">
              <el-popover trigger="click" placement="bottom-start" v-model="popShow">
                <el-input slot="reference" v-model="menu.icon" placeholder="点击选择图标" readonly clearable>
                  <i slot="prefix" :class="prefix"></i>
                </el-input>
                <div class="icon-list">
                  <div v-for="(icon, index) in icons" :key="index" style="width: 100%;display: flex;flex-wrap: wrap;">
                    <div v-for="i in icon" :key="i.label" style="width: 20%;margin: auto;padding: 5px 0 0;" 
                    @click="handleSelectIcon(i), popShow = !popShow">
                      <i :class="i.icon"></i>
                      <span style="padding: 0 5px">{{i.label}}</span>
                    </div>
                  </div>
                </div>
              </el-popover>
            </el-form-item>
            <el-form-item prop="parent" label="上级菜单">
              <el-cascader :options="options" :props="{ checkStrictly: true }" clearable />
            </el-form-item>
            <el-form-item prop="path" label="路由路径">
              <el-input placeholder="路由路径"></el-input>
            </el-form-item>
            <el-form-item prop="compontent" label="组件路径">
              <el-row>
                <el-col :span="22">
                  <el-input placeholder="组件路径"></el-input>
                </el-col>
                <el-col :span="1" :offset="1">
                  <el-tooltip content="组件路径，例：菜单管理，在pages目录下页面路径为@/pages/sys/menu，则此处填pages/sys/menu">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="role" label="菜单权限">
              <el-select v-model="role" clearable multiple>
                <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.role"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="sort" label="排序编号">
              <el-input-number :min="0" v-model="menu.sort" controls-position="right"></el-input-number>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import {getMenuList} from '@/api/menu'
  import {getRoleList} from '@/api/role'
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
        size: 20,
        options: [],
        dialog: false,
        menu: {
          icon: '',
          sort: 0
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
      getRoleList().then(res => {
        const {data} = res.data
        this.roleList = data
      })
    }, 
    methods: {
      getList(load) {
        this.loading = load
        getMenuList().then(res => {
          console.log(res);
          const {total, list} = res.data.data
          this.total = total
          this.tableData = list
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      },
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
      handleSizeChange(size) {
        this.size = size
      },
      dialogOpened() {
        this.setOptions(this.tableData)
      },
      handleSelectIcon(icon) {
        console.log(icon);
        this.menu.icon = icon.label
        this.prefix = icon.icon
      }
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
  width: 550px;
  flex-direction: row;
  flex-wrap: wrap;
  user-select: none;
  cursor: pointer;
  font-size: 14px;
  height: 200px;
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