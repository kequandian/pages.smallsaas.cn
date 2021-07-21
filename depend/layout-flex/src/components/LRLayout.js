/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <WrapLayout>
      children
      span = []   //分别指定每列的占比，数值合计 24。默认值： [ 12, 12 ]
      justify = ''   //默认值： "start"
      align = ''     //默认值： "middle"
      leftStyle = {}  //左侧组件的容器的样式
      rightStyle = {}  //右侧组件的容器的样式
      leftClassName  = '' //左侧组件的容器的样式的 class Name
      rightClassName = '' //右侧组件的容器的样式的 class Name
    </WrapLayout>
 */



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
 *  [leftOffset] <Number> 左侧组件的间隔格数
 *  [rightOffset] <Number> 右侧组件的间隔格数
 */
import React from 'react';
import { Row, Col } from 'antd';
const LRLayout = (props) => {
    const span = props.span || [ 12, 12];

    let children = [];
    if( typeof(props.children) === 'object' ){
        if (props.children.length){
            children = props.children;
        }else{
            children.push(props.children);
        }
    }

    const [ left, right ] = [ ...children ];
    return(
        <Row type="flex" align={ props.align || "middle" }
			justify={ props.justify || "start"}
            className={ props.className } style={ props.style }
			>
            <Col span={ span[0] } className={ props.leftClassName } style={ props.leftStyle } offset={ props.leftOffset || 0 }>
                { left }
            </Col>
            <Col span={ span[1] } className={ props.rightClassName } style={ props.rightStyle } offset={ props.rightOffset || 0 }>
                { right }
            </Col>
        </Row>
    );
}
export default LRLayout;
