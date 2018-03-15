import React,{Component} from 'react';

import img from '../Image/ic_flight from.png';



export default class CheapPlane extends Component{

    constructor(){
    super();
    this.state={
      data: []
    }
  }

  //    loadDataFromList(){
  //   fetch('http://192.168.1.202:8010/api/v1/PlaneCheap').then(response => response.json())
  //     .then(data => {
  //       this.setState({data: data.data});
  //        console.log(this.state.data)


  //     })
  //     .catch(e => console.log("没拿到数据啊啊啊啊！！！" ))

  // }

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
    // this.loadDataFromList();
    let _this = this;
     this.connectWebViewJavascriptBridge(bridge =>{
        //初始化
       bridge.init((message, responseCallback) =>{
           let data = {
               'Javascript Responds': 'tttt'
           };
           responseCallback(data);
       });

        //接收安卓发来的消息   并返回给安卓通知
       bridge.registerHandler("CheapPlanePage", (data, responseCallback) =>{
           let responseData = "haoqi";
           responseCallback(responseData);
            _this.setState({
              data: JSON.parse(data).data
            })

       });

   });

}

   handleTouchS(id,item){
    // alert('你点了我一下'+id+"attributes"+ JSON.stringify(item))
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('intent', {'action':'CheapDetail','data': {
          'ID':id,'attributes':JSON.stringify(item)
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
     //发送表单数据给安

  }
  getLocalTime(nS) {
     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
  }
  render(){
     const classObj = {
       border: "1px solid #f5a623",
       borderRadius: "5px",
       padding: "0 5px",
       color: "#f5a623",
       fontSize: "12px"
     }
    return(
      <div>
        {this.state.data.map((res,index) =>{
          const time1 = this.getLocalTime(res.attributes.start_time).slice(0,9)+''
          const time2 = this.getLocalTime(res.attributes.end_time).slice(0,9)+''
          return(
            <div className="app_hangbanvouchsafs" onClick={this.handleTouchS.bind(this,res.id,res)} key={index}>
              <ul>
                 <li>
                 <div>
                   <p>{res.attributes.start_city}</p>
                   <p>{res.attributes.end_city}</p>
                   <img src={img} alt=""/>
                   </div>
                 </li>
                 <li className="app_bottombar">
                  <p>{res.attributes.cheap_name} <small style={classObj}>{res.attributes.cheap_seat}座</small></p>
                  <p style={{border: 'none'}}></p>
                  <p>￥{res.attributes.now_price}</p>
                  <span>{time1} - {time2}</span>
                  <span>￥{res.attributes.before_price}</span>
                 </li>
              </ul>
            </div>
          );
        })}
      </div>

    );
  }
}
