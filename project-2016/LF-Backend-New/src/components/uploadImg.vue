<template>
    <div class="padding-img">
        <el-upload
            ref='upload'
            :action="host"
            :headers='headers'
            list-type="picture-card"
            multiple
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogImgVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { baseUrl } from '@/config/env'
import { mapMutations } from 'vuex'
export default {
  props: ['name', 'fileList'],
  data () {
    return {
      host: `${baseUrl}/files`,
      headers: { 'X-Access-Token': localStorage.getItem('access_token') },
      dialogImgVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    ...mapMutations(['UPLOAD_IMGS']),
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/GIF/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove (file, fileList) {
      console.log(fileList)
      this.upload(fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImgVisible = true
      this.dialogImageUrl = file.url
      console.log(file)
    },
    handleSuccess (res, file, fileList) {
      if (res.code === 0) {
        this.upload(fileList)
      } else {
        this.$message({ type: 'error', message: res.message })
      }
    },
    upload (fileList) {
      let obj = {}
      let arr = []
      let name = this.name.slice(0, -1) + '_ids'
      fileList.forEach(item => {
        if (item.response) {
          arr.push(item.response.data.id)
        }
      })
      obj[name] = arr.toString()
      console.log(obj)
      this.UPLOAD_IMGS(obj) // 将图片列表存入store
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
