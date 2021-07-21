import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withReadme, withDocs } from 'storybook-readme';

import { Button } from 'antd';

import FooterToolbar from '../src/components/footer-toolbar';
import README from '../src/components/footer-toolbar/README.md';

storiesOf('FooterToolbar', module)
  .addDecorator(withReadme(README))
  .add('Default',
    withNotes('浮动固定页脚')(() => (
      <div style={{padding: 30}}>
        <div style={{ background: '#f7f7f7', padding: 24 }}>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <FooterToolbar extra="extra information">
            <Button>Cancel</Button>
            <Button type="primary">Submit</Button>
          </FooterToolbar>
        </div>
      </div>
  )))
  .add('Long',
    withNotes('浮动固定页脚')(() => (
      <div style={{padding: 30}}>
        <div style={{ background: '#f7f7f7', padding: 24 }}>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <p>Content Content Content Content</p>
          <FooterToolbar extra="extra information">
            <Button>Cancel</Button>
            <Button type="primary">Submit</Button>
          </FooterToolbar>
        </div>
      </div>
  )));
