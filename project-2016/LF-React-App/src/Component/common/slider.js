import React,{Component} from 'react';
import Slider from 'react-slick';
import { Button } from 'antd';

let ShipData =[
	{
		key: 1,
		src :'2.jpg',
		name: '天宝一号',
		title: '大师监制 优美流线 舒适游艇',
		price: '2500',
		local: '深圳',
		group: '大鹏游艇会',
		type: '经济型'
	},
	{
		key: 3,
		src :'1.jpg',
		name: '天宝三号',
		title: '优美流线 舒适游艇',
		price: '3500',
		local: '青岛',
		group: '大鹏游艇会',
		type: '豪华型'
	},
	{
		key: 3,
		src :'1.jpg',
		name: '天宝三号',
		title: '优美流线 舒适游艇',
		price: '3500',
		local: '青岛',
		group: '大鹏游艇会',
		type: '豪华型'
	}
];


export default class SliderExample extends Component{
	constructor(){
		super()
		this.state={
			imgs: []
		}
	}
	componentWillReceiveProps(nexprops){
		console.log(nexprops)
		ShipData = nexprops.imgs
	}
	componentDidMount(){
		console.log(ShipData)
	}
	render(){
		let settings = {
			dots : true,
			infintie : true,
			autoplay : true,
			speed : 500,
			arrows : false,
			slidesToShow : 1,
			slidesToScroll : 1
		};


		let imglist = ShipData.map((item,index) =><div key={index} className="slick-pic"><img src={item.img} style={{width: '100%',height:'100%'}} /></div>)
		return (
			<Slider {...settings}>
				{imglist}
			</Slider>
		);
	}
};
