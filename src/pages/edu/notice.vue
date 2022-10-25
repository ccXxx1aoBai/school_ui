<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-input placeholder="通知标题" clearable v-model="siftName"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-date-picker type="daterange" v-model="siftTime" range-separator="至" value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始时间" end-placeholder="结束时间" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button type="primary" @click="getList(true)">查询</el-button>
              <el-button type="primary" @click="dialog = !dialog">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table :data="items" border v-loading="loading" element-loading-text="加载中" height="660"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="id" label="通知编号" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" align="center"></el-table-column>
            <el-table-column prop="content" label="内容" align="center"></el-table-column>
            <el-table-column prop="subName" label="发布人" align="center"></el-table-column>
            <el-table-column prop="target" label="通知对象" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-view" style="color: #1565c0;" 
                @click="handleView(scope.row)">预览</el-button>
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)"
                style="padding: 0 15px;">编辑</el-button>
                <el-popconfirm title="是否删除此条通知？" @confirm="handleDel(scope.row)">
                  <el-button slot="reference" icon="el-icon-delete" type="text"
                  style="color: #DA281F;padding: 0 15px;">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialog" title="通知管理" fullscreen style="width: 50%;height: 90%;margin: auto;">
      <el-form :model="noticeForm" :rules="rules" ref="noticeForm" label-position="left" label-width="80px"
      style="height: 160px;">
        <el-form-item label="通知标题" prop="title">
          <el-row>
            <el-col :span="16">
              <el-input v-model="noticeForm.title" type="textarea" maxlength="64" :rows="3" placeholder="通知标题"
               clearable show-word-limit></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="role" label="通知对象">
          <el-row>
            <el-col :span="16">
               <el-input></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div>
        <Toolbar 
        :editor="editor"
        :defaultConfig="toolbarConfig"
        style="display: flex;;border-bottom: 1px solid #ccc" />
        <div class="edit-content">
          <Editor style="width: 100%; height: 100%;"
            :defaultConfig="editConfig"
            @onCreated="onCreated"
            @customPaste="customPaste" />
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Editor, 
    Toolbar,
  } from '@wangeditor/editor-for-vue'
  export default {
    components: {Editor, Toolbar},
    data() {
      return {
        siftName: '',
        siftTime: [],
        items: [{}],
        loading: false,
        dialog: true,
        noticeForm: {
          title: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入通知标题', trigger: ['change', 'blur'] }
          ]
        },
        editor: '',
        toolbarConfig: {},
        editConfig: {
          placeholder: "请输入内容",
          scroll: false
        },
      }
    },
    methods: {
      onCreated(editor) {
        this.editor = Object.seal(editor)
      },
      customPaste(editor, event, callback) {
        
      },
      getNoticeList() {

      },
      handleView(row) {
        
      },
      handleEdit(row) {

      },
      handleDel(row) {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@wangeditor/editor/dist/css/style.css';

  ::v-deep .el-form-item__content {
    line-height: 1.5;
  }

  .edit-content{
    overflow-y: auto;
    height: calc(90vh - 417px);

    &::-webkit-scrollbar {
      width: 10px;
      background-color: #f5f5f5;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba($color: #ccc, $alpha: .5);
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba($color: #ccc, $alpha: 1);
    }
  }
</style>