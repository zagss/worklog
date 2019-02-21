<template>
  <div class="about">
    <router-link to="/">go home !</router-link>
    <h3 class="msg" @click="blink">This is an about page</h3>
    <input type="file" id="imgurl" multiple accept="image/*" class="addimg" @change='uploadImg' />
  </div>
</template>
<script>
export default {
  methods: {
    async uploadImg(e) {
      const files = e.target.files
      const uploadList = []
      //图片数量判断
      //图片类型判断
      //图片压缩上传处理
      const readFileAsync = file => new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = evt => resolve(evt.target.result)
        reader.readAsDataURL(file)
      })
      for (let i = 0; i < files.length; i++) {
        var curfile = await readFileAsync(files[i])
      }
      console.log(files, curfile)
    },
    blink() {
      window.location.replace('http://www.baidu.com')
    }
  }
}
</script>
<style lang="scss" scoped>
  .about {
    .msg {
      color: #fff;
      font-size: 30px;
      margin: 30px;
    }
    & > a {
      background-color: #fff;
      padding: 10px;
      text-transform: uppercase;
    }
  }
</style>
