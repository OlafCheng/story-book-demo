import React from 'react';
import { storiesOf } from '@storybook/react';

import withReadme from 'storybook-readme';
import Readme from 'docs/hello';

import Hello from './index.jsx';

console.log(Hello);

storiesOf('Hello', module)
  .add(
    'default',
    withReadme(
      Readme,
      () => (
        <Hello name="olaf"/>
      )
    )
  );
