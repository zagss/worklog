import React,{Component} from 'react';
import '../Style/selfCarOrderDetail.css'


export default class OrderDetailGreenCar extends Component {

  constructor(){
    super();
    this.state={
      data: [],
      user:[],
      product:[],
      order:[],
      order_status:[]
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
    let self = this;
    this.connectWebViewJavascriptBridge(bridge =>{
        //初始化
       bridge.init((message, responseCallback) =>{
           let data = {
               'Javascript Responds': 'zhenqia!'
           };
           responseCallback(data);
       });

        //接收安卓发来的消息   并返回给安卓通知
       bridge.registerHandler("OrderDetailGreenCarPage", (data, responseCallback) =>{
        //  alert(data)
         let responseData = "haoqia";
         responseCallback(responseData);
            self.setState({
              data: JSON.parse(data).data,
              user: JSON.parse(data).data.user,
              product: JSON.parse(data).data.product,
              order: JSON.parse(data).data.order,
              order_status: JSON.parse(data).data.order_status,
            })
       });
   });
  }


  cancelOrder(){
    // alert('取消订单')
  this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('cancelOrder',{'action':'cancelOrder'}, function(response) {
        alert('成功相应了', response)
      })
    });
  }
  payOrder(){
    // alert('支付订单')
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('payment',{'action':'payment'}, function(response) {
        alert('成功相应了', response)
      })
    });
  }
  render(){

    const time243 = new Date(parseInt(this.state.order.addtime)*1000).toLocaleString('chinese',{hour12:false})
    return(
      <div className="car_detil_total">
        <div className="car_order_detail">
          <p className="gap">乘客信息</p>
          <p className="title1">{this.state.user.username} {this.state.user.mobile}</p>
          <p className="gap">产品信息</p>
          <div className="product">
            <h2><span>{this.state.product.title}</span></h2>
            <h3><div><img src={this.state.product.img} /></div>
              <div className="odc" id="ods">
                <h4>租期：{this.state.product.term}<big style={{color: '#f6a826',textAlign: 'right',float: 'right'}}>￥2000</big></h4>
                <h4>支付方式：{this.state.product.pay_type}</h4>
                <h4>租车时间：{this.state.product.start_time}</h4>
              </div>
            </h3>
          </div>
          <p className="gap">订单信息</p>
          <div className="order_det">
            <p><span>订单编号</span><span>{this.state.order.orderid}</span></p>
            <p><span>下单时间</span><span>{time243}</span></p>
            <p><span>订单状态</span><span>{this.state.order.status}</span></p>
          </div>
          <div className="app_order">
          <ul className="app_btn">
            <li><a onTouchStart={this.cancelOrder.bind(this)}>取消订单</a></li>
            <li><a onTouchStart={this.payOrder.bind(this)} className="active">立即支付</a></li>
          </ul>
          </div>
        </div>
      </div>
    );
  }
}
