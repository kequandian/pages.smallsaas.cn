/**
    * @author
    * @editor
    * @updated
    * @desc   提供 类 model 的 state 管理
    * @eg
    <Wrapped>
        API = ''     //传入api
        config = {}
        id
        namespace     //相应model容器名
        location     //location路由
    </Wrapped>
 */


/**
 * 提供 类 model 的 state 管理
 */
import React, { Component } from 'react';

export default (WrappedComponent) => {
  class Wrapped extends Component {
    constructor(props){
      super(props);
      this.state = {
        API: props.API || '',
        config: props.config || {},
        currentItem: {},
        current: 1,
        list: [],
        total: 0,
        modalVisible: false,
        loading: false,
      }
    }

    saveStateHandle = (obj) =>{
      this.setState(obj);
    }
    render() {
      const { API, id, namespace, location } = this.props;

      let props = {
        ...this.props,
        API,
        id,
        modelState: this.state,
        location,
        namespace,
        onSaveState: this.saveStateHandle
      }
      console.log('wrapped',props);
      return (
          <WrappedComponent { ...props } />
      );
    }
  }
  return Wrapped;
}
