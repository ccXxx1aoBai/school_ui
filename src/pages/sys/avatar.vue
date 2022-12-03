<template>
  <div>
    <el-row>
      <el-col :span="3" v-for="avatar in items" :key="avatar.id" style="margin: 20px 10px 20px 15px;">
        <el-card v-if="avatar.id" shadow="hover">
          <el-image :src="avatar.attachName" shape="square" :size="64" :preview-src-list="preview" @click="imagePreview(avatar)"></el-image>
          <div style="padding: 10px 0;">
            <span>{{avatar.attachId}}</span>
            <div style="margin-top: 5px;">
              <span style="margin-right: 10px;">{{ avatar.createTime }}</span>
              <el-popconfirm title="是否删除此头像" @confirm="delAvatar(avatar)">
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
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="avatarChange"
            :auto-upload="false"
            :limit="10"
            multiple>
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
    getSysAvatar
  } from '@/api'
  export default {
    name: 'avatar',
    data() {
      return {
        items: [],
        preview: [],
        imageUrl: ''
      }
    },
    created() {
      getSysAvatar().then(res => {
        this.items = res.data.data
        this.items.unshift({})
      })
    },
    methods: {
      beforeAvatarUpload(file) {
        console.log(file);
      },
      avatarChange(file, fileList) {
        console.log(file, fileList);
      },
      handleAvatarSuccess(res, file, fileList) {
        console.log(res, file, fileList);
      },
      imagePreview(avatar) {
        if(this.preview.length == 1) {
          this.$set(this.preview, 0, avatar.attachName)
        }else {
          this.preview.push(avatar.attachName)
        }
      },
      delAvatar(avatar) {
        console.log(avatar);
      },
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