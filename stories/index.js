import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo, setDefaults } from '@storybook/addon-info';

import { TabSelect } from '../packages/retail-components/src';

// addon-info
setDefaults({
  header: false, // Toggles display of header with component name and description
  inline: true, // Displays info inline vs click button to view
  source: true, // Displays the source of story Component
  propTables: [
    /* Components used in story */
  ], // displays Prop Tables with this components
  propTablesExclude: [], // Exclude Components from being shoun in Prop Tables section
  styles: {}, // Overrides styles of addon
  marksyConf: {}, // Overrides components used to display markdown. Warning!
  // This option's name will be likely deprecated in favor to "components"
  // with the same API in 3.3 release. Follow this PR #1501 for details
  maxPropsIntoLine: 1, // Max props to display per line in source code
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 80
});

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

storiesOf('Tab Select', module)
  .add(
    '有默认值-可以取消所有',
    withInfo('"name" 属性用于给 TabSelect 命名，便于一个页面内用到多个 TabSelect 时，更好处理事件')(() => (
      <TabSelect
        name="sort"
        title="分类："
        pairs={PAIRS}
        onChange={() => {}}
        value="TRADE"
      />
    ))
  )
  .add(
    '无默认值-可以取消所有',
    withInfo('"name" 属性用于给 TabSelect 命名，便于一个页面内用到多个 TabSelect 时，更好处理事件')(() => (
      <TabSelect name="sort" title="分类：" pairs={PAIRS} onChange={() => {}} />
    ))
  )
  .add(
    '有默认值-不可以取消所有',
    withInfo()(() => (
      <TabSelect
        title="分类："
        pairs={PAIRS}
        onChange={() => {}}
        value="TRADE"
        cancle={false}
      />
    ))
  )
  .add('无默认值-不可以取消所有', () => (
    <TabSelect
      title="无默认值："
      pairs={PAIRS}
      onChange={() => {}}
      onClick={action('clicked')}
      cancle={false}
    />
  ))
  .add('无默认值-不可以取消所有-可多选', () => (
    <TabSelect
      title="无默认值："
      pairs={PAIRS}
      onChange={() => {}}
      onClick={action('clicked')}
      cancle={false}
      multiple
    />
  ));
