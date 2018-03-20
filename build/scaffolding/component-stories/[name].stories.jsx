/**
 * {{name}}.jsx
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import generateProps from 'react-generate-props';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// Component(s)
import {{name}} from './{{name}}';

// Styles
const styles = {
  marginTop: '10%',
  textAlign: 'center',
};

// Generate some stub properties
const props = generateProps({{name}});

// Decorators
const CenterDecorator = storyFn => (
  <div style={styles}>
    { storyFn() }
  </div>
);

const RouterDecorator = storyFn => (
  <BrowserRouter>
    { storyFn() }
  </BrowserRouter>
);

storiesOf('{{name}}', module)
  .addDecorator(RouterDecorator)
  .addDecorator(CenterDecorator)
  .add('with required props', () => (
    <{{name}} {...props} />
  ));
