<template>
    <div class='search'>
        <slot></slot>
    </div>
</template>

<script>
  export default {
    props: [''],
    data () {
      return {
        formData: {
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang='scss' scoped>
@import '../../assets/style/mixin.scss';
    @mixin inputcolor {  
        font-size: 14px;
        color: rgba(0,0,0,0.38);
        letter-spacing: 0;
        line-height: 14px;
    }
    .search {
        width: 85%;
        input[type='text'] {
            box-sizing: border-box;
            @include wh(180px, 36px);
            background: #FFFFFF;
            border: 1px solid #C6CBD0;
            border-radius: 100px;
            padding: 10px;
            @include inputcolor;
            margin: 5px 0;
        }
        ::-webkit-input-placeholder{@include inputcolor}
        ::-moz-placeholder{@include inputcolor}
        :-moz-placeholder{@include inputcolor}
        input[type='button'] {
            @include wh(76px, 36px);
            font-size: 14px;
            color: #FF3B30;
            letter-spacing: 0;
            line-height: 14px;
            background: #FFFFFF;
            border: 1px solid #FF3B30;
            border-radius: 4px;
            cursor: pointer;
        }
        input:not(:last-child){
            margin-right: 10px;
        }
        input:focus {
            border-color: #FF3B30;
        }
    }
</style>
