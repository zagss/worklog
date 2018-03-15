import React,{Component} from 'react';
import $ from 'jquery'
import styles from '../Style/planeReserveDouble.css';




export default class PlaneBook extends Component{
  constructor(){
    super();
    this.state={
      data: [],
      is_smoke: [],
      attendant: [],
      food: [],
      remarks: []
    }
  }

  // loadDataFromServer(){
  //   // fetch("http://192.168.1.202:8010/api/v1/CharterPlane").then(response => {
  //   //   return response.json()
  //   // }).then(data =>{
  //   //   this.setState({
  //   //     data: data.data[0].attributes
  //   //   });
  //   //   console.log(this.state.data)
  //   // })
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
  //  bridge.registerHandler("planeReservePage", (data, responseCallback) =>{
  //         self.setState({
  //           data: JSON.parse(data).data[0].attributes,
  //         })
   //
  //        let responseData = "haoqia2";
  //        responseCallback(responseData);
  //    });
  });
  }

  bookQuick(){

    // let m = {
    //   'is_smoke': $('#is_smoke1')[0].className === "selected"? 1 : 2,
    //   'attendant': $('#attendant1')[0].className === "selected"? 1 : 2,
    //   'food': $('#food1')[0].className === "selected"? 1 : $('#food2')[0].className === "selected" ? 2 : 3,
    //   'remarks': $('#remarks').val()
    // }
    // console.log(m)


    if(!$('#form2').serializeArray()[0].value){
      alert('请输入起飞地点');
      return false
    }
    if(!$('#form2').serializeArray()[1].value){
      alert('请输入降落地点');
      return false
    }
    if($('.start_time').html() === '请选择起飞时间') {
      alert('起飞时间不能为空');
      return false;
    }
    if($('.return_time').html() === '请选择返回时间') {
      alert('返回时间不能为空');
      return false;
    }
    if(!$('#form').serializeArray()[0].value){
      alert('请输入姓名');
      return false
    }
    if(!$('#form').serializeArray()[1].value){
      alert('请输入手机号');
      return false
    }
    if(!(/^1[34578]\d{9}$/.test($('#form').serializeArray()[1].value))){
       alert("手机号码有误，请重新输入！");
       return false;
     }
    if(!$('#form').serializeArray()[2].value){
      alert('请输入乘机人数');
      return false
    }

    let m = {
      'is_smoke': $('#is_smoke1')[0].className === "selected"? 1 : 2,
      'attendant': $('#attendant1')[0].className === "selected"? 1 : 2,
      'food': $('#food1')[0].className === "selected"? 1 : $('#food2')[0].className === "selected" ? 2 : 3,
      'remarks': $('#remarks').val()
    }
    console.log(m)
    let params = $("#form").serializeArray();
    let j = {};
    for (let item in params) {
      j[params[item].name] = params[item].value;
    }
    console.log(j);
    let a = $('#form2').serializeArray();
    let k = {};
    for(let res in a){
      k[a[res].name] = a[res].value
    }
    console.log(k);
    let l = {
      'start_time': $('.start_time').html(),
      'return_time': $('.return_time').html(),
    };
    console.log(l);


    let c = $.extend({},j,k,l,m);
    console.log(c);


    this.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('subInfo2',{'data' : {
          "subInfo" : c
       }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }


  render(){
        const tel_num = "024-88888888";
    return(
      <div>
        <PickPlane />
        <PlaneForm data={this.state.data} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge} />
        <FeatureService />
        <div className="ser">
          <small style={{fontSize: '1.2rem'}}>如果您还有其他要求，可拨打我们的客服电话<span style={{color: '#F5A629'}}>{tel_num}</span>进行咨询，我们会尽最大的努力满足您的需要。</small>
        </div>
        <div style={{height: '50px'}}></div>
        <div className="book" onTouchStart={this.bookQuick.bind(this)}>马上预定</div>
      </div>
    );
  }
};

class PickPlane extends Component{
  render(){

    return(
      <div className="pick0">
      <form id="form2">
        <div className="pick pick1">
          <p></p>
          <h3><input name="start_city" type="text" placeholder="起飞地点" style={{"textAlign":"center"}}  /></h3>
        </div>
        <div className="pick pick2">
          <p className="ic-to"></p>
          <h3><input name="end_city" type="text" placeholder="降落地点" style={{"textAlign":"center"}}  /></h3>
        </div>
        </form>
      </div>
    );
  }
};


class PlaneForm extends Component{
  constructor(props){
    super(props);
    this.state={
      type: 'text'
    }
  }
  onhandlefocus(){
    this.setState({type: 'datetime-local'})
  }
  timePicker(){
    let self = this;
    this.props.connectWebViewJavascriptBridge(bridge =>{

      bridge.callHandler('datePicker','', function(response) {

        self.setState({
          time: response
        })
        self.refs.start_time.innerHTML = self.state.time;
        self.refs.start_time.style.color = '#000'
      })
    });
  }

