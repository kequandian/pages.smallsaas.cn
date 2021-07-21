import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { GMForm, getConfigUtils, GMGeneralTable, GMApp } from 'kqd-general';
import { TitledHeader } from 'kqd-page-header';
import queryString from 'querystring';
import { Tabs, Divider, Button } from 'antd';
import { query, create } from 'kqd-utils/lib/services';
import { getEndpoint } from 'kqd-utils/lib/endpoint';
import { getPermissions } from 'kqd-utils/lib/token';
import AuditLog from '../../components/AuditLog';

import config from './config';
import '../../components/query/style.css';

const TabPane = Tabs.TabPane;
const { List, Form, TitleLayout } = GMApp;

const Footer = (props) => {
  return <div className="price">采购总额：￥<span>{props.modelStatus.currentItem.procurementTotal}</span></div>
}
const InHistoriesFooter = (props) => {
  const { item = {} } = props;
  return <Fragment>
    <div className="wms-query-info">
      <span>入库单编号：{item.storageInCode || '-'}</span>
      <span>入库仓：{item.warehouseName || '-'}</span>
      <span>经办人：{item.transactionName || '-'}</span>
      <span>入库备注：{item.storageInNote || '-'}</span>
    </div>
    <div className="wms-query-info">
      <span>采购单编号：{item.procurementCode || '-'}</span>
      <span>采购员：{item.buyer || '-'}</span>
      {/* <span>采购员：{ item.transactionBy || '-' }</span> */}
      <span>采购日期：{item.procurementDate || '-'}</span>
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
    link.href = `${getEndpoint()}/api/pub/cloud/io/pdf/out/deliver?identifier=${this.id}&key=94a08da1fecbb6e8b46990538c7b50b2`;
    link.click();

    // create('/api/cloud/io/pdf/out/deliver', {
    //   identifier: this.id,
    // })
    //   .then(blob => {
    //     // console.log(1111,blob);
    //     // console.log(2222,URL.createObjectURL(blob));

    //     // tempWindow.location.href = URL.createObjectURL(blob);
    //     link.href = URL.createObjectURL(blob);
    //     // link.download = "file.pdf";
    //     link.click();
    //     // tempWindow.location.href = 'http://test.com';
    //   })
  }
  export = () => {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = `${getEndpoint()}/api/pub/poi/agent/export/wms/procurement/${this.id}?key=94a08da1fecbb6e8b46990538c7b50b2`;
    link.click();
  }

  render() {
    const columns = [
      { title: ' ', field: 'total' },
      { title: '商品条码', field: 'skuBarcode' },
      // { title: '采购时间', field: 'transactionTime' },
      { title: '商品编号', field: 'skuCode' },
      { title: '商品名称', field: 'skuName' },
      { title: '需求数量', field: 'demandQuantities', align: 'right', bottomTotal: true },
      { title: '采购数量', field: 'transactionQuantities', align: 'right', bottomTotal: true },
      { title: '已入库数量', field: 'sectionInCount', align: 'right', bottomTotal: true },
      {
        title: '采购单价', field: 'transactionSkuPrice', align: 'right', valueType: 'currency',
        options: {
          permission: 'wms.purchase.price',
        }
      },
      {
        title: '采购总价', field: 'transactionTotalSkuPrice', align: 'right', valueType: 'totalPrice', bottomTotal: true,
        options: {
          field: 'transactionTotalSkuPrice',
          permission: 'wms.purchase.price',
        },
        format: (v) => `￥ ${v}`,
      },
      { title: '单位', field: 'skuUnit' },
    ];
    const inHistoriesColumns = [
      { title: ' ', field: 'total' },
      { title: '商品条码', field: 'skuBarcode' },
      { title: '入库时间', field: 'transactionTime' },
      { title: '商品编号', field: 'skuCode' },
      { title: '商品名称', field: 'skuName' },
      { title: '入库数量', field: 'transactionQuantities', align: 'right', bottomTotal: true },
      {
        title: '入库价格', field: 'transactionSkuPrice', align: 'right', valueType: 'currency',
        options: {
          permission: 'wms.purchase.price',
        }
      },
      { title: '单位', field: 'skuUnit' },
    ];
    const statusMap = {
      'Audit_Passed': '等待入库',
      'SectionStorageIn': '部分入库',
      'TotalStorageIn': '全部入库',
      'Closed': '被关闭',
      'Draft': '草稿',
      'Audit_Passed': '审核通过',
      'undefined': '-',
    };
    const { modelStatus } = this.props;
    let items = modelStatus.currentItem.items || [];
    // 这里直接修改了 model 里面的数据
    // records.forEach( item => {
    //   item.skuId = item.id;
    //   // item.totalCount = item.transactionQuantities;
    // });
    const inHistories = modelStatus.currentItem.inHistories || [];
    let formatInHistories = [];
    if (inHistories.length > 0) {
      inHistories.forEach(item => {
        const index = formatInHistories.findIndex(row => row.storageInCode === item.storageInCode);
        if (index === -1) {
          formatInHistories.push({
            id: item.id,
            storageInCode: item.storageInCode,
            warehouseName: item.warehouseName,
            transactionName: item.transactionName,
            storageInNote: item.storageInNote,
            procurementCode: item.procurementCode,
            transactionBy: item.transactionBy,
            procurementDate: item.procurementDate,
            items: [{
              skuBarcode: item.skuBarcode,
              transactionTime: item.transactionTime,
              skuCode: item.skuCode,
              skuName: item.skuName,
              transactionQuantities: item.transactionQuantities,
              transactionSkuPrice: item.transactionSkuPrice,
              skuUnit: item.skuUnit,
            }],
          })
        } else {
          formatInHistories[index].items.push({
            skuBarcode: item.skuBarcode,
            transactionTime: item.transactionTime,
            skuCode: item.skuCode,
            skuName: item.skuName,
            transactionQuantities: item.transactionQuantities,
            transactionSkuPrice: item.transactionSkuPrice,
            skuUnit: item.skuUnit,
          });
        }

      });
    }

    const GMFormProps = {
      ...this.props,
      formProps: {
        title: '入库',
        rowSelection: false,
        extra: null,
      },
      config: config.details,
      APIObject: {
        updateAPI: '/api/wms/procurements/[id]/execution',
      },
      visible: modelStatus.currentItem.procureStatus !== 'TotalStorageIn',
    }
    const auditLogProps = {
      ...this.props,
      APIObject: {
        listAPI: `/api/logs?targetType=purchase&targetId=[id]`,
      },
    };
    // /api/cloud/io/pdf/out/t2
    const queryExtra = (<div>
      <Button type="primary" onClick={this.export}>导出</Button>
      <Button type="primary" onClick={this.print}>打印</Button>
      <Button onClick={() => this.props.router.goBack()}>返回</Button>
    </div>);
    const permission = getPermissions();
    const permissionData = typeof permission === 'string' ? JSON.parse(permission) : permission;
    return (
      <Tabs defaultActiveKey={this.tabs}>
        <TabPane tab="订单详情" key="1">
          <TitleLayout title="采购单详情" extra={queryExtra} goBack={false}>
            <div className="status">{statusMap[modelStatus.currentItem.procureStatus] || '-'}</div>
            <div className="wms-query-info">
              <span>采购单编号：{modelStatus.currentItem.procurementCode || '-'}</span>
              <span>供应商：{modelStatus.currentItem.supplierName || '-'}</span>
              <span>采购员：{modelStatus.currentItem.transactionBy || '-'}</span>
              <span>采购日期：{modelStatus.currentItem.procurementTime || '-'}</span>
              <span>制单人：{modelStatus.currentItem.originatorName || '-'}</span>
              <div>备注：{modelStatus.currentItem.procurementNote || '-'}</div>
            </div>
            <GMGeneralTable
              columns={columns}
              data={items}
              footer={(data) => <Footer data={data} modelStatus={modelStatus} />}
              rowSelection={false}
              pagination={{ total: items.length }}
            />
            <AuditLog {...auditLogProps} />
          </TitleLayout>
        </TabPane>
        <TabPane tab="商品入库" key="2">
          <TitleLayout title="采购信息">
            <div className="wms-query-info">
              <span>采购单编号：{modelStatus.currentItem.procurementCode || '-'}</span>
              <span>供应商：{modelStatus.currentItem.supplierName || '-'}</span>
              <span>创建时间：{modelStatus.currentItem.transactionTime || '-'}</span>
              <span>制单人：{modelStatus.currentItem.originatorName || '-'}</span>
              <span>备注：{modelStatus.currentItem.procurementNote || '-'}</span>
            </div>
          </TitleLayout>
          {(modelStatus.currentItem.procureStatus === 'Audit_Passed'
            || modelStatus.currentItem.procureStatus === 'SectionStorageIn')
            && (Array.isArray(permissionData) && permissionData.findIndex((item) => item === 'wms.purchase.in') > -1)
            ? <Form {...GMFormProps} /> : null}

          <TitledHeader title="入库记录">
            {formatInHistories.map((item, i) => {
              return <Fragment key={i}>
                <GMGeneralTable columns={inHistoriesColumns} data={item.items || []}
                  footer={(data) => <InHistoriesFooter data={data} item={item} />}
                  rowSelection={false} />
                <Divider />
              </Fragment>
            })}
            {inHistories.length === 0 ? '暂无记录' : ''}
          </TitledHeader>
        </TabPane>
      </Tabs>
    );
  }
}