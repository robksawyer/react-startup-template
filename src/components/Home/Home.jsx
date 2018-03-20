import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Match, Link, withRouter } from 'react-router-dom';

// Components
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { DefaultPlayer as Player } from 'react-html5video';

// Component Styles
import 'react-html5video/dist/styles.css';

// Icons
import MdDvr from 'react-icons/lib/md/dvr';
import MdCheckBox from 'react-icons/lib/md/check-box';
import FaCode from 'react-icons/lib/fa/code';
import MdPeople from 'react-icons/lib/md/people';
import MdLockOutline from 'react-icons/lib/md/lock-outline';
import MdCode from 'react-icons/lib/md/code';
import MdEventNote from 'react-icons/lib/md/event-note';
import MdFormatAlignCenter from 'react-icons/lib/md/format-align-center';
import TiArrowRightThick from 'react-icons/lib/ti/arrow-right-thick';
import PhoneLinkLock from 'react-icons/lib/md/phonelink-lock';

// Local Components
import Footer from '../Footer';
import Stripes from '../Stripes';
import Header from '../Header';
import Pricing from '../Pricing';
import MaterialRaisedButton from '../forms/MaterialRaisedButton';

// Styles
import styles from './Home.css';

// static html files
// import projectHtml from '../../static/project.html';
// import singleHtml from '../../static/single.html';
// import followupHtml from '../../static/followup.html';
// import smallProjectHtml from '../../static/small-project.html';
// import mediumProjectHtml from '../../static/medium-project.html';
// import largeProjectHtml from '../../static/large-project.html';
// import commentHtml from '../../static/comments.html';

// Videos
import demoVideo from '../../video/get-code-cleaner-demo.mp4';

// Images
import banner from '../images/banner.jpg';
import airbnb from './images/logos/airbnb-300.png';
import github from './images/logos/github-200.png';
import google from './images/logos/google-300.png';
import paypal from './images/logos/paypal-300.png';
import microsoft from './images/logos/microsoft-300.png';

@inject("store")
@withRouter
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    const store = this.store;

    const { id } = this.props.match.params;

    const sectionHeader = 'f3 lh-title fw2 tl mint-green ttu';
    const sectionCopy = 'f5 fw2 lh-copy mint-gray';

    return (
      <div className="absolute w-100 home z-1">
        <header className="cf relative bg-none z-1">
          <Stripes />
          <Header id={id} />
        </header>
        <div className="cf relative w-100 z-2 mt6-ns mt6-m mt7">
          <div className="fl w-30-ns w-0 w-0-m pa2-ns pa0 pa0-m" />
          <div className="fl w-60-ns w-100 w-100-m pa2 tr">
            <h2 className={`${sectionHeader}`}>
              Lorem Ipsum is simply dummy text of the
            </h2>
            {/* <small>Not only five centuries, but also the leap into electronic.</small> */}
            <ul className={`${sectionCopy} cf tl pv3 list pl0`}>
              <li className="cf w-100 pv2">
                <PhoneLinkLock className="fl f2 w-20 pt2" />
                <div className="fl f5 lh-copy w-75 pt0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              </li>
              <li className="cf w-100 pv2">
                <MdLockOutline className="fl f2 w-20 pt2" />
                <div className="fl f5 lh-copy w-75 pt0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac nisi in mauris tincidunt bibendum. </div>
              </li>
            </ul>
            <a href="/project" className="big-link db pv4 dim mt3 w-100">Start the process <TiArrowRightThick /></a>
          </div>
          <div className="fl w-20 w-20-ns w-0 w-0-m pa2-ns pa0 pa0-m" />
        </div>

        {/* Pricing */}
        <div id="pricing" className="relative grad1 pv3">
          <Pricing />
        </div>

        <div className="w-100 center tl p0 bg-mint-light-gray bb bw2 b--light-gray">
          <Player
            autoPlay loop muted
            controls={[]}
          >
            <source src={demoVideo} type="video/mp4" />
          </Player>
        </div>

        <div id="standards" className="cf w-75-ns w-100-m w-100 center tl pv5">
          <div className="fl w-20 tr pa2">
            <MdCheckBox className="f1 mint-green ph2" />
          </div>
          <div className="fl w-80 pa2">
            <h2 className={sectionHeader}>
              <span className="">Duis id ipsum dui?</span>
            </h2>
            <ul className={`${sectionCopy} pv3`}>
              <li>Vestibulum porttitor ligula in velit blandit fringilla</li>
              <li>Sed cursus turpis at ullamcorper convallis</li>
              <li>A rhoncus neque scelerisque</li>
            </ul>
            <div className="cf w-100 f7">
              <div className="fl-ns w-third-ns w-100 pv0-ns pv2 pa2">
                <a href="https://isobar-idev.github.io/code-standards/" target="_blank" className="mint-gray link dim">ISOBAR Code Standards</a>
              </div>
              <div className="fl-ns w-third-ns w-100 pv0-ns pv2 pa2">
                <a href="https://www.w3.org/standards/" target="_blank" className="mint-gray link dim">W3C Code Standards</a>
              </div>
              <div className="fl-ns w-third-ns w-100 pv0-ns pv2 pa2">
                <a href="http://www.ecma-international.org/publications/standards/Ecma-262.htm" target="_blank" className="mint-gray link dim">Standard ECMA-262</a>
              </div>
            </div>
            <a href="https://www.webstandards.org/learn/faq/index.html#p221" target="_blank" className="big-link db pv4 dim mt3 tr w-100">Read more <TiArrowRightThick /></a>
          </div>
        </div>

        <div className="w-100 pv1 grad1"></div>

        <div className="w-75-ns w-100-m w-100 center tc pv5-ns pv3">
          <div className="dib-ns w-20-ns w-40-m w-50 center ph3">
            <img src={airbnb} className="h2 pv3" alt="airbnb" />
          </div>
          <div className="dib-ns w-20-ns w-40-m w-50 center ph3">
            <img src={microsoft} className="h2 pv3" alt="microsoft" />
          </div>
          <div className="dib-ns w-20-ns w-40-m w-50 center ph3">
            <img src={paypal} className="h2 pv3" alt="paypal" />
          </div>
          <div className="dib-ns w-20-ns w-40-m w-50 center ph3">
            <img src={github} className="h2 pv3" alt="github" />
          </div>
          <div className="dib-ns w-20-ns w-40-m w-50 center ph3">
            <img src={google} className="h2 pv3" alt="google" />
          </div>
        </div>

        <div className="w-100 pv2 grad3" />

        <div className="cf w-75-ns w-100-m w-100 center tl pv5">
          <div className="fl w-20 tr pa2">
            <FaCode className="f1 mint-green ph2" />
          </div>
          <div className="fl w-80 pa2">
            <h2 className={sectionHeader}>
              <span className="">We&apos;re serious about nothing.</span>
            </h2>
            <p className={`${sectionCopy} pv3`}>
              Fusce volutpat vulputate auctor. Duis id ipsum dui. Quisque
              facilisis purus ut nisl dignissim, a rhoncus neque scelerisque.
            </p>
          </div>
        </div>
        <Footer>
          Copyright &copy; 2018 React Startup Template
        </Footer>
      </div>
    );
  }
}
