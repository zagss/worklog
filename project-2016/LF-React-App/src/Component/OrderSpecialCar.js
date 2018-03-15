import React,{Component} from 'react';


import '../Style/orderSpecialCar.css'

export default class OrderSpecialCar extends Component{
  constructor(){
    super();
      this.state={
        choice1: "",
        choice2: "active",
        data: [],
        dataTotal:[],
        date_first: [],
        date_second: [],
        date_dif_day: [],
        date_dif_hour: [],
        money_day: [],
        money_hour: [],
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

          bridge.registerHandler("OrderSpecialCarPage", (data, responseCallback) =>{
            // alert(data);
                 self.setState({
                   data: JSON.parse(data),
                   dataTotal: JSON.parse(data).attributes,
                 })
                let responseData = "haoqia2";
                responseCallback(responseData);
            });
      });
    }

  choiceItem(index) {
    console.log(index)
    if(index === '1'){
      // this.setState({
      //   choice1 : 'active',
      //   choice2 : '',
      // })
      // let self = this;
      // if(self.state.date_first !== [] && self.state.date_second !== []) {
      //   let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
      //   let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
      //   let time_diffrence = Math.ceil((time_2 - time_1)/86400000);
      //   if(time_diffrence <= 0){
      //     alert('时间选择有误')
      //     return false
      //   }
      //   let time_diffff = Math.ceil((time_2 - time_1)/86400000) * parseFloat(self.state.data.attributes.day_price) * parseFloat(this.refs.car_num.value);
      //   let time_dif_hour = Math.ceil((time_2 - time_1)/3600000) * parseFloat(self.state.data.attributes.hour_price) * parseFloat(this.refs.car_num.value)
      //   self.setState({
      //     date_dif_day: time_diffff,
      //   })
      // }
      alert('暂时不能按天选择')
    }else if(index === '2') {
      this.setState({
        choice1 : '',
        choice2 : 'active',
      })
      let self = this;
      if(self.state.date_first !== [] && self.state.date_second !== []){
        let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
        let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
        let time_diffrence = Math.ceil((time_2 - time_1)/86400000);
        if(time_diffrence <= 0){
          alert('时间选择有误')
          return false
        }
        let time_diffff = Math.ceil((time_2 - time_1)/86400000) * parseFloat(self.state.data.attributes.day_price) * parseFloat(this.refs.car_num.value);
        let time_dif_hour = Math.ceil((time_2 - time_1)/3600000) * parseFloat(self.state.data.attributes.hour_price) * parseFloat(this.refs.car_num.value)
        self.setState({
          date_dif_day: time_dif_hour,
        })
      }
    }
  }
  pickTime1(){
    let self = this;
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('datePicker','', function(response) {
        self.setState({
          date_first: response
        })
        self.refs.start_time.innerHTML = self.state.date_first;
        // self.refs.start_time.innerHTML.style.color = "#000";
        if(self.state.date_first !== [] && self.state.date_second !== [] && self.state.choice1 === 'active') {
          let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
          let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
          let time_diffrence = Math.ceil((time_2 - time_1)/86400000);
          if(time_diffrence <= 0){
            alert('时间选择有误')
            return false
          }
          let time_diffff = Math.ceil((time_2 - time_1)/86400000) * parseFloat(self.state.dataTotal.day_price)*parseFloat(self.refs.car_num.value);

          let time_dif_hour = Math.ceil((time_2 - time_1)/3600000) * parseFloat(self.state.dataTotal.hour_price)*parseFloat(self.refs.car_num.value);
          self.setState({
            date_dif_day: time_diffff,
          });
        }else if(self.state.date_first !== [] && self.state.date_second !== [] && self.state.choice2 === 'active'){
          let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
          let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
          let time_diffrence = Math.ceil((time_2 - time_1)/86400000);
          if(time_diffrence <= 0){
            alert('时间选择有误')
            return false
          }
          let time_diffff = Math.ceil((time_2 - time_1)/86400000) * parseFloat(self.state.dataTotal.day_price)*parseFloat(self.refs.car_num.value) ;

          let time_dif_hour = Math.ceil((time_2 - time_1)/3600000) * parseFloat(self.state.dataTotal.hour_price) *parseFloat(self.refs.car_num.value);
          self.setState({
            date_dif_day: time_dif_hour,
          });
        }
      })
    });
  }

  pickTime2(){
    let self = this;
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('datePicker','', function(response) {
        self.setState({
          date_second: response
        })
        self.refs.end_time.innerHTML = self.state.date_second;
        // self.refs.end_time.innerHTML.style.color = "#000";
        if(self.state.date_first !== [] && self.state.date_second !== []&& self.state.choice1 === 'active') {
          let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
          let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
          let time_diffrence = Math.ceil((time_2 - time_1)/86400000);
          if(time_diffrence <= 0){
            alert('时间选择有误')
            return false
          }
          let time_diffff = Math.ceil((time_2 - time_1)/86400000) * parseFloat(self.state.dataTotal.day_price)*parseFloat(self.refs.car_num.value);

          let time_dif_hour = Math.ceil((time_2 - time_1)/3600000) * parseFloat(self.state.dataTotal.hour_price)*parseFloat(self.refs.car_num.value);
          self.setState({
            date_dif_day: time_diffff,
          });
        }else if(self.state.date_first !== [] && self.state.date_second !== [] && self.state.choice2 === 'active'){
          let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
          let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
          let time_diffrence = Math.ceil((time_2 - time_1)/86400000);
          if(time_diffrence <= 0){
            alert('时间选择有误')
            return false
          }
          let time_diffff = Math.ceil((time_2 - time_1)/86400000) * parseFloat(self.state.dataTotal.day_price)*parseFloat(self.refs.car_num.value);

          let time_dif_hour = Math.ceil((time_2 - time_1)/3600000) * parseFloat(self.state.dataTotal.hour_price)*parseFloat(self.refs.car_num.value) ;
          self.setState({
            date_dif_day: time_dif_hour,
          });
        }
      })
    });
  }

