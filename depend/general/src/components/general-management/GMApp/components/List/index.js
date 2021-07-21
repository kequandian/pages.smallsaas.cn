import React from 'react';
import GMApp from '../../index';
import GMAppList from '../../List';
import renderControl from '../wrapped/renderControl';

const GMAppGeneralList = (props) => {
  const {
    requester, dataPool, router,
    dataSourceMap,
    namespace, modelStatus, dispatch, loading, location,
    ...restProps
  } = props;
  const newProps = {
    requester,
    dataPool,
    router,
    namespace,
    modelStatus,
    dispatch,
    loading,
    location,

    // dataSourceMap: dataSourceMap ? dataSourceMap : `LISTDATA_${ + new Date()}`,
    dataSourceMap,
    routerMap: {
      default: GMAppList,
      query: GMAppList,
      add: GMAppList,
      edit: GMAppList,
    },
    REDIRECT: `/${namespace}`,

    ...restProps,
  };
  return <GMApp { ...newProps } />;
}
export default renderControl(GMAppGeneralList);