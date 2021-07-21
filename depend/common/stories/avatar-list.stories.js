import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withReadme, withDocs } from 'storybook-readme';

import AvatarList from '../src/components/avatar-list';
import README from '../src/components/avatar-list/README.md';

storiesOf('AvatarList', module)
  .addDecorator(withReadme(README))
  .add('Mini',
    withNotes('mini')(() => (
      <div style={{padding: 30}}>
      <AvatarList size="mini">
        <AvatarList.Item tips="Jake" src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png" />
        <AvatarList.Item tips="Andy" src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png" />
        <AvatarList.Item tips="Niko" src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png" />
      </AvatarList>
      </div>
  )))
  .add('Small',
    withNotes('small')(() => (
      <div style={{padding: 30}}>
      <AvatarList size="small">
        <AvatarList.Item tips="Jake" src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png" />
        <AvatarList.Item tips="Andy" src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png" />
        <AvatarList.Item tips="Niko" src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png" />
      </AvatarList>
      </div>
  )))
  .add('Large',
    withNotes('large')(() => (
      <div style={{padding: 30}}>
      <AvatarList size="large">
        <AvatarList.Item tips="Jake" src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png" />
        <AvatarList.Item tips="Andy" src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png" />
        <AvatarList.Item tips="Niko" src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png" />
      </AvatarList>
      </div>
  )))
