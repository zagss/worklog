import React,{Component} from 'react';
import { reachBottom,url } from './Common/api'
import $ from 'jquery';
import SliderShip from './common/slider';

import '../Style/yachtDetail.css';

export default class YachtDetail extends Component{
  constructor(props){
    super(props);
    this.state ={
      // contents: this.props.contents|| []
      contents: [],
      routes: [],
      message: [],
      yachtData: [],
      matchStr:[],
      matchImg:[],
      imgs:[]
    }
  }
  // loadDataFromServer(){
  //   fetch('http://192.168.1.202:8010/api/v1/yacht_detail/93092FB2-26F0-25E1-E0B1-150F57821DA3').then(response =>{
  //     return response.json();
  //   }).then(contents =>{
  //     this.setState({
  //       contents: contents.data,
  //       routes: contents.data.routes,
  //       message: contents.data.message
  //     });
  //     console.log(this.state.message);
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
           'Javascript Responds': '游艇详情页面!'
       };
       responseCallback(data);
   });

    //接收安卓发来的消息   并返回给安卓通知
   bridge.registerHandler("yachtDetailPage", (data, responseCallback) =>{
    //  alert(data)
          self.setState({
            contents: JSON.parse(data).data,
            routes: JSON.parse(data).data.routes,
            message: JSON.parse(data).data.message,
            imgs:JSON.parse(data).data.imgs
          })
          // alert(self.state.imgs)
         let responseData = "haoqia2";
         responseCallback(responseData);
     });


     bridge.registerHandler("yachtOtherDetailPage", (data, responseCallback) =>{
            self.setState({
              yachtData: JSON.parse(data).data,
              matchStr: JSON.parse(data).data.img_text.replace(/<[^>]+>/g,''),
              matchImg:(/<img.*?src="(.*?)"/).exec(JSON.parse(data).data.img_text)[1]
            })
           let responseData = "haoqia2";
           responseCallback(responseData);
       });
  });
  }

  handleTouch(index){
    // alert(index);
    let self = this;
    // alert(JSON.stringify(self.state.routes[index]));
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('intent',{'action':'RouteDetail','data': {
          'routeDetailId': JSON.stringify(self.state.routes[index])
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }

  telPhone(){
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('phoneClick',{'action':'RouteDetail','data': {
          'phoneNum': ''
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }

  bookYacht(){
    let self = this;
    // alert(this.state.contents);
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('intent',{'action':'YachtOrder','data': {
          'data': JSON.stringify(self.state.contents)
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }
  render(){

    //限制字符个数


    let routesList = this.state.routes.map((res,index) =>{
      if(res.line_title.length > 30){
        res.line_title = res.line_title.substring(0,33)+'...';
      }

      return(
          <div className="routeslist" key={index} style={{height:"5.6rem"}}>
            <p className="rou-con" style={{display:"flex",flexDirection:'column',justifyContent:'center',fontSize:'1.5rem',lineHeight:'1.6rem'}}>{res.line_title}<a onTouchStart={this.handleTouch.bind(this,index)}>详情 ></a></p>
            <p style={{height:"5.6rem",lineHeight:'5.6rem',fontSize:'1.8rem'}}><small>{res.yacht_price}</small></p>
          </div>
      );
    })


    return(
      <div>
        <SliderShip imgs={this.state.imgs} />
        <div className="messageA" >
          <div>
            <h3 style={{fontSize:'1.7rem'}}>{this.state.message.title}</h3>
            <p style={{fontSize:'1.8rem'}}>￥{this.state.message.yacht_price}<small style={{fontSize:'1.2rem'}}>起/时</small></p>
            <p>★★★★★</p>
          </div>
        </div>
        <div className="messageB">
          <div style={{paddingRight:'0'}}>
            <p style={{fontSize:'1.5rem'}}><span style={{marginRight:'0.5rem'}}></span>{this.state.message.yacht_name}</p>
            <p style={{fontSize:'1.5rem'}}><span style={{marginRight:'0.5rem'}}></span>{this.state.message.area}</p>
          </div>
          <div style={{paddingLeft:'0'}} onTouchStart={this.telPhone.bind(this)}><span></span></div>
        </div>
        <div className="dis"></div>
        <div className="messageC">
          <div><h3 style={{fontSize:'1.6rem'}}><small></small>推荐航线及估价<span>(元)</span></h3></div>
          <div className="messageForm">
            <div className="mf">
            {routesList}
            </div>
            <div className="mf2"><p>重大节假日价格通常有所上浮，相关价格信息，请咨询客服。</p></div>
          </div>
        </div>
        <div className="dis"></div>
        <GraphicDetails connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge} yachtData={this.state.yachtData} matchStr={this.state.matchStr} matchImg={this.state.matchImg} />
        <div style={{height: '50px'}}></div>
        <div className="book" onTouchStart={this.bookYacht.bind(this)}>马上预定</div>
      </div>
    );
  }
}


class GraphicDetails extends Component{

    constructor(){
      super();
      this.state = {
        tabs: [
          { tabName: '图文详情',id: '1',type: 'status'},
          { tabName: '游艇参数',id: '2',type: 'detail'},
          { tabName: '评价详情',id: '3',type: 'detail'},
        ],
        tabId: 1,
        tabType: 'status',
        data: [],
        param: [],
        level: []
      }
    }

    // componentDidMount(){
    //   let self = this;
    //   this.props.connectWebViewJavascriptBridge(bridge =>{
    //   //初始化
    //      bridge.init((message, responseCallback) =>{
    //      let data = {
    //          'Javascript Responds': '游艇详情页面!'
    //      };
    //      responseCallback(data);
    //  });
    //
    //   //接收安卓发来的消息   并返回给安卓通知
    //  bridge.registerHandler("yachtOtherDetailPage", (data, responseCallback) =>{
    //    alert(data);
    //         self.setState({
    //           data: JSON.parse(data).data,
    //           param: JSON.parse(data).data.parameters,
    //           level: JSON.parse(data).data.level,
    //         })
    //
    //        let responseData = "haoqia2";
    //        responseCallback(responseData);
    //    });
    // });
    // }
    tabChoiced(id,tabType){
      this.setState({
        tabId: id,
        tabType: tabType
      });
    }

    render(){
      //

      let choiced = {
        borderBottom: "3px solid #4BDC9B",
        color: "#4BDC9B",
        fontWeight: "normal"
      }
      let noChoice = {
        fontWeight: "normal",
        color: "#000"
      }
      let loadType = '';
      let tabList = this.state.tabs.map((res,index) =>{
        let myStyle = noChoice;
        if(res.id == this.state.tabId){
          myStyle = choiced;
        }
        if(this.state.tabId == 1){
          loadType = <YachtState yachtData={this.props.yachtData} matchStr={this.props.matchStr} matchImg={this.props.matchImg} />
        }else if(this.state.tabId == 3){
          loadType = <YachtValue  yachtData={this.props.yachtData} />
        }else if(this.state.tabId == 2){
          loadType = <YachtDetails yachtData={this.props.yachtData} />
        }
        return(
            <a className="yd-tab" key={index} onTouchStart={this.tabChoiced.bind(this,res.id,res.type)} style={myStyle}>{res.tabName}</a>
        );
      })
      return(
        <div className="y-t">
          <div>
            {tabList}
          </div>
          {loadType}
        </div>
      );
    }
}


class YachtState extends Component {
  render(){
    return(
      <div style={{width: '100%',height:'30rem',overFlow: 'hidden',background:'#fff',padding: '0 0.5rem'}}>
      <div className="yachtValue">
        <h3 style={{fontWeight:'normal',marginBottom:'1rem'}}>{this.props.matchStr}</h3>
        <img src={this.props.matchImg} />
        </div>
      </div>
    );
  }
}

class YachtValue extends Component {
  render(){
    return(
      <div style={{width: '100%',height:'30rem',overFlow: 'hidden',background:'#fff'}}>
        <div className="yachtValue">
{/*          <h5><p>描述相符</p></h5>
          <h5><p>游艇状况</p></h5>
          <h5><p>拉风服务</p></h5>
*/}
        </div>
      </div>
    );
  }
}
class YachtDetails extends Component {
  render(){
    const typeShip = this.props.yachtData.parameters.yacht_type == 1 ? '帆船' : '游艇'
    return(
      <div className="yachtValue">
        <h1><small>类别</small><big>{typeShip}</big></h1>
        <h1><small>品牌</small><big>{this.props.yachtData.parameters.yacht_brand}</big></h1>
        <h1><small>出产地</small><big>{this.props.yachtData.parameters.produ_place}</big></h1>
        <h1><small>排水量</small><big>{this.props.yachtData.parameters.displacement}</big></h1>
        <h1><small>游艇长度</small><big>{this.props.yachtData.parameters.yacht_long}</big></h1>
        <h1><small>限载</small><big>{this.props.yachtData.parameters.max_man}</big></h1>
        <h1><small>引擎</small><big>{this.props.yachtData.parameters.engine}</big></h1>
        <h1><small>燃料</small><big>{this.props.yachtData.parameters.fuel}</big></h1>
        <h1><small>航速</small><big>{this.props.yachtData.parameters.speed}</big></h1>
        <h1><small>甲板层数</small><big>{this.props.yachtData.parameters.layer_num}</big></h1>
        <h1><small>游艇卧室</small><big>{this.props.yachtData.parameters.bedroom}</big></h1>
        <h1><small>出场年份</small><big>{this.props.yachtData.parameters.produ_year}</big></h1>
        <h1><small>标配船员</small><big>{this.props.yachtData.parameters.stand_man}</big></h1>
        <h1 style={{height: '50px'}}></h1>
      </div>
    );
  }
}
