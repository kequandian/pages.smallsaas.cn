import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withReadme, withDocs } from 'storybook-readme';

import ImageAdaptive from '../src/components/image-adaptive';
import README from '../src/components/avatar-list/README.md';

storiesOf('ImageAdaptive', module)
  .addDecorator(withReadme(README))
  .add('300x200',
    withNotes('300x200')(() => (
      <div style={{padding: 30}}>
        <ImageAdaptive
          data={{
              width: '300px',
              height: '200px',
              url: 'https://gw.alipayobjects.com/zos/rmsportal/lcamFWetlMgLkLmDUgmZ.png',
              alt: '图片',
          }}
        />
      </div>
  )))
  .add('400x400',
    withNotes('400x400')(() => (
      <div style={{padding: 30}}>
        <ImageAdaptive
          data={{
              width: '400px',
              height: '400px',
              url: 'https://gw.alipayobjects.com/zos/rmsportal/lcamFWetlMgLkLmDUgmZ.png',
              alt: '图片',
          }}
        />
      </div>
  )))
  .add('原图',
    withNotes('原图')(() => (
      <div style={{padding: 30}}>
        <img src="https://gw.alipayobjects.com/zos/rmsportal/lcamFWetlMgLkLmDUgmZ.png" />
      </div>
  )))
