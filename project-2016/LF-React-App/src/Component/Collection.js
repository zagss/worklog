import React,{Component} from 'react';

export default class Collect extends Component {
  constructor(){
    super();
    this.state={
      data : []
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
  //  alert('页面开始加载')
   // this.loadDataFromList();
   let _this = this;
    this.connectWebViewJavascriptBridge(bridge =>{
    //  alert('调用方法1')
       //初始化
      bridge.init((message, responseCallback) =>{
          let data = {
              'Javascript Responds': 'tttt'
          };
          responseCallback(data);
      });
       //接收安卓发来的消息   并返回给安卓通知
      bridge.registerHandler("CollectPage", (data, responseCallback) =>{
        //  alert("调用方法2"+data)
          let responseData = "haoqi";
          responseCallback(responseData);
           _this.setState({
             data: JSON.parse(data).data
           })
      });
  });
 }
  render(){



    return(
      <div>

      </div>
    );
  }
}
