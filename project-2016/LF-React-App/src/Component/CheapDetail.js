import React,{Component} from 'react';

import ReactDOM from 'react-dom';
import arrowImg from '../Image/ic_flight.png'
import $ from 'jQuery';




export default class CheapDetail extends Component{
  constructor(){
 super();
 this.state={
   data: [],
   data_total: []
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
    // this.loadDataFromServer();
    const self = this;
    this.connectWebViewJavascriptBridge(bridge =>{
           bridge.init((message, responseCallback) =>{
           let data = {
               'Javascript Responds': '游艇详情页面!'
           };
           responseCallback(data);
       });

       bridge.registerHandler("CheapDetailPage", (data, responseCallback) =>{
              self.setState({
                data: JSON.parse(data).attributes,
                data_total:JSON.parse(data)
              })
             let responseData = "haoqia2";
             responseCallback(responseData);
         });
    });
  }


  render(){
    return(
      <div style={{"background": "#f5f5f5","height":"100%"}}>
        <LafengApphangbanth data={this.state.data} data_total={this.state.data_total} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge}/>

        <LafengAppkehuxinxi data={this.state.data} data_total={this.state.data_total} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge}/>
      </div>
    );
  }
}

class LafengApphangbanth extends Component{

  render(){
    return(
    <div>
      <div className="app_particulars">
        <div className="app_routexinxi">
          <p>{this.props.data.end_city}</p>
          <img src={arrowImg} alt="图标"/>
          <p>{this.props.data.start_city}</p>
          </div>
          <div className="app_jixingtitlebar">
          <p>机型：{this.props.data.cheap_name}</p>
          <p>座位数： {this.props.data.cheap_seat}位</p>
       </div>
    </div>
    <LafengAppHangbanPrice data={this.props.data} data_total={this.props.data_total} connectWebViewJavascriptBridge={this.props.connectWebViewJavascriptBridge}/>
    </div>
    );
  }
}

class LafengAppHangbanPrice extends Component{

  constructor(){
    super();
    this.state ={
      time: [],
      time_hour: [],
      time_day: [],
    }
  }
  // pickTime(){
  //     alert('Yoyo what\'s up man');
  //     let self = this;
  //
  //     this.props.connectWebViewJavascriptBridge(bridge =>{
  //       bridge.callHandler('datePicker','', function(response) {
  //         self.setState({
  //           time: response,
  //           time_hour: response.slice(10),
  //           time_day: response.slice(0,10),
  //         })
  //       })
  //     });
  // }
  //时间戳转为时间
  getLocalTime(nS) {
     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
  }
  render(){
    let timeA = this.getLocalTime(this.props.data.start_time).slice(10)
    let timeB = this.getLocalTime(this.props.data.start_time).slice(0,9)
    if(this.getLocalTime(this.props.data.start_time).slice(10,12) =='上午' ){
      timeA = this.getLocalTime(this.props.data.start_time).slice(12)+ 'am'
    }
    if(this.getLocalTime(this.props.data.start_time).slice(10,12) =='下午' ){
      timeA = this.getLocalTime(this.props.data.start_time).slice(12)+ 'pm'
    }
    return(
      <div className="app_hangbanPrice">
        <ul>
          <li>
          <p>特价</p>
          <h3 className="color_span">￥{this.props.data.now_price}</h3>
          <p className="ptext">￥{this.props.data.before_price}</p>
          </li>
          <li className="rght">
          <p>出发时间</p>
          <h3>{timeA}</h3>
          <p>{timeB}</p>
          </li>
        </ul>
     </div>
    );
  }
}




class LafengAppkehuxinxi extends Component{


    handleClickPay(){
      if(!this.refs.userName.value){
        alert("请输入姓名");
        return false;
      }
        if(!this.refs.tel.value){
          alert("请输入手机号");
          return false;
        }
       if(!(/^1[34578]\d{9}$/.test(this.refs.tel.value))){
          alert("手机号码有误，请重填");
          return false;
        }
        if(!this.refs.userNum.value){
          alert("请输入人数");
          return false;
        }

      let params = $(".form").serializeArray();
      let j = {};
      for (let item in params) {
        j[params[item].name] = params[item].value;
      }
      let d={
        'total_price' : this.props.data.deposit,
        'id_cheap': this.props.data_total.id
      }
      const c = $.extend({},j,d)
      this.props.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('payment',{'action':'payment','data': c }, function(response) {
        alert('成功相应了', response)
      })
      });
    }

  render(){
     return(
     <div>
      <div className="app_textCustomer">
        <form className="form">
        <p>姓名</p><input ref="userName" style={{fontWeight: 'normal',fontSize: '18px'}} type="text" name="userName" /><br/>
        <p>联系方式</p><input style={{fontWeight: 'normal',fontSize: '18px'}} type="tel" name="userTel" ref="tel" maxLength="11"/><br/>
        <p>搭乘人数</p><input ref="userNum" style={{fontWeight: 'normal',fontSize: '18px'}} type="number" name="userNum"/>
        <p>备注</p><input ref="remarks" style={{fontWeight: 'normal',fontSize: '18px'}} type="text" name="remarks" placeholder="选填 &rsaquo;"/>
        <p style={{width: '100%'}}>说明： 提交订单后，客服人员将在第一时间联系您，请保持电话通畅。</p>
        </form>
      </div>
        <LafengappPayment handleClickPay={this.handleClickPay.bind(this)} data={this.props.data}  />
     </div>
    );
  }
}

class LafengappPayment extends Component{


  render(){
    return(
      <div className="app_yuerdisburse">
         <ul>
         <li>预付金：<span>￥{this.props.data.deposit}</span></li>
         <li onClick={this.props.handleClickPay}>立即支付</li>
         </ul>
      </div>
    );
  }
}
