import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withReadme, withDocs } from 'storybook-readme';

import TextEllipsis from '../src/components/text-ellipsis';
import README from '../src/components/avatar-list/README.md';

storiesOf('TextEllipsis', module)
  .addDecorator(withReadme(README))
  .add('显示一行',
    withNotes('显示一行，超出部分显示用省略号替换')(() => (
      <div style={{padding: 30}}>
        <div style={{width: '300px', border: '1px solid #000'}}>
          <TextEllipsis data={{
              title: 'React 可以非常轻松地创建用户交互界面。为你应用的每一个状态设计简洁的视图，在数据改变时 React 也可以高效地更新渲染界面。',
              row: 1,
          }} />
        </div>
      </div>
  )))
  .add('显示两行',
    withNotes('显示两行，超出部分显示用省略号替换')(() => (
      <div style={{padding: 30}}>
        <div style={{width: '300px', border: '1px solid #000'}}>
          <TextEllipsis data={{
              title: 'React 可以非常轻松地创建用户交互界面。为你应用的每一个状态设计简洁的视图，在数据改变时 React 也可以高效地更新渲染界面。',
              row: 2,
          }} />
        </div>
      </div>
  )))
