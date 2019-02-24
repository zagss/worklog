<template>
  <div class="hello">
    <p class="msg">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: #FFF;
  border-radius: 100%;
  font-size: 60px;
  line-height: 200px;
  text-transform: uppercase;
}
</style>
