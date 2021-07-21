/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <WrapLayout>
      children
			span = ''   //分别指定每项的占比，可自行传入其他单位。默认值： [ "50vh", "50vh" ]
		  upStyle = {}   //侧组件的容器的样式
		  downStyle = {}   //下侧组件的容器的样式
		  upClassName = {}  //上侧组件的容器的样式的 class Name
		  downClassName = {} //下侧组件的容器的样式的 class Name
    </WrapLayout>
 */

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

import React from 'react';
const UDLayout = (props) => {
	const boxStyle = {
		height: '100%',
	}
    const style = {
        overflow: 'hidden',
    }
    const span = props.span || [ "50vh", "50vh" ];

    let children = [];
    if( typeof(props.children) === 'object' ){
        if (props.children.length){
            children = props.children;
        }else{
            children.push(props.children);
        }
    }

    const [ up, down ] = [ ...props.children ];
    return(
        <div className={ props.className } style={{ ...boxStyle, ...props.style }}>
            <div style={ {...style, height: span[0], ...props.upStyle} } className={ props.upClassName }>
                { up }
            </div>
            <div style={ {...style, height: span[1], ...props.downStyle} } className={ props.downClassName }>
                { down }
            </div>
        </div>
    );
}
export default UDLayout;
