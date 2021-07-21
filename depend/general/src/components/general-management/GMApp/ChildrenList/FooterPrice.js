import React, { Component, Fragment  } from 'react'

import InputText from '../../components/GeneralTable/InputText';
import Checkbox from 'antd/lib/checkbox';

/**
 * 提交总价格。计算出的值 与 手动输入值 二选一
 */
export default class FooterPrice extends Component{
  state = {
    edit: false,
    totalPrice: 0,
  }
  totalPrice = 0;

  handlePriceChange = (key,value) => {
    const temObj = {};
    temObj[key] = value;

    this.setState({
      ...temObj,
    }, () => {
      const { totalPrice } = this.state;
      const { config, dataPool } = this.props;
      dataPool.addToForm({
        [config.totalPriceField]: totalPrice,
      });
    })
  }
  handleEdit = () => {
    this.setState({
      edit: !this.state.edit,
    }, () => {
      if( this.state.edit ){
        const { config, dataPool } = this.props;
        dataPool.addToForm({
          [config.totalPriceField]: this.state.totalPrice,
        });
      }
    });
  }

  render(){
    const { data, config, modelStatus, dataPool } = this.props;
    const { edit } = this.state;
    this.totalPrice = data.reduce( (total, item) => {
      return total + (item.transactionSkuPrice || 0) * (item.transactionQuantities || 0);
    },0 );
    if( !this.state.edit ){
      dataPool.addToForm({
        [config.totalPriceField]: this.totalPrice,
      });
    }

    return <Fragment>
        <div className="priceBox">
          <div className={ 'price '+ (edit ? 'ligth' : '') }>{ config.totalPriceText }：<span>{ this.totalPrice }</span></div>
          <div><Checkbox checked={ edit } onChange={ this.handleEdit } /> 实际{ config.totalPriceText }：
            <span><InputText type="number" step={ 0.01 } value={ modelStatus.currentItem[config.totalPriceField] || this.totalPrice } disabled={ !edit } onChange={ this.handlePriceChange.bind(this,'totalPrice') } /></span>
          </div>
        </div>
    </Fragment>
  }
}