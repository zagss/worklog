import '../style/style.scss';
import config from '../config.json';
import './swiper.min.css';
import Swiper from './swiper.min.js';

const render = require('./index.art');
// const data = {
//     title: 'My Page'
// };
const html = render(config);
// console.log(html);
// console.log(config)

if (typeof document === 'object') {
    document.body.innerHTML = html;
}
(function(){ 
    function resizeBaseFontSize(){ 
      var rootHtml = document.getElementById('indexBody'),
          deviceWidth = rootHtml.clientWidth; 
      rootHtml.style.fontSize = deviceWidth / 25.6 + "px";
   }  
   resizeBaseFontSize();  
   window.addEventListener("resize", resizeBaseFontSize, false);  
   window.addEventListener("orientationchange", resizeBaseFontSize, false);  
})();
var swiper = new Swiper('.swiper-container', {
    effect : 'fade',
    fadeEffect: {
        crossFade: false,
    },
    autoplay: {
        delay: 6000
    },
    on: {
        slideChangeTransitionStart() {
            // console.log(this.activeIndex)
            changeTitleClass(this.activeIndex)
        }
    }
});

function changeTitleClass (index) {
    let titleclass = '';
    switch (index % 2) {
        case 0:
            titleclass = "title-style-01";
            break;
        case 1:
            titleclass = "title-style-02";
            break;
    }
    // console.log(titleclass)
    let pfTitle = document.getElementById('pfTitle');
    pfTitle.className = `title ${titleclass}`
}


// 监听滚动事件

window.onload = () => {
    window.scrollTo(10, 10);
    domOnScroll();
    sectionFragment();
    new Slider('J_dash')
}

function pageScroll () {
    window.scrollBy(0, -10);
    scrollTop
}
// 计算节点到文档顶部的距离
// function getTop (ele) {
//     let h = 0;
//     while(ele) {
//         h += ele.offsetTop;
//         ele = ele.offsetParent;
//     }
//     console.log(h)
//     return h
// }

function domOnScroll () {
    let sections = document.getElementById('indexBody').getElementsByTagName('section');
    document.addEventListener('scroll', () => {
        let t = document.documentElement.clientHeight + (document.body.scrollTop || document.documentElement.scrollTop);
        // console.log(t)
        for(let i = 0; i < sections.length; i++) {
            // console.log(sections[i].offsetTop)
            if (sections[i].offsetTop < t) {
                if (!/is-visible/.test(sections[i].className)) {
                    if (!/preload/.test(sections[i].className)) {
                        sections[i].className += " preload is-visible"
                    } else {
                        sections[i].className += " is-visible"
                    }
                    if (i < sections.length - 1 && !/preload/.test(sections[i+1].className)) {
                        sections[i+1].className += " preload"
                    }
                }
            }
        }
    })
}


// section-fragment
function sectionFragment () {
    var fragmentDom = document.getElementsByClassName('desc')[0].getElementsByTagName('li');
    var pic4k = document.getElementsByClassName('pic4k-block')[0];
    var pichdr = document.getElementsByClassName('pichdr-block')[0];
    for (let i = 0; i < fragmentDom.length; i++) {
        fragmentDom[i].addEventListener('mouseenter', function() {
            for (let j = 0; j < fragmentDom.length; j++) {
                removeClass(fragmentDom[j], 'active')
            }
            addClass(this, 'active')
            judgeCur(this, pic4k, pichdr)
        })
    }
}

function addClass (obj, cls) {
    var obj_class = obj.className,
        blank = (obj_class != '') ? ' ' : '',
        added = obj_class + blank + cls;
    obj.className = added
}

function removeClass (obj, cls) {
    var obj_class = ' ' + obj.className + ' ',
        obj_class = obj_class.replace(/(\s+)/gi, ' '),
        removed = obj_class.replace(' ' + cls + ' ', ' '),
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    obj.className = removed;
}

function hasClass (obj, cls) {
    var obj_class = obj.className,
        obj_class_list = obj_class.split(/\s+/),
        i = 0;
    for (i in obj_class_list) {
        if (obj_class_list[i] == cls) {
            return true
        }
    }
    return false
}

// 判断hover元素修改class
function judgeCur (ele, pic4k, pichdr) {
    if (hasClass(ele, 'four_k') && !hasClass(pic4k, 'cur')) {
        removeClass(pichdr, 'cur')
        addClass(pic4k, 'cur')
    } else if (hasClass(ele, 'HDR') && !hasClass(pichdr, 'cur')) {
        removeClass(pic4k, 'cur')
        addClass(pichdr, 'cur')
    }
}

//滑块拖拽

class Slider {
    constructor(btn) {
        this.btn = document.getElementsByClassName(btn)[0];
        this.line = document.getElementsByClassName('line')[0];
        this.item1 = document.getElementsByClassName('J_item011')[0];
        this.item2 = document.getElementsByClassName('J_item021')[0];
        this.item3 = document.getElementsByClassName('J_item011')[1];
        this.item4 = document.getElementsByClassName('J_item021')[1];
        this.pic2k = document.getElementsByClassName('J_2k1')[0];
        this.pic4k = document.getElementsByClassName('J_2k1')[1];
        this.init()
    }
    init () {
        let _this = this;
        _this.btn.onmousedown = (e) => {
            let x = (e || window.event).clientX;
            let l = _this.line.offsetLeft;
            // 清除class -- anitimate
            removeClass(this.pic2k, 'animate');
            removeClass(this.pic4k, 'animate');
            removeClass(this.line, 'animate');
            document.onmousemove = (e) => {
                let thisX = (e || window.event).clientX;
                let to = l - (x - thisX)
                _this.line.style.left = to + 'px'
                _this.pic2k.style.width = to + 'px'
                _this.pic4k.style.width = to + 'px'
                _this.item1.style.left = to - 130 + 'px'
                _this.item2.style.left = to + 30 + 'px'
                _this.item3.style.left = to - 130 + 'px'
                _this.item4.style.left = to + 30 + 'px'
            }
            document.onmouseup = function () {
                this.onmousemove = null
            }
        }
    }
}
