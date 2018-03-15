<template>
    <div class="picker">
        <div class="picker-btn" @click="handleClick">{{pickText}}</div> 
        <mt-datetime-picker
            ref="picker"
            type="date"
            v-model="pickerValue"
            :startDate="new Date('2000-01-01')"
            :endDate="new Date()"
            @confirm='handleConfirm'>
        </mt-datetime-picker>
    </div>
</template>

<script>
import { DatetimePicker } from 'mint-ui'
export default {
  components: {
    'mt-datetime-picker': DatetimePicker
  },
  data () {
    return {
      pickText: '请选择上牌时间',
      pickerValue: ''
    }
  },
  methods: {
    openPicker () {
      this.$refs.picker.open()
    },
    handleClick () {
      this.openPicker()
    },
    handleConfirm (val) {
      // console.log(val.toLocaleDateString())
      let v = val.getFullYear() + '/' + (val.getMonth() + 1) + '/' + val.getDate()
      this.pickText = v
      this.$emit('date-val', v)
    }
  }
}
</script>

<style lang='scss'>
    .picker {
        .picker-btn {
            width: 100%;
            height: 100%;
            background: #f3f6fd;
        }
        .picker-center-highlight {
            background-color: rgba(0, 0, 0, .1);
        }
    }
</style>
