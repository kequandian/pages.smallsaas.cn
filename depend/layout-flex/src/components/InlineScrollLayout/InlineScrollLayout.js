/**
    * @author
    * @editor
    * @updated
    * @desc    实现内部多个滚动条而互不干扰，当然，也可以用在普通的横向栅格布局
    * @eg
    <InlineScrollLayout>
        style = {}    //传入样式
	      children     //子组件
    </InlineScrollLayout>
 */

/*
实现内部多个滚动条而互不干扰
当然，也可以用在普通的横向栅格布局
*/
import React from 'react';
const InlineScrollLayout = (props) => {
    const DefaultStyle= {
        display: 'flex',
    };
    return (
        <div style={ { ...DefaultStyle, ...props.style } } className={props.className}>
            { props.children }
        </div>
    );
}
export default InlineScrollLayout;
