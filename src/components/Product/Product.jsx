import React, { Component } from "react";

// Components
import Checkout from "../Checkout";

// Styles
import './Product.css';

const Product = ({
  user,
  name,
  description,
  amount,
  imgUrl = 'http://placekitten.com/g/600/300',
  imgAlt='Photo of a kitten looking menacing.',
  className='product br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center'
  }) =>
    <article className={className}>
      <img src={imgUrl} className="db w-100 br2 br--top" alt={imgAlt} />
      <div className="pa2 ph3-ns pb3-ns">
        <div className="dt w-100 mt1">
          <div className="dtc">
            <h1 className="f5 f4-ns mv0">{name}</h1>
          </div>
          <div className="dtc tr">
            <h2 className="f5 mv0">${amount}</h2>
          </div>
        </div>
        <p className="f6 lh-copy measure mt2 mid-gray">{description}</p>
        <br/>
        <Checkout
          name={name}
          description={description}
          amount={amount}
          user={user}
        />
      </div>
    </article>

export default Product;
