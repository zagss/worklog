<template>
    <div class="picker">
        <div class="picker-btn">
            {{pickText}}
            <input :number='true' type='tel' @focus="handleFocus" v-model.number="text" @blur="handleBlur" @change="handleChange">
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      pickText: '请选择行驶里程',
      text: ''
    }
  },
  methods: {
    handleFocus () {
      this.pickText = ''
    },
    handleBlur () {
      if (this.text === '') {
        this.pickText = '请选择行驶里程'
      }
    },
    handleChange () {
      if (this.text) {
        this.$emit('mil-val', this.text)
      }
    }
  }
}
</script>

<style lang='scss'>
    .picker {
        .picker-btn {
            position: relative;
            input {
                width: 100%;
                height: 100%;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                background: transparent;
                padding: .3rem;
                font-size: inherit;
                color: #5a698e;
            }
        }
    }
</style>
