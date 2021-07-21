import React from 'react';
import { WhiteSpace } from 'kqd-common';
import { TitledHeader } from 'kqd-page-header';

 const wrapper = config => WrappedComponent => {
  return class extends React.Component {
    render() {
      const { title = null, showCollapse = true } = config;
      return <TitledHeader title={title} showCollapse={showCollapse}>
        <WrappedComponent {...this.props} />
      </TitledHeader>
    }
  }
}

export default wrapper;
