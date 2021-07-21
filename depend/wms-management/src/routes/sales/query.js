import React, { PureComponent, Fragment } from 'react';
import { GMForm, getConfigUtils, GMGeneralTable, GMApp } from 'kqd-general';
import { TitledHeader } from 'kqd-page-header';
import queryString from 'querystring';
import { Tabs, Divider, Button } from 'antd';
import { getEndpoint } from 'kqd-utils/lib/endpoint';
import { getPermissions } from 'kqd-utils/lib/token';
import AuditLog from '../../components/AuditLog';

import config from './config';
import '../../components/query/style.css';

const TabPane = Tabs.TabPane;
const { List, Form, TitleLayout } = GMApp;

const Footer = (props) => {
  return <div className="price">销售总额：￥<span>{props.modelStatus.currentItem.salesTotal}</span></div>
}
const InHistoriesFooter = (props) => {
  const { item = {} } = props;
  return <Fragment>
    <div className="wms-query-info">
      <span>出库单编号：{item.transactionCode || '-'}</span>
      <span>出库仓：{item.warehouseName || '-'}</span>
      <span>经办人：{item.transactionBy || '-'}</span>
      <span>出库备注：{item.note || '-'}</span>
    </div>
    <div className="wms-query-info">
      {/* <span>销售单编号：{item.originatorName || '-'}</span>
      <span>销售员：{item.transactionName || '-'}</span> */}
      {/* <span>销售员：{ item.transactionBy || '-' }</span> */}
      <span>出库日期：{item.storageOutTime || '-'}</span>
    </div>
  </Fragment>
}

export default class Query extends PureComponent {
  tabs = '2';
  componentWillMount() {
    const { location: { search } } = this.props;
    this.tabs = queryString.parse(search.replace('?', '')).tabs || '2';
    this.id = queryString.parse(search.replace('?', '')).id;
  }
  componentDidMount() {
    const { requester } = this.props;
    requester.fetchOne();
  }
  print = () => {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = `${getEndpoint()}/api/pub/cloud/io/pdf/out/distributor-order?identifier=${this.id}&key=94a08da1fecbb6e8b46990538c7b50b2`;
    link.click();
  }

