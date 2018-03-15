import React,{Component} from 'react'
import $ from 'jquery'
import { reachBottom,url2 } from './Common/api'

import "../Style/helicopterBook.css";

const dataSelect =[
  {'take_off': '请选择起飞点',"land":"请选择降落点"},
  {'take_off': '奥体森林公园起降点',"land":"奥体森林公园起降点"},
  {'take_off': '司马台长城',"land":"司马台长城"},
  {'take_off': '慕田峪长城',"land":"慕田峪长城"},
  {'take_off': '科源起降点',"land":"科源起降点"},
  {'take_off': '华彬庄园起降点',"land":"华彬庄园起降点"},
  {'take_off': '四元桥起降点',"land":"四元桥起降点"},
  {'take_off': '华彬大厦起降点',"land":"华彬大厦起降点"},
  {'take_off': '沃德兰起降点',"land":"沃德兰起降点"},
  {'take_off': '丰台房车营地起降点',"land":"丰台房车营地起降点"},
  {'take_off': '亦庄起降点',"land":"亦庄起降点"},
  {'take_off': '密云机场',"land":"密云机场"},
  {'take_off': '国贸起降点',"land":"国贸起降点"},
  {'take_off': '酷车小镇起降点',"land":"酷车小镇起降点"},
  {'take_off': '八达岭起降点',"land":"八达岭起降点"},
  {'take_off': '雁栖湖起降点',"land":"雁栖湖起降点"},
  {'take_off': '黄港FBO',"land":"黄港FBO"},
  {'take_off': '首都机场',"land":"首都机场"},
]
export default class HelicopterBook extends Component{
  constructor(){
    super();
    this.state={
      data: [],
      dataTotal: [],
      time: [],
      moneyTotal: []
    }
  }

  connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , () => {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
}

componentDidMount(){
  const self = this;
  this.connectWebViewJavascriptBridge(bridge =>{
         bridge.init((message, responseCallback) =>{
         let data = {
             'Javascript Responds': '游艇详情页面!'
         };
         responseCallback(data);
     });

      bridge.registerHandler("SpellHelicopterBookPage", (data, responseCallback) =>{
             self.setState({
               dataTotal: JSON.parse(data).attributes,
               data:JSON.parse(data)
             })
            let responseData = "this is helicopterBook page's data";
            responseCallback(responseData);
        });
  });
}

timePick(){
  let self = this;
  this.connectWebViewJavascriptBridge(bridge =>{
    bridge.callHandler('datePicker','', function(response) {
      $('input').blur()
      self.setState({
        time: response
      })
    })
  });
    $('input').blur()
}


bookQuick(){
  const data_total = {
    'username': this.refs.username.value,
    'user_tel': this.refs.tel.value,
    'user_num': this.refs.man_num.value,
    'fly_time': this.refs.fly_time.innerHTML,
    'start_place': this.refs.start_place.value,
    'end_place': this.refs.end_place.value,
    'remarks': this.refs.remarks.innerHTML,
    'total_price': this.state.dataTotal.fly_price * parseFloat(this.refs.man_num.value),
    'id_fly': this.state.data.id,
    'order_type': this.state.dataTotal.fly_type,
    'hour': "1"
  }
  console.log(data_total);
  if(!this.refs.username.value){
    alert('请输入姓名');
    return false
  }
  if(!this.refs.tel.value){
    alert('请输入联系方式');
    return false
  }
  if(!(/^1[34578]\d{9}$/.test(this.refs.tel.value))){
     alert("手机号码有误，请重新输入！");
     return false;
   }
  if(!this.refs.man_num.value){
    alert('请选择人数');
    return false
  }
  if(!this.refs.fly_time.innerHTML){
    alert('请选择光时间');
    return false
  }
  if(this.refs.start_place.value === '请选择起飞点'){
    alert('请选择起飞地点');
    return false
  }
  if(this.refs.end_place.value === '请选择降落点'){
    alert('请选择降落地点');
    return false
  }


  this.connectWebViewJavascriptBridge(bridge =>{
  bridge.callHandler('payment',{'action':'payment','data': {
      'data': data_total
  }}, function(response) {
    alert('成功相应了', response)
  })
  });

}


upperCase(){
  this.setState({
    moneyTotal: this.state.dataTotal.fly_price * parseFloat(this.refs.man_num.value)
  })
}
  render(){

    let styleObj = {
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      paddingLeft: '1.5rem'
    }

  let imgUrl = url2()+ this.state.dataTotal.img;
  const selectItem1 = [];
  dataSelect.map((res,index) =>{
    return selectItem1.push(<option key={index}>{res.take_off}</option>)
  })
  const selectItem2 = [];
  dataSelect.map((res,index) =>{
    return selectItem2.push(<option key={index}>{res.land}</option>)
  })
    return(
      <div style={{background: '#f3f4f5',position: 'relative'}}>
        <div className="hb-pic">
        <img src={imgUrl} />
          <div className="hb-blur">
            <small>{this.state.dataTotal.fly_intro}</small>
            <small>￥{this.state.dataTotal.fly_price}/人</small>
          </div>
        </div>
        <div  className="hb-form" style={{height: '39rem',overFlow: 'hidden'}}>
          <form>
            <h3>姓名 <input ref="username" type="text" /> </h3>
            <h3>联系方式 <input ref="tel" type="tel" maxLength='11' /> </h3>
            <h3>观光人数 <input ref="man_num" className='man_num' type="tel"  onInput={this.upperCase.bind(this)} maxLength='2'/> </h3>
            <h3>观光时间 <span  onTouchStart={this.timePick.bind(this)} ref="fly_time" style={{display: 'inline-block',width: '70%',height: '18px',verticalAlign: 'middle',textAlign: 'right',float: 'right'}}>{this.state.time}</span> </h3>
            <h3>
              <small>
              <select ref="start_place" type="text" style={{fontSize:'1.6rem',fontWeight:"normal",color:'#999'}}>
              {selectItem1}
              </select>
              </small>
              <small>
              <select ref="end_place" type="text" style={{fontSize:'1.6rem',fontWeight:"normal",color:'#999'}}>
              {selectItem2}
              </select>
              </small>
            </h3>
            <h3>备注 <input ref="remarks" type="text" placeholder="选填 >"/></h3>
          </form>
          <div className="bookOrder">
            <h3><span style={styleObj}>请提前5天下单</span></h3>
          </div>
          <div>
            <p style={{textAlign: 'center',lineHeight:'3rem',color: '#9b9b9b'}}>说明：提交订单后，客服人员将在第一时间联系您，请保持电话畅通。</p>
          </div>
        </div>

        <div className="pay-quick"  style={{paddingLeft: '1.5rem',paddingRight: '1.5rem',position: 'fixed',bottom: '0'}}>
          <p>合计：<span style={{display:'inline-block',width: '2rem',overFlow: 'hidden'}}>￥{this.state.moneyTotal}</span></p>
          <p onTouchStart={this.bookQuick.bind(this)}><span>立即支付</span></p>
        </div>
      </div>
    );
  }
}
