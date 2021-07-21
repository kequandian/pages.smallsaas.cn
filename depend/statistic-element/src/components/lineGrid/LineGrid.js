/**
    * @author Yang,YN  2018-9-11
    * @editor
    * @updated
    * @desc  栅格布局
    * @eg     //注意： 子组件应该传入span代表占据多少列
    <Grid>
      children
    </Grid>
 */


import React from 'react';
import { Row, Col } from 'antd';

const LineGrid = ({
  children,
}) => {

  console.log('kkkkkkk children',children);
  if(Array.isArray(children) == true && children.length > 0){
    children.map((item,index) => {
      if(!item){
        children.splice(index,1)
      }
    })
  }

  console.log('kkkkklllllll children = ',children);

  const createList = (children) => children && children.length >= 0 && children.map((item,index) => {
      return (
        <Col span={item&&item.props&&item.props.span ? 6*item.props.span : 6} key={index} style={{margin: '8px 0'}}>{item}</Col>
      )
  });

  return(
    <div>
      <Row type='flex' justify="start">
        {createList(children)}
        {
          children != undefined && Array.isArray(children) == false ?
          <Col span={children&&children.props&&children.props.span ? 6*children.props.span : 6} style={{margin: '8px 0'}}>{children}</Col>
          : null
        }
      </Row>
    </div>
  )
};

export default LineGrid;
