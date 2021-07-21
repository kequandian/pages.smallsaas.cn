/*
子组件，内联的滚动项
需要传入 props
flex: <number>//表名该子项所占屏幕宽的比例
若共有 4 个子项，且都为 flex: 1，则每个子项分别占屏幕宽度 25%
*/
import React from 'react';
const InlineScrollItem = (props) => {
  const DefaultStyle = {
    width: props.width || '100%',
    height: props.height || '100%',
    overflow: 'auto',
  };
  return (
    <div style={{ ...DefaultStyle, ...props.style, flex: props.flex || 1 }} className={props.className}>
      {props.children}
    </div>
  );
}
export default InlineScrollItem;