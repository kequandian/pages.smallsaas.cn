/**
    * @author LLH
    * @editor
    * @updated 2018年10月9日
    * @desc 更灵活的 flex 布局
    * @eg
    <FlexLayout>
      <FlexItem>
        test
      </FlexItem>
      <FlexItem flex={ 1 }>
        test2
      </FlexItem>
    </FlexLayout>
 */

import React from 'react';
import './index.css';

/**
 * @param 
 * [align] <String> 子项的对齐方式，默认 center。可选 flex-start | flex-end 等
 */
export default ({ children, style = {}, className = '', align = 'center' }) => {
  const defaultStyle = {
    alignItems: align,
    ...style,
  }
  const defaultClassName = `kqd-flex-layout ${className}`;
  return <div style={ defaultStyle } className={ defaultClassName }>
    { children }
  </div>
}