import { configure } from '@storybook/react';

const req = require.context('../packages/retail-components/src', true, /_story\.(js|jsx)$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);