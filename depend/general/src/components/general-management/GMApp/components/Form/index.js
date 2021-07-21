import React from 'react';
import GMApp from '../../index';
import GMAppForm from '../../Form';
import renderControl from '../wrapped/renderControl';

const GMAppGeneralForm = (props) => {
  const {
    requester, dataPool, router,
    // dataSourceMap,
    config, formProps,
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
    config,

    // dataSourceMap: dataSourceMap ? dataSourceMap : `FORMDATA_${ + new Date()}`,
    formProps: {
      title: false,
      ...formProps,
    },
    routerMap: {
      default: GMAppForm,
      query: GMAppForm,
    },
    REDIRECT: `/${namespace}`,

    ...restProps,
  };
  return <GMApp { ...newProps } />;
}
export default renderControl(GMAppGeneralForm);