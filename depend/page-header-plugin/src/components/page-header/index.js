import React from 'react';
import { Link } from 'dva/router';
import { FormattedMessage } from 'react-intl';
import PageHeader from './pageHeader';
import './index.css';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <PageHeader key="pageheader"
      {...restProps}
      linkElement={Link} />
    {children ? <div className='kc-page-header-content'>{children}</div> : null}
  </div>
);
