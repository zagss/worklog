import React,{Component} from 'react';

import img from '../Image/ic_pay_fail.png';

export default class PayFail extends Component {
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
        bridge.callHandler('return',{'action':'payment'}, function(response) {
          alert('成功相应了', response)
        })
      });
    }

  handleClickView(){
    // alert('支付')
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('payment',{'action':'payment'}, function(response) {
        alert('成功相应了', response)
      })
    });
  }
  render(){
    return(
      <div className="yuding">
  		 <div className="webapp_yuding">
        	<img src={img} alt="标题图片"  />
        	<h2>支付失败，请重新支付！</h2>
        	</div>

          <div className="form-app">
            <p className="green" onClick={this.handleClickView.bind(this)}>立即支付</p>
            <p className="white" onClick={this.handleClickReturn.bind(this)}>返回</p>
          </div>
  		</div>
    );
  }
}
