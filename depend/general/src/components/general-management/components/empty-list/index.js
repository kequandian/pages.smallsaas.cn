import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'antd/lib/pagination';
import Spin from 'antd/lib/spin';

import Proxy from './proxy';


class EmptyList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, modelStatus, loading, children, onTableChange, ...restProps } = this.props;
    console.log('EmptyList', this.props);
    const listData = data || modelStatus.list;

    return (
      <Spin spinning={loading}>
        <Proxy
          data={listData}
          {...restProps}
        >
          {children}
        </Proxy>
        {listData.length > 0 ? (
          restProps.pagination
            ?
            <Pagination
              {...modelStatus}
              style={{ clear: 'both' }}
              showQuickJumper={true}
              showSizeChanger={true}
              onChange={onTableChange}
            />
            : null
        ) : '暂无数据'}
      </Spin>
    );
  }
}

EmptyList.propTypes = {
  onChange: PropTypes.func,
  data: PropTypes.array,
  pagination: PropTypes.object,
  columns: PropTypes.array,
  loading: PropTypes.bool,
}

export default EmptyList;