import React,{Component} from 'react';

import '../Style/routeDetail.css';

export default class RouteDetail extends Component{
  constructor(props){
    super(props);
    this.state ={
      // contents: this.props.contents|| []
      contents: [],
      routes: [],
      message: [],
      line: [],
      text: [],
      img: []
    }
  }
  // loadDataFromServer(){
  //   fetch('http://192.168.1.204:8010/api/v1/yacht_detail/93092FB2-26F0-25E1-E0B1-150F57821DA3').then(response =>{
  //     return response.json();
  //   }).then(contents =>{
  //     this.setState({
  //       contents: contents.data,
  //       routes: contents.data.routes,
  //       message: contents.data.message,
  //       line: contents.data.routes[0].yacht_line.split('→'),
  //       text: contents.data.routes[0].line_intro,
  //
  //     });
  //     console.log(this.state.message);
  //     console.log(this.state.routes[0]);
  //     console.log(this.state.routes[0].detail_img[0].img);
  //     console.log(this.state.routes[0].yacht_line);
  //     console.log(this.state.line);
  //   }).catch(err =>{
  //     console.log('err');
  //   });
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

    // this.loadDataFromServer();
    let self = this;
    this.connectWebViewJavascriptBridge(bridge =>{
    //初始化
       bridge.init((message, responseCallback) =>{
       let data = {
           'Javascript Responds': '航线详情页面!'
       };
       responseCallback(data);
   });

    //接收安卓发来的消息   并返回给安卓通知
   bridge.registerHandler("routeDetailPage", (data, responseCallback) =>{


         if(!JSON.parse(data).detail_img[0]){
           self.setState({
             img: "1.jpg"
           })
         }else{
           self.setState({
             img: JSON.parse(data).detail_img[0].img
           })
         }
          self.setState({
            contents: JSON.parse(data),
            // routes: JSON.parse(data).data.routes,
            // message: JSON.parse(data).data.message,
            line: JSON.parse(data).yacht_line.split('→'),
            text: JSON.parse(data).line_intro,
          })

         let responseData = "haoqia3";
         responseCallback(responseData);
     });
  });
  }
  render(){

    let routesList = this.state.line.map((res,index) =>
      <p key={index} className="route-line" style={{fontSize:'1.3rem'}}><span>第{index+1}站</span>{res}</p>
    )
    return(
      <div>
        <div className="r-li">
          <h3 style={{fontSize:'1.6rem'}}>航行线路:</h3>
          <div>
          {routesList}
          </div>
        </div>
        <div className="r-li li_2">
          <h3 style={{fontSize:'1.6rem'}}>线路介绍:</h3>
          <p className="r-li-con" style={{fontSize:'1.3rem'}}>{this.state.text}</p>
        </div>
        <div className="r-li li_3">
          <h3 style={{fontSize:'1.6rem'}}>线路图:</h3>
          <p><img src={this.state.img} /></p>
        </div>
      </div>
    );
  }
}
