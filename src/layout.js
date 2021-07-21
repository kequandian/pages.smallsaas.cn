import React from 'react';
import Layout from 'antd/lib/layout';
import { Route, Redirect, Switch } from 'dva/router';
import { getRoutes } from 'kqd-general';

const { Content } = Layout;


export default class Index extends React.PureComponent {

  render() {
    const { routerData, match } = this.props;

    return (
      <Layout>
        <Content style={{ margin: '0', height: '100%', backgroundColor: '#fff' }}>
          <Switch>
            {
              getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                )
              )
            }
            <Redirect exact from="/" to="/dashboard" />
          </Switch>
        </Content>
    </Layout>
    );
  }
}
