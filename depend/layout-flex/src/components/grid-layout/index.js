/**
    * @author Yang,YN
    * @editor
    * @updated
    * @desc    传入子元素，进行宫格布局
    * @eg
    <GridLayout>
      listNumber = ''   //表示展示多少列
      children          //子元素
    </GridLayout>
 */


import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import './index.css';

//此组件功能： 对子组件进行flex布局，可根据需要传入几列。
const GridLayout = ({
  listNumber,
  children,
  style={
    border: '1px solid #DFDFDF',
    padding: '0 10px',
    borderRadius: '1px',
    backgroundColor: '#fff',
  }
}) => {

  const createList = (children) => children.length >= 0 && children && children.map((item,index) => {
      return (
        <Col span={24/listNumber} key={index} style={{margin: '8px 0'}}>{item}</Col>
      )
  });

  return(
    <div className='kc-grid-layout'>
      <Row type='flex' align='top' justify="start" gutter={16}>
          {createList(children)}
      </Row>
    </div>
  )
};

export default GridLayout;
