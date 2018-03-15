import React,{Component} from 'react';
import '../Style/selfCarOrderDetail.css'


export default class OrderDetailSelfCar extends Component {
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
       bridge.registerHandler("OrderDetailSelfCarPage", (data, responseCallback) =>{
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

  callTel(){
    // alert('call me!')
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('phoneClick',{'action':'RouteDetail','data': {
          'phoneNum': ''
      }}, function(response) {
        alert('成功相应了', response)
      })
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
    const styleObj={
      marginBottom: '0',
    }
      const time241 = new Date(parseInt(this.state.product.start_time)*1000).toLocaleString('chinese',{hour12:false})
      const time242 = new Date(parseInt(this.state.product.end_time)*1000).toLocaleString('chinese',{hour12:false})
      const time243 = new Date(parseInt(this.state.order.addtime)*1000).toLocaleString('chinese',{hour12:false})
    return(
      <div className="car_detil_total">
        <div className="car_order_detail">
          <p className="gap">乘客信息</p>
          <p className="title1" style={{fontWeight:'normal'}}>{this.state.user.username} {this.state.user.mobile}</p>
          <p className="gap">产品信息</p>
          <div className="product">
            <h2 style={{fontWeight:'normal'}}><span>{this.state.product.title}</span><small>￥{this.state.product.price}</small></h2>
            <h3 style={{paddingRight:'0'}}><div><img src={this.state.product.img}  /></div>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'spaceBetween'}}>
                <div style={{backgroundImage: 'none',paddingLeft:'0.3rem'}} className="odsc">
                <p style={styleObj}>{time241}</p>
                <p style={styleObj}>{time242}</p>
                </div>
                <div style={{backgroundImage: 'none',paddingLeft:'0.3rem'}} className="odsc">
                <p style={styleObj}>{this.state.product.start_area}</p>
                <p style={styleObj}>{this.state.product.end_area}</p>
                </div>
              </div>
            </h3>
            <h2>
              <p onTouchStart={this.callTel.bind(this)} style={{margin:'0 auto',width: '60%',background:'#F5A623',padding:'0.6rem 2.5rem',textAlign: 'center',color:'#fff',borderRadius:'0.3rem'}}>一键呼叫</p>
              <h4 style={{textAlign: 'center',color: '#999',fontWeight: 'normal',fontSize:'1rem',marginTop:'1rem'}}>拉丰紧急救援，7X24小时一键呼叫</h4>
            </h2>
          </div>
          <p className="gap">订单信息</p>
          <div className="order_det">
            <p><span>订单编号</span><span>{this.state.order.orderid}</span></p>
            <p><span>下单时间</span><span>{time243}</span></p>
            <p><span>订单状态</span><span>{this.state.order.status}</span></p>
          </div>
        </div>
      </div>
    );
  }
}
