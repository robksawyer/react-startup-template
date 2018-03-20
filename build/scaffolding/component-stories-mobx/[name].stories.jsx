/**
 * {{name}}.jsx
 */
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { rehydrate, hotRehydrate } from 'rfx-core';
import generateProps from 'react-generate-props';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// Constants & Utils
import { isProduction } from '../../utils/constants';

// Store
import stores from '../../stores/stores';

// Component(s)
import {{name}} from './{{name}}';

// Styles
const styles = {
  marginTop: '10%',
  textAlign: 'center',
};

// Hydrate the store
const store = rehydrate();

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

const ProviderDecorator = storyFn => (
  <Provider store={isProduction ? store : hotRehydrate()}>
    { storyFn() }
  </Provider>
);

storiesOf('{{name}}', module)
  .addDecorator(ProviderDecorator)
  .addDecorator(RouterDecorator)
  .addDecorator(CenterDecorator)
  .add('with required props', () => (
    <{{name}} {...props} />
  ));
