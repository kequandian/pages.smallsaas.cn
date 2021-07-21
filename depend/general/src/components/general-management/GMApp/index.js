import React, { PureComponent, Fragment } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import List from './List';
import Form from './Form';
import Query from './Query';

import MergeTable from './components/MergeTable';
import GMAppGeneralForm from './components/Form';
import GMAppGeneralList from './components/List';
import TitleLayout from './components/TitleLayout';
import SearchForm from './SearchForm';

import getConfigUtils from '../utils/getConfig';
import dataPool from '../utils/dataPool';
import router from '../utils/router';
import requester from '../utils/requester';
import setFieldValue from '../utils/setFieldValue';
import './index.css';

class GMApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
    }
    this.getConfig = getConfigUtils(props.config); //输入 config 数据源进行初始化
    this.dataPool = props.dataPool === undefined ? dataPool( props.namespace, props.modelStatus, props.dataSourceMap, props.dispatch ) : props.dataPool;
    this.requester = requester(
      {
        namespace: props.namespace,
        dispatch: props.dispatch,
        dataPool: this.dataPool,
        dataSourceMap: props.dataSourceMap,
      },
      {
        API: props.modelStatus.API,
        ...props.APIObject,
      },
      props.API,
      { listProps: props.listProps }
    );
    this.setFieldValue = setFieldValue( props.setFieldDefaultValue, this.dataPool );
    if(props.tempObject){
      this.dataPool.addToTemp(props.tempObject)
    }
    if(!window.g_app){
      window.g_app = {};
      window.g_app._store = {};
      window.g_app._store.dispatch = props.dispatch;
    }
  }

  static childContextTypes = {
    dataPool: PropTypes.object,
    router: PropTypes.object,
    requester: PropTypes.object,
  }
  getChildContext () {
    const { dataPool, router, requester } = this;

    return {
      dataPool,
      router,
      requester,
    }
  }

  componentDidMount() {
    const { modelStatus, dataSourceMap, routerMap, dispatch } = this.props;

    let { namespace } = this.props;
    if(!namespace){v
      namespace = modelStatus.API.substring(modelStatus.API.lastIndexOf('/')).slice(1);
    }

    if(this.state.init === false){
      const initRouterMap = {
        'default': List,
        'edit': Form,
        'add': Form,
        'query': Query,
        ...routerMap,
      }
      this.router = router(initRouterMap, namespace, this.dataPool, dispatch);
      // 注册 dataPool requester 到 model
      dispatch({
        type: `${namespace}/fetchSuccess`,
        payload: {
          dataPool: this.dataPool,
          requester: this.requester,
        },
      });
      if(dataSourceMap){
        console.log('修改整个 GMApp 的数据源改为：',dataSourceMap);
        dispatch({
          type: `${namespace}/fetchSuccess`,
          payload: {
            [dataSourceMap]: {
              list: [],
              current: 0,
              total: 0,
              currentItem: {},
              modalVisible: false,
              ...modelStatus[dataSourceMap],
            },
          },
        });
      }
      this.setState({
        init: true,
      });
    }
    
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tempObject !== this.props.tempObject) {
      this.dataPool.addToTemp(this.props.tempObject);
    }
  }

  render() {
    const { API, modelStatus, dispatch, loading, location, namespace, REDIRECT,
      routerStatus,
      listProps, formProps, queryProps,
      headerComponent,
      dataSourceMap,
      tableData,
      onTableChange,
    } = this.props;

    let props = {
      API,
      dispatch,
      loading,
      location,
      namespace,
      REDIRECT,

      routerStatus,

      listProps, // title rowSelection listHeaderComponent onListComponentMount
      formProps, // title submitForm beforeSubmit onFormComponentMount
      queryProps,// title

      getConfig: this.getConfig,
      dataSourceMap,
      dataPool: this.dataPool,
      requester: this.requester,
      router: this.router,

      tableData,
      onTableChange,
    }
    if( dataSourceMap ){
      props.modelStatus = modelStatus[dataSourceMap];
    }else{
      props.modelStatus = modelStatus;
    }
    if(this.state.init){
      this.dataPool.register(props.modelStatus);
      this.setFieldValue.check(props.modelStatus);
    }

    return (
        <Fragment>
          { headerComponent }
          { this.state.init ? this.router.render(props,location) : 'loading……' }
        </Fragment>
    );
  }
}

GMApp.MergeTable = MergeTable;
GMApp.Form = GMAppGeneralForm;
GMApp.List = GMAppGeneralList;
GMApp.TitleLayout = TitleLayout;
GMApp.SearchForm = SearchForm;

export default GMApp;