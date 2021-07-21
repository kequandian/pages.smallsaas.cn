import React, { createElement } from 'react';
import classNames from 'classnames';
import Button from 'antd/lib/button';

import config from './typeConfig';
import './index.css';

export default ({ linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
  const pageType = type in config ? type : '404';
  return (
    <div className='exception' {...rest}>
      <div className='exception-img-block'>
        <div
          className='exception-img-element'
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className='exception-content'>
        <h1>{title || config[pageType].title}</h1>
        <div className='exception-desc'>{desc || config[pageType].desc}</div>
        <div className='exception-actions'>
          {
            actions ||
              createElement(linkElement, {
                to: '/',
                href: '/',
              }, <Button type="primary">返回首页</Button>)
          }
        </div>
      </div>
    </div>
  );
};