choiceNum(){
  let self = this;
  if(self.state.date_first !== [] && self.state.date_second !== []&& self.state.choice1 === 'active'&& parseFloat(this.refs.car_num.value) > 0) {
    let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
    let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
    let time_diffrence = Math.ceil((time_2 - time_1)/86400000);
    if(time_diffrence <= 0){
      alert('时间选择有误')
      return false
    }
    let time_diffff = Math.ceil((time_2 - time_1)/86400000) * parseFloat(self.state.data.attributes.day_price) * parseFloat(this.refs.car_num.value);
    let time_dif_hour = Math.ceil((time_2 - time_1)/3600000) * parseFloat(self.state.data.attributes.hour_price) * parseFloat(this.refs.car_num.value)
    self.setState({
      date_dif_day: time_diffff,
    })
  }else if(self.state.date_first !== [] && self.state.date_second !== [] && self.state.choice2 === 'active'&& parseFloat(this.refs.car_num.value) > 0){
    let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
    let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
    let time_diffrence = Math.ceil((time_2 - time_1)/86400000);
    if(time_diffrence <= 0){
      alert('时间选择有误')
      return false
    }
    let time_diffff = Math.ceil((time_2 - time_1)/86400000) * parseFloat(self.state.data.attributes.day_price) * parseFloat(this.refs.car_num.value);
    let time_dif_hour = Math.ceil((time_2 - time_1)/3600000) * parseFloat(self.state.data.attributes.hour_price) * parseFloat(this.refs.car_num.value)
    self.setState({
      date_dif_day: time_dif_hour,
    })
  }
}

