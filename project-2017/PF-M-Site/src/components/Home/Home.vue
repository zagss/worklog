<template>
    <div class="content">
        <my-scroll ref="scroll" :data="apps" class="home-content">
            <div>
                <!-- 轮播图 -->
                <div v-if="sliders.length" class="slide-wrapper" ref='picBox'>
                    <my-slider>
                        <div v-for="slider in sliders">
                            <a :href="slider.url || hrefvoid">
                                <img @load="loadImg" :src="picUrl + slider.pic">
                            </a>
                        </div>
                    </my-slider>
                </div>
                <div>
                    <ul class="home-business" v-if="lists.length">
                        <li v-for="item in lists" v-if="item.mlink">
                            <a :href="item.mlink || hrefvoid">
                                <img :src="'static/img/' + item.code + '.png'" alt="">
                                <span>{{item.title}}</span>
                            </a>
                        </li>
                    </ul>
                    <div class="home-item" v-for="item in apps">
                        <h3>{{item.sname}}</h3>
                        <h2>{{item.slogon || item.ename}}</h2>
                        <p>{{item.descion}}</p>
                        <img class="icon" :src="picUrl + item.pic" alt="" v-if="item.icon">
                        <ul class="home-app">
                            <li v-for="a in item.app"  v-if="a.mlink">
                                <a :href="a.mlink || hrefvoid">
                                    <img :src="'static/img/' + a.code + '.png'" alt="" v-if="a.code">
                                    <span>{{a.title}}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </my-scroll>
    </div>
</template>

<script>
import MySlider from '@/components/base/MySlider'
import MyScroll from '@/components/base/MyScroll'
import { picUrl } from '@/config/env'
import { myDOM } from '@/common/js/utils'
import { getSliderList, getCategoryList, getApplicationList } from '@/api/fetch'

export default {
  components: {
    MySlider,
    MyScroll
  },
  data () {
    return {
      picUrl: picUrl,
      sliders: [],
      lists: [],
      apps: [],
      hrefvoid: 'javascript:;'
    }
  },
  methods: {
    async getSliderList () {
        // 获取轮播图
        let sliders = await getSliderList()
        this.sliders = sliders.data.data
    },
    async getApplicationList () {
        // 获取常用分类
        let commonRes = await getApplicationList(-1)
        this.lists = commonRes.data.data
    },
    async getCategoryList () {
        let sysList = await getCategoryList()
        // 获取所有分类
        let appList = await getApplicationList()
        if (sysList.data.status === 0 && appList.data.status === 0) {
            this.mergeData(sysList.data.data, appList.data.data)
        }
    },
    mergeData (sysList, appList) {
        // 数据处理
        let data = []
        for (let i = 0; i < sysList.length; i++) {
            data[i] = sysList[i]
            data[i].app = []
            for (let j = 0; j < appList.length; j++) {
                if (data[i].id === appList[j].cid && appList[j].mlink) {
                    data[i].app.push(appList[j])
                }
            }
        }
        data.forEach(item => {
            let len = item.app.length
            let needAddNum = len % 3
            if (needAddNum === 1) {
                item.app.push({mlink:'javascript:;'},{mlink:'javascript:;'})
            } else if (needAddNum === 2) {
                item.app.push({mlink:'javascript:;'})
            }
        })
        this.apps = data
    },
    loadImg (e) {
    //   let img = e.path[0]
    //   let defaultHeight = this.$refs.picBox.clientHeight
    //   let defaultWidth = this.$refs.picBox.clientWidth
    //   // 计算 img 默认宽高比
    //   let defaultRatio = defaultWidth / defaultHeight
    //   // 计算 img 实际宽高比
    //   let naturalRatio = img.naturalWidth / img.naturalHeight
    //   if (defaultRatio > naturalRatio) {
    //       img.style.width = '100%'
    //       img.style.marginTop = (defaultHeight - (img.naturalHeight * defaultWidth / img.naturalWidth)) / 2 + 'px'
    //   } else {
    //       img.style.height = '100%'
    //       img.style.marginLeft = (defaultWidth - (img.naturalWidth * defaultHeight / img.naturalHeight)) / 2 + 'px'
    //   }
    }
  },
  created () {
    let pid = myDOM.getQueryStr('pid')
    if (!pid) {
      this.$router.push({ name: '404' })
      return
    }
    this.getApplicationList()
    this.getCategoryList()
    this.getSliderList()
  }
}

</script>

<style lang="scss" scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.content {
    position: fixed;
    width: 100%;
    bottom: 0;
    top: 0;
}
.home-content {
    height: 100%;
    overflow: hidden;
    background-color: $color-background;
    .slide-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .home-business {
        background-color: #fff;
        padding: 10px 0;
        li {
            width: 25%;
            float: left;
            height: 20vw;
            a {
                height: 100%;
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                justify-content: center;
                text-decoration: none;
                color: $color-text;
            }
            span {
                font-size: $font-size-medium-x;
                @include no-wrap;
                margin-top: 10px;
                padding: 0 10px;
            }
            img {
                margin: 0 auto;
                width: 50%;
            }
        }
        &::after {
            content: '';
            display: block;
            clear: both;
        }
    }
    .home-item {
        padding-top: 14px;
        margin-top: 10px;
        background-color: #fff;
        line-height: 1;
        h3 {
            font-size: $font-size-large;
            @include no-wrap;
        }
        h2 {
            font-size: $font-size-large-x;
            margin-top: 20px;
            @include no-wrap;
        }
        p {
            font-size: $font-size-medium;
            color: $color-text-info;
            margin: 10px;
            @include no-wrap;
        }
        .icon {
            height: 32.6vw;
            // display: block;
            margin: 6px auto 14px;
        }
        .home-app {
            background-color: #fff;
            &::after {
                content: '';
                display: block;
                clear: both;
            }
            li {
                width: 33.33%;
                float: left;
                border-top: 1px solid $color-border;
                border-right: 1px solid $color-border;
                height: 25.8vw;
                a {
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: nowrap;
                    text-decoration: none;
                    justify-content: center;
                    color: $color-text;
                }
                img {
                    display: block;
                    margin: 0 auto;
                    width: 50%;
                }
                span {
                    font-size: $font-size-medium-x;
                    margin-top: 14px;
                    @include no-wrap;
                }
            }
        }
    }
}
</style>
