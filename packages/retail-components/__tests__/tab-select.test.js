import * as React from 'react';
import { shallow } from 'enzyme';

import TabSelect from 'tab-select';

const PAIRS = [
  {
    text: '订单',
    value: 'TRADE'
  },
  {
    text: '提现',
    value: 'WITHDRAW'
  },
  {
    text: '充值',
    value: 'RECHARGE'
  },
  {
    text: '订购',
    value: 'BOOK'
  }
];

describe('TabSelect', () => {
  it('should be rendered', () => {
    const tab = shallow(
      <TabSelect
        name="sort"
        title="分类"
        pairs={PAIRS}
        onChange={() => {}}
      />
    );
    
    

    // expect(tab.find('TabSelect').length).toBe(1);
  });

  // it('test', () => {});

  // it('should have default tab', () => {

  // });

  // it('should not have default tab', () => {

  // });

  // it('should have default tab & can cancle all tabs', () => {

  // });

  // it('should not have default tab & can cancle all tabs', () => {

  // });

  // it('should have default tab & can not cancle all tabs', () => {

  // });

  // it('should not have default tab & can not cancle all tabs', () => {

  // });

  // it('support to custom classname', () => {

  // });

  // it('suport to custom specific event on specific tab', () => {

  // });

  // it('support to dynamic render tab', () => {

  // });
});