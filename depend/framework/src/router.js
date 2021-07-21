import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import dynamic from 'dva/dynamic';
import { getRouterData } from './config/router';
import Authorized from './utils/Authorized';
import { addLocaleData, IntlProvider } from 'react-intl';

const appLocale = window.appLocale;
addLocaleData(appLocale.data);

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const OAuthLayout = routerData['/oauth'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={appLocale.antd}>
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/oauth"
              render={props => <OAuthLayout {...props} />}
            />
            <AuthorizedRoute
              path="/"
              render={props => <BasicLayout {...props} />}
              redirectPath="/oauth/login"
            />
          </Switch>
        </ConnectedRouter>
      </IntlProvider>
    </LocaleProvider>
  );
}

export default RouterConfig;
