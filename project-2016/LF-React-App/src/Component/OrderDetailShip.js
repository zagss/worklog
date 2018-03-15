import React,{Component} from 'react';
import '../Style/selfCarOrderDetail.css'


export default class OrderDetailShip extends Component {

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
             bridge.registerHandler("OrderDetailShipPage", (data, responseCallback) =>{
               alert(data)
               let responseData = "haoqia";
               responseCallback(responseData);
                  self.setState({
                    data: JSON.parse(data).data,
                    user: JSON.parse(data).data.user,
                    product: JSON.parse(data).data.product,
                    order: JSON.parse(data).data.order,
                    order_status: JSON.parse(data).data.order_status
                  })
             });
         });
        }


  render(){
    return(
      <div className="car_detil_total">
        <div className="car_order_detail">
          <p className="gap">乘客信息</p>
          <p className="title1">{this.state.user.username} {this.state.user.mobile}</p>
          <p className="gap">产品信息</p>
          <div className="product">
            <h2><span className="oShip">{this.state.product.title}</span></h2>
            <h3><div><img src={this.state.product.img} /></div>
              <div className="odc" id="ods">
                <h4>航线：{this.state.product.yacht_line} <big style={{color: '#f6a826',textAlign: 'right',float: 'right'}}>￥{this.state.product.price}</big></h4>
                <h4>出海人数：{this.state.product.man_num}人</h4>
                <h4>出海时间：{this.state.product.out_date}</h4>
              </div>
            </h3>
          </div>
          <p className="gap">订单信息</p>
          <div className="order_det">
            <p><span>订单编号</span><span>{this.state.order.orderid}</span></p>
            <p><span>下单时间</span><span>{this.state.order.addtime}</span></p>
            <p><span>订单状态</span><span>{this.state.order.status}</span></p>
          </div>
        </div>
      </div>
    );
  }
}
