import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TitledHeader } from 'kqd-page-header';
import { Chart } from 'kqd-statistic-element';

@connect(({ statCharge, loading }) => ({
  modelStatus: statCharge,
  namespace: 'statCharge',
  loading: loading.models.statCharge,
}))
export default class Index extends PureComponent {
  render() {
    return (
      <TitledHeader>
        <Chart group="stat:charge" />
      </TitledHeader>
    );
  }
}