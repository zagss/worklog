import React,{Component} from 'react';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';

import wall from '../Image/wall.png';


import '../Style/yachtOrder.css';




export default class YachtOrder extends Component{
  constructor(){
    super();
    this.state={
      data: [],
      message: [],
      routes: [],
      imgs: []
    }
  }
  // loadDataFromServer(){
  //   fetch("http://192.168.1.204:8010/api/v1/yacht_appoint").then(response =>{
  //     return response.json()
  //   }).then(data =>{
  //     console.log(data);
  //     this.setState({
  //       data: data.data[0].attributes
  //     })
  //     console.log(this.state.data)
  //   })
  // }

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
    // this.loadDataFromServer();
    let self = this;
    this.connectWebViewJavascriptBridge(bridge =>{
    //初始化
       bridge.init((message, responseCallback) =>{
       let data = {
           'Javascript Responds': '游艇详情页面!'
       };
       responseCallback(data);
   });

    //接收安卓发来的消息   并返回给安卓通知
   bridge.registerHandler("YachtOrderPage", (data, responseCallback) =>{
        // alert(data);
        self.setState({
          data: JSON.parse(data),
          imgs: JSON.parse(data).imgs,
          routes: JSON.parse(data).routes,
          message: JSON.parse(data).message
        })
         let responseData = "haoqia2";
         responseCallback(responseData);
     });
  });

  //日期


  }
  render() {
    return (
      <div className="App"  style={{position: 'relative'}}>
        <div className="wallpaper">
          <img src={wall} style={{width:'100%'}}/>
        </div>
          <ShipForm {...this.state} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge} />
      </div>
    );
  }
}




class ShipForm extends Component{
  constructor(props){
    super(props);
    this.state={
      time: [],
      priceTotal:[],
      id_yacht:[],
      id:[],
    }
  }

  timePicker(){

    let self = this;
    this.props.connectWebViewJavascriptBridge(bridge =>{

      bridge.callHandler('datePicker','', function(response) {

        self.setState({
          time: response
        })
      })
    });
  }

  payMent(){
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

    if(this.refs.out_date.innerHTML === '') {
      alert('出海日期不能为空');
      return false;
   }
   this.setState({
     priceTotal: this.props.routes[this.refs.route_line.selectedIndex].yacht_price,
     id_yacht: this.props.routes[this.refs.route_line.selectedIndex].id_yacht,
     id: this.props.routes[this.refs.route_line.selectedIndex].id,
   })
   var data_pay = {
     'username':this.refs.username.value,
     'tel': this.refs.tel.value,
     'out_date': this.refs.out_date.innerHTML,
     'ride_man': this.refs.ride_man[this.refs.ride_man.selectedIndex].text,
     'total': this.state.priceTotal,
     'id_yacht': this.state.id_yacht,
     'id_yacht_line': this.state.id
   };
   console.log(data_pay)

     this.props.connectWebViewJavascriptBridge(bridge =>{
       bridge.callHandler('payment',{'action':'payment','data': {
           'data': data_pay
       }}, function(response) {
         alert('成功相应了', response)
       })
     });
  }

  onChange(){
    this.setState({
      priceTotal: this.props.routes[this.refs.route_line.selectedIndex].yacht_price,
      id_yacht: this.props.routes[this.refs.route_line.selectedIndex].id_yacht,
      id: this.props.routes[this.refs.route_line.selectedIndex].id
    })
  }

  touchSpecial(){
    this.setState({
      priceTotal: this.props.routes[this.refs.route_line.selectedIndex].yacht_price,
      id_yacht: this.props.routes[this.refs.route_line.selectedIndex].id_yacht,
      id: this.props.routes[this.refs.route_line.selectedIndex].id,
    })
  }
  render(){
    const optionStyle = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
    let {data,message,routes,imgs} = this.props;
    let rideMan = [];
    let routeLine = [];
    let route_line = routes.map((res,index) =>
      <option key={index} style={optionStyle}>{res.line_title}</option>
    )
    routeLine.push(route_line);
    let ride_man_num = message.ride_man;

    for(let i =0; i< ride_man_num; i++){
      rideMan.push(<option key={i}>{i+1}</option>)
    }
    return(

      <form className="yof">
        <div onTouchStart={this.touchSpecial.bind(this)}>
          <p><span>姓名</span><input ref="username" type="text" required="required"/></p>
          <p><span>联系方式</span><input ref="tel"  type="tel" maxLength="11" /></p>
        </div>
          <div className="dis"></div>
        <div>
          <p onTouchStart={this.timePicker.bind(this)}><span>出海日期</span><small ref="out_date" style={{fontSize: '1.5rem',float: 'right'}}>{this.state.time}</small></p>
          <p><span>航线</span>
          <select onTouchStart={this.onChange.bind(this)} className="yacht_sel"  dir="rtl"  ref="route_line" style={optionStyle}>
            {routeLine}
          </select>
          </p>
          <p><span>出海人数</span>
          <select className="yacht_sel"  dir="rtl" ref="ride_man" >
            {rideMan}
          </select>
          </p>
        </div>
        <div className="dis"></div>
        <div className="sub" style={{position: 'fixed',bottom: '0'}}>
          <p>总价：<span>￥{this.state.priceTotal}</span></p>
          <p className="payment" onTouchStart={this.payMent.bind(this)}><a>立即支付</a></p>
        </div>
      </form>
    );
  }
}
