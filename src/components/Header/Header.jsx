/**
 * Header.jsx
 */
import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

// Icons
import MdChevronRight from 'react-icons/lib/md/chevron-right';

// Components
import MaterialRaisedButton from '../forms/MaterialRaisedButton';

// Styles
import './Header.css';

@observer
class Header extends Component {
  componentWillMount() {
    // this.fadeInHeadline();
    this.index =
      Math.abs(parseInt(this.props.id, 0)) > this.headlineOptions.length - 1
        ? Math.abs(this.headlineOptions.length - 1)
        : Math.abs(parseInt(this.props.id, 0));
    this.selectHeadline(this.index);
  }

  fadeOutHeadline = (item) => {
    this.headline = (
      <span className="animated fadeOut">
        {this.headlineOptions[this.headindex]}
      </span>
    );
    this.subheadline = (
      <span className="animated fadeOut">
        {this.subheadlineOptions[this.subindex]}
      </span>
    );
  }

  fadeInHeadline = () => {
    setTimeout(
      this.fadeOutHeadline,
      9500
    );

    this.headindex = Math.round(Math.random() * (this.headlineOptions.length - 1));
    this.headline = <span className="animated fadeIn">{this.headlineOptions[this.headindex]}</span>;

    this.subindex = Math.round(Math.random() * (this.subheadlineOptions.length - 1));
    this.subheadline = <span className="animated fadeIn">{this.subheadlineOptions[this.subindex]}</span>;

    setTimeout(
      this.fadeInHeadline,
      10000,
    );
  }

  selectHeadline = (id) => {
    this.headindex = id;
    this.headline = <span className="animated fadeIn">{this.headlineOptions[this.headindex]}</span>;

    this.subindex = id;
    this.subheadline = <span className="animated fadeIn">{this.subheadlineOptions[this.subindex]}</span>;
  }

  @observable index = 0;
  @observable headline = '';
  @observable headindex = 0;

  @observable subheadline = '';
  @observable subindex = 0;

  @observable headlineOptions = [
    'Your IaaS partner.',
    'Is your code compliant?',
    'Need your code cleaned?',
    'Have a picky client?',
    'Donate to the open source community.',
    'Need some comments added to your code?',
  ];

  @observable subheadlineOptions = [
    'Indention as a (or at your) service.',
    'Don\'t worry, we can handle that.',
    'We add that personal touch that pesky code sometimes needs.',
    'Our engineers are pros at getting code ready for hand off.',
    'Point us to a repo and we\'ll fork and deliver the surprise of clean code.',
    'Don\'t waste an engineers time, let us get it ready for delivery.',
  ];

  render() {
    return (
      <div className="header z-2 relative fl w-60-ns w-100-m w-100 pa2 pt2-m pt4-ns pt2 tl">
        <div className="ml5-ns ml3 ml3-m">
          <a href="#standards" className="announcement dib tl dim link pointer relative f7 db mb4 pl1 pv1 br-pill white bg-grad1">
            <div className="dib br-pill tc ph1 bg-green">NEW</div>
            <div className="link tl pl2 pr1 dib">ECMAScript&reg; 2017 Spec</div>
            <MdChevronRight className="f6 pr2" />
          </a>
          <h1 className="f1 fw5 lh-title white">{this.headline}</h1>
          <h5 className="f4 fw3 lh-copy pa0 white">{this.subheadline}</h5>
          <div className="tl ml0 pv4-ns pv2-m pv2">
            <MaterialRaisedButton
              field={{
                primary: false,
                href: '#pricing',
                label: 'Get started',
                className: 'fx',
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Header.defaultProps = {
  id: 0,
};

export default Header;
