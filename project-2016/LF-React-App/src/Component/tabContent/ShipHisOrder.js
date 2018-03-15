import React,{Component} from 'react';

export default class ShipHisOrder extends Component{
  constructor(){
    super();
    this.state={

    }
  }




  render(){
    return(
      <div className="his-col">
        <div className="his-col1"><p><span className="ship-bg"></span>游艇</p><p>未完成</p></div>
        <div className="his-col2"><p><img src="1.jpg" /></p><p><span>天宝一号</span><span>大鹏游艇会</span></p><p>￥2500</p></div>
        <div className="his-col4"><p>2016/03/20 18:30 出发</p><p><span>删除订单</span><span>再次预约</span></p></div>
      </div>
    );
  }
};