  timePicker1(){
    let self = this;
    this.props.connectWebViewJavascriptBridge(bridge =>{

      bridge.callHandler('datePicker','', function(response) {

        self.setState({
          time: response
        })
        self.refs.return_time.innerHTML = self.state.time;
        self.refs.return_time.style.color = '#000'
      })
    });
  }
  render(){
    const styleObj = {
      display: 'inline-block',
      color: '#A9A9A9',
      height: '33px',
      fontSize: '1.6rem',
      lineHeight: '33px',
      verticalAlign: 'top',
      width: '85%'
    }
    return(
        <div className="form0">
          <form id="form">
            <p><span></span><a className="start_time" style={styleObj} onTouchStart={this.timePicker.bind(this)} ref="start_time">请选择起飞时间</a></p>
            <p className="checkDate2"><span></span><a className="return_time" style={styleObj} onTouchStart={this.timePicker1.bind(this)} ref="return_time">请选择返回时间</a></p>
            <p className="name2"><span></span><input type="text" placeholder="请输入姓名" name="username" /></p>
            <p className="tel2"><span></span><input type="tel" placeholder="请输入手机号" name="user_tel" maxLength='11'/></p>
            <p><span></span>
            <input type="number" placeholder="请输入人数" name="user_num" />
            </p>
            <p className="xd"><small>请提前24小时下单</small></p>
            <div className="dis"></div>
          </form>
        </div>
    );
  }
};


class FeatureService extends Component{
  constructor(){
    super();
    this.state={
      checkItem1: true,
      checkItem2: false,
      checkItem3: true,
      checkItem4: false,
      checkItem5: true,
      checkItem6: false,
      checkItem7: false,
    }
  }
  checkItem(id,e){
console.log(id)
    if(id === '1'){
      this.setState({checkItem1: true,checkItem2: false});
    }else if(id === '2'){
      this.setState({checkItem1: false,checkItem2: true})
    }else if(id === 'a'){
      this.setState({checkItem3: true,checkItem4: false})
    }else if(id === 'b'){
      this.setState({checkItem3: false,checkItem4: true})
    }else if(id === 'I'){
      this.setState({checkItem5: true,checkItem6: false,checkItem7: false})
    }else if(id === 'II'){
      this.setState({checkItem5: false,checkItem6: true,checkItem7: false})
    }else if(id === 'III'){
      this.setState({checkItem5: false,checkItem6: false,checkItem7: true})
    }
  }

  render(){
    // let a = $('.sep2 a');
    // console.log(a.length)
    // for(let i=0; i<a.length; i++ ){
    //   a[i].index = i;
    //   a[i].onclik = function(){
    //     alert(11)
    //     for(let j=0; j< a.length; j++){
    //       a[j].className = '';
    //     }
    //     this.className='select'
    //   }
    // }
    let checkItemClass = !this.state.checkItem1 ? '' :'selected';
    let checkItemClass2 = !this.state.checkItem2 ? '' :'selected';
    let checkItemClass3 = !this.state.checkItem3 ? '' :'selected';
    let checkItemClass4 = !this.state.checkItem4 ? '' :'selected';
    let checkItemClass5 = !this.state.checkItem5 ? '' :'selected';
    let checkItemClass6 = !this.state.checkItem6 ? '' :'selected';
    let checkItemClass7 = !this.state.checkItem7 ? '' :'selected';
    return(
        <div className="unique">
          <div>
            <div className="spe_services"><h2>特色服务</h2></div>
            <div className="spe_services_item">
              <h2><span>吸烟</span> <small id="is_smoke1" className={checkItemClass} onTouchStart={this.checkItem.bind(this,'1')}>是</small><small id="is_smoke2"  className={checkItemClass2} onTouchStart={this.checkItem.bind(this,'2')}>否</small></h2>
              <h2><span>乘务员</span> <small id="attendant1" className={checkItemClass3} onTouchStart={this.checkItem.bind(this,'a')}>外籍</small><small id="attendant2" className={checkItemClass4} onTouchStart={this.checkItem.bind(this,'b')}>双语</small></h2>
              <h2><span>餐食</span> <small id="food1" className={checkItemClass5} onTouchStart={this.checkItem.bind(this,'I')}>当地美食</small><small id="food2" className={checkItemClass6} onTouchStart={this.checkItem.bind(this,'II')}>清真</small><small id="food3" className={checkItemClass7} onTouchStart={this.checkItem.bind(this,'III')}>寒食</small></h2>
              <h2><span>备注</span> <input id="remarks" type="textarea" placeholder="选填 >"/> </h2>
            </div>
          </div>
        </div>
    );
  }
};
