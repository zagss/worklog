import React,{Component} from 'react'

import "../Style/longTermOrder.css";
export default class  LongTermOrder extends Component{
  constructor(){
   super();
   this.state={
     data: [],
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
      const self = this;
      this.connectWebViewJavascriptBridge(bridge =>{
             bridge.init((message, responseCallback) =>{
             let data = {
                 'Javascript Responds': '游艇详情页面!'
             };
             responseCallback(data);
         });

         bridge.registerHandler("LongRentDetailPage", (data, responseCallback) =>{
                self.setState({
                  data: JSON.parse(data),
                })
               let responseData = "haoqia2";
               responseCallback(responseData);
           });
      });
    }


  render(){
    return(
      <div className="lt">
        <Picture data={this.state.data} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge} />
        <Content data={this.state.data} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge} />

      </div>
    );
  }
}

class Picture extends Component{

  jumpNextPage(){
    alert('跳转页面中。。')
  }
  render(){
    return(
      <div className="lt-pic-intro">
        <div className="lt-pic">
          <img src={this.props.data.show_img} />
          <p>{this.props.data.car_name}<span>￥{this.props.data.day_price}</span></p>
        </div>
        <div className="lt-intro">
          <p><b></b>产品简介</p>
          <div>
            <span>{this.props.data.intro}</span>
            {/*<a style={{fontSize: '1.3rem'}} onTouchStart={this.jumpNextPage.bind(this)}>查看详情 > ></a>*/}
          </div>
        </div>
      </div>
    );
  }
}

class Content extends Component{
  book(){
    const formData = {
      'username': this.refs.username.value,
      'user_tel': this.refs.user_tel.value,
      'remarks': this.refs.remarks.value
    }
    if(!this.refs.username.value){
      alert("请输入姓名");
      return false;
    }
      if(!this.refs.user_tel.value){
        alert("请输入手机号");
        return false;
      }
     if(!(/^1[34578]\d{9}$/.test(this.refs.user_tel.value))){
        alert("手机号码有误，请重填");
        return false;
      }
      this.props.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('subInfo',{'data': formData }, function(response) {
        alert('成功相应了', response)
      })
      });
  }
  render(){
    return(
      <div className="lt-content">
        <div className="lt-intro">
            <p><b></b>预约信息</p>
        </div>
        <form>
          <p><span>姓名</span><input ref='username' style={{fontSize: '1.6rem',fontWeight: 'normal'}} type="text" /></p>
          <p><span>联系方式</span><input ref='user_tel' style={{fontSize: '1.6rem',fontWeight: 'normal'}} type="tel" maxLength='11' /></p>
          <p><span>备注</span><input ref='remarks' style={{fontSize: '1.6rem',fontWeight: 'normal'}} type="text" placeholder="选填 >" /></p>
        </form>
        <Book book={this.book.bind(this)} />
      </div>
    );
  }
}


class Book extends Component{



  render(){
    return(
      <div className="lt-book">
        <p onTouchStart={this.props.book}>立即预约</p>
      </div>
    );
  }
}