  render() {
    const columns = [
      { title: ' ', field: 'total' },
      { title: '商品编号', field: 'skuCode' },
      { title: '商品条码', field: 'skuBarcode' },
      { title: '商品名称', field: 'skuName' },
      { title: '单位', field: 'skuUnit' },
      { title: '需求数量', field: 'demandQuantities', align: 'right', bottomTotal: true },
      { title: '销售数量', field: 'transactionQuantities', align: 'right', bottomTotal: true },
      { title: '销售单价', field: 'transactionSkuPrice', align: 'right', valueType: 'currency' },
      {
        title: '销售总价', field: 'transactionTotalSkuPrice', align: 'right', valueType: 'totalPrice', bottomTotal: true,
        options: {
          field: 'transactionTotalSkuPrice',
        },
        format: (v) => `￥ ${v}`,
      },
    ];
    const storageOutItemRecordsColumns = [
      { title: ' ', field: 'total' },
      { title: '商品编号', field: 'skuCode' },
      { title: '商品条码', field: 'skuBarcode' },
      { title: '商品名称', field: 'skuName' },
      { title: '单位', field: 'skuUnit' },
      // { title: '总数', field: 'totalCount' },
      // { title: '已出库数', field: 'sectionInCount' },
      { title: '本次出库数量', field: 'transactionQuantities' },
    ];
    const statusMap = {
      'WaitForStorageOut': '等待出库',
      'SectionStorageOut': '部分出库',
      'TotalStorageOut': '全部出库',
      'Draft': '草稿',
      'Audit_Passed': '审核通过',
      'undefined': '-',
    };
    const { modelStatus } = this.props;
    const { currentItem } = modelStatus;
    let outItems = currentItem.outItems || [];
    // 这里直接修改了 model 里面的数据
    // outItems.forEach( item => {
    //   item.skuId = item.id;
    //   // item.totalCount = item.transactionQuantities;
    // });
    const storageOutItemRecords = currentItem.storageOutItemRecords || [];
    let formatOutItemRecords = [];
    if (storageOutItemRecords.length > 0) {
      storageOutItemRecords.forEach(item => {
        const index = formatOutItemRecords.findIndex(row => row.transactionCode === item.transactionCode);
        if (index === -1) {
          formatOutItemRecords.push({
            ...item,
            items: [{
              skuBarcode: item.skuBarcode,
              transactionTime: item.transactionTime,
              skuCode: item.skuCode,
              skuName: item.skuName,
              transactionQuantities: item.transactionQuantities,
              transactionSkuPrice: item.transactionSkuPrice,
            }],
          })
        } else {
          formatOutItemRecords[index].items.push({
            skuBarcode: item.skuBarcode,
            transactionTime: item.transactionTime,
            skuCode: item.skuCode,
            skuName: item.skuName,
            transactionQuantities: item.transactionQuantities,
            transactionSkuPrice: item.transactionSkuPrice,
          });
        }

      });
    }

    const GMFormProps = {
      ...this.props,
      formProps: {
        title: '出库',
        rowSelection: false,
        extra: null,
      },
      config: config.details,
      APIObject: {
        updateAPI: '/api/warehouse/sales/[id]/execution',
      },
      visible: currentItem.salesStatus !== 'TotalStorageIn',
    }
    // /api/cloud/io/pdf/out/t2
    const queryExtra = (<div>
      <Button type="primary" onClick={this.print}>打印</Button>
      <Button onClick={() => this.props.router.goBack()}>返回</Button>
    </div>);

    const auditLogProps = {
      ...this.props,
      APIObject: {
        listAPI: `/api/logs?targetType=distributor_out&targetId=[id]`,
      },
    };

    const permission = getPermissions();
    const permissionData = typeof permission === 'string' ? JSON.parse(permission) : permission;
    return (
      <Tabs defaultActiveKey={this.tabs}>
        <TabPane tab="订单详情" key="1">
          <TitleLayout title="分销单详情" extra={queryExtra} goBack={false}>
            <div className="status">{statusMap[currentItem.salesStatus] || '-'}</div>
            <div className="wms-query-info">
              <span>订单编号：{currentItem.salesCode || '-'}</span>
              <span>订单创建人：{currentItem.originatorName || '-'}</span>
              <span>创建日期：{currentItem.transactionTime || '-'}</span>
              <span>分销商名称：{currentItem.traderName || '-'}</span>
              <span>联系电话：{currentItem.traderContactPhone || '-'}</span>
              <span>经办人：{currentItem.transactionBy || '-'}</span>
              <div>收货人：{currentItem.traderContactName || '-'}</div>
              <div>收货地址：{currentItem.deliveredAddress || '-'}</div>
              <div>备注：{currentItem.salesNote || '-'}</div>
            </div>
            <GMGeneralTable
              columns={columns}
              data={outItems}
              footer={(data) => <Footer data={data} modelStatus={modelStatus} />}
              rowSelection={false}
              pagination={{ total: outItems.length }}
            />
            <AuditLog {...auditLogProps} />
          </TitleLayout>
        </TabPane>
        <TabPane tab="商品出库" key="2">
          <TitleLayout title="销售信息">
            <div className="wms-query-info">
              <span>订单编号：{currentItem.salesCode || '-'}</span>
              <span>订单创建人：{currentItem.originatorName || '-'}</span>
              <span>创建日期：{currentItem.transactionTime || '-'}</span>
              <span>分销商名称：{currentItem.traderName || '-'}</span>
              <span>联系电话：{currentItem.traderContactPhone || '-'}</span>
              <span>经办人：{currentItem.transactionBy || '-'}</span>
              <div>收货地址：{currentItem.deliveredAddress || '-'}</div>
              <div>备注：{currentItem.salesNote || '-'}</div>
            </div>
          </TitleLayout>
          {(currentItem.salesStatus === 'WaitForStorageOut'
            || currentItem.salesStatus === 'SectionStorageOut')
            && (Array.isArray(permissionData) && permissionData.findIndex((item) => item === 'wms.sales.edit') > -1)
            ? <Form {...GMFormProps} /> : null}

          <TitledHeader title="出库记录">
            {formatOutItemRecords.map((item, i) => {
              return <Fragment key={i}>
                <GMGeneralTable columns={storageOutItemRecordsColumns} data={item.storageOutItems}
                  footer={(data) => <InHistoriesFooter data={data} item={item} />}
                  rowSelection={false} />
                <Divider />
              </Fragment>
            })}
            {storageOutItemRecords.length === 0 ? '暂无记录' : ''}
          </TitledHeader>
        </TabPane>
      </Tabs>
    );
  }
}