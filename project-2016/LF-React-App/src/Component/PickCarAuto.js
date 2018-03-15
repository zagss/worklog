import React,{Component} from 'react'
import $ from 'jquery'
document.getElementsByTagName('body')[0].style.background= '#f5f5f5';
export default class LongTermLovelyCar extends Component{
  constructor(){
    super();
    this.state={
      data: []
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
    // this.loadDataFromServer();
    // const self = this;
    this.connectWebViewJavascriptBridge(bridge =>{
           bridge.init((message, responseCallback) =>{
           let data = {
               'Javascript Responds': '游艇详情页面!'
           };
           responseCallback(data);
       });
       //
      //  bridge.registerHandler("CheapDetailPage", (data, responseCallback) =>{
      //         self.setState({
      //           data: JSON.parse(data),
      //         })
      //        let responseData = "haoqia2";
      //        responseCallback(responseData);
      //    });
    });
  }

  handleClick(){
    // console.log( this.refs.userName.value);
    if(!this.refs.car_brand.value){
      alert("请输入车牌");
      return false;
    }
      if(!this.refs.car_user.value){
        alert("请输入姓名");
        return false;
      }
      if(!this.refs.car_tel.value){
        alert("请输入手机号");
        return false;
      }
     if(!(/^1[34578]\d{9}$/.test(this.refs.car_tel.value))){
        alert("手机号码有误，请重填");
        return false;
      }
    console.log( $('#form').serialize() );
    let params = $("#form").serializeArray();
    let j = {};
    for (let item in params) {
      j[params[item].name] = params[item].value;
    }
    console.log(JSON.stringify(j))

    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('subInfo', {'data': j }, function(response) {
        alert('成功相应了', response)
      })
    });
  }

  render(){
    const styleObj = {
      fontSize: '1.6rem',
      fontWeight: 'normal'
    }
    return(
      <div className="ltlc">
        <div className="lt-content" style={{marginBottom: '1rem'}}>
        <form id="form">
        <p><span>车型品牌</span><input style={styleObj} ref='car_brand' type="text"  name="uerBrand" placeholder="请输入爱车的品牌" />
        </p>
        <p><span>姓名</span><input style={styleObj} ref='car_user'  type="text" name="userName" placeholder="请输入您的姓名" /></p>
        <p><span>联系电话</span><input style={styleObj} ref='car_tel'  type="tel" name="uerTelPhone" placeholder="请输入手机号码" /></p>
        <p><span>备注</span><input style={styleObj} ref='remarks'  type="text" name="uerBeizhu" placeholder="选填 >" /></p>
        </form>
        <Book handleClick={this.handleClick.bind(this)} />
        </div>
        <div className="ltlc-att"><span>我们的客户经理将在24小时内为您提供专人服务！</span></div>
      </div>
    );
  }
}
class Book extends Component{
  render(){
    return(
      <div className="lt-book">
        <p onClick={this.props.handleClick}>提交</p>
      </div>
    );
  }
}
