/**
 * Pricing.jsx
 */
import React, { Component } from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { Match, Link, withRouter } from "react-router-dom";

// Components
import MaterialRaisedButton from '../forms/MaterialRaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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

// Styles
import styles from './Pricing.css';
import { supportEmail } from '../../utils/constants';

@inject("store")
@observer
@withRouter
export default class Pricing extends Component {

  constructor(props) {
    super(props);
    this.store = this.props.store;
    console.log(this.props);
  }

  changeLocation = loc => () => {
    console.log(`Changing location to ${loc}`);
    this.props.history.push(loc);
    window.location.replace(loc);
  }

  sendMail = subject => () => window.location.replace(`mailto:support@getcleanercode.com?subject=${subject}`);

  render() {
    const store = this.store;

    const sectionHeader = "f3 lh-title mint-green";
    const sectionCopy = "f5 fw3 lh-copy mint-gray";

    return (
      <div className="pricing">
        <div className="cf z-2 relative pb2">
          <div className="w-100 pa2 tc">
            <h1 className="f1-ns f2-m f3 fw2 lh-title white">Simple, transparent pricing.</h1>
            <h5 className="f2-ns f3-m f4 fw2 lh-title pa0 white">Always know what you’ll pay.</h5>
          </div>
        </div>
        <div className="cf z-2 relative pv3 pricing">
          <div className="fl-ns mt2 w-100 w-100-m w-third-ns">
            <Card className="w-75 center fx link pointer" onClick={this.sendMail('Single%20File%20Submission')}>
              <CardTitle className="bb bw1 b--mint-light-gray" title="SINGLE FILE" titleColor="#24b47e" titleStyle={{ textAlign: 'center' }} />
              <CardText className="h5">
                <div className="center tc">
                  <h2 className="f1 fw2 lh-title mint-green">$25</h2>
                  <small className="f4 fw2 lh-title moon-gray">per file</small>
                </div>
                <p className="lh-copy pv3 mint-gray">
                  Don't have time to fool around with cleaning scripts. Or, have a specific formatting? Either way, we can handle it.
                </p>
              </CardText>
              <CardActions className="bg-mint-light-gray">
                <FlatButton className="center w-100" backgroundColor="#f6f9fc" label="Start now" />
              </CardActions>
            </Card>
          </div>
          <div className="fl-ns mt2 w-100 w-100-m w-third-ns">
            <Card className="w-75 center fx link pointer" onClick={this.sendMail('Project%20Submission')}>
              <CardTitle className="bb bw1 b--mint-light-gray" title="FULL PROJECT" titleColor="#24b47e" titleStyle={{ textAlign: 'center' }} />
              <CardText>
                <div className="">
                  <div className="cf center tc">
                    <div className="fl w-third pa1">
                      <h2 className="f3 fw2 lh-title mint-green">$250</h2>
                      <small className="f7 fw2 lh-title moon-gray">small</small>
                    </div>
                    <div className="fl w-third pa1">
                      <h2 className="f3 fw2 lh-title mint-green">$500</h2>
                      <small className="f7 fw2 lh-title moon-gray">medium</small>
                    </div>
                    <div className="fl w-third pa1">
                      <h2 className="f3 fw2 lh-title mint-green">$1000</h2>
                      <small className="f7 fw2 lh-title moon-gray">large</small>
                    </div>
                  </div>
                  <div className="w-100 center tc">
                    <small className="f4 fw2 lh-title light-gray">projects</small>
                  </div>
                </div>
                <ul className="cf lh-copy pv1 mint-gray list pl0">
                  <li className="cf">
                    <MdDvr className="ml0 pl0 fl f4 w-20 pv1" />
                    <div className="fl f6 lh-copy w-75 pv1 ph4-m pl0 ml0">Three pricing tiers to match your project.</div>
                  </li>
                  <li className="cf">
                    <MdPeople className="ml0 pl0 fl f4 w-20 pv1" />
                    <div className="fl f6 lh-copy w-75 pv1 ph4-m pl0 ml0">Talented team of code formatters.</div>
                  </li>
                  <li className="cf">
                    <MdEventNote className="ml0 pl0 fl f4 w-20 pv1" />
                    <div className="fl f6 lh-copy w-75 pv1 ph4-m pl0 ml0">Clean code deliveries in no time.</div>
                  </li>
                  <li className="cf">
                    <MdCheckBox className="ml0 pl0 fl f4 w-20 pv1" />
                    <div className="fl f6 lh-copy w-75 pv1 ph4-m pl0 ml0">Compliance and standards options.</div>
                  </li>
                </ul>
              </CardText>
              <CardActions className="bg-mint-light-gray">
                <FlatButton className="center w-100" backgroundColor="#f6f9fc" label="Start now" />
              </CardActions>
            </Card>
          </div>
          <div className="fl-ns mt2 w-100 w-100-m w-third-ns">
            <Card className="w-75 center fx link pointer" onClick={this.sendMail('Comment%20Project%20Submission')}>
              <CardTitle className="bb bw1 b--mint-light-gray" title="COMMENTING" titleColor="#24b47e" titleStyle={{ textAlign: 'center' }} />
              <CardText className="h5">
                <div className="center tc">
                  <h2 className="f3 fw2 lh-title mint-green">Estimate Provided</h2>
                  <small className="f4 fw2 lh-title moon-gray">after code submission</small>
                </div>
                <p className="lh-copy pv3 mint-gray">
                  We're more than happy to add comments to your code base. Our engineers have a deep understanding of programming fundamentals and formats.
                </p>
              </CardText>
              <CardActions className="bg-mint-light-gray">
                <FlatButton className="center w-100" backgroundColor="#f6f9fc" label="Start now" />
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
