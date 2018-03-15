import React,{Component} from 'react';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import '../../Style/shipList.css';

let ShipData =[
	{
		key: 1,
		src :'http://d3.freep.cn/3tb_160818161850bv4p571817.jpg',
		name: '天宝一号',
		title: '大师监制  舒适游艇',
		price: '2500',
		local: '深圳',
		group: '大鹏游艇会',
		type: '经济型'
	},
	{
		key: 2,
		src :'http://d2.freep.cn/3tb_160818161850w37q571817.jpeg',
		name: '天宝二号',
		title: '大师监制 舒适游艇',
		price: '5500',
		local: '上海',
		group: '大鹏游艇会',
		type: '舒适型'
	},
		{
		key: 3,
		src :'http://d3.freep.cn/3tb_1608181618491vuc571817.jpg',
		name: '天宝三号',
		title: '优美流线 舒适游艇',
		price: '3500',
		local: '青岛',
		group: '大鹏游艇会',
		type: '豪华型'
	}
];





export default class ShipList extends Component{
  constructor(){
    super();
    this.state = {

    }
  }



  render(){
    return(
      <div>
          <ShipLists data={ShipData} />
      </div>
    );
  }
}
let heartClass = 'heart';
class ShipLists extends Component{
  constructor(){
		super();
		this.state={
			currentIndex : -1
		};
	}

  handleClick(index){
    if(this.state.currentIndex == index){
      heartClass = heartClass === 'heart'? 'heart-on' : 'heart';
        this.setState({currentIndex:index});
    }
    heartClass = 'heart-on';
    this.setState({currentIndex:index});
    console.log(this.state.currentIndex,index);
  }
  render(){
    return(
      <div className="contents">
      				{this.props.data.map((img,index) =>{
      					return(
      						<div className="shipContents" key={'dd'+ index}>
      							<img src={img.src}/>
      							<div>
      								<h2>{img.title}</h2>
      								<p>{img.name}</p>
      							</div>
      							<div>
      								<span></span>
      								<span>{img.local}</span>
      								<span></span>
      								<span>{img.group}</span>
      								<span>{img.type}</span>
      								<span>★★★★★</span>
      								<span className={heartClass} onClick={this.handleClick.bind(this,index)}></span>
      								<span><b>{img.price}</b>起/时</span>
      							</div>
      						</div>
      					);
      				})}
      	</div>
    );
  }
}
