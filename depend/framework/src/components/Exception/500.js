import React from 'react';
import { Link } from 'dva/router';
import Exception from './index';

export default () => (
  <Exception type="500" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
