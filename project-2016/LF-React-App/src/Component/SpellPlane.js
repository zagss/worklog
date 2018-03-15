import React,{Component} from 'react';
import ReactRefresh from './common/ReactRefresh'

import '../Style/spellPlane.css';




import './common/app.css'


export default class SpellPlane extends Component{

  constructor(props){
    super(props);

    //initial data
    // let data = this.initData();
    // console.log(data);
    this.state = {
      data: []
    }

    this.handleScrollToTop = this.handleScrollToTop.bind(this)
    this.handleScrollToBottom = this.handleScrollToBottom.bind(this)
  }

  // initData(){
  //   let data = [];
  //   let data1 = [];
  //   for(let i = 0; i < 20; i++){
  //     data.push(i)
  //   }
  //   return data
  // }

  // moreData(oldData){
  //   let newData = Object.assign([],oldData);
  //   let base = newData[newData.length-1];
  //   for(let i=base+1; i<=base+20; i++){
  //     newData.push(i)
  //   }
  //   return newData
  // }

  handleScrollToTop(completed){
    setTimeout(function(){
      completed();
    }.bind(this),500)
  }

  handleScrollToBottom(completed){
    setTimeout(function(){
      completed();
      this.setState({data: this.state.data.concat(this.state.data)});
    }.bind(this),500)
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
    // fetch('http://192.168.1.204:8010/api/v1/plane_list').then(response =>{
    //   return response.json();
    // }).then(data => {
    //   this.setState({
    //     data: data.data
    //   })
    //   this.setState({data: this.state.data.concat(this.state.data)});
    //   this.setState({data: this.state.data.concat(this.state.data)});
    //   console.log(this.state.data);
    // })
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
       bridge.registerHandler("SpellPlanePage", (data, responseCallback) =>{
         let responseData = "haoqia";
         responseCallback(responseData);
            self.setState({
              data: JSON.parse(data).data,
            })
            self.setState({
              yachtList: self.state.data.concat(self.state.data)
            })
       });
   });


  }


  render(){
    return(
      <div>
        <SpellPlane1
          data = {this.state.data}
          onScrollToTop = {this.handleScrollToTop}
          onScrollToBottom = {this.handleScrollToBottom}
          connectWebViewJavascriptBridge = {this.connectWebViewJavascriptBridge}
         />
      </div>
    );
  }
}

// export default class SpellPlane extends Component{
//   constructor(){
//     super();
//     this.state={
//       data :[],
//       attribute : []
//     }
//   }
//
//   loadDataFromServer(){
//     fetch('http://192.168.1.202:8010/api/v1/plane_list').then(response => {
//       return response.json();
//     }).then(contents =>{
//       this.setState({
//           data: contents.data
//       });
//       console.log(this.state.data)
//     })
//   }
//   componentDidMount(){
//     this.loadDataFromServer();
//   }
//
//   render(){
//     return(
//       <div>
//         <SpellForm data={this.state.data} />
//       </div>
//     );
//   }
// };

 class SpellPlane1 extends ReactRefresh{
  constructor(props){
    super(props);

  }
  bookPlane(id,item){
    // alert('你点了我一下'+id+"attributes"+item)
    this.props.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('intent', {'action':'FlightDetail','data': {
          'ID':id,'data': JSON.stringify(item)
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }

  //时间戳转时间
  getLocalTime(nS) {
     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
  }

  render(){

    let spellplaneform = this.props.data.map((item,index) =>{

      const udate_day = this.getLocalTime(item.attributes.start_time).slice(0,10)
      const udate_time = new Date(item.attributes.start_time * 1000).toLocaleString('chinese',{hour12:false}).slice(-8,-3)
      const udate_time2 = new Date(item.attributes.end_time * 1000).toLocaleString('chinese',{hour12:false}).slice(-8,-3)

      return(
        <div className="spell-list" key={'spell-'+ index}>
          <div className="spell-col"><h2>{item.attributes.start_city}</h2><h3>{udate_time}</h3></div>
          <div className="spell-col"><h2></h2><h3>{udate_day}</h3></div>
          <div className="spell-col"><h2>{item.attributes.end_city}</h2><h3>{udate_time2}</h3></div>
          <div className="spell-col"><h2>￥{item.attributes.price}</h2><h3 onTouchStart={this.bookPlane.bind(this,item.id,item)}>预定</h3></div>
          <div className="spell-col2"><p>{item.attributes.special_name}</p></div>
        </div>
      );
    })

    return(
      <div className="tableView" onScroll={this.viewDidScroll}>
        {spellplaneform}
      </div>
    );
  }
}
