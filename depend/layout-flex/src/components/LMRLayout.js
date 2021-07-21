/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <LRLayout>
      children      //传入的子组件
      span = []       //分别指定每列的占比，数值合计 24。默认值： [ 8, 8, 8]
      justify = ''   //默认值： "start"
      align = ''      //默认值： "middle"
      leftStyle = {}    //左侧组件的容器的样式
      middleStyle ={}       //中间组件的容器的样式
      rightStyle ={}    //右侧组件的容器的样式
      leftClassName =''    //左侧组件的容器的样式的 class Name
      middleClassName = '' //中间组件的容器的样式的 class Name
      rightClassName=''  //右侧组件的容器的样式的 class Name
    </LRLayout>
 */


/**
 * 用于三列的 flex 布局
 * @parameter
 *  [props.children[0]] <Object> 位于布局左侧的组件,如果不需要该侧的布局可在此传入 null
 *  [props.children[1]] <Object> 位于布局中间的组件,如果不需要该侧的布局可在此传入 null
 *  [props.children[2]] <Object> 位于布局右侧的组件
 *  [span] <Array> 分别指定每列的占比，数值合计 24。默认值： [ 8, 8, 8]
 *  [justify] <String> 默认值： "start"
 *  [align] <String> 默认值： "middle"
 *  [leftStyle] <Object> 左侧组件的容器的样式
 *  [middleStyle] <Object> 中间组件的容器的样式
 *  [rightStyle] <Object> 右侧组件的容器的样式
 *  [leftClassName] <String> 左侧组件的容器的样式的 class Name
 *  [middleClassName] <String> 中间组件的容器的样式的 class Name
 *  [rightClassName] <String> 右侧组件的容器的样式的 class Name
 */
import React from 'react';
import { Row, Col } from 'antd';
const LRLayout = (props) => {
    const span = props.span || [ 8, 8, 8];

    let children = [];
    if( typeof(props.children) === 'object' ){
        if (props.children.length){
            children = props.children;
        }else{
            children.push(props.children);
        }
    }

    const [ left, middle, right ] = [ ...props.children ];
    return(
        <Row type="flex" align={ props.align || "middle" }
			justify={ props.justify || "start"}
			className={ props.className } style={ props.style }
			>
            <Col span={ span[0] } className={ props.leftClassName } style={ props.leftStyle }>
                { left }
            </Col>
            <Col span={ span[1] } className={ props.middleClassName } style={ props.middleStyle }>
                { middle }
            </Col>
            <Col span={ span[2] } className={ props.rightClassName } style={ props.rightStyle }>
                { right }
            </Col>
        </Row>
    );
}
export default LRLayout;
