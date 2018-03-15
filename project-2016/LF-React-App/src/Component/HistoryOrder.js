import React,{Component} from 'react';
import ShipHisOrder from './tabContent/ShipHisOrder';
import PlaneHisOrder from './tabContent/PlaneHisOrder';
import SelfDriveHisOrder from './tabContent/SelfDriveHisOrder';
import SpecialCarHisOrder from './tabContent/SpecialCarHisOrder';
// import $ from 'jquery';
import '../Style/historyOrder.css';

export default class HistoryOrder extends Component{

  constructor(){
    super();
    this.state={
      tabs:[
        {tabName:"游艇",id:1,key:"yacht"},
        {tabName:"自驾",id:2,key:"selfDrive"},
        {tabName:"专车",id:3,key:"specialCar"},
        {tabName:"飞机",id:4,key:"airPlane"}
      ],
      data: [],
      tabId: 1
    }
  }

  loadDataFromServer(){
    fetch('./src/data/data.json').then(response => response.json())
      .then(data => {
        this.setState({data: data.data});
      })
      .catch(e => console.log("没拿到数据啊啊啊啊！！！" ))
    // $.ajax({
    //   url: './src/data/data.json',
    //   type: 'get',
    //   dataType: 'json',
    //   error: function(err,status,xhr){
    //     console.log(err);
    //     console.log(status);
    //   },
    //   success: function(msg){
    //     console.log(msg)
    //   }
    // });
  }

  componentDidMount(){
    this.loadDataFromServer();
  }

  tabChoiced(type,index){
    this.setState({
      tabId: type
    });
    console.log(this.state.tabId);
  }

  render(){
    let choiced = {
      borderBottom: "3px solid #4BDC9B",
      color: "#4BDC9B",
      fontWeight: "bold"
    }
    let noChoice = {
      fontWeight: "bold",
      color: "#aaa"
    }
    let loadType = '' ;

    let tabList = this.state.tabs.map((item,index) =>{
      let myStyle = noChoice;
      if(item.id == this.state.tabId){
        myStyle = choiced;
      }
      if(this.state.tabId == 1){
        loadType = <ShipHisOrder />
      }
      if(this.state.tabId == 2){
        loadType = <SelfDriveHisOrder />
      }
      if(this.state.tabId == 3){
        loadType = <SpecialCarHisOrder />
      }
      if(this.state.tabId == 4){
        loadType = <PlaneHisOrder />
      }
      return(
        <a className="his-tab" key={index} onTouchStart={this.tabChoiced.bind(this,item.id,index)} style={myStyle}>{item.tabName}</a>
      );
    });

    return(
      <div>
        <div className="tab-line">
          {tabList}
        </div>
        <div className="dis"></div>
        {loadType}
      </div>
    );
  }
};
