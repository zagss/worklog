import React,{Component} from 'react';



import img from '../Image/023dingdan_03.png';

export default class OrderDetailSpecialPlane extends Component{
  constructor(){
    super();
    this.state={
      data: [],
      user:[],
      product:[],
      order:[],
      place:[],
      sercice1:[],
      sercice2:[],
      sercice3:[],
      sercice:[]
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
       bridge.registerHandler("OrderDetailSpecialPlanePage", (data, responseCallback) =>{
        //  alert(data)
         let responseData = "haoqia";
         responseCallback(responseData);
            self.setState({
              data: JSON.parse(data).data,
              user: JSON.parse(data).data.user,
              product: JSON.parse(data).data.product,
              order: JSON.parse(data).data.order,
              place: JSON.parse(data).data.place,
              sercice1: JSON.parse(data).data.product.sercice.split(' ')[0],
              sercice2: JSON.parse(data).data.product.sercice.split(' ')[1],
              sercice3: JSON.parse(data).data.product.sercice.split(' ')[2],
              sercice: JSON.parse(data).data.product.sercice
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
  phoneClick(){
    // alert('支付订单')
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('phoneClick',{'action':'payment'}, function(response) {
        alert('成功相应了', response)
      })
    });
  }


  render(){
    const date_toa = this.state.order.addtime ?
                      new Date(parseInt(this.state.order.addtime)*1000).toLocaleString('chinese',{hour12:false}):
                      'data invalid'


    const retrunTime = this.state.product.return_time == '1970-01-01 08:00:00' ? '' : this.state.product.return_time
    return(
      <div className="app_order">
				<ul className="app_hangban">
				  <li style={{width:'100%',textAlign:'center'}}>
          <p style={{display:'inline-block',width:'43%',position:"static",height:'3rem',fontSize:'1.8rem'}}>{this.state.place.start_city}</p>
          <div style={{margin:'0 auto',height:'3rem',width:'14%',display:'inline-block'}} ><img src={img} alt="" style={{position:"static"}} /></div>
					<p style={{display:'inline-block',width:'43%',position:"static",height:'3rem',fontSize:'1.8rem'}}>{this.state.place.end_city}</p>
				  </li>
				  </ul>
				<ul className="app_info">
					<li className="color">乘客信息</li>
					<li>{this.state.user.username} <span>{this.state.user.mobile}</span></li>
				</ul>
				<ol className="app_product">
    			  <li>产品信息</li>
    			  <li>机型 <span>{this.state.product.fly_type}</span></li>
    			  <li>出发时间 <span>{this.state.product.start_time}</span></li>
    			  <li>返回时间 <span>{retrunTime}</span></li>
    			  <li>搭乘人数 <span>{this.state.product.user_num}人</span></li>
    			  <li>特殊服务 <a>{this.state.sercice}</a></li>
    			  <li>备注 <p>{this.state.product.remarks}</p></li>
				</ol>
				<ul className="app_orderinfo">
				   <li>订单信息 </li>
				   <li>订单编号 <span>{this.state.order.orderid}</span></li>
				   <li>下单时间 <span>{date_toa}</span></li>
				   <li>订单状态 <span>{this.state.order.status}</span></li>
				</ul>
        <div style={{height: '2rem',width: '100%'}}></div>
				<ul className="app_btn">
				  <li><a onTouchStart={this.phoneClick.bind(this)}>咨询客服</a></li>
				  <li><a onTouchStart={this.cancelOrder.bind(this)} className="active">取消订单</a></li>
				</ul>

			</div>
    );
  }
}
