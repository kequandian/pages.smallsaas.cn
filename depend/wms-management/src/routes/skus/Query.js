import React, { PureComponent, Fragment } from 'react';
import { GMApp } from 'kqd-general';
import config from './config';

const { Form, TitleLayout } = GMApp;

export default class Query extends PureComponent {
  render() {
    const submitForm = <Fragment></Fragment>;
    return (
      <TitleLayout title="商品详情">
        <Form {...this.props}
          config={config.details}
          formProps={{
            submitForm,
          }}
        />
      </TitleLayout>
    );
  }
}