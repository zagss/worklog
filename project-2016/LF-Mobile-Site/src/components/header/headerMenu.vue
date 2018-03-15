<template>
    <div>
        <div class="header-wrapper" @touchmove.prevent>
            <header :class="classObj">
                <div class="headerbar">
                    <a @click="handleBackClick"></a>
                    <div class="brand" @click="handleHumClick">
                        <span class="hamburger"></span>
                    </div>
                </div>
                <div class="menu">
                    <div class="menu-list">
                        <ul>
                            <li @click="handleRouteClick('intro')"><a class='menu-item'>业务介绍</a></li>
                            <li @click="handleRouteClick('company')"><a class='menu-item'>公司介绍</a></li>
                            <li @click="handleRouteClick('contact')"><a class='menu-item'>联系我们</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
        <div :class="{mask: true, active: classObj.active}" @click="handleMaskClick" @touchmove.prevent></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      classObj: {
        header: true,
        active: false
      }
    }
  },
  methods: {
    handleHumClick () {
      this.classObj.active = !this.classObj.active
    },
    handleMaskClick () {
      this.classObj.active = !this.classObj.active
    },
    handleRouteClick (val) {
      this.$router.push(`/${val}`)
      this.classObj.active = false
    },
    handleBackClick () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang='scss' scoped>
    .header-wrapper {
        background: #fff;
        .header {
            height: 1rem;
            position: relative;
            z-index: 998;
            .headerbar {
                background: #fff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                a {
                    width: 2.8rem;
                    height: 1rem;
                    font-weight: 600;
                    font-size: .44rem;
                    color: #fff;
                    line-height: 1rem;
                    text-align: center;
                    background: url('../../assets/imgs/logo@3x.png') no-repeat center;
                    background-size: 2.3rem;
                }
                .brand {
                    width: 1rem;
                    height: 1rem;
                    position: relative;
                    .hamburger {
                        width: 23px;
                        height: 3px;
                        background: #ff3b3a;
                        position: absolute;
                        top: .45rem;
                        left: .25rem;
                        transition: .2s ease-in-out;
                        border-radius: .3rem;
                        &::after, &::before {
                            content: "";
                            width: 100%;
                            height: 100%;
                            display: block;
                            position: absolute;
                            background: #ff3b3a;
                            transition: .2s ease-in-out;
                            border-radius: .3rem;
                        }
                        &::before {
                           top: -8px;
                           transform-origin: 100%;
                        }
                        &::after {
                           top: 8px;
                           transform-origin: 100%;
                        }
                    }
                }
            }
            .menu {
                position: absolute;
                width: 100%;
                top: .99rem;
                z-index: 998;
                overflow: hidden;
                .menu-list {
                    position: absolute;
                    width: 100%;
                    max-height: 0;
                    background: #fff;
                    overflow: hidden;
                    transform: translate3d(0, -100%, 0);
                    transition: max-height .5s cubic-bezier(.3, .03, .08, .65);
                    ul {
                        margin-bottom: .48rem;
                        .menu-item {
                            display: block;
                            width: 85%;
                            margin: 0 auto;
                            height: 1rem;
                            font-size: .32rem;
                            line-height: 1rem;
                            color: #666;
                            transition: transform .4s ease-in,opacity .4s ease-in;
                            transform: translate3d(0,-20%,0);
                            opacity: 0;
                        }
                        li {
                            &:not(:last-child) a {
                                border-bottom: 1px solid #eaeaea;
                            }
                        }
                    }
                }
            }
            &.active { // 点击后状态
                .headerbar {
                    background: #fff;
                    a {
                        color: #ff3b3a;
                    }
                    .brand {
                        .hamburger {
                            background: transparent;
                            &::before {
                                transform: rotate(-44deg);
                                background: #ff3b3a;
                            }
                            &::after {
                                transform: rotate(44deg);
                                background: #ff3b3a;
                            }
                        }
                    }
                }
                .menu {
                    overflow: visible;
                    .menu-list {
                        transform: translate3d(0, 0, 0);
                        max-height: 10rem;
                        .menu-item {
                            transform: translate3d(0, 0, 0);
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
        z-index: 997;
        display: none;
        &.active {
            display: block;
        }
    }
</style>
