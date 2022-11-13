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
              <el-button type="primary">查询</el-button>
              <el-button type="primary" @click="dialog = true">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table :data="tableData" border v-loading="loading" element-loading-text="加载中" height="660"
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column label="教室编号" prop="id" align="center"></el-table-column>
            <el-table-column label="教室位置" prop="name" align="center"></el-table-column>
            <el-table-column label="开放状态" prop="status" align="center"></el-table-column>
            <el-table-column label="使用情况" prop="isUse" align="center"></el-table-column>
            <el-table-column label="座位数" prop="volume" align="center"></el-table-column>
            <el-table-column label="负责人" prop="author" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="6">
                    <el-button type="text" icon="el-icon-edit">编辑</el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-button class="warn" type="text" :icon="scope.status ? 'el-icon-unlock' : 'el-icon-lock'">{{scope.status ? '关闭' : '开放'}}</el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-button style="color: #2979ff;" type="text" icon="el-icon-key">锁定</el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-popconfirm title="是否删除此条数据？">
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

    <el-dialog title="教室管理" :visible.sync="dialog">
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
          <el-select v-model="roomForm.author" placeholder="负责人" clearable>
            <el-option value="1" label="张三"></el-option>
            <el-option value="2" label="李四"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import mixin from '@/mixin';
  export default {
    name: '',
    data() {
      return {
        roomForm: {
          id: '',
          position: '',
          name: '',
        },
        roomRules: {

        },
        options: [
          {
            value: 'S',
            label: '北楼',
            children: [
              {
                value: 'A',
                label: 'A座',
              },
              {
                value: 'B',
                label: 'B座',
              },
              {
                value: 'C',
                label: 'C座',
              }
            ]
          }
        ]
      }
    },
    mixins: [mixin],
    methods: {
      handleChange() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>