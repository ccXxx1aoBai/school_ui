<template>
  <div>
    <div class="content">
      <div class="tools">
        <el-row>
          <el-col :span="3">
            <el-input v-model="equipName" clearable placeholder="设备名称" maxlength="30"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="equipType" clearable multiple @change="handleEquipTypeChange">
              <el-option v-for="option in equipTypeList" :key="option" :value="option"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-button type="primary">查询</el-button>
            <el-button type="primary">新增设备</el-button>
            <el-button type="primary">新增设备类型</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData" border>
        <el-table-column label="设备编号" prop="id" align="center"></el-table-column>
        <el-table-column label="设备名称" prop="name" align="center"></el-table-column>
        <el-table-column label="设备类型" prop="type" align="center"></el-table-column>
        <el-table-column label="设备位置" prop="position" align="center"></el-table-column>
        <el-table-column label="设备状态" prop="status" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="设备负责人" prop="head" align="center"></el-table-column>
        <el-table-column label="负责人电话" prop="headPhone" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div style="display: flex;">
              <div style="width: 100%;">
                <el-popconfirm title="是否需要报修">
                  <el-button slot="reference" type="text" icon="el-icon-phone-outline">报修</el-button>
                </el-popconfirm>
              </div>
              <div style="width: 100%;">
                <el-button type="text" style="color: #f08c00;" icon="el-icon-edit">编辑</el-button>
              </div>
               <div style="width: 100%;">
                <el-popconfirm title="是否删除此设备？">
                  <el-button slot="reference" type="text" style="color: #e03131;" icon="el-icon-delete">删除</el-button>
                </el-popconfirm>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      :total="total"
      :page-size.sync="size"
      :current-page="current"
      :page-sizes="[10, 20, 50, 100, 200, 500]"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"></el-pagination>
    </div>

    <el-dialog title="设备管理" :visible.sync="dialog" @open="dialogBeforeOpen">
      <el-form :model="equipForm" :rules="equipRules" ref="equipForm" label-width="100px" label-position="left">
        <el-form-item v-show="false">
          <el-input v-model="equipForm.id"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-row>
            <el-col :span="6">
              <el-input v-model="equipForm.name" placeholder="设备名称" clearable maxlength="30"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-row>
            <el-col :span="6">
              <el-select v-model="equipForm.type" clearable>
                <el-option v-for="type in equipTypeList" :key="type" :value="type"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="设备状态" prop="status">
          <el-switch v-model="equipForm.status" active-text="可用" inactive-text="弃用" 
          :inactive-value="0" :active-value="1"></el-switch>
        </el-form-item>
        <el-form-item label="设备负责人" prop="head">
          <el-row>
            <el-col :span="6">
              <el-input v-model="equipForm.head" placeholder="设备负责人" clearable maxlength="10" @focus="tableDialog = !tableDialog"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="负责人电话" prop="headPhone">
          <el-row>
            <el-col :span="6">
              <el-input v-model="equipForm.headPhone" placeholder="负责人电话" clearable maxlength="11"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="设备位置" prop="position">
          <el-row>
            <el-col :span="16">
              <el-input v-model="equipForm.position" type="textarea" maxlength="200" clearable show-word-limit :rows="3"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div class="footer" slot="footer">
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="tableDialog" title="选择负责人" width="800px" @open="tDialogBeforeOpen">
      <div>
        <el-input placeholder="负责人姓名" v-model="headName"></el-input>
        <el-table :data="headTable" border>
          <el-table-column type="selector" width="60"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
        </el-table>
        <el-pagination
        style="position: relative;top: 10px;right: 0;"
        :total="tTotal"
        :current-page="tCurrent"
        :page-size.sync="tSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleTCurrentChange"></el-pagination>
      </div>
      <div class="footer" slot="footer">
        <el-button type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getEquipType} from '@/api/equip'
  import {getEmployeeList} from '@/api/employee'
  export default {
    data() {
      const phoneValid = ((rules, val, callback) => {
        if((val??'') !== '') {
          if(/^1[3456789][0-9]{9}/.test(val)) {
            callback()
          }else {
            callback(new Error('手机号码格式错误'))
          }
        }else {
          callback(new Error('请输入手机号码'))
        }
      })
      return {
        equipName: '',
        equipType: '',
        tableData: [{}],
        equipTypeList: [],
        total: 0,
        size: 10,
        current: 1,
        dialog: true,
        equipForm: {
          id: '',
          name: '',
          type: '',
          position: '',
          status: 1,
          head: '',
          headPhone: ''
        },
        equipRules: {
          name: [
            { required: true, message: '请输入设备名称', trigger: ['blur', 'change'] }
          ],
          type: [
            { required: true, message: '请选择设备类型', trigger: ['blur', 'change'] }
          ],
          position: [
            { required: true, message: '请输入设备位置', trigger: ['blur', 'change'] }
          ],
          head: [
            { required: true, message: '请输入设备负责人', trigger: ['blur', 'change'] }
          ],
          headPhone: [
            { required: true, validator: phoneValid, trigger: ['blur', 'change'] }
          ]
        },
        tableDialog: false,
        headName: '',
        headTable: [],
        tTotal: 0,
        tCurrent: 1,
        tSize: 10,
      }
    },
    created() {
      getEquipType().then(res => {
        this.equipTypeList = res.data.data
      })
    },
    methods: {
      handleEquipTypeChange(option) {
        console.log(option);
      },
      dialogBeforeOpen() {
        
      },
      handleCurrentChange(page) {
        console.log(page);
      },
      tDialogBeforeOpen() {
        if(this.headTable.length == 0) {
          // 1 维修人员
          getEmployeeList({current: this.tCurrent, size: this.tSize, name: this.headName, type: 1}).then(res => {

          })
        }
      },
      handleTCurrentChange(page) {

      },
    }
  }
</script>

<style lang="scss" scoped>

</style>