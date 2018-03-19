/**
 * Creates a button element with Material UI elements.
 *
 * @see http://www.material-ui.com/#/components/raised-button
 *
 * Usage:
 * <MaterialFlatButton field={{ href: "#" }} />
 */
import React from 'react';
import { observer } from 'mobx-react';

import RaisedButton from 'material-ui/RaisedButton';

export default observer((
  {
    field,
    children,
    onClick = () => { }
  }) => (
  <div>
    <RaisedButton onClick={onClick} {...field}>{children}</RaisedButton>
  </div>
));
