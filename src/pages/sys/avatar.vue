<template>
  <div>
    <el-row>
      <el-col :span="3" v-for="avatar in items" :key="avatar.id" style="margin: 20px 10px 20px 15px;">
        <el-card v-if="avatar.attachId" shadow="hover">
          <el-image :src="avatar.attachName" fit="fill" :preview-src-list="preview" @click="imagePreview(avatar)"
            style="width: 170px;height: 170px;display: block;"></el-image>
          <div style="padding: 10px 0;position: relative;">
            <span>{{avatar.attachId}}</span>
            <div style="margin-top: 5px">
              <span style="margin-right: 10px;">{{ avatar.createTime }}</span>
              <div  v-if="!avatar.id" style="line-height: 16px;">
                <el-button type="text" @click="uploadAvatar(avatar)" style="padding: 0;">上传</el-button>
                <el-button type="text" class="err" @click="remove(avatar)" style="padding: 0;">移除</el-button>
              </div>
              <el-popconfirm v-else title="是否删除此头像" @confirm="delAvatar(avatar)">
                <el-button type="text" class="err" slot="reference">删除</el-button>
              </el-popconfirm>
            </div>
          </div>
        </el-card>
        <el-card v-else shadow="hover">
          <el-upload
            class="avatar-uploader"
            action="#"
            accept=".png"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :auto-upload="true"
            :limit="10"
            multiple
            ref="upload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="padding: 10px 0;">
            <p>点击上传新头像</p>
            <p>仅支持PNG格式</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    getSysAvatar,
    uploadImage,
    delSysAvatar
  } from '@/api'
  import moment from 'moment'
  export default {
    name: 'avatar',
    data() {
      return {
        items: [],
        preview: [],
        fileList: []
      }
    },
    created() {
      this.$fullLoading.load()
      this.getAvatarList()
    },
    methods: {
      getAvatarList() {
        getSysAvatar().then(res => {
          this.$fullLoading.close()
          res.data.data.map(item => {
            return item.attachName = this.FILE_BASE_URL + item.attachName
          })
          this.items = res.data.data
          this.items.unshift({})
        }).catch(() => {
          this.$fullLoading.close()
        })
      },
      beforeUpload(file) {
        this.items.shift()
        if(file.size / 1024 > 512) {
          this.$notify.error({
            message: '图片大小不能超过512Kb',
            title: '系统提示'
          })
          return false
        }
        if(file.type != 'image/png') {
          this.$notify.error({
            message: '仅支持上传PNG格式图片',
            title: '系统提示'
          })
          return false
        }
        this.items.unshift({
          attachId: file.name,
          attachName: URL.createObjectURL(file),
          createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          file: file
        })
        this.items.unshift({})
      },
      imagePreview(avatar) {
        if(this.preview.length == 1) {
          this.$set(this.preview, 0, this.FILE_BASE_URL + avatar.attachName)
        }else {
          this.preview.push(this.FILE_BASE_URL + avatar.attachName)
        }
      },
      delAvatar(avatar) {
        delSysAvatar(avatar.id).then(res => {
          if(res.data.code === 200) {
            this.getAvatarList()
          }
        })
      },
      uploadAvatar(avatar) {
        const index = this.items.findIndex(file => {
          return !file.id && avatar.attachName == file.attachName && avatar.attachId == file.attachId
        })
        uploadImage(avatar.file, {uid: this.$store.getters.uid, type: 'avatar'}).then(res => {
          if(res.data.code === 200) {
            this.$set(this.items[index], 'id', res.data.data.id)
            this.$set(this.items[index], 'attachName', this.FILE_BASE_URL + res.data.data.downUrl)
          }
        })
      },
      remove(avatar) {
        const index = this.items.findIndex(file => {
          return !file.id && avatar.attachName == file.attachName && avatar.attachId == file.attachId
        })
        this.items.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-uploader {
    &::v-deep .el-upload {
      width: 100%;
      height: 100%;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      margin: auto;
    }

    &::v-deep .el-upload:hover {
      border-color: #409EFF;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>