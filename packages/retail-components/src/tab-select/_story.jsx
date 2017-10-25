import React from 'react';

import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme';
import Readme from 'docs/tab-select';

import TabSelect from './index.tsx';

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
    'default',
    withReadme(
      Readme,
      () => (
        <TabSelect
          name="sort"
          title="分类："
          pairs={PAIRS}
          onChange={() => {}}
          value="TRADE"
        />
      )
    )
  )
  .add(
    '有默认值-可以取消所有',
    withReadme(
      Readme,
      () => (
        <TabSelect
          name="sort"
          title="分类："
          pairs={PAIRS}
          onChange={() => {}}
          value="TRADE"
        />
      )
    )
  )

// storiesOf('Tab Select', module)
//   .add(
//     '有默认值-可以取消所有',
//     withInfo('"name" 属性用于给 TabSelect 命名，便于一个页面内用到多个 TabSelect 时，更好处理事件')(() => (
//       <TabSelect
//         name="sort"
//         title="分类："
//         pairs={PAIRS}
//         onChange={() => {}}
//         value="TRADE"
//       />
//     ))
//   )
//   .add(
//     '无默认值-可以取消所有',
//     withInfo('"name" 属性用于给 TabSelect 命名，便于一个页面内用到多个 TabSelect 时，更好处理事件')(() => (
//       <TabSelect name="sort" title="分类：" pairs={PAIRS} onChange={() => {}} />
//     ))
//   )
//   .add(
//     '有默认值-不可以取消所有',
//     withInfo()(() => (
//       <TabSelect
//         title="分类："
//         pairs={PAIRS}
//         onChange={() => {}}
//         value="TRADE"
//         cancle={false}
//       />
//     ))
//   )
//   .add('无默认值-不可以取消所有', () => (
//     <TabSelect
//       title="无默认值："
//       pairs={PAIRS}
//       onChange={() => {}}
//       onClick={action('clicked')}
//       cancle={false}
//     />
//   ))
//   .add('无默认值-不可以取消所有-可多选', () => (
//     <TabSelect
//       title="无默认值："
//       pairs={PAIRS}
//       onChange={() => {}}
//       onClick={action('clicked')}
//       cancle={false}
//       multiple
//     />
//   ));
