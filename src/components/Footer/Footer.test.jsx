import React from 'react';
import Footer from './Footer.jsx';

export default [{
  name: "default",
  component: (
    <Footer>
      Hello World
    </Footer>
  ),
  test(t, component) {
    t.equal(component.is('div'), true, 'tag name');
    t.equal(component.is('.footer'), true, 'tag class');
    t.equal(component.text(), 'Hello World', 'text');
    t.end();
  }
}];
