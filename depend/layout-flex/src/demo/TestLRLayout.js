/**
 * 用于两列的 flex 布局
 * @parameter
 *  [props.children[0]] <Object> 位于布局左侧的组件,如果仅需要右侧的布局可在此传入 null
 *  [props.children[1]] <Object> 位于布局右侧的组件
 *  [span] <Array> 分别指定每列的占比，数值合计 24。默认值： [ 12, 12 ]
 *  [justify] <String> 默认值： "start"
 *  [align] <String> 默认值： "middle"
 *  [leftStyle] <Object> 左侧组件的容器的样式
 *  [rightStyle] <Object> 右侧组件的容器的样式
 *  [leftClassName] <String> 左侧组件的容器的样式的 class Name
 *  [rightClassName] <String> 右侧组件的容器的样式的 class Name
 */
import React, { PureComponent } from 'react';
import { LRLayout } from '../index';

export default class TestLRBLayout extends PureComponent {

  render() {
    const left = <div style={{backgroundColor: '#ddd'}}>left box</div>;
    const right = <div style={{backgroundColor: '#ccc'}}>right box</div>;

    return (
      <LRLayout>
		{left}
		{right}
	  </LRLayout>
    );
  }
}
