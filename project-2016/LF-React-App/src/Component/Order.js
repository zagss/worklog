import React,{Component} from 'react'
import "../Style/order.css";
export default class Order extends Component{
  constructor(){
    super();
    this.state={
      data: [],
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
// loadDataFromServer(){
//   fetch("http://192.168.1.204:8010/api/v1/order").then(response => response.json())
//     .then(data =>{
//       console.log(data);
//       this.setState({
//         data: data.data,
//       });
//       console.log(this.state.yachtList);
//     })
//     .catch(e => console.log('拿不到数据？'))
// }
componentDidMount(){

  // this.loadDataFromServer();
  //WebViewJavascriptBridge
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
     bridge.registerHandler("Order", (data, responseCallback) =>{
      //  alert(data)
       let responseData = "haoqia";
       responseCallback(responseData);
          self.setState({
            data: JSON.parse(data).data,
          })
     });
 });
}



  render(){
    document.getElementsByTagName('body')[0].style.background="#f5f5f5";
    console.log(this.state.data)
    let list = this.state.data.map((res,index) =>{
      if(res.attributes.order_type == 1 && res.attributes.midd_area ==''){
        return < OrderAir  key={index} data={res.attributes} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge} />
      }else if(res.attributes.order_type == 1 && ! res.attributes.midd_area ==''){
        return <OrderAirThree key={index} data={res.attributes} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge} / >
      }else if(res.attributes.order_type == 2 ){
        return <OrderShip key={index} data={res.attributes} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge} />
      }else if(res.attributes.order_type == 3){
        return <OrderLt key={index} data={res.attributes} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge} />
      }
    })
    return(
      <div>
        {list}
      </div>

    );
  }
}


let fly_status = '';
let dict = '';
// let car_status = ''
class OrderLt extends Component{
  // touchPay(id){
  //   this.props.connectWebViewJavascriptBridge(bridge =>{
  //     bridge.callHandler('intent', {'action':'YachtDetail','data': {
  //         'ID':id
  //     }}, function(response) {
  //       alert('成功相应了', response)
  //     })
  //   });
  // }
  nextPage(id,type){
    // alert(id +'=======' +type)
    let nextPageName = ''
    if(type == 1){
      nextPageName = 'OrderDetailSelfCar'
    }else  if(type == 2){
       nextPageName = 'SelfCarOrderDetail'
    }else  if(type == 3){
       nextPageName = 'OrderDetailGreenCar'
    }else  if(type == 4){
       nextPageName = 'OrderDetailGreenCar'
    }
    // alert('跳的页面为------'+nextPageName)
    this.props.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('intent', {'action':nextPageName,'data': {
          'ID':id,
          "type": type
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }

  render(){

    if(this.props.data.fly_type == 1 ) {
      fly_status = '自驾'
    }else if(this.props.data.fly_type == 2){
      fly_status = '专车'
    }else if(this.props.data.fly_type == 3){
      fly_status = '绿宝'
    }else if(this.props.data.fly_type == 4){
      fly_status = '长租'
    }


    if(this.props.data.id_dicdata == 7){
      dict = '待支付'
    }else if(this.props.data.id_dicdata == 2){
      dict = '已取消'
    }else if(this.props.data.id_dicdata == 3){
      dict = '预定成功'
    }else if(this.props.data.id_dicdata == 4){
      dict = '服务中'
    }else if(this.props.data.id_dicdata == 5){
      dict = '待评价'
    }else if(this.props.data.id_dicdata == 6){
      dict = '已完成'
    }else if(this.props.data.id_dicdata == 8){
      dict = '已预约'
    }else{
      dict = this.props.data.id_dicdata
    }

    const tiem24 = new Date(this.props.data.data * 1000).toLocaleString('chinese',{hour12:false})
    return(
      <div className="order-lt">
        <div><span>{fly_status}</span><span>{dict}</span></div>
        <div><p><img src={this.props.data.img} /></p><p>{this.props.data.name}</p><p>￥{this.props.data.price}</p></div>
        <div><p><span>{tiem24}</span></p><p><span onTouchStart={this.nextPage.bind(this,this.props.data.orderid,this.props.data.fly_type)}>查看详情</span></p></div>
      </div>

    );
  }
}
class OrderAir extends Component{
  // touchPay(id){
  //   this.props.connectWebViewJavascriptBridge(bridge =>{
  //     bridge.callHandler('intent', {'action':'YachtDetail','data': {
  //         'ID':id
  //     }}, function(response) {
  //       alert('成功相应了', response)
  //     })
  //   });
  // }

  nextPage(id,type){
    // alert(id +'=======' +type)
    let nextPageName = ''
    if(type == 1){
      nextPageName = 'OrderDetailSpellPlane'
    }else  if(type == 2){
       nextPageName = 'OrderDetailSpecialPlane'
    }else  if(type == 3){
       nextPageName = 'OrderDetailCheapPlane'
    }else  if(type == 4){
       nextPageName = 'OrderDetailHelicopter'
    }
    // alert('跳的页面为------'+nextPageName)
    this.props.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('intent', {'action':nextPageName,'data': {
          'ID':id,
          'type': type
      }}, function(response){
        alert('成功相应了', response)
      })
    });
  }

  render(){

    if(this.props.data.fly_type == 1 ) {
      fly_status = '拼机'
    }else if(this.props.data.fly_type == 2){
      fly_status = '专机'
    }else if(this.props.data.fly_type == 3){
      fly_status = '特惠'
    }else if(this.props.data.fly_type == 4){
      fly_status = '直升机'
    }


    if(this.props.data.id_dicdata == 7){
      dict = '待支付'
    }else if(this.props.data.id_dicdata == 2){
      dict = '已取消'
    }else if(this.props.data.id_dicdata == 3){
      dict = '预定成功'
    }else if(this.props.data.id_dicdata == 4){
      dict = '服务中'
    }else if(this.props.data.id_dicdata == 5){
      dict = '待评价'
    }else if(this.props.data.id_dicdata == 6){
      dict = '已完成'
    }else if(this.props.data.id_dicdata == 8){
      dict = '已预约'
    }else{
      dict = this.props.data.id_dicdata
    }

    const tiem24 = new Date(this.props.data.data * 1000).toLocaleString('chinese',{hour12:false})
    return(
      <div className="order-lt order-air">
        <div><span>飞机</span><span>{fly_status}</span><span>{dict}</span></div>
        <div>
          <b>
            <span style={{fontWeight:'normal'}}>{this.props.data.start_area}</span><i></i><span style={{fontWeight:'normal'}}>{this.props.data.end_area}</span>
          </b>
          <b style={{fontWeight:'normal'}}>￥{this.props.data.price}</b>
        </div>
        <div><p><span>{tiem24}</span></p><p><span onTouchStart={this.nextPage.bind(this,this.props.data.orderid,this.props.data.fly_type)}>查看详情</span></p></div>
      </div>

    );
  }
}
class OrderShip extends Component{

