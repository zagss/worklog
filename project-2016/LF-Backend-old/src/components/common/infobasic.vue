<template>
    <div class='info-basic'>
        <div class='top'>
            <div>
                <span class='title'>{{title}}</span>
                <slot name='status'></slot>
            </div>
            <slot name='modify'></slot>
        </div>
        <div class='body'>
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      title: String,
      modify: String
    },
    data () {
      return {
        basicInfo: {
          name: '集团名称',
          money: '注册资金',
          card: '营业执照',
          charge: '负责人姓名',
          phone: '负责人手机号',
          idc: '负责人身份证号',
          address: '集团地址',
          credit: '授信额度'
        },
        basicData: {
          name: '',
          money: '',
          card: '',
          charge: '',
          phone: '',
          idc: '',
          address: '',
          credit: ''
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang='scss' scoped>
@import '../../assets/style/mixin.scss';
    .info-basic {
        width: 100%;
        background: #fff;
        padding: 32px 16px;
        margin-bottom: 16px;
        .top {
            @include fj;
            padding: 0 0 14px 0;
            border-bottom: 1px solid #E6E6E6;
            .title {
                font-size: 18px;
                color: rgba(0,0,0,0.80);
                letter-spacing: 0;
                line-height: 24px;
            }
            .modify {
                background: #FF3B30;
                border-radius: 4px;
                font-size: 12px;
                color: #F7F8FA;
                letter-spacing: 0;
                line-height: 12px;
                padding: 6px 17px;
                cursor: pointer;
            }
        }
        .body {
            .label-item {
                @include wh(321px, 36px);
                display: inline-block;
                .el-form-item__label {
                    width: 80px;
                }
            }
        }
    }
</style>
