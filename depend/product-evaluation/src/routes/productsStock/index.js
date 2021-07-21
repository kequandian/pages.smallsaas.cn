import React, { PureComponent } from 'react';
import { connect } from 'dva';

import { GMApp } from 'kqd-general';
import config from './config';
import Query from './query';
import ListItem from '../../components/ListItem';
import MiniCard from '../../components/MiniCard';

@connect(({ productsStock, loading }) => ({
  modelStatus: productsStock,
  namespace: 'productsStock',
  loading: loading.models.productsStock,
}))
export default class Index extends PureComponent {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'productsStock/getStarCount',
    });
  }
  handleSelect = (index,data) => {
    const { dataPool } = this.props.modelStatus;
    if(dataPool){
      dataPool.addToSearch({
        starValue: data.starValue,
      });
    }
  }
  render() {
    const { modelStatus } = this.props;
    const starMap = {
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
    };
    const tempList = modelStatus.starCount.map( item => {
      return {
        title: `${ starMap[item.starValue] }星(条)`,
        value: item.startCount,
        starValue: item.starValue,
      }
    } )
    // const tempList = [
    //   { title: '五星(条)', value: 12 },
    //   { title: '四星(条)', value: 12 },
    //   { title: '三星(条)', value: 12 },
    //   { title: '二星(条)', value: 12 },
    //   { title: '一星(条)', value: 12 },
    // ];
    return (
        <GMApp { ...this.props } config={ config } 
          APIObject={{
            // listAPI: '/api/cms/evaluations?stockType=Product',
            getAPI: '/api/cms/evaluations/(stockId)',
            listAPI: '/api/gw/product/comments?stockType=Product',
          }}
          routerMap={{
            query: Query,
          }}
          setFieldDefaultValue={{
            stockId: null,
            evaluationId: null,
            stockType: null,
            'order_number': null,
          }}
          listProps={{
            listHeaderComponent: <div>
              <ListItem data={ tempList }
                  value={ this.props.modelStatus.search && this.props.modelStatus.search.starValue }
                  valueField="starValue"
                  onClick={ this.handleSelect }
                >
                <MiniCard />
              </ListItem>
              <br /><br />
            </div>
          }}
        />
    );
  }
}