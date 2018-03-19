/**
 * Stripes.jsx
 */
import React, { Component } from "react";

// Styles
import './Stripes.css';

const Stripes = () => {
  return (
    <div id="stripes" className="z-1 w-100 db">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div className="code dn db-ns dn-m"></div>
    </div>
  );
}

export default Stripes;
