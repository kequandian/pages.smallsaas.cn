import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TitledHeader } from 'kqd-page-header';
import { Chart } from 'kqd-statistic-element';

@connect(({ statStore, loading }) => ({
  modelStatus: statStore,
  namespace: 'statStore',
  loading: loading.models.statStore,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <TitledHeader>
        <Chart group="stat:b:store" />
      </TitledHeader>
    );
  }
}