import React,{Component} from 'react';



import img from '../Image/023dingdan_03.png';

export default class OrderDetailHelicopter extends Component{


      constructor(){
        super();
        this.state={
          data: [],
          user:[],
          product:[],
          order:[],
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
           bridge.registerHandler("OrderDetailHelicopterPage", (data, responseCallback) =>{
            //  alert(data)
             let responseData = "haoqia";
             responseCallback(responseData);
                self.setState({
                  data: JSON.parse(data).data,
                  user: JSON.parse(data).data.user,
                  product: JSON.parse(data).data.product,
                  order: JSON.parse(data).data.order,
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
    let tourTime = [];
    this.state.product.order_type === '2' && tourTime.push(<li className="app_height">观光时长 <span>{this.state.product.hour}</span></li>)
    const tiem24 = new Date(this.state.product.start_time * 1000).toLocaleString('chinese',{hour12:false})
    const time24 = new Date(this.state.order.addtime * 1000).toLocaleString('chinese',{hour12:false})
    return(
      <div className="app_order">
        <ul style={{height: '2rem'}} className="app_hangban">
        </ul>
				<ul className="app_info">
					<li style={{height: '40px',lineHeight: '40px'}} className="color">乘客信息</li>
					<li>{this.state.user.username} <span>{this.state.user.user_tel}</span></li>
				</ul>
				<ol className="app_product">
    			  <li>产品信息</li>
    			  <li>产品 <span>{this.state.product.product}</span></li>
    			  <li>机型 <span>{this.state.product.fly_type} <small style={{color: '#000',background: '#FFCC00',padding: '2px',borderRadius:'0.3rem',color:'#fff'}}>4位</small></span></li>
    			  <li>观光时间 <span>{tiem24}</span></li>
    			  <li className="app_height">观光人数 <span>{this.state.product.user_num}</span></li>
            {tourTime}
    			  <li className="app_height">起飞地点 <span>{this.state.product.start_place}</span></li>
    			  <li className="app_height">降落地点 <span>{this.state.product.end_place}</span></li>
    			  <li className="app_height">价格<span className="ft_color">￥{this.state.product.price}</span></li>
    			  <li className="app_height">备注<span>{this.state.product.remarks}</span></li>
				</ol>
				<ul className="app_orderinfo" style={{marginBottom: '0'}}>
				   <li>订单信息 </li>
				   <li>订单编号 <span>{this.state.order.orderid}</span></li>
				   <li>下单时间 <span>{time24}</span></li>
				   <li>订单状态 <span>{this.state.order.status}</span></li>
				</ul>
        <div style={{height: '70px'}}></div>
				<ul className="app_btn">
				  <li><a onTouchStart={this.cancelOrder.bind(this)}>取消订单</a></li>
				  <li><a onTouchStart={this.payOrder.bind(this)} className="active">立即支付</a></li>
				</ul>

    </div>
    );
  }
}
