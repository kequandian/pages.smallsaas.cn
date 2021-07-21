/**
    * @author
    * @editor
    * @updated
    * @desc  省市区级联选择框
    * @eg
    <PcdSelect>
      isfirsttimeinit = 'true'
      width = ''     //级联选择框的宽度
      onChange = {(data) => {}}    //选择框值发生变化的时候触发回调函数
    </PcdSelect>
 */

import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Cascader } from 'antd';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';

export default class Index extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      API: '/api/pub/pcd',
      options: [],
      dataLoaded: false,
      dataLoading: false,
    }
  }

  componentDidMount() {
    this.getData();
  }

  getFormattedChild(item, index) {
    if (item) {
      let result = {};
      result.key = index;
      //result.value = item.id
	    result.value = item.name; //直接保存省市区的名
      result.label = item.name;
      if (item.children) {
        result.children = item.children.map((child, childIndex) => {
          return this.getFormattedChild(child, `${index}-${childIndex}`);
        });
      }
      return result;
    }
  }

  getData = () => {
    const { dataLoaded, API } = this.state;
    if (!dataLoaded) {
      this.setState({
        dataLoading: true,
      });

      const pcd = JSON.parse( localStorage.getItem('pcd') || '{}' );
	    // JS 里面的时间戳是以毫秒为单位，所以 86400 * 1000 才是一天
      if( this.props.isfirsttimeinit === 'true' && ( !pcd.data || new Date() - pcd.lastUpdate > 86400000 ) ){
        query(API, { grouping: true }).then( ({ code, data, message }) => {
          if( code === 200 ){
            localStorage.setItem('pcd',JSON.stringify({
              lastUpdate: + new Date(),
              data: data,
            }));
            this.setState({
              dataLoaded: true,
              dataLoading: false,
              options: data.map((item, index) => this.getFormattedChild(item, index))
            });
          }
        });
      }else{
        this.setState({
          dataLoaded: true,
          dataLoading: false,
          options: pcd.data.map((item, index) => this.getFormattedChild(item, index))
        });
      }
    }
  }

  render() {
    const { options, dataLoading } = this.state;
    let style = { minWidth: 160 };
    if (this.props.width) {
      style.width = this.props.width;
    }

    let value = this.props.value || [];
    if( typeof(value) === 'string' && ( value.indexOf('[') >= 0)){
      value = JSON.parse(value);
    }

    return (
      <Cascader
        defaultValue={ value }
        placeholder={ dataLoading ? 'Loading...' : '请选择省、市、区' }
        options={options}
        expandTrigger="hover"
        onFocus={this.getData.bind(this)}
        onChange={this.props.onChange}
       />
    )
  }
}
