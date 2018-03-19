/**
 * Creates a button element with Material UI elements.
 * @see http://www.material-ui.com/#/components/flat-button
 * Usage:
 * <MaterialFlatButton field={{ href: "#" }} />
 */
import React from 'react';
import { observer } from 'mobx-react';

import FlatButton from 'material-ui/FlatButton';

export default observer((
  {
    field,
    children,
    onClick = () => { }
  }) => (
  <div>
    <FlatButton onClick={onClick} {...field}>{children}</FlatButton>
  </div>
));