  // touchPay(id){
  //   this.props.connectWebViewJavascriptBridge(bridge =>{
  //     bridge.callHandler('intent', {'action':'OrderDetailShip','data': {
  //         'ID':id,
  //     }}, function(response) {
  //       alert('成功相应了', response)
  //     })
  //   });
  // }

  nextPage(id){
      // alert(id)
    this.props.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('intent', {'action':"OrderDetailShip",'data': {
          'ID':id,
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }
  render(){

        if(this.props.data.id_dicdata == 7){
          dict = '待支付'
        }else if(this.props.data.id_dicdata == 2){
          dict = '已取消'
        }else if(this.props.data.id_dicdata == 3){
          dict = '预定成功'
        }else if(this.props.data.id_dicdata == 4){
          dict = '服务中'
        }else if(this.props.data.id_dicdata == 5){
          dict = '待评价'
        }else if(this.props.data.id_dicdata == 6){
          dict = '已完成'
        }else if(this.props.data.id_dicdata == 8){
          dict = '已预约'
        }else{
          dict = this.props.data.id_dicdata
        }

    const tiem24 = new Date(this.props.data.data * 1000).toLocaleString('chinese',{hour12:false})
    return(
      <div className="order-lt order-ship">
        <div><span>游艇</span><span>{dict}</span></div>
        <div><p><img src={this.props.data.img} /></p><p>{this.props.data.title}</p><p>￥{this.props.data.price}</p></div>
        <div><p><span>{tiem24}</span></p><p><span onTouchStart={this.nextPage.bind(this,this.props.data.orderid)}>查看详情</span></p></div>
      </div>

    );
  }
}
class OrderAirThree extends Component{
  // touchPay(id){
  //   this.props.connectWebViewJavascriptBridge(bridge =>{
  //     bridge.callHandler('intent', {'action':'YachtDetail','data': {
  //         'ID':id
  //     }}, function(response) {
  //       alert('成功相应了', response)
  //     })
  //   });
  // }

  nextPage(id,type){
      // alert(id +'=======' +type)
    let nextPageName = ''
    if(type == 1){
      nextPageName = 'OrderDetailSpellPlane'
    }else  if(type == 2){
       nextPageName = 'OrderDetailSpecialPlane'
    }else  if(type == 3){
       nextPageName = 'OrderDetailCheapPlane'
    }else  if(type == 4){
       nextPageName = 'OrderDetailHelicopter'
    }
    // alert('跳的页面为------'+nextPageName)
    this.props.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('intent', {'action':nextPageName,'data': {
          'ID':id,
          "type": type
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }
  render(){
    if(this.props.data.fly_type == 1 ) {
      fly_status = '拼机'
    }else if(this.props.data.fly_type == 2){
      fly_status = '专机'
    }else if(this.props.data.fly_type == 3){
      fly_status = '特惠'
    }else if(this.props.data.fly_type == 4){
      fly_status = '直升机'
    }

    if(this.props.data.id_dicdata == 7){
      dict = '待支付'
    }else if(this.props.data.id_dicdata == 2){
      dict = '已取消'
    }else if(this.props.data.id_dicdata == 3){
      dict = '预定成功'
    }else if(this.props.data.id_dicdata == 4){
      dict = '服务中'
    }else if(this.props.data.id_dicdata == 5){
      dict = '待评价'
    }else if(this.props.data.id_dicdata == 6){
      dict = '已完成'
    }else if(this.props.data.id_dicdata == 8){
      dict = '已预约'
    }else{
      dict = this.props.data.id_dicdata
    }

    const tiem24 = new Date(this.props.data.data * 1000).toLocaleString('chinese',{hour12:false})
    return(
      <div className="order-lt order-air">
        <div><span>飞机</span><span>{fly_status}</span><span>{dict}</span></div>
        <div>
          <b style={{fontWeight:'normal'}}>
            <span>{this.props.data.start_area}</span><i></i><span>{this.props.data.midd_area}</span><i></i><span>{this.props.data.end_area}</span>
          </b>
          <b style={{fontWeight:'normal'}}>￥{this.props.data.price}</b>
        </div>
        <div><p><span>{tiem24}</span></p><p><span onTouchStart={this.nextPage.bind(this,this.props.data.orderid,this.props.data.fly_type)}>查看详情</span></p></div>
      </div>
    );
  }
}
