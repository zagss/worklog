import React,{Component} from 'react';
import $ from 'jquery'
import Switch from 'rc-switch';

import "../Style/switch.css";
import "../Style/orderCar.css";




export default class OrderCar extends Component{
  constructor(){
    super();
    this.state={
      data:[],
      data_total: [],
      date_first: [],
      date_first1: [],
      date_first2: [],
      date_second: [],
      date_second1: [],
      date_second2: [],
      date_dif: '',
      checked: false,
      checked2:　false,
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
  onChange1(value){
    if(value){
      this.setState({
        checked: true
      });
    }else {
      this.setState({
        checked: false
      });
    }
  }
  onChange(value){
    if(value){
      this.setState({
        checked2: true
      });
    }else {
      this.setState({
        checked2: false
      });
    }
  }

  timePicke(){
    let self = this;
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('datePicker','', function(response) {
        self.setState({
          date_first: response,
          date_first1: response.slice(0,10).replace(/-/g,"/"),
          date_first2: response.slice(11),
        })
        if(self.state.date_first !== [] && self.state.date_second !== []) {
          let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
          let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
          let time_diffff = Math.ceil((time_2 - time_1)/86400000)
          self.setState({
            date_dif: time_diffff
          })
        }

      })
    });
  }

  timePicke2(){
    let self = this;
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('datePicker','', function(response) {
        self.setState({
          date_second: response,
          date_second1: response.slice(0,10).replace(/-/g,"/"),
          date_second2: response.slice(11),
        })
        if(self.state.date_first !== [] && self.state.date_second !== []) {
          let time_1 = new Date(self.state.date_first.replace(/-/g,'/')).getTime();
          let time_2 = new Date(self.state.date_second.replace(/-/g,'/')).getTime();
          let time_diffff = Math.ceil((time_2 - time_1)/86400000)
          self.setState({
            date_dif: time_diffff
          })
        }
      })
    });
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

     bridge.registerHandler("OrderCarPage", (data, responseCallback) =>{
            self.setState({
              data: JSON.parse(data).attributes,
              data_total: JSON.parse(data),
            })
           let responseData = "haoqia2";
           responseCallback(responseData);
       });
  });
}

// componentDidUpdate(){
//   if(this.state.date_first !== [] && this.state.date_second !== []) {
//     let time_1 = new Date(this.state.date_first.replace(/-/g,'/')).getTime();
//     let time_2 = new Date(this.state.date_second.replace(/-/g,'/')).getTime();
//     let time_diffff = Math.ceil((time_2 - time_1)/86400000)
//     this.setState({
//       date_dif: time_diffff
//     })
//   }
// }

