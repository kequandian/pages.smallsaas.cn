import React, { PureComponent, Fragment } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import List from './components/List';
import Form from './components/Form';
import Quert from './components/Query';

import getConfigUtils from './utils/getConfig';
import dataPool from './utils/dataPool';

function router(location,props,children,routerMap) {
  const type = queryString.parse(location.search).type;
  const routeMap = {
    'edit': Form,
    'add': Form,
    'query': children || Quert,
    ...routerMap,
  }
  const rst = routeMap[type] ? routeMap[type] : List;
  
  if(React.isValidElement(rst)){
    return React.cloneElement(rst, { ...props } );
  }else{
    return React.createElement(rst, { ...props } );
  }
}

export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
    }
    this.getConfig = getConfigUtils(props.config); //输入 config 数据源进行初始化
    this.dataPool = dataPool( props.namespace, props.modelState, props.dataSourceMap, props.dispatch );
  }

  static childContextTypes = {
    dataPool: PropTypes.object,
  }
  getChildContext () {
    const { dataPool } = this;

    return {
      dataPool,
    }
  }

  componentDidMount() {
    const { modelState, dispatch} = this.props;
    let { namespace } = this.props;
    if(!namespace){
      namespace = modelState.API.substring(modelState.API.lastIndexOf('/')).slice(1);
    }

    if(this.state.init === false){
      this.setState({
        init: true,
      });
    }

    // if( !modelState.config || !modelState.config.table ){
    //   dispatch({
    //     type: `${namespace}/getConfig`,
    //     payload: {
    //       API: modelState.API,
    //     },
    //   });
    // }
  }

  render() {
    const { API, modelState, dispatch, loading, location,
      rowSelection,
      listProps,
      formProps,
      queryProps,
      children, headerComponent,
      dataSourceMap, routerMap, queryMap } = this.props;

    let { namespace } = this.props;
    if(!namespace){
      namespace = modelState.API.substring(modelState.API.lastIndexOf('/')).slice(1);
    }
 
    let props = {
      API,
      // modelState,
      rowSelection,
      listProps,
      formProps,
      queryProps,
      dispatch,
      loading,
      location,
      namespace,
      // listHeaderComponent,
      // onListComponentMount,
      getConfig: this.getConfig,
      dataSourceMap,
      queryMap,
      dataPool: this.dataPool,
    }
    if( dataSourceMap ){
      props.modelState = {
        list: [],
        current: 0,
        total: 0,
        currentItem: {},
        modalVisible: false,
        ...modelState[dataSourceMap],
      };
    }else{
      props.modelState = modelState;
    }
    // if( !modelState.config || !modelState.config.table ){
    //   const config = this.props.config || getConfig();
    //   props.modelState.config = config;
    // }

    const childrenComponent = children ? React.cloneElement(children,{
      ...props,
    }) : '';

    this.dataPool.register(props.modelState);
    return (
        <Fragment>
          { headerComponent }
          { this.state.init ? router( location, props, childrenComponent, routerMap) : 'loading……' }
        </Fragment>
    );
  }
}
