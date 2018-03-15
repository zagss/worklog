import React,{Component} from 'react';



import img from '../Image/023dingdan_03.png';

export default class OrderDetailSpellPlane extends Component{

  constructor(){
    super();
    this.state={
      data: [],
      user:[],
      product:[],
      order:[],
      place:[]
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
       bridge.registerHandler("OrderDetailSpellPlanePage", (data, responseCallback) =>{
        //  alert(data)
         let responseData = "haoqia";
         responseCallback(responseData);
            self.setState({
              data: JSON.parse(data).data,
              user: JSON.parse(data).data.user,
              product: JSON.parse(data).data.product,
              order: JSON.parse(data).data.order,
              place: JSON.parse(data).data.place,
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
      <div className="app_order">
				<ul className="app_hangban">
				  <li>
          <p>{this.state.place.start_city}</p>
					<img src={img} alt=""/>
					<p>{this.state.place.end_city}</p>
				  </li>
				  </ul>
				<ul className="app_info">
					<li className="color">乘客信息</li>
					<li>{this.state.user.username} <span>{this.state.user.mobile} </span></li>
				</ul>
				<ol className="app_product">
    			  <li>产品信息</li>
    			  <li>机型 <span>{this.state.product.fly_type} <small style={{color: '#999'}}>(最低{this.state.product.lowest}人起飞)</small></span></li>
    			  <li>出发时间 <span>{this.state.product.start_time}</span></li>
    			  <li>搭乘人数 <span>{this.state.product.user_num}位</span></li>
    			  <li className="app_height">价格 <span className="ft_color">￥{this.state.product.price}</span></li>

				</ol>
				<ul className="app_orderinfo">
				   <li>订单信息 </li>
				   <li>订单编号 <span>{this.state.order.orderid}</span></li>
				   <li>下单时间 <span>{time243}</span></li>
				   <li>订单状态 <span>{this.state.order.status}</span></li>
				</ul>

				<ul className="app_btn">
				  <li><a onTouchStart={this.cancelOrder.bind(this)}>取消订单</a></li>
				  <li><a onTouchStart={this.payOrder.bind(this)} className="active">立即支付</a></li>
				</ul>

    </div>
    );
  }
}
