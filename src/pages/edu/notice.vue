<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-input placeholder="通知标题" clearable v-model="siftName"></el-input>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-date-picker type="daterange" v-model="siftTime" range-separator="至" value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始时间" end-placeholder="结束时间" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button type="primary" @click="getNoticeList(true)">查询</el-button>
              <el-button type="primary" @click="dialog = !dialog">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table :data="items" border v-loading="loading" element-loading-text="加载中" height="660"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column prop="id" label="通知编号" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" align="center"></el-table-column>
            <el-table-column prop="content" label="内容" align="center" width="300" show-overflow-tooltip></el-table-column>
            <el-table-column prop="subName" label="发布人" align="center"></el-table-column>
            <el-table-column prop="target" label="通知对象" align="center"></el-table-column>
            <el-table-column prop="createTime" label="发布时间" align="center"></el-table-column>
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
          <el-pagination
          :total="total"
          :current-page.sync="current"
          :page-size.sync="size"
          :page-sizes="[10, 20, 50, 100, 300, 500]"
          layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialog" title="通知管理" fullscreen style="width: 50%;height: 90%;margin: auto;"
    @close="beforeClose">
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
        <el-form-item prop="target" label="通知对象">
          <el-row>
            <el-col :span="16">
              <el-select v-model="noticeForm.target" clearable multiple style="width: 100%;">
                <el-option v-for="role in roleList" :key="role.name" :value="role.role" :label="role.name"></el-option>
              </el-select>
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
            v-model="noticeForm.content"
            @onCreated="onCreated" />
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Editor, 
    Toolbar,
  } from '@wangeditor/editor-for-vue'
  import {
    getRoleOption
  } from '@/api/role'
  import {
    uploadImage
  } from '@/api'
  import {
    addNotice,
    getNotice
  } from '@/api/notice'
  export default {
    components: {Editor, Toolbar},
    data() {
      return {
        siftName: '',
        siftTime: ['', ''],
        items: [],
        loading: false,
        total: 0,
        current: 1,
        size: 10,
        dialog: false,
        roleList: [],
        noticeForm: {
          title: '',
          target: [],
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入通知标题', trigger: ['change', 'blur'] }
          ],
          target: [
            { required: true, message: '请选择通知对象', trigger: ['change', 'blur'] }
          ]
        },
        editor: '',
        toolbarConfig: {
          toolbarKeys: []
        },
        editConfig: {
          placeholder: "请输入内容",
          scroll: false
        },
        imageList1: [],
      }
    },
    computed: {
      pagination() {
        const {current, size} = this
        return {current, size}
      }
    },
    watch: {
      pagination() {
        this.getNoticeList(true)
      }
    },
    created() {
      getRoleOption().then(res => {
        this.roleList = res.data.data
      })
      this.getNoticeList(true)
    },
    methods: {
      onCreated(editor) {
        this.editor = Object.seal(editor)
        const config = editor.getConfig()
        config.MENU_CONF['uploadImage'] = {
          server: '/file/upload/image',
          fieldName: localStorage.getItem('uid'),
          maxFileSize: 500 * 1024,   // 500Kb
          maxNumberOfFiles: 30,
          allowedFileTypes: ['image/png'],  // 只接受PNG格式图片
          customUpload: (file, fn) => {
            const params = {
              uid: localStorage.getItem('uid'),
              type: 'notice'
            }
            uploadImage(file, params).then(res => {
              const {ossUrl, downUrl, attachId} = res.data.data
              fn(downUrl, attachId, downUrl)
            })
          }
        }
        config.MENU_CONF['insertImage'] = {
          onInsertedImage: (img) => {
            this.imageList1.push(img.src)
          }
        }
        editor.getAllMenuKeys().forEach((tool, i) => {
          if(tool.indexOf('fullScreen') == -1 && !tool.match(/^header[0-9]/)
            && tool.indexOf('codeSelectLang') == -1 && tool.indexOf('Video') == -1
            && tool.indexOf('imageWidth') == -1 && tool.indexOf('emotion') == -1
            && tool.indexOf('todo') == -1 && tool.indexOf('codeBlock') == -1) {
            this.toolbarConfig.toolbarKeys.push(tool)
          }
        })
      },
      getNoticeList(load) {
        this.loading = load
        const params = {}
        params.current = this.current
        params.size = this.size
        params.title = this.siftName
        params.start = this.siftTime[0]
        params.end = this.siftTime[1]
        getNotice(params).then(res => {
          const {list, total} = res.data.data
          this.total = total
          this.items = list
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      handleSubmit() {
        this.$refs.noticeForm.validate(valid => {
          if(valid) {
            const imageList2 = []
            const diffImage = []
            this.editor.getElemsByType('image').forEach(item => {
              imageList2.push(item.src)
            })
            this.imageList1.forEach((img, i) => {
              const s = imageList2.indexOf(img)
              if(s == -1) {
                diffImage.push(img)
              }
            })
            const params = this.noticeForm
            params.subId = localStorage.getItem('uid')
            params.subName = localStorage.getItem('name')
            params.target = JSON.stringify(this.noticeForm.target)
            addNotice(params).then(res => {
              if(res.data.code === 200) {
                this.$refs.noticeForm.resetFields()
                this.editor.setHtml("")
              }
            })
          }
        })
      },
      handleView(row) {
        
      },
      handleEdit(row) {
        this.$nextTick(() => {
          Object.keys(row).forEach(key => {
            this.$set(this.noticeForm, key, row[key])
          })
        })
      },
      handleDel(row) {
        
      },
      beforeClose() {
        this.$refs.noticeForm.resetFields()
      }
    },
    beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy()
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
    height: calc(90vh - 477px);

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