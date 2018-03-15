import React,{Component} from 'react';
import '../Style/selfCarOrderDetail.css'


export default class SelfCarOrderDetail extends Component {

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
       bridge.registerHandler("SelfCarOrderDetailPage", (data, responseCallback) =>{
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

  render(){

    const time24 = new Date(parseInt(this.state.order.addtime)*1000).toLocaleString('chinese',{hour12:false})

    return(
      <div className="car_detil_total">
        <div className="car_order_detail">
          <p className="gap">乘客信息</p>
          <p className="title1" style={{fontWeight:'normal'}}>{this.state.user.username} {this.state.user.mobile}</p>
          <p className="gap">产品信息</p>
          <div className="product">
            <h2 style={{fontWeight:'normal'}}><span>{this.state.product.title} </span><small>￥{this.state.product.price}</small></h2>
          { /* <p className='tel'><span><img src="" style={{borderRadius : '50%'}}/></span><b>王师傅 京E3332f79</b><i></i></p>*/}
            <h3><div><img src={this.state.product.img}   /></div>
              <div>
                <div>
                <p>{this.state.product.start_area}</p>
                <p>{this.state.product.end_area}</p>
                </div>
                <p className="aboard_time">上车时间:{this.state.product.start_time}</p>
              </div>
            </h3>
          </div>
          <p className="gap">订单信息</p>
          <div className="order_det">
            <p><span>订单编号</span><span>{this.state.order.orderid}</span></p>
            <p><span>下单时间</span><span>{time24}</span></p>
            <p><span>订单状态</span><span>{this.state.order.status}</span></p>
          </div>
        </div>
      </div>
    );
  }
}
