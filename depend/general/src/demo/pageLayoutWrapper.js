import React from 'react';
import { PageHeader } from 'kqd-page-header';

 const wrapper = config => WrappedComponent => {
  return class extends React.Component {
    render() {
      const { title = null } = config;
      return <PageHeader title={title}>
        <WrappedComponent {...this.props} />
      </PageHeader>
    }
  }
}

export default wrapper;
