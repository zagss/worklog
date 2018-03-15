import React,{Component} from 'react';
import '../../Style/header.css';

let nav = [
	{
		key: 1,
		list:'舰长',
		menu: [
			{text: '100×300'},{text: '200×500'},{text: '200×800'},{text: '100×500'},{text: '200×600'}
		]
	},
	{
		key: 2,
		list:'价格',
		menu: [
			{text: '2000'},{text: '30000'},{text: '50000'},{text: '3200'},{text: '1100'},{text: '1100'},{text: '不限'}
		]
	},
	{
		key: 3,
		list:'类别',
		menu: [
			{text: '经济型'},{text: '实用性'},{text: '豪华型'},{text: '舒适型'}
		]
	},
	{
		key: 4,
		list:'产地',
		menu: [
			{text: '非洲'},{text: '越南'},{text: '加勒比'},{text: '中东'},{text: '印度'},{text: '老挝'},{text: '泰国'},{text: '里约'}
		]
	}
];

let dropdownClass = 'menu-dropdown';

export default class NavHeader extends Component {
	constructor(){
		super();
		this.state = {
			currentIndex:-1,
			menu:[]
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(index){
		if(this.state.currentIndex === index){
			dropdownClass = dropdownClass === 'menu-dropdown' ? 'menu-dropdown-open' : 'menu-dropdown';
			this.setState({
				currentIndex:index
			});
			return
		}
		dropdownClass = 'menu-dropdown-open';
		this.setState({
			currentIndex:index,
			menu: nav[index]['menu']
		});

	}

	checkTitleIndex(index){
		if(dropdownClass == 'menu-dropdown-open'){
			return index===this.state.currentIndex ? 'tab-title active-on' : 'tab-title';
		}
	}


	render(){
		return <div className="yachtTour-tab">
			{/*生成Tab导航*/}
			 <div className="lafeng-header">
				{nav.map((name,index) => <a key={name.key} onClick={this.handleClick.bind(this,index)} className={this.checkTitleIndex(index) }>{name.list}<span></span></a>)}
			</div>
			<TabContent  menu={this.state.menu} />
		</div>
	}
};


class TabContent extends Component{
  constructor(props){
    super(props);
    this.state = {
      detail: [],
      currentIndex : -1
    };
  }
  checkItemIndex(index){
    return index === this.state.currentIndex ? 'touch-list-on' : 'touch-list';
  }

  // componentWillReceiveProps(nextprops){
  //   this.setState({
  //     detail: nextprops.detail
  //   })
  // }
  render(){
    return(
      <div className="modal">
  				<div className={dropdownClass} data-style="dropdownMenu">
  					{this.props.menu.map((name,index) => <p><a key={index} onClick={() => {this.setState({currentIndex : index})} } className={ this.checkItemIndex(index)}>{name.text}</a></p>)}
  				</div>
    	</div>
    );
  }
}
