import React,{Component} from 'react';

import img from '../Image/ic_thumb_up.png';

import $ from 'jQuery';

export default class EventDetail extends Component{
   connectWebViewJavascriptBridge(callback){
           if (window.WebViewJavascriptBridge) {
               callback(WebViewJavascriptBridge)
           } else {
               document.addEventListener(
                   'WebViewJavascriptBridgeReady'
                   ,() => {
                       callback(WebViewJavascriptBridge)
                   },
                   false
               );
           }
       };

     connectWebViewJavascriptBridge(bridge){
          bridge.init = (message, responseCallback) => {
            let data= {'Javascript Responds': 'Wee!'};
            responseCallback(data);
          }

          bridge.registerHandler("functionInJs",(data, responseCallback) => {
              // alert(data);
              let responseData = "我接收到了安卓的调用";
              responseCallback(responseData);
          });
        };

    handleClick(){
      let data= "021活动详情";
      console.log(data)
      window.WebViewJavascriptBridge.callHandler(
            'submitFromWeb'
            , {'param': data}
            ,  function(responseData){
              alert(responseData);
            }
      );
    }
  render(){
    return(
      <div className="app_Discoverys" onClick={this.handleClick}>
        <ul>
           <li>
           <div >
             <p>优惠活动 | 充200送50</p>
             <p><img src={img} alt=""/>200</p>
            </div>
           </li>
           <li className="app_concessionsy">
           <p>充100送20,充200送50，不定时发放超大额度拉风哦！还有机会获得礼品！</p>
           </li>
        </ul>
      </div>
    );
  }
}
