import React, { Component, Fragment  } from 'react'
import Form from 'antd/lib/form';
import InputNumber from 'antd/lib/input-number';
import Divider from 'antd/lib/divider';

const FormItem = Form.Item;

/**
 * 提交总价格。
 */
class FooterShowPrice extends Component{
  procurementOthersPayment = 0;

  render(){
    const { data, config, dataPool } = this.props;
    this.procurementOthersPayment = data.reduce( (total, item) => {
      return total + (item.transactionSkuPrice || 0) * (item.transactionQuantities || 0);
    },0 );
    dataPool.addToForm({
      [config.totalPriceField]: this.procurementOthersPayment,
    });

    return <Fragment>
        <div className="priceBox">
          <Divider />
          <div className="price total">{ config.totalPriceText }：<span>{ this.procurementOthersPayment || 0 }</span></div>
        </div>
    </Fragment>
  }
}

export default Form.create({
  onFieldsChange(props, fields){
    const { dataPool } = props;
    Object.keys(fields).forEach( key => {
      dataPool.addToForm({ [key]: fields[key].value });
    });
  },
  mapPropsToFields(props) {
    const temObj = {};
    Object.keys(props.modelState.currentItem).forEach( key => {
      temObj[key] = Form.createFormField({
        value: props.modelState.currentItem[key],
      });
    });
      
    return temObj;
  }
})(FooterShowPrice);