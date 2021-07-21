import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'antd/lib/input';

export default class TransparentInput extends Component {
  static contextTypes = {
    form: PropTypes.object,
    dataPool: PropTypes.object,
  }
  onChange = (e) => {
    const value = e.target.value;
    const { dataPool } = this.context;
    const { id } = this.props;
    dataPool.addToForm({
      [id]: value,
    },true);
  }
  checkChange = (value) => {
    const { onChange } = this.props;
    if(value !== this.value){
      this.value = value;
      onChange(value);
    }
  }
  render() {
    const { dataPool } = this.context;
    const formData = dataPool.getToFormAll();
    const { id } = this.props;
    this.checkChange(formData[id]);

    return <div>
      <Input value={formData[id]} onChange={ this.onChange } />
    </div>
  }
}