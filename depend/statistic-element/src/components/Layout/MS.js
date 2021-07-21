/**
  * @author LLH
  * @editor
  * @updated 2018年10月23日
  * @desc  展示一个主从的结构。最后一个子组件是 '主'，其它子组件是 '从'。
  * @eg
  <MS
    master="left"
  >
    <Line />
    <Pie />
    <Pie />
  </MS>
*/

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';


/**
 *
 * 展示一个主从的结构。最后一个子组件是 '主'，其它子组件是 '从'。
 * @export
 * @class MS
 * @extends {Component}
 */
export default class MS extends Component {
  static propsTypes = {
    master: PropTypes.string,
  }
  static defaultProps = {
    master: 'left',
  }
  renderMaster = (childList) => {
    const Master = childList[ childList.length - 1 ];
    return <Col span={ ( Master.props && Master.props.span || 1) }>
      { Master }
    </Col>
  }
  renderSlave = (childList) => {    
    const Master = childList[ childList.length - 1 ];
    
    return childList.length > 1 ?  (
      <Col span={ 24 - (Master.props && Master.props.span || 1) }>
       { childList.slice(0,-1) }
      </Col>
    ) : null
  }
  render(){
    const { master, children } = this.props;
    const childList = React.Children.toArray(children);    
    return <Row type="flex" justify="space-around" align="middle">
      { master === 'left' ? 
          (<Fragment>
            { this.renderMaster(childList) }
            { this.renderSlave(childList) }
          </Fragment>)
        : (<Fragment>
          { this.renderSlave(childList) }
          { this.renderMaster(childList) }
        </Fragment>)
       }
    </Row>
  }
}