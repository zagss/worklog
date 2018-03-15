import React,{Component} from 'react'
import { reachBottom,url } from './Common/api'
import $ from 'jquery'
import '../Style/yachtHoliday.css'
import '../Style/specialCarList.css'






let modalStyle= 'modal-close';
let dropdownClass = 'menu-close';
let body = document.getElementsByTagName('body')[0];
export default class SpecialCarList extends Component{
  constructor(){
    super();
    this.state={
      tabs:[
        {tabName:"车型",id:1,key:"lengths"},
        {tabName:"品牌",id:2,key:"prices"},
        {tabName:"价格",id:3,key:"types"},
        {tabName:"综合排序",id:4,key:"areas"}
      ],
      data:[],
      loaded: false, //初始数据是否加载
      menu: [],
      yachtList: [],
      currentIndex: -1,
      modalState: "hide",
      tabData: [],
      dataTab: {
        'lengths': -1,
        'prices': -1,
        'types': -1,
        'areas': -1,
      },
      dataNav: []
    }

    this.handleScrollEvent = this.handleScroll.bind(this)
  }

  // loadDataFromServer(){
  //   fetch("http://192.168.1.202:8010/api/v1/CarProMidd?filter[id_city]=9EAD4557-A2A4-7599-D77B-36BCA7478F5B&filter[car_type]=2").then(response => response.json())
  //     .then(data =>{
  //       console.log(data);
  //       this.setState({
  //         yachtList: data.data,
  //       });
  //       this.setState({
  //         yachtList: this.state.yachtList.concat(data.data)
  //       })
  //       console.log(this.state.data);
  //     })
  //     .catch(e => console.log('拿不到数据？'))
  // }
  // loadDataFromServer2(){
  //   fetch("http://192.168.1.202:8010/api/v1/car_tag").then(response =>{
  //     return response.json();
  //   }).then(data =>{
  //     console.log("data:"+data)
  //     this.setState({
  //       tabData: data.data
  //     })
  //     console.log(this.state.tabData)
  //   })
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
    window.addEventListener('scroll',this.handleScrollEvent);
    // this.loadDataFromServer();
    // this.loadDataFromServer2();



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
   bridge.registerHandler("SelfCarListPage", (data, responseCallback) =>{

     let responseData = "haoqia";
     responseCallback(responseData);
        self.setState({
          yachtList: JSON.parse(data).data
        })
        // self.setState({
        //   yachtList: self.state.yachtList.concat(self.state.yachtList)
        // })
   });

   bridge.registerHandler("carTag", (data, responseCallback) =>{

     let responseData = "haoqia";
     responseCallback(responseData);
        self.setState({
          tabData: JSON.parse(data).data
        })

   });
});
}


  componentWillUnmount(){
    window.removeEventListener('scroll',this.handleScrollEvent);
  }

  handleScroll(){
    console.log('监听到scroll事件了')
    if(reachBottom()){
      console.log('滚动到底了')
      // fetch("http://192.168.1.204:8010/api/v1/CarProMidd?filter[id_city]=9EAD4557-A2A4-7599-D77B-36BCA7478F5B&filter[car_type]=2").then(response => {
      //   return response.json();
      // }).then(data => {
      //   this.setState({
      //     yachtList: this.state.yachtList.concat(data.data)
      //   })
      // })
    }
  }


  showModal(active){
    this.setState({
      modalState: active
    })
  }

  touchHandler(e,index){
    console.log(e);
    let menuType;
    if(e === 'lengths'){
       menuType = this.state.tabData.car_type;
       this.setState({
         dataNav: e
       })
    }else if(e === 'prices'){
      menuType = this.state.tabData.car_brand;
      this.setState({
         dataNav: e
       })
    }else if(e === 'types'){
      menuType = this.state.tabData.car_price;
      this.setState({
         dataNav: e
       })
    }else if(e === 'areas'){
      menuType = this.state.tabData.sort;
      this.setState({
         dataNav: e
       })
    }
    this.setState({
      menu: menuType,
      currentIndex: index
    });
  }



  checkTabIndex(index){
    if(dropdownClass == 'menu-open'){
      return index === this.state.currentIndex ? 'turnLight': '';
    }
  }

  render(){
    // let newsList = this.state.newsList.map((news,index) =>{
    //   return (
    //     <div key={index}>
    //       <h1>{news.title}</h1>
    //       <p>{news.content}</p>
    //     </div>
    //   );
    // })

    return(
      <div className="scl">
        <div><Header {...this.state} showModal={this.showModal.bind(this)} touchHandler={this.touchHandler.bind(this)}
          handleScroll = {this.handleScroll.bind(this)} connectWebViewJavascriptBridge={this.connectWebViewJavascriptBridge.bind(this)}
        menu={this.state.menu} dataTab={this.state.dataTab} dataNav={this.state.dataNav}/></div>
      </div>
    );
  }
}


class Header extends Component{
  constructor(props){
    super(props)
  }
  touchHandle(e,index){
    this.props.showModal('active');
    this.props.touchHandler(e,index);
  }

  onToucthClass(index){
    if(this.props.modalState == "active"){
      return index === this.props.currentIndex ? 'turnLight': '';
    }
  }
  choiceItem(id,key){
    // console.log(id + key)
    if(key==='lengths'){
      this.props.dataTab.lengths = id
    }
    if(key==='prices'){
      this.props.dataTab.prices = id
    }
    if(key==='types'){
      this.props.dataTab.types = id
    }
    if(key==='areas'){
      this.props.dataTab.areas = id
    }

    // console.log(this.props.dataTab)
    $('#'+id)[0].className = 'choose_light'
    $('#'+id).parent().siblings().children().removeClass('choose_light')
  }
  componentDidUpdate(){
    let id1 = this.props.dataTab.lengths;
    let id2 = this.props.dataTab.prices;
    let id3 = this.props.dataTab.types;
    let id4 = this.props.dataTab.areas;
    if(this.props.dataNav ==='lengths' && id1 != -1){
      $('#'+ id1)[0].className = 'choose_light'
    }
    if(this.props.dataNav ==='prices' && id2 != -1){
      $('#'+ id2)[0].className = 'choose_light'
    }
    if(this.props.dataNav ==='types' && id3 != -1){
      $('#'+ id3)[0].className = 'choose_light'
    }
    if(this.props.dataNav ==='areas' && id4 != -1){
      $('#'+ id4)[0].className = 'choose_light'
    }
  }


  render(){
    let showOrHide=this.props.modalState;
    let modalShow="translateY(0)";
    let modalHide="translateY(-100%)";
    let maskShow="block";
    let maskHide="none";
    let translateY=showOrHide=='active' ? modalShow : modalHide;
    let display=showOrHide=='active' ? maskShow : maskHide;

    let modal_mask={
      width: "100%",
      height: "100%",
      overflow: "hidden",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      zIndex: "10000",
      transition:"display 0.3s",
      WebkitTransition:"display 0.3s",
      backgroundColor: "rgba(0,0,0,0.5)",
      "display":display
    };

    let bui_modal={
        position:"absolute",
        background:"#fff",
        zIndex:"10000",
        boxShadow:"0 0 24px rgba(0, 0, 0, 1)",
        transition:"transform 0.3s, opacity 0.3s",
        WebkitTransition:"-webkit-transform 0.3s, opacity 0.3s",
        MozTransition:"-moz-transform 0.3s, opacity 0.3s",
        transform: translateY,
	      bottom: "0",
        WebkitTtransform: translateY,
        width: "100%",
        height: "23rem",
        display: display,
        left: "0px",
        top: "0px",
        paddingTop: '50px'
    };

    let tablist = this.props.tabs.map((item,index) =>
      <a key={index} onTouchStart={this.touchHandle.bind(this,item.key,index)} className={this.onToucthClass(index)} >{item.tabName}<span></span></a> )
    let menu = this.props.menu.map((item,index) => <p key={index+item.id} ><span id={item.id} onTouchStart={this.choiceItem.bind(this,item.id,item.key)}>{item.pro_val}</span></p>)
    return(
      <div>
        <nav>
          <div className="YH-N">
            {tablist}
          </div>
        </nav>
        <div className="scl-m">
          <div style={modal_mask} onClick={ () =>this.props.showModal('hide')}></div>
          <div style={bui_modal}>
            {menu}
          </div>
        </div>
        <div className="scl-list"  onScroll ={this.props.handleScroll}>
          <List yachtList={this.props.yachtList} connectWebViewJavascriptBridge ={this.props.connectWebViewJavascriptBridge} />
        </div>
      </div>
    );
  }
}


class List extends Component{
  constructor(){
    super();
    this.state={
      currentClick: 1
    }
    let clickHandle = this.clickHandle.bind(this)
  }
  clickHandle(id,e){

    e.target.className = e.target.className == ''? 'heart-hover' : '';

    this.props.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('CollectClick', {'action':'collection','data': {
          'type': 'collection',
          'id': null,
          'attributes':{
            "id_user": "",
            "id_type": 1,
            "status": 2,
            "id_model": id
          }
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }
  // checkHeartClick(id){
  //   console.log("id--"+id);
  //   return id== this.state.currentClick ? 'heart-hover': ''
  // }
  jumpPage(id,res){
    // window.location.href="http://www.baidu.com"
    this.props.connectWebViewJavascriptBridge(bridge =>{
      bridge.callHandler('intent', {'action':'OrderCar','data': {
          'data': JSON.stringify(res),
          'ID': id
      }}, function(response) {
        alert('成功相应了', response)
      })
    });
  }
  render(){
    return(
      <div>
        <div className="occupy"></div>
        {this.props.yachtList.map((res,index) =>{
          let imgUrl1 = url()+res.attributes.cover_img;
          let imgUrl2 = url()+res.attributes.brand_img;
          let timeNow = Math.round(new Date().getTime()/1000);
          let timeOld = res.attributes.addtime;
          let timeDif = Math.round((timeNow-timeOld)/(60*60*24));
          if(timeDif<7){
          return(
            <div  className="scl_content" key={index}>
              <div className="YH-Img">
              <div onClick={this.jumpPage.bind(this,res.id,res)} style={{height: '18.99rem'}}>
              <img src={imgUrl1}  />
              </div>
                <p className="gold2">{res.attributes.day_price}</p>
                {/*<span  onClick={this.clickHandle.bind(this,res.id)}></span>*/}
              </div>
              <div className="YH-Img-S">
                <p className="title1">{res.attributes.car_name}</p>
                <p className="title2">{res.attributes.intro}</p>
              </div>
              <span className="circle_icon"><img src={imgUrl2} /></span>
            </div>
          );
        }else{
          return(
            <div  className="scl_content" key={index}>
              <div className="YH-Img">
                <div onClick={this.jumpPage.bind(this,res.id,res)} style={{height: '18.99rem'}}>
                <img src={imgUrl1}  />
                </div>
                <p className="gold2">
                  {res.attributes.day_price}
                </p>
                {/*<span  onClick={this.clickHandle.bind(this,res.id)}></span>*/}
                <i></i>
              </div>
              <div className="YH-Img-S">
                <p className="title1">{res.attributes.car_name}</p>
                <p className="title2">{res.attributes.intro}</p>
              </div>
              <span className="circle_icon"><img src={imgUrl2} /></span>
            </div>
          );
        }
        })}
      </div>
    );
  }
}
