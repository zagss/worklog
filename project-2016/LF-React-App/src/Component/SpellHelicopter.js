import React,{Component} from 'react'
import { reachBottom,url2 } from './Common/api'
export default class SpellHelicopter extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[]
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
      // alert('拼机页面开始渲染了')
      // fetch("http://192.168.1.204:8010/api/v1/Plane_Fly").then(response => {
      //   return response.json();
      // }).then(data =>{
      //     console.log(data);
      //     this.setState({
      //       data: data.data,
      //     });
      //     console.log(this.state.data);
      //   })

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
         bridge.registerHandler("SpellHelicopterPage", (data, responseCallback) =>{
          // alert(data)
           let responseData = "haoqia";
           responseCallback(responseData);
              self.setState({
                data: JSON.parse(data).data,
              })
         });
     });
  }

  jumpNextPage(id,item){
    // alert(id);
    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('intent', {'action':'SpellHelicopterBook','data': {
          'ID':id,
          'attributes':JSON.stringify(item)
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }

  render(){
    let styleObj = {
      fontSize: '2.5rem',
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      background: "rgba(0,0,0,0.3)",
      height:'100%',
      paddingTop:'10%'
    }

    let styleI = {
      fontStyle: 'normal',
      display: 'inline-block',
      background: '#f5a623',
      borderRadius: '0.3rem',
      padding: '0 1rem' ,
      fontSize: '1.5rem',

    }
    let heliList = this.state.data.map((res,index) =>{
      let imgUrl = url2()+ res.attributes.img;
      return(
        <div className="lt-pic" onClick={this.jumpNextPage.bind(this,res.id,res)} style={{position: 'relative'}}>
          <img src={imgUrl} style={{WebKitFilter: 'brightness(60%)'}} />
          <h3 style={styleObj}>{res.attributes.fly_name}</h3>
          <p style={{fontSize: '16px'}}><b>{res.attributes.fly_intro}</b> <i style={styleI}>{res.attributes.fly_seat}位</i><span>￥{res.attributes.fly_price}<small>/人</small></span></p>
        </div>
      );
    })
    return(
      <div className="hb">
        {heliList}
      </div>
    );
  }
}
