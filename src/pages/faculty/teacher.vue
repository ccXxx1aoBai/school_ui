<template>
  <div>
    <div class="content">
      <div class="tools">
        <el-row>
          <el-col :span="3">
            <el-input v-model="filterName" placeholder="教师姓名" clearable maxlength="20"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="filterDept" placeholder="所属学院" clearable>
              <el-option v-for="item in deptList" :key="item.name" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="primary">查询</el-button>
            <el-button type="primary">新增</el-button>
            <el-button type="primary">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="职工编号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="birth" label="生日" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
        <el-table-column prop="dept" label="所属学院" align="center"></el-table-column>
        <el-table-column prop="type" label="所属类别" align="center"></el-table-column>
        <el-table-column prop="joinUs" label="入职时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <div style="display: flex;" slot-scope="scope">
            <div style="width: 100%;">
              <el-button type="text" icon="el-icon-edit">编辑</el-button>
            </div>
            <div style="width: 100%;">
              <el-popconfirm title="是否删除此数据？">
                <el-button slot="reference" type="text" icon="el-icon-delete" style="color: #e03131">删除</el-button>
              </el-popconfirm>
            </div>
          </div>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :visible.sync="dialog" title="教师管理">
      <el-form :model="teacherForm" :rules="rules" ref="teacherForm" label-position="left" label-width="100px">
        <el-form-item v-show="false">
          <el-input v-model="teacherForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-row>
            <el-col :span="6">
              <el-input v-model="teacherForm.name" placeholder="姓名" clearable maxlength="20"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码：">
          <el-row>
            <el-col :span="6">
              <el-input v-model="teacherForm.phone" placeholder="手机号码" clearable maxlength="11"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="sex" label="性别：">
          <el-select v-model="teacherForm.sex" clearable>
            <el-option :value="1" label="男"></el-option>
            <el-option :value="0" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
          <el-date-picker v-model="teacherForm.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
          clearable placeholder="请选择"></el-date-picker>
        </el-form-item>
        <el-form-item prop="dept" label="所属学院：">
          <el-select v-model="teacherForm.dept" clearable>
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="position" label="职称：">
          <el-select v-model="teacherForm.position" clearable>
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="joinUs" label="入职时间：">
          <el-date-picker v-model="teacherForm.joinUs" format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
          clearable placeholder="请选择"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="footer" slot="footer">
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        filterName: '',
        filterDept: '',
        deptList: [],
        tableData: [{}],
        dialog: true,
        teacherForm: {

        },
        rules: {

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>