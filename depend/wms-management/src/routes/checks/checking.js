import React, { PureComponent, Fragment } from 'react';
import { GMApp } from 'kqd-general';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';

import config from './config';

const { Form } = GMApp;

export default class Checking extends PureComponent {
  // componentDidMount(){
  //   const { requester } = this.props;
  //   requester.fetchOne();
  // }

  changeSubmitAPI = (API) => {
    const { modelStatus } = this.props;
    // 直接修改 status 的数据
    modelStatus.updateAPI = API;
  }
  handleCancel = () => {
    const { dispatch, namespace } = this.props;
    dispatch({
      type: `${namespace}/fetchSuccess`,
      payload: {
        currentItem: {}
      }
    });
    dispatch(routerRedux.goBack());
  }

  render() {
    const { modelStatus } = this.props;

    const GMFormProps = {
      ...this.props,
      config: config.details,
      dataSourceMap: 'checking',
      APIObject: {
        updateAPI: '/api/wms/checks/[id]/checking',
      },
      formProps: {
        title: '盘点',
        rowSelection: false,
        submitForm: (
          <Fragment>
            <br /><br />
            { modelStatus.checking && modelStatus.checking.currentItem.status === 'Draft' ? (
              <Button type="primary" htmlType="submit" onClick={ this.changeSubmitAPI.bind(this,'/api/wms/checks/{ID}/checking') }>开始盘点</Button>
            ) : ''  }
            { modelStatus.currentItem.status === 'Checking' ? (
              <Button type="primary" htmlType="submit" onClick={ this.changeSubmitAPI.bind(this,'/api/wms/checks/{ID}/checking') }>暂存盘点</Button>
            ) : ''  }
            {/* { modelStatus.currentItem.status === 'Checking' ? (
              <Button type="dashed" htmlType="submit" onClick={ this.changeSubmitAPI.bind(this,'/api/wms/checks/{ID}/done') }>完成盘点</Button>
            ) : ''  } */}
            <Button onClick={ this.handleCancel }>取消</Button>
          </Fragment>
        ),
      }
    }
    return (
      <Form { ...GMFormProps } />
    );
  }
}