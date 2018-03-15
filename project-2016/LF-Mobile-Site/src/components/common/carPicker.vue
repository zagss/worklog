<template>
    <div class="picker">
        <div class="picker-btn" @click="handleClick">{{pickText}}</div>
        <div :class="classObj">
            <div class="dialog-overlay" @click="handleMask" @touchmove.prevent></div>
            <div class="dialog-body fade-to-top">
                <div class="dialog-header">
                    选择品牌车型
                    <span @click="handleMask"></span>
                </div>
                <div class="dialog-content">
                    <div class="checked" :style="checkStyle">{{checked}}
                        <span v-for="item in checkVal" :key='item'>{{item}}</span>
                    </div>
                    <div class="check-list">
                        <ul>
                            <li v-for="item in list" :key="item" @click="handleLiClick(item)">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getCar, getCar2, getCar3} from '@/api/getData'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      pickText: '请选择品牌车型',
      checked: '请选择',
      checkVal: [],
      list: [],
      classObj: {
        'dialog-popup': true,
        active: false
      },
      checkStyle: {
        color: 'black'
      }
    }
  },
  methods: {
    async fetch () {
      let res = await getCar()
    //   console.log(res)
      if (res.data.code === 0) {
        Indicator.close()
        this.list = res.data.data
      }
    },
    async fetch2 (id) {
      let res = await getCar2(id)
    //   console.log(res)
      if (res.data.code === 0) {
        Indicator.close()
        this.list = res.data.data
      }
    },
    async fetch3 (id) {
      let res = await getCar3(id)
    //   console.log(res)
      if (res.data.code === 0) {
        Indicator.close()
        this.list = res.data.data
      }
    },
    handleClick () {
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
      this.classObj.active = !this.classObj.active
      this.chageAppClass()
      this.fetch()
    },
    handleMask () {
      this.classObj.active = !this.classObj.active
      this.chageAppClass()
    },
    chageAppClass () {
      if (this.classObj.active) {
        document.getElementById('app').className = 'lock'
      } else {
        document.getElementById('app').className = ''
      }
      this.checked = '请选择'
      this.checkVal = []
    },
    async handleLiClick (val) {
      this.checked = ''
      this.checkVal.push(val.name)
      if (this.checkVal.length === 1) {
        Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
        this.fetch2(val.name)
      } else if (this.checkVal.length === 2) {
        Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
        this.fetch3(val.name)
      } else if (this.checkVal.length === 3) {
        this.pickText = this.checkVal[0] + '/' + this.checkVal[2]
        this.$emit('car-val', val.auto_id)
        // console.log(val)
        this.classObj.active = false
        this.chageAppClass()
      }
    }
  },
  created () {
    Indicator.close()
  }
}
</script>

<style lang='scss'>
    .picker {
        .picker-btn {
            width: 100%;
            height: 100%;
            background: #f3f6fd;
            font-size: .26rem;
            text-align: left;
            padding: 0 .3rem;
            color: #5a698e;
            display: flex;
            align-items: center;
        }
        .dialog-popup {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            width: 100%;
            height: 100%;
            opacity: 0;
            display: none;
            .dialog-overlay {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .5)
            }
            .dialog-body {
                position: fixed;
                left: 0;
                bottom: -100%;
                width: 100%;
                transition: bottom .1s ease-out;
                background-color: #fff;
                .dialog-header {
                    position: relative;
                    font-size: .32rem;
                    color: #999;
                    text-align: center;
                    line-height: 2.8;
                    border-bottom: 1px solid #e5e5e5;
                    &::before, &::after {
                        content: '';
                        width: .32rem;
                        height: 2px;
                        display: inline-block;
                        background-color: #aaa;
                        position: absolute;
                        right: .2rem;
                    }
                    &::after {
                        top: .45rem;
                        transform: rotate(45deg);
                    }
                    &::before {
                        top: .45rem;
                        transform: rotate(-45deg)
                    }
                    span {
                        display: inline-block;
                        width: .4rem;
                        height: .4rem;
                        position: absolute;
                        right: .15rem;
                        top: .25rem;
                    }
                }
                .dialog-content {
                    text-align: left;
                    line-height: .8rem;
                    .check-list {
                        height: 5rem;
                        overflow-y: auto;
                        font-size: .26rem;
                        li {
                            display: block;
                            height: .8rem;
                            line-height: .8rem;
                            padding: 0 .2rem;
                            border-bottom: 1px solid #e5e5e5;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow:ellipsis;
                        }
                    }
                    .checked {
                        padding: 0 .2rem;
                        font-size: .3rem;
                        span {
                            margin-right: .2rem;
                            &:last-child {
                                color: red;
                            }
                        }
                    }
                }
            }
            &.active {
                opacity: 1;
                display: block;
                .dialog-body {
                    bottom: 0;
                }
            }
        }
    }
    .mint-indicator-wrapper {
        top: 75%;
    }
</style>
