import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { query } from 'kqd-utils/lib/services';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from '../../components/query';
import Audit from './Audit';

@connect(({ transfers, loading }) => ({
  modelStatus: transfers,
  namespace: 'transfers',
  loading: loading.models.transfers,
}))
export default class Index extends PureComponent {
  warehouseId = null;
  getValidSku = () => {
    const { fieldName, warehouseId } = this;
    if (!fieldName || !warehouseId) return false;
    query(`/api/wms/inventories?warehouseId=${warehouseId}&pageSize=99`)
      .then(({ code, data }) => {
        if (code === 200) {
          const { records } = data;
          const { currentItem } = this.props.modelStatus;
          const [...childrenData] = currentItem[fieldName] || [];
          childrenData.forEach(child => {
            const item = records.find(item => child.skuId === item.skuId);
            if (item) {
              child.validSku = item.validSku;
            } else {
              child.validSku = 0;
            }
          });

          const { dispatch } = this.props;
          const tempObj = {};
          tempObj[fieldName] = childrenData;

          dispatch({
            type: 'transfers/save',
            payload: {
              currentItem: {
                ...currentItem,
                ...tempObj
              }
            }
          });
        }
      })
  }
  render() {
    const submitButton = this.props.location.search.indexOf('edit') > -1 ? [
      { title: '提交审核', method: 'put', API: '/api/wms/transfers/[id]/audit' },
      { title: '保存修改', method: 'put', API: '/api/wms/transfers/[id]' },
      { title: '取消', type: 'return' },
    ] : [];
    return (
      <GMApp {...this.props} config={config}
        listProps={{
          rowSelection: false,
        }}
        formProps={{
          onChildrenSelected: (field, items) => {
            // validSku
            this.fieldName = field;
            this.getValidSku();
          },
          onSelectChange: (value) => {
            this.warehouseId = value;
            this.getValidSku();
          },
          submitButton,
        }}
        routerMap={{
          query: <Query queryConfig={{
            title: '调拨详情',
            itemsField: 'outItems',
            info: [
              { label: '调出仓库', field: 'fromWarehouseName' },
              { label: '调出时间', field: 'transactionTime' },
              { label: '调入仓库', field: 'toWarehouseName' },
              { label: '调入时间', field: 'finishTime' },
              { label: '经办人', field: 'transactionBy' },
              { label: '制单人', field: 'originatorName' },
              { label: '备注', field: 'note' },
            ],
            columns: [
              { title: ' ', field: 'total' },
              { title: '商品条码', field: 'skuBarcode' },
              { title: '商品编号', field: 'skuCode' },
              { title: '商品名称', field: 'skuName' },
              { title: '需求数量', field: 'demandQuantities', align: 'right', bottomTotal: true },
              { title: '调拨数量', field: 'transactionQuantities', align: 'right', bottomTotal: true },
              { title: '单位', field: 'skuUnit' },
            ]
          }}
            logType="transfer"
          />,
          audit: Audit,
        }}
      />
    );
  }
}
