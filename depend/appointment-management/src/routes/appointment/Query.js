import React, { PureComponent, Fragment } from 'react';
import { GMApp } from 'kqd-general';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';
import config from './config';

const { Form, TitleLayout } = GMApp;

export default class Query extends PureComponent {
  render() {
    const { currentItem } = this.props.modelStatus;
    const day = currentItem.earliestTime && currentItem.earliestTime.replace(/\S+$/, '');
    const startTime = currentItem.earliestTime && currentItem.earliestTime.replace(/^\S+/, '');
    const endTime = currentItem.latestTime && currentItem.latestTime.replace(/^\S+/, '');
    const submitForm = <Fragment>
      <div style={{
        padding: '1em 0px 0.2em 2em',
        fontSize: '1.2em',
        color: '#1890ff',
      }}>预约时间</div>
      <div style={{
        paddingLeft: '2.5em',
      }}>
        {`${day} ${startTime} ~ ${endTime}`}
      </div>
      <br />
      <Button type="primary" onClick={() => {
        this.props.dispatch(routerRedux.goBack());
      }}>返回</Button>
    </Fragment>;
    return (
      <TitleLayout title="预约详情">
        <Form {...this.props}
          config={config}
          formProps={{
            submitForm,
          }}
        />
      </TitleLayout>
    );
  }
}