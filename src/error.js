import React from 'react';
import Layout from 'antd/lib/layout';
const { Content } = Layout;


export default class Index extends React.PureComponent {

  render() {

    return (
      <Layout>
        <Content style={{ margin: '0', height: '100%', backgroundColor: '#fff' }}>
          Error occurred...
        </Content>
    </Layout>
    );
  }
}
