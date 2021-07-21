import React,{ Fragment } from 'react';
import GetIntegralSetting from '../Integral/components/GetIntegralSetting';
import config from './config';

export default (props) => {
  return <Fragment>
    <GetIntegralSetting config={ config } { ...props } />
  </Fragment>;
}