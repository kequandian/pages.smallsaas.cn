import React, { Component } from 'react'

/**
 * 传递 props 用的代理组件，用来解决一些第三方框架 无脑使用 React.createElement 导致报错的问题。比如说 antd table 的 components 。
 * 
 * 使用方式：
 *  const BodyWrapperWithProps = PropsProxy(BodyWrapper,{ data, columns });
 */
export default (WrappedComponent, props) => {
  class PropsProxy extends Component {

    render () {
      const newProps = {
        ...props,
        ...this.props,
      }
      return <WrappedComponent { ...newProps } />
    }
  }
  return PropsProxy
}