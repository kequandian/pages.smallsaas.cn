import React, { Fragment } from 'react';
import { routerRedux } from 'dva/router';
import { Button, message } from 'antd';
import queryString from 'querystring';
import { create, update } from 'kqd-utils/lib/services';
import { getPermissions } from 'kqd-utils/lib/token';

export default (props) => {
  const {
    dispatch, namespace, location: { search },
    data = {},
    queryConfig,
    audit = {}
  } = props;
  const { API, statusField = 'status' } = audit;
  // const { itemsField, itemsFieldMap = itemsField } = queryConfig;

  function handlePass() {
    const id = queryString.parse(search.replace('?', '')).id;
    const payload = { ...data };
    // if(itemsFieldMap !== itemsField){
    //   payload[itemsFieldMap] = payload[itemsField];
    //   delete payload[itemsField];
    // }
    const rst = update(`${API}/${id}/passed`, payload);
    rst.then(handleRst);
  }
  function handleClosed() {
    const id = queryString.parse(search.replace('?', '')).id;
    const rst = update(`${API}/${id}/closed`);
    rst.then(handleRst);
  }
  function handleRst({ code }) {
    if (code === 200) {
      message.success('操作成功');
      dispatch({
        type: `${namespace}/fetchSuccess`,
        payload: {
          currentItem: {}
        }
      });
      dispatch(routerRedux.goBack());
    }
  }
  const permission = getPermissions();
  const permissionData = typeof permission === 'string' ? JSON.parse(permission) : permission;

  if (Array.isArray(permissionData) && permissionData.findIndex((item) => item === audit.permission) > -1) {
    if (data[statusField] === 'Wait_To_Audit' || data[statusField] === 'CheckOut') {
      return <Fragment>
        <Button type="primary" onClick={handlePass}>审核通过</Button>
        <Button type="danger" onClick={handleClosed}>审核拒绝</Button>
      </Fragment>;
    }
  }
  return null;
}