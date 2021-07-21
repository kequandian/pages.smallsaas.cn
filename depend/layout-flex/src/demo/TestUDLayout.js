/**
 * 用于上下布局
 * @parameter
 *  [props.children[0]] <Object> 位于布局上侧的组件,如果不需要该侧的布局可在此传入 null
 *  [props.children[1]] <Object> 位于布局下侧的组件
 *  [span] <Array> 分别指定每项的占比，可自行传入其他单位。默认值： [ "50vh", "50vh" ]
 *  [upStyle] <Object> 上侧组件的容器的样式
 *  [downStyle] <Object> 下侧组件的容器的样式
 *  [upClassName] <String> 上侧组件的容器的样式的 class Name
 *  [downClassName] <String> 下侧组件的容器的样式的 class Name
 */
import React, { PureComponent } from 'react';
import { UDLayout } from '../index';

export default class TestLRBLayout extends PureComponent {

  render() {
    const up = <div style={{backgroundColor: '#ddd',height: '100%'}}>up box</div>;
    const down = <div style={{backgroundColor: '#ccc'}}>down box</div>;

    return (
	  <UDLayout>
		{up}
		{down}
	  </UDLayout>
    );
  }
}
