import React, { Component } from 'react';
import GMApp from '../../index';

/**
 * 输入两个 list API，然后把两个 list 的数据合并。
 * 说实在的，这种需求绝对是伪需求
 */
export default class MergeTable extends Component {
  componentDidMount(){
    this.queryData();
  }
  onTableChange(pagination){
    this.queryData(pagination);
  }
  queryData = (pagination = {}) => {
    console.log(222222)
    const { itemConfig, requester } = this.props;
    if(itemConfig){
      requester.fetchList({
        current: pagination.current,
        size: pagination.pageSize,
        API: itemConfig.mergeA,
      },'mergeA');
      requester.fetchList({
        current: pagination.current,
        size: pagination.pageSize,
        API: itemConfig.mergeB,
      },'mergeB');
    }
  }
  render(){
    console.log('MergeTable',this.props);
    let { dataSourceMap, modelStatus, tableData, itemConfig, ...restProps } = this.props;
    const { mergeA = [], mergeB = [] } = modelStatus || {};
    let formatData = [];
    const { mergeAFormat, mergeBFormat } = itemConfig;
    formatData = [ ...mergeA.map( item => {
      if(mergeAFormat){
        Object.keys(mergeAFormat).map( key => {
          if(item[key]){
            item[ mergeAFormat[key] ] = item[key];
          }
        } );
      }
      return item;
    } ) ];
    formatData = [ ...formatData, ...mergeB.map( item => {
      if(mergeBFormat){
        Object.keys(mergeBFormat).map( key => {
          if(item[key]){
            item[ mergeBFormat[key] ] = item[key];
          }
        } );
      }
      return item;
    } )];
    return <div>
      <GMApp { ...restProps }
        modelStatus={ modelStatus }
        tableData={ formatData }
        // dataSourceMap={ dataSourceMap }
        listProps={{
          title: false,
          rowSelection: false,
          onListComponentMount: ()=> false,
        }}
        dataSourceMap={ dataSourceMap }
        onTableChange={ this.onTableChange.bind(this) }
      />
    </div>
  }
}