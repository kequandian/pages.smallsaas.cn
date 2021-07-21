import React, { Component, Fragment } from 'react'
import Form from 'antd/lib/form';
import InputNumber from 'antd/lib/input-number';

const FormItem = Form.Item;

/**
 * 提交总价格。
 */
class FooterShowPrice extends Component {
  state = {
    procurementOthersPayment: 0,
    productRefundQuantities: 0,
    currentItem: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.modelStatus.currentItem) !== prevState.currentItem) {
      this.compute();
    }
  }
  compute = () => {
    const { data, config, dataPool, modelStatus } = this.props;
    const { currentItem } = modelStatus;
    let procurementOthersPayment = 0;
    let productRefundQuantities = 0;

    data.forEach((item, i) => {
      procurementOthersPayment += (item.transactionSkuPrice || 0) * (item.demandQuantities || item.transactionQuantities || 0);
      productRefundQuantities += (item.demandQuantities || item.transactionQuantities || 0);
    }, 0);
    if (procurementOthersPayment) {
      procurementOthersPayment = procurementOthersPayment.toFixed(2);
    }
    this.setState({
      procurementOthersPayment,
      currentItem: JSON.stringify(currentItem),
    });
    dataPool.addToForm({
      [config.totalPriceField]: procurementOthersPayment,
      productRefundQuantities: productRefundQuantities,
    });
  }

  render() {
    const { config } = this.props;
    const { procurementOthersPayment } = this.state;

    return <Fragment>
      <div className="priceBox">
        <div className="price total">{config.totalPriceText}：<span>{procurementOthersPayment || 0}</span></div>
      </div>
    </Fragment>
  }
}

export default Form.create({
  // onFieldsChange(props, fields) {
  //   const { dataPool } = props;
  //   Object.keys(fields).forEach(key => {
  //     dataPool.addToForm({ [key]: fields[key].value }, true);
  //   });
  // },
  // mapPropsToFields(props) {
  //   const temObj = {};
  //   Object.keys(props.modelStatus.currentItem).forEach(key => {
  //     temObj[key] = Form.createFormField({
  //       value: props.modelStatus.currentItem[key],
  //     });
  //   });

  //   return temObj;
  // }
})(FooterShowPrice);