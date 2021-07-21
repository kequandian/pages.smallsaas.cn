import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withReadme, withDocs } from 'storybook-readme';

import WhiteSpace from '../src/components/white-space';
import README from '../src/components/white-space/README.md';

storiesOf('WhiteSpace', module)
  .addDecorator(withReadme(README))
  .add('Default',
    withNotes('上下留白')(() => (
      <div style={{padding: 30}}>
        <div style={{backgroundColor: '#ccc'}}>Title1</div>
        <WhiteSpace size='xs' />
        <div style={{backgroundColor: '#ccc'}}>Title2</div>
        <WhiteSpace size='sm' />
        <div style={{backgroundColor: '#ccc'}}>Title3</div>
        <WhiteSpace size='md' />
        <div style={{backgroundColor: '#ccc'}}>Title4</div>
        <WhiteSpace size='lg' />
        <div style={{backgroundColor: '#ccc'}}>Title5</div>
        <WhiteSpace size='xl' />
        <div style={{backgroundColor: '#ccc'}}>Title6</div>
      </div>
  )));
