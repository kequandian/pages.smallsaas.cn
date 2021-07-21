import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';

import { getRoutes } from 'kqd-general';

@connect(({ content, loading }) => ({
  modelStatus: content,
  namespace: 'content',
  loading: loading.models.content,
}))
export default class Index extends PureComponent {
  render() {
    const { match, routerData } = this.props;

    return (
      <Switch>
        {
          getRoutes(match.path, routerData).map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))
        }
        <Redirect exact from="/website-content" to="/website-content/page" />
      </Switch>
    );
  }
}