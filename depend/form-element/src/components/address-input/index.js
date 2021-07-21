/**
    * @author
    * @editor
    * @updated
    * @desc      设置地址组件,该组件一般与 pcdgeo-select 一起使用
    * @eg
    <AddressInput>
      value = ''           //表单默认值
      placeholder = ''     //表单初始值
      onChange = {(data) => {}}    //表单域值发生变化时触发
    </AddressInput>
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import InputText from '../components/InputText';

import getGEO from '../../utils/getGEO';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

/**
 * 设置 地址。该组件一般与 pcdgeo-select 一起使用
 */
export default class Index extends PureComponent {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    form: PropTypes.object,
    dataPool: PropTypes.object,
  }
  componentWillUnmount(){
    const { dataPool } = this.context;
    dataPool.delToForm('address');
  }

  handleChange = (value) => {
    const { dataPool } = this.context;

    dataPool.addToForm({ address: value });
    getGEO(dataPool);

    this.props.onChange(value);
  }

  render() {
    const { value, placeholder } = this.props;

    return (
      <InputText
        defaultValue={ value }
        placeholder={ placeholder }
        onChange={ this.handleChange }
        style={{width: '95%'}}
       />
    )
  }
}
