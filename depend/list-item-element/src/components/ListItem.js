/**
 * @author LLH
 * @editor 
 * @updated 2018年10月15日
 * @desc 遍历 list，渲染被包裹的 children。可同时实现类似单选框的效果。
 * @eg
 <ListItem
  data={ list }
  value={ value }
  valueField="status"
  onClick={ this.handleSelect }
 >
    <MiniCard />
 </ListItem>
 */
import React, { Fragment } from 'react';
import { Spin } from 'antd';

const ListItem = ({
  style = {}, className = '',
  data = [], children, emptyTips = <div style={{textAlign: 'center',color: 'eee'}}>暂无数据</div>,
  value, valueField, activeClass = 'active',
  onClick,
  loading = false,
}) => {
    function handleClick(i,data){
      if(onClick){
        onClick(i,data);
      }
    }
    const { childrenClassName = '' } = children.props || {};
    return (
      <Spin spinning={ loading }>
        <div style={ style } className={ className } role="tablist">
            { data.map( (v, i) => {
              return <span onClick={ handleClick.bind(null,i,v) } role="tab" key={i}>
                  { React.cloneElement(children,{
                        data: v,
                        className: value === v[valueField] ? `${childrenClassName} ${activeClass}` : childrenClassName,
                    }) }
                </span>;
            }) }
            { data.length === 0 ? emptyTips : null }
        </div>
      </Spin>
    );
}
export default ListItem;