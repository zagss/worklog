import React,{Component} from 'react'
import "../Style/longTermLovelyCar.css";
document.getElementsByTagName('body')[0].style.background= '#f5f5f5';
export default class LongTermLovelyCar extends Component{
  render(){
    return(
      <div className="ltlc">
        <div className="lt-content">
        <form>
        <p><span>车牌号</span><input type="number" placeholder="请输入您的车牌号" /></p>
        <p><span>理想价位</span><input type="number" placeholder="请输入爱车的理想价位" /></p>
        <p><span>车型品牌</span><input type="text" placeholder="请输入爱车的品牌" /></p>
        <p><span>购车年份</span><input type="number" placeholder="请输入您的购车年份" /></p>
        <p><span>姓名</span><input type="text" placeholder="请输入您的姓名" /></p>
        <p><span>联系电话</span><input type="tel" placeholder="请输入手机号码"  maxLength='11'/></p>
        </form>
        <Book />
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
        <p>提交</p>
      </div>
    );
  }
}