payment(){
    let self = this;
  if(this.refs.username.value === '') {
    alert('用户名不能为空');
    return false;
 }
  if(this.refs.tel.value === ''){
    alert('手机号不能为空');
    return false;
  }
  if(!(/^1[34578]\d{9}$/.test(this.refs.tel.value))){
     alert("手机号码有误，请重新输入！");
     return false;
   }

  if(this.refs.car_num.value === '' ) {
    alert('用车数量不能为空');
    return false;
 }
 if(this.refs.car_num.value === '0' ) {
   alert('用车数量不能为0');
   return false;
}
if(isNaN(this.refs.car_num.value)){
  alert('用车数量必须为1~9的数字');
  return false;
}
  if(this.refs.got_area.value === '') {
    alert('上车地点不能为空');
    return false;
 }
 if(this.refs.out_area.value === '') {
   alert('下车地点不能为空');
   return false;
}
if(this.refs.start_time.innerHTML === '请选择上车时间') {
  alert('上车时间不能为空');
  return false;
}
if(this.refs.end_time.innerHTML === '请选择下车时间') {
  alert('下车时间不能为空');
  return false;
}


if(self.state.date_first !== [] && self.state.date_second !== []&& self.state.choice1 === 'active'&& parseFloat(this.refs.car_num.value) > 0) {
  let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
  let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
  let time_diffrence = Math.ceil((time_2 - time_1)/86400000);
  if(time_diffrence <= 0){
    alert('时间选择有误')
    return false
  }
  let time_diffff = Math.ceil((time_2 - time_1)/86400000) * parseFloat(self.state.data.attributes.day_price)*parseFloat(this.refs.car_num.value);
  let time_dif_hour = Math.ceil((time_2 - time_1)/3600000) * parseFloat(self.state.data.attributes.hour_price)*parseFloat(this.refs.car_num.value)
  self.setState({
    date_dif_day: time_diffff,
  })
}else if(self.state.date_first !== [] && self.state.date_second !== [] && self.state.choice2 === 'active'&& parseFloat(this.refs.car_num.value) > 0){
  let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
  let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
  let time_diffrence = Math.ceil((time_2 - time_1)/86400000);
  if(time_diffrence <= 0){
    alert('时间选择有误')
    return false
  }
  let time_diffff = Math.ceil((time_2 - time_1)/86400000) * parseFloat(self.state.data.attributes.day_price)*parseFloat(this.refs.car_num.value);
  let time_dif_hour = Math.ceil((time_2 - time_1)/3600000) * parseFloat(self.state.data.attributes.hour_price)*parseFloat(this.refs.car_num.value)
  self.setState({
    date_dif_day: time_dif_hour,
  })
}

const dataTotal = {
  'username': this.refs.username.value,
  'tel': this.refs.tel.value,
  'car_num': this.refs.car_num.value,
  'got_area': this.refs.got_area.value,
  'out_area': this.refs.out_area.value,
  'start_time': this.refs.start_time.innerHTML,
  'end_time': this.refs.end_time.innerHTML,
  'char_type': this.state.choice1=='active'? '天' : '时',
  'id_car': this.state.data.id,
  'deposit':this.state.dataTotal.deposit,
  "price":this.state.date_dif_day + parseFloat(this.state.dataTotal.deposit)
}

if(this.state.date_dif_day <= 0) {
  alert('时间选择错误');
  return false;
}

this.connectWebViewJavascriptBridge(bridge =>{
  bridge.callHandler('payment',{'action':'payment','data': {
      'data': dataTotal
  }}, function(response) {
    alert('成功相应了', response)
  })
});
}

  render(){
    let choice1Class = this.state.choice1 == 'active'  ? 'choice_light' : '';
    let choice2Class = this.state.choice2 == 'active'  ? 'choice_light' : ''
    let timeStyle ={
      fontSize: '1.5rem',
      color: '#999',
      paddingLeft: '1rem',
      lineHeight: "4rem",
      display:"inline-block"
    }
    return(
      <div className="occ">
      <div className="speCarOrder">
        <p><span>姓名</span><input ref="username" type="text" placeholder="请输入姓名" /></p>
        <p><span>联系方式</span><input ref="tel" type="tel" placeholder="请输入手机号" maxLength="11" /></p>
        <p><span>用车数量</span><input onChange={this.choiceNum.bind(this)} ref="car_num" type="tel" placeholder="请选择" maxLength='1'/></p>
        <p className="input_area"><input ref="got_area" type="text" style={{color: '#000'}} placeholder="请输入上车地点"/><span style={timeStyle} ref="start_time" onTouchStart={this.pickTime1.bind(this)}>请选择上车时间</span></p>
        <p className="input_area"><input ref="out_area" type="text" style={{color: '#000'}} placeholder="请输入下车地点"/><span style={timeStyle} ref="end_time" onTouchStart={this.pickTime2.bind(this)}>请选择下车时间</span></p>
        <p>
          <span>请选择预约方式<small></small></span>
          <h3><span className={choice1Class} onTouchStart={this.choiceItem.bind(this,'1')}>按天</span><span className={choice2Class}  onTouchStart={this.choiceItem.bind(this,'2')}>按小时</span></h3>
        </p>

        </div>
        <Order payment={this.payment.bind(this)} date_dif_day={this.state.date_dif_day} dataTotal={this.state.dataTotal}/>
        <Bottom payment={this.payment.bind(this)} dataTotal={this.state.dataTotal}  date_dif_day={this.state.date_dif_day}/>
      </div>
    );
  }
}



class Order extends Component{
  render(){
    let cost = this.props.checked?'是':'否';
    let cost2 = this.props.checked2?'是':'否';
    let moneyTotal =this.props.date_dif_day + parseFloat(this.props.dataTotal.deposit)
    return(
      <div className="pick-order">
        <p>车辆租赁费用<span>￥{this.props.date_dif_day}</span></p>
        <p>车辆押金 <span>￥{this.props.dataTotal.deposit}</span></p>
        <p>合计<span>￥{moneyTotal}</span></p>
      </div>
    );
  }
}

class Bottom extends Component{
  render(){
    let moneyTotal = this.props.date_dif_day + parseFloat(this.props.dataTotal.deposit)
    return(
      <div className="pay-quick">
        <p>预估价：<span>￥{moneyTotal}</span></p>
        <p onTouchStart={this.props.payment}><span>立即支付</span></p>
      </div>
    );
  }
}
