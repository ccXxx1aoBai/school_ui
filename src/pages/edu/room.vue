<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-input v-model="siftName" placeholder="教室名称" clearable maxlength="20"></el-input>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-button type="primary" @click="getRoomList(true)">查询</el-button>
              <el-button type="primary" @click="dialog = true">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column label="教室编号" prop="id" align="center"></el-table-column>
            <el-table-column label="教室位置" prop="name" align="center">
              <template slot-scope="scope">
                {{scope.row.position + scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column label="座位数" prop="volume" align="center"></el-table-column>
            <el-table-column label="开放状态" prop="stateName" align="center"></el-table-column>
            <el-table-column label="教室描述" prop="description" align="center"></el-table-column>
            <el-table-column label="负责人" prop="ename" align="center"></el-table-column>
            <el-table-column label="负责人手号码" prop="ephone" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-popconfirm title="是否删除此条数据？" @confirm="handleDel(scope.row)">
                      <el-button class="err" type="text" icon="el-icon-delete" slot="reference">删除</el-button>
                    </el-popconfirm>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog title="教室管理" :visible.sync="dialog" @opened="afterOpen" @close="beforeClose">
      <el-form :model="roomForm" :rules="roomRules" ref="roomForm" label-position="right" label-width="100px"
      style="width: 300px;">
        <el-form-item v-show="false">
          <el-input v-model="roomForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="position" label="教室位置">
          <el-cascader v-model="roomForm.position" :options="options" :props="{ expandTrigger: 'hover' }" 
            placeholder="教室位置" @change="handleChange" clearable></el-cascader>
        </el-form-item>
        <el-form-item prop="name" label="门牌">
          <el-input v-model="roomForm.name" placeholder="门牌" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="volume" label="座位数">
          <el-input v-model="roomForm.volume" placeholder="座位数" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="author" label="负责人">
          <el-select v-model="roomForm.author" placeholder="负责人" clearable value-key="id">
            <el-option :value="item.id" :label="item.name" v-for="item in empList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="description" label="描述">
          <el-input type="textarea" placeholder="描述" v-model="roomForm.description" maxlength="200" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import mixin from '@/mixin'
  import room from '@/common/room'
  import {
    getRoom,
    addRoom,
    updateRoom,
    delRoom
  } from '@/api/room'
  import {
    getEmpByType
  } from '@/api/employee'
  export default {
    name: '',
    data() {
      return {
        roomForm: {
          id: '',
          position: '',
          name: '',
          description: '',
          volume: '',
          author: {id: '', name: ''}
        },
        roomRules: {
          position: [
            { required: true, message: '请选择', trigger: ['change', 'blur'] }
          ],
          name: [
            { required: true, message: '请输入', trigger: ['change', 'blur'] }
          ],
          author: [
            { required: true, message: '请选择', trigger: ['change', 'blur'] }
          ]
        },
        options: room,
        empList: []
      }
    },
    mixins: [mixin],
    created() {
      this.getRoomList(true)
    },
    methods: {
      getRoomList(load) {
        this.loading = load
        const params = {
          current: this.current,
          size: this.size,
          siftName: this.siftName
        }
        getRoom(params).then(res => {
          const {list, total} = res.data.data
          this.tableData = list
          this.total = total
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      handleChange(data) {
        
      },
      handleSubmit() {
        this.$fullLoading.load()
        this.$refs.roomForm.validate(valid => {
          if(valid) {
            this.roomForm.position = this.roomForm.position[0] + this.roomForm.position[1]
            console.log(this.roomForm);
            if(this.roomForm.id) {
              this.roomForm.author = this.roomForm.eid
              updateRoom(this.roomForm).then(res => {
                if(res.data.code === 200) {
                  this.getRoomList(false)
                  this.dialog = false
                }
                this.$fullLoading.close()
              }).catch(() => {
                this.$fullLoading.close()
              })
            }else {
              addRoom(this.roomForm).then(res => {
                if(res.data.code === 200) {
                  this.getRoomList(false)
                  this.$refs.roomForm.resetFields()
                }
                this.$fullLoading.close()
              }).catch(() => {
                this.$fullLoading.close()
              })
            }
          }
        })
      },
      afterOpen() {
        getEmpByType().then(res => {
          this.empList = res.data.data
        })
      },
      handleEdit(row) {
        this.$nextTick(() => {
          Object.keys(row).forEach(key => {
            if(key == 'position') {
              this.$set(this.roomForm, 'position', [])
            }else if(key == 'author') {
              // this.$set(this.roomForm, 'author', {})
              this.$set(this.roomForm.author, 'id', row[key])
              this.$set(this.roomForm.author, 'name', row['ename'])
            }else {
              this.$set(this.roomForm, key, row[key])
            }
          })
          this.roomForm.position.push(row.position.substring(0, 1))
          this.roomForm.position.push(row.position.substring(1, 2))
          this.$set(this.roomForm, 'author', row.ename)
          this.dialog = true
        })
      },
      beforeClose() {
        this.$refs.roomForm.resetFields()
      },
      handleDel(row) {
        delRoom(row.id).then(res => {
          if(res.data.code === 200) {
            this.getRoomList(true)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>