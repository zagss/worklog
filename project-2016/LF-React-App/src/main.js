
import React,{Component} from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import { createHistory, useBasename } from 'history'

import './Style/main.css'



import PlaneReserve from './Component/PlaneReserve.js'
import ReserveSuccess from './Component/ReserveSuccess.js'
import ReserveFail from './Component/ReserveFail.js'
import SpellPlane from './Component/SpellPlane.js'
import FlightDetail from './Component/FlightDetail.js'
import CheapPlane from './Component/CheapPlane.js'
import CheapDetail from './Component/CheapDetail.js'
import Preferential from './Component/Preferential.js'
import EventDetail from './Component/EventDetail.js'
import Order from './Component/Order.js'
import OrderDetailSpellPlane from './Component/OrderDetailSpellPlane.js'
import OrderDetailCheapPlane from './Component/OrderDetailCheapPlane.js'
import OrderDetailSpecialPlane from './Component/OrderDetailSpecialPlane.js'
import HistoryOrder from './Component/HistoryOrder.js'
import YachtHoliday from './Component/YachtHoliday.js'
import YachtDetail from './Component/YachtDetail.js'
import YachtOrder from './Component/YachtOrder.js'
import PaySuccess from './Component/PaySuccess.js'
import PayFail from './Component/PayFail.js'
import RouteDetail from './Component/RouteDetail.js'
import OrderCar from './Component/OrderCar.js'
import OrderSpecialCar from './Component/OrderSpecialCar.js'
import LongTermOrder from './Component/LongTermOrder.js'
import PayCarSuccess from './Component/PayCarSuccess.js'
import HelicopterBook from './Component/HelicopterBook.js'
import LongTermLovelyCar from './Component/LongTermLovelyCar.js'
import PickCarAuto from './Component/PickCarAuto.js'
import PlaneReserveDouble from './Component/PlaneReserveDouble.js'
import SpecialCarList from './Component/SpecialCarList.js'
import SelfCarList from './Component/SelfCarList.js'
import SelfCarOrderDetail from './Component/SelfCarOrderDetail.js'
import CharterHelicopter from './Component/CharterHelicopter.js'
import SpellHelicopter from './Component/SpellHelicopter.js'
import SpellHelicopterBook from './Component/SpellHelicopterBook.js'
import OrderDetailShip from './Component/OrderDetailShip.js'
import OrderDetailHelicopter from './Component/OrderDetailHelicopter.js'
import OrderDetailSelfCar from './Component/OrderDetailSelfCar.js'
import OrderDetailGreenCar from './Component/OrderDetailGreenCar.js'
import TermsOfService from './Component/TermsOfService.js'
// const history = useBasename(createHistory)({
//   basename: '/React-Router'
// });
let history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
class Roots extends Component{
  render(){
    return(
      <div>{this.props.children}</div>
    );
  }
}

render((
  <Router>
    <Route path="/" component={Roots}>
      <Route path="/PlaneReserve" component={PlaneReserve} />
      <Route path="/ReserveSuccess" component={ReserveSuccess} />
      <Route path="/ReserveFail" component={ReserveFail} />
      <Route path="/SpellPlane" component={SpellPlane} />
      <Route path="/FlightDetail" component={FlightDetail} />
      <Route path="/CheapPlane" component={CheapPlane} />
      <Route path="/CheapDetail" component={CheapDetail} />
      <Route path="/Preferential" component={Preferential} />
      <Route path="/EventDetail" component={EventDetail} />
      <Route path="/Order" component={Order} />
      <Route path="/OrderDetailSpecialPlane" component={OrderDetailSpecialPlane} />
      <Route path="/OrderDetailSpellPlane" component={OrderDetailSpellPlane} />
      <Route path="/OrderDetailCheapPlane" component={OrderDetailCheapPlane} />
      <Route path="/HistoryOrder" component={HistoryOrder} />
      <Route path="/YachtHoliday" component={YachtHoliday} />
      <Route path="/YachtDetail" component={YachtDetail} />
      <Route path="/YachtOrder" component={YachtOrder} />
      <Route path="/PaySuccess" component={PaySuccess} />
      <Route path="/PayFail" component={PayFail} />
      <Route path="/RouteDetail" component={RouteDetail} />
      <Route path="/OrderCar" component={OrderCar} />
      <Route path="/OrderSpecialCar" component={OrderSpecialCar} />
      <Route path="/LongTermOrder" component={LongTermOrder} />
      <Route path="/PayCarSuccess" component={PayCarSuccess} />
      <Route path="/HelicopterBook" component={HelicopterBook} />
      <Route path="/LongTermLovelyCar" component={LongTermLovelyCar} />
      <Route path="/PickCarAuto" component={PickCarAuto} />
      <Route path="/PlaneReserveDouble" component={PlaneReserveDouble} />
      <Route path="/SpecialCarList" component={SpecialCarList} />
      <Route path="/SelfCarList" component={SelfCarList} />
      <Route path="/SelfCarOrderDetail" component={SelfCarOrderDetail} />
      <Route path="/SpellHelicopter" component={SpellHelicopter} />
      <Route path="/CharterHelicopter" component={CharterHelicopter} />
      <Route path="/SpellHelicopterBook" component={SpellHelicopterBook} />
      <Route path="/OrderDetailShip" component={OrderDetailShip} />
      <Route path="/OrderDetailHelicopter" component={OrderDetailHelicopter} />
      <Route path="/OrderDetailSelfCar" component={OrderDetailSelfCar} />
      <Route path="/OrderDetailGreenCar" component={OrderDetailGreenCar} />
      <Route path="/TermsOfService" component={TermsOfService} />
    </Route>
  </Router>
  ),document.body.appendChild(document.createElement('div'))
);