payment(){
  const dataTotal = {
    'start_time': this.refs.start_time1.innerHTML+' '+this.refs.start_time2.innerHTML,
    'end_time': this.refs.end_time1.innerHTML+' '+this.refs.end_time2.innerHTML,
    'long_time': this.state.date_dif + '天',
    'gave_price': this.state.checked == false ? '0' : this.state.data.gave_price,
    'get_price': this.state.checked2 == false ? '0' : this.state.data.get_price,
    'before_pay': this.state.data.before_pay,
    'rental_price': this.state.date_dif * parseFloat(this.state.data.day_price),
    'deposit': this.state.data.deposit,
    'start_area' : this.state.checked? this.refs.start_areas.value :this.refs.start_area.value,
    'end_area' : this.state.checked2? this.refs.end_areas.value :this.refs.end_area.value,
    "id": this.state.data_total.id
  }
  // alert(dataTotal);
  if(this.state.checked && !this.refs.start_areas.value){
    alert('请输入取车地址');
    return false
  }
  if(this.state.checked2 && !this.refs.end_areas.value){
    alert('请输入还车地址');
    return false
  }
  // alert(dataTotal.start_area);
  if(!this.refs.start_time1.innerHTML){
    alert('请选择取车时间');
    return false
  }
  if(!this.refs.end_time1.innerHTML){
    alert('请选择还车时间');
    return false
  }
  if(this.state.date_dif<=0){
    alert('时间选择有误');
    return false
  }
  if(this.refs.city1.value != this.refs.city2.value) {
    alert('取车和还车城市应填写一致');
    return false
  }
// console.log(this.refs.start_area.value);
  this.connectWebViewJavascriptBridge(bridge =>{
  bridge.callHandler('payment',{'action':'payment','data': {
      'data': dataTotal
  }}, function(response) {
    alert('成功相应了', response)
  })
  });
}


  render(){
    console.log(this.state.checked);
    console.log(this.state);
    let style={
      fontWeight:　"normal",
      paddingLeft:　'1rem',
      borderLeft: '1px solid #ddd'
    }
    let sendCar =[];
    let sendCarArea = [];
    let sendCarArea2 = [];
    this.state.checked == true ?
      sendCar.push(<option>北京</option>,<option>上海</option>) && sendCarArea.push(<input type="text" ref="start_areas" style={style} placeholder="请输入送车上门地址" />) :
      sendCar.push(<option>北京</option>) && sendCarArea.push(<select ref='start_area'><option>朝阳区洛克时代中心</option></select>)
    this.state.checked2 == true ?
      sendCarArea2.push(<input type="text" ref="end_areas" style={style} placeholder="请输入上门取车地址" />) :
      sendCarArea2.push(<select ref='end_area'><option>朝阳区洛克时代中心</option></select>)


    return(
      <div className="order-quick">
        <div className="pick-up"><b></b><p>取车</p>
          <div className="switch">
          <small>送车上门<a>￥{this.state.data.gave_price}</a></small>
          <Switch onChange={this.onChange1.bind(this)}/>
          </div>
        </div>
        <div className="address">
          <div>
            <select ref="city1">
              {sendCar}
            </select>
          </div>
          <div>
            {sendCarArea}
          </div>
        </div>
        <div className="pick-up"><b className="rc"></b><p>还车</p>
          <div className="switch">
          <small>上门取车<a>￥{this.state.data.get_price}</a></small>
          <Switch onChange={this.onChange.bind(this)} />
          </div>
        </div>
        <div className="address">
          <div>
            <select ref="city2">
              {sendCar}
            </select>
          </div>
          <div>
            {sendCarArea2}
          </div>
        </div>
        <div className="pick-time">
          <div className="time-order" onTouchStart={this.timePicke.bind(this)} >
            <p>取车时间</p>
            <p  style={{height: '5rem',fontWeight: 'normal',paddingLeft:'1rem',fontSize:'18px'}}><h3 ref="start_time1" style={{fontSize:'2.3rem'}}>{this.state.date_first1}</h3><h4 ref="start_time2" style={{fontWeight:'normal',fontSize:'1.8rem'}}>{this.state.date_first2}</h4></p>
          </div>
          <div className="time-diff" style={{height:"7rem"}}>
          <h1 style={{width:'7rem',height:'7rem',transition:'translateX(-50%)'}}>
          <div style={{transition:'translateX(-50%)'}}>
          <p>{this.state.date_dif}<small>天</small></p>
          </div>
          </h1>
          </div>
          <div className="time-order" onTouchStart={this.timePicke2.bind(this)} >
            <p>还车时间</p>
            <p style={{height: '5rem',fontWeight: 'normal',paddingRight: '1rem',fontSize:'18px'}}><h3 ref="end_time1" style={{fontSize:'2.3rem'}}>{this.state.date_second1}</h3><h4 ref="end_time2" style={{fontWeight:'normal',fontSize:'1.8rem'}}>{this.state.date_second2}</h4></p>
          </div>
        </div>
        <Order {...this.state} />
        <Bottom  data={this.state.data} payment={this.payment.bind(this)}/>
      </div>
    );
  }
}


class Order extends Component{
  render(){
    let cost = this.props.checked?'是':'否';
    let cost2 = this.props.checked2?'是':'否';
    let cost3 = this.props.checked ? parseFloat(this.props.data.gave_price) : 0;
    let cost4 = this.props.checked2 ? parseFloat(this.props.data.get_price) : 0;
    let money_rent = this.props.date_dif * parseFloat(this.props.data.day_price);
    let money_total = this.props.date_dif * parseFloat(this.props.data.day_price) + parseFloat(this.props.data.deposit) + cost3 + cost4
    return(
      <div className="pick-order">
        <p>车辆租赁费用<span>￥{money_rent}</span></p>
        <p>车辆押金 <span>￥{this.props.data.deposit}</span></p>
        <p>送车上门服务费<span>{cost}</span></p>
        <p>送车上门服务费<span>{cost2}</span></p>
        <p>合计<span>￥{money_total}</span></p>
      </div>
    );
  }
}

class Bottom extends Component{
  render(){
    return(
      <div className="pay-quick">
        <p>预付金：<span>￥{this.props.data.before_pay}</span></p>
        <p onTouchStart={this.props.payment}><span>立即支付</span></p>
      </div>
    );
  }
}
