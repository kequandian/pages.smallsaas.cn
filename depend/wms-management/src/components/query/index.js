import React, { Component, Fragment } from 'react';
import { GMGeneralTable, GMApp } from 'kqd-general';
import queryString from 'querystring';
import AuditButton from '../AuditButton';
import AuditLog from '../AuditLog';

import './style.css';

const { TitleLayout } = GMApp;

export default class Query extends Component {
  componentDidMount() {
    const { dispatch, namespace, location: { search }, modelStatus } = this.props;
    const API = modelStatus.queryAPI || this.props.API || modelStatus.API;
    const id = queryString.parse(search.replace('?', '')).id;

    if (id) {
      dispatch({
        type: `${namespace}/fetchOne`,
        payload: {
          id,
          API
        }
      });
    }
  }
  handleChangeFieldValue = (index, field, record, value) => {
    const { dispatch, namespace, modelStatus, queryConfig } = this.props;
    let records = modelStatus.currentItem[queryConfig.itemsField] || [];
    records[index][field] = value;
    modelStatus.currentItem[queryConfig.itemsField] = [...records];
    dispatch({
      type: `${namespace}/save`,
      payload: {
        modelStatus: {
          ...modelStatus,
        }
      },
    });
  }

  render() {
    const { modelStatus, queryConfig, statusField, logType } = this.props;
    let records = modelStatus.currentItem[queryConfig.itemsField] || [];
    // api 直接返回正确的 id，故不再做 id 映射
    // records.forEach(item => {
    //   item.skuId = item.id;
    // });
    const auditLogProps = {
      ...this.props,
      APIObject: {
        listAPI: `/api/logs?targetType=${logType}&targetId=[id]`,
      },
    };

    return (
      <TitleLayout title={queryConfig.title}>
        <div className="wms-query-info">
          {queryConfig.info.map((item, i) =>
            <span key={i} style={{
              width: item.field === 'note' ? '100%' : '40%',
              marginTop: '.5em'
            }}>{item.label}：
              {item.field ? (
                modelStatus.currentItem[item.field] || modelStatus.currentItem[item.substitute]
              )
                 : item.path ? eval(item.path) : '-'}
            </span>
          )}
        </div>

        <GMGeneralTable columns={queryConfig.columns} data={records}
          rowSelection={false}
          onChangeColValue={this.handleChangeFieldValue}
        />
        <br />
        <AuditButton
          {...this.props}
          data={modelStatus.currentItem}
          queryConfig={queryConfig}
        />
        <AuditLog {...auditLogProps} />
      </TitleLayout>
    );
  }
}