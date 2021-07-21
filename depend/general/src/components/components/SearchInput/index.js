/**
    * @author
    * @editor
    * @updated
    * @desc    查询功能
    * @eg
    <SearchInput>
      fields = ''
      onSearch = {(data) =>{}}
    </SearchInput>
 */


import React, { Component, Fragment } from 'react';
import InputText from '../../general-management/components/GeneralTable/InputText';
import Button from 'antd/lib/button';

export default class SearchInput extends Component {
  state = {
    value: '',
  }
  handleChange = (value) => {
    this.setState({
      value,
    });
  }
  handleSearch = () => {
    let { fields } = this.props;
    fields = fields[0];
    const temObj = {};
    temObj[fields.field] = this.state.value;

    this.props.onSearch({
      pagination: { current: 1 },
      queryData: temObj,
    });
  }
  render() {
    const { fields } = this.props;
    const { value } = this.state;

    return <Fragment>
      <InputText value={ value } onChange={ this.handleChange } placeholder={ fields && fields[0].placeholder }/>
      <Button type="primary" onClick={ this.handleSearch } style={{marginLeft: '1em'}}>搜索</Button>
    </Fragment>
  }
}
