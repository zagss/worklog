import React,{Component} from 'react';
import $ from 'jQuery';
export default class FlightDetail extends Component{
  constructor(){
   super();
   this.state={
     data: [],
     dataTotal:[]
   }
 }
// loadDataFromServer(){
//  fetch('http://192.168.1.204:8010/api/v1/plane_list?page[skip]=1&page[size]=1').then(response => response.json())
//    .then(data => {
//      this.setState({data: data.data[0].attributes});
//      console.log(this.state.data);
//    })
//    .catch(e => console.log("没拿到数据啊啊啊啊！！！" ))
//  }

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

  // 接收安卓发来的消息   并返回给安卓通知
 bridge.registerHandler("FlightDetailPage", (data, responseCallback) =>{
        // alert(data)
        self.setState({
          data: JSON.parse(data).attributes,
          dataTotal: JSON.parse(data)
        })

       let responseData = "haoqia2";
       responseCallback(responseData);
   });
});
}


  render(){
    return(
      <div style={{"background":"#f5f5f5"}}>
        <LafengApphangbanth data={this.state.data}  dataTotal={this.state.dataTotal}/>
        <LafengAppkehuxinxi data={this.state.data} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge} dataTotal={this.state.dataTotal} />
      </div>
    );
  }
}

class LafengApphangbanth extends Component {

  //时间戳转时间
  getLocalTime(nS) {
     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
  }

  render(){
    let disTime = (this.props.data.end_time - this.props.data.start_time)/60;
    const time1 = parseInt(disTime % 60) ;
    const time2 = parseInt(disTime/60) ;
    let timeDif2 = '' ;
    if(time1 == 0){
      timeDif2 = time2+'h'
    }else if(time1 != 0 && time2 != 0){
      timeDif2 = time2 + 'h' + time1 + 'min'
    }
    if(time2 == 0){
      timeDif2 = time1 + 'min'
    }
    let udate_start1 = this.getLocalTime(this.props.data.start_time).slice(0,10).replace(/\//g,'-');
    let udate_start2 = new Date(this.props.data.start_time * 1000).toLocaleString('chinese',{hour12:false}).slice(-8,-3);
    let udate_end1 = this.getLocalTime(this.props.data.end_time).slice(0,10).replace(/\//g,'-');
    let udate_end2 = new Date(this.props.data.end_time * 1000).toLocaleString('chinese',{hour12:false}).slice(-8,-3);

    return(
      <div className="app_joint">
			  <ol className="app_routetop">
				<li>
					<span>{udate_start1}</span>
					<p style={{fontSize:'2rem'}}>{udate_start2}</p>
					<p style={{fontSize:'1.6rem'}}>{this.props.data.start_city}</p>
				</li>
				<div className="la_title">
				<p>总时长</p>
				<p>{timeDif2}</p>
				</div>
				<li>
			    <span>{udate_end1}</span>
			    <p style={{fontSize:'2rem'}}>{udate_end2}</p>
			    <p style={{fontSize:'1.6rem'}}>{this.props.data.end_city}</p>
				</li>
			  </ol>
			  <div className="app_titlebars" style={{backgroundImage:'none',width:'60%',left:'20%'}}>
          <p className="FD" style={{textAlign:'center'}}><span>{this.props.data.special_name}</span></p>
          <small></small>
        </div>
    </div>
    );
  }
}

class LafengAppkehuxinxi extends Component {
  constructor(){
    super();
    this.state={
      priceTotal: []
    }
  }

  choiceNum(){
    this.setState({
      priceTotal: this.props.data.price * parseFloat(this.refs.userNum.value)
    })
  }
  handleClickPay(){

      if(!this.refs.userName.value){
         alert("请填写姓名！");
         return false;
       }
       if(!this.refs.tel.value){
          alert("请输入手机号！");
          return false;
        }
        if(!(/^1[34578]\d{9}$/.test(this.refs.tel.value))){
           alert("手机号码有误，请重新输入！");
           return false;
         }
       if(!this.refs.userNum.value){
          alert("搭乘人数不能为空！");
          return false;
        }
        if(parseFloat(this.refs.userNum.value) <= 0 ){
           alert("搭乘人数必须大于0！");
           return false;
         }
         let params = $(".form").serializeArray();
         let j = {};
         for (let item in params) {
           j[params[item].name] = params[item].value;
         }

         let k = {
           'total_price': this.props.data.price * parseFloat(this.refs.userNum.value),
           'id_pin': this.props.dataTotal.id
         };
         let d = $.extend({},j,k)
      this.props.connectWebViewJavascriptBridge(bridge =>{
        bridge.callHandler('payment',{'data' : d}, function(response) {
          alert('成功相应了', response)
        })
      });

  }


  render(){
    return(
     <div>
      <div className="app_textCustomers">
        <form className="form" action="">
        <p>姓名</p><input type="text" name="userName" ref="userName" style={{fontWeight: 'normal'}} /><br/>
        <p>联系方式</p><input type="tel" name="userTel" ref="tel" style={{fontWeight: 'normal'}} maxLength='11' /><br/>
        <p>搭乘人数 <span>(最低起飞人数{this.props.data.lowest}人)</span></p><input onInput={this.choiceNum.bind(this)} style={{fontWeight: 'normal'}}  type="tel" maxLength='3' name="userNum" ref="userNum" />
        <p>说明:</p>
        <p>1、拼机最低起飞人数按具体航班确定;</p>
        <p>2、提交订单后，客服人员将在第一时间联系您，请保持电话通畅。</p>
        </form>
       </div>
       <LafengappPayment handleClickPay={this.handleClickPay.bind(this)} priceTotal={this.state.priceTotal}/>
      </div>
    );
  }
}

class LafengappPayment extends Component {

  render(){
    return(
      <div className="app_yuerdisburse">
  		   <ul>
  			 <li>合计：<span>￥{this.props.priceTotal}</span></li>
  			 <li onClick={this.props.handleClickPay}>立即支付</li>
  		   </ul>
  		</div>
    );
  }
}
