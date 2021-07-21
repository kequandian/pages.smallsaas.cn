import React, { Component, Fragment  } from 'react'
import Form from 'antd/lib/form';
import InputNumber from 'antd/lib/input-number';
import Divider from 'antd/lib/divider';

const FormItem = Form.Item;

/**
 * 提交总价格。计算出的值 与 手动输入值 相加
 */
class FooterAddPrice extends Component{
  procurementOthersPayment = 0;

  render(){
    const { data, config, form, dataPool } = this.props;
    const { getFieldDecorator, getFieldsValue } = form;
    // const { otherPrice } = this.state;
    this.procurementOthersPayment = data.reduce( (total, item) => {
      return total + (item.transactionSkuPrice || 0) * (item.transactionQuantities || 0);
    },0 );
    dataPool.addToForm({
      [config.totalPriceField]: this.procurementOthersPayment + getFieldsValue()[config.otherPriceField],
    });

    return <Fragment>
        <div className="priceBox">
          <div className="price">{ config.totalPriceText }：<span>{ this.procurementOthersPayment }</span></div>
          <FormItem label={ config.otherPriceText }>
            { getFieldDecorator(config.otherPriceField, {
                initialValue: 0,
              })(<InputNumber step={ 0.01 } />)
            }
          </FormItem>
          <Divider />
          <div className="price total">总金额：<span>{ this.procurementOthersPayment + getFieldsValue()[config.otherPriceField] || 0 }</span></div>
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
})(FooterAddPrice);