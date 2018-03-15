import React,{Component} from 'react';

import '../Style/appA.css'
import success from '../Image/ic_bookling_success.png';
export default class ReserveSuccess extends Component{

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

    // 接收安卓发来的消息   并返回给安卓通知
  //  bridge.registerHandler("FlightDetailPage", (data, responseCallback) =>{
  //         alert(data)
  //         self.setState({
  //           data: JSON.parse(data).attributes,
  //           dataTotal: JSON.parse(data)
  //         })
   //
  //        let responseData = "haoqia2";
  //        responseCallback(responseData);
  //    });
  });
  }

  handleClickReturn(){
    // alert('返回')
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('return',{'data' : 'return'}, function(response) {
        alert('成功相应了', response)
      })
    });
  }

  handleClickView(){
  // alert('查看订单')
  this.connectWebViewJavascriptBridge(bridge =>{
    bridge.callHandler('seeOrder',{'data' : 'seeOrder'}, function(response) {
      alert('成功相应了', response)
    })
  });
  }

  render(){
    return(
      <div className="yuding">
  		 <div className="webapp_yuding">
        	<img src={success} alt="标题图片"  />
        	<h2>预定成功！</h2>
        	</div>
  			<p>
  			稍后会有专属客服与您联系，或可拨打我们的客服
  			电话<span>024-88888888888</span>进行咨询，我们会尽最大的努力满足您的要求。
  			</p>
        <div className="form-app">
        <p className="green" onClick={this.handleClickView.bind(this)}>查看订单</p>
          <p className="white" onClick={this.handleClickReturn.bind(this)}>返回</p>
        </div>
  		</div>
    );
  }
}
