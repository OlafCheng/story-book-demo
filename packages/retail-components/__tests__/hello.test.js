import * as React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Hello from 'hello';

Enzyme.configure({ adapter: new Adapter() });

describe('hello world', () => {

  it('should render Hello Component', () => {
    const hello = shallow(<Hello />);
  })
});