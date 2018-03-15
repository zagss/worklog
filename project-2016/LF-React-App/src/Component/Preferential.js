import React,{Component} from 'react';

import img1 from '../Image/ic_visibility.png'
import img2 from '../Image/ic_thumb_up.png'

let data=[
  {'key': '1','state': '即将开始','src': '../Style/ic_visibility.png'},
];

export default class Preferential extends Component{

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
      let data= "020发现";
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
      <div>
        {data.map((res,index) =>{
          return (
            <div key={index} onClick={this.handleClick}>
              <div className="app_Discovery" >
                <ul>
                   <li>
                   <div>
                     <p>优惠活动 | 充200送50</p>
                     <p>即将开始</p>
                    </div>
                   </li>
                   <li className="app_concessions">
                   <p>充100送20,充200送50，不定时发放超大额度拉风哦！还有机会获得礼品！</p>
                  <div>
                   <p><img src={img1} alt=""/>200</p>
                     <p><img src={img2} alt=""/>200</p>
                  </div>
                   </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>

    );
  }
}
