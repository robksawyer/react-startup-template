import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Route, Link, withRouter } from "react-router-dom";

// Components
import ActiveLink from "../ui/Activelink";
import Button from '../ui/Button';

// Images
// @see https://github.com/sairion/svg-inline-react
// import InlineSVG from "svg-inline-react";

import Logo from './images/logo-wht.png';

// Styles
import styles from './TopNav.css';

const css = {
  btnLeft: 'f4 sans-serif tracked fw2 di-ns pv0 pv3-ns pr3 dim white',
  txtRight: 'f4 sans-serif tracked fw2 di-ns pv0 pl3 dim white',
  btnRight: 'fw4 di-ns pv0 pv3-ns pr3',
  borderBtn: 'f6-ns di-ns near-black br2-ns dim ba-ns ph3-ns pv0 pv2-ns hover-bg-white-ns',
  profileBtn: 'f6-ns di-ns pv0 near-black',
};

@withRouter
@inject("store")
@observer
export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    return (
      <nav>
        {/* <input type="checkbox" id="burger" className="absolute top-2 right-1 dn" />
        <label htmlFor="burger" className="dn-ns pointer absolute top-1 right-1">
          <i className="fa fa-bars white dib f3"></i>
        </label> */}
        <div className="dib-ns overflow-hidden menu db-ns w-100-ns list tl pa2 f3 fw3 f5-ns">
          {/* Left section */}
          <div className="fl-ns dn w-30-ns">
            <ul className="pt1 pb1-ns pl3 tl">
              <li className={`${css.btnLeft} dib-ns`}>
                <ActiveLink activeOnlyWhenExact={true}  to="/"><img className="logo" src={Logo} alt="logo"/></ActiveLink>
              </li>
            </ul>
          </div>
          {/* Middle section */}
          <div className="fl-ns w-50-ns">
            <ul className="pv3-ns pl3 pr5-ns tr-ns">
              <li className={`${css.txtRight} dib-ns`}>
                {/* <ActiveLink activeOnlyWhenExact={true}  to="/pricing">Pricing</ActiveLink> */}
              </li>
            </ul>
          </div>
          {/* Right section */}
          <div className="fl-ns w-20-ns">
            <ul className="pv3-ns pl3 pr5-ns tr-ns">
              <li className={`${css.txtRight} dib-ns`}>
                {/* <ActiveLink activeOnlyWhenExact={true}  to="/pricing">Pricing</ActiveLink> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
