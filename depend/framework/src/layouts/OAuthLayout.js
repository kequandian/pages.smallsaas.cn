import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import Icon from 'antd/lib/icon';

import GlobalFooter from '../components/GlobalFooter';
import { getRoutes } from '../utils/utils';
import { get as getInject } from '../config/inject';
import logo from '../assets/logo.png';
import './OAuthLayout.css';

const links = [
  // {
  //   key: 'help',
  //   title: '帮助',
  //   href: '',
  // }, {
  //   key: 'privacy',
  //   title: '隐私',
  //   href: '',
  // }, {
  //   key: 'terms',
  //   title: '条款',
  //   href: '',
  // }
];

const Copyright = <div>Copyright <Icon type="copyright" /> {getInject('Copyright') || 'www.muaskin.com'}</div>;
const Logo = getInject('Logo') || logo;
const Company = getInject('Company') || 'DEV';

class OAuthLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = Company;
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${Company}`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className='oauth-layout-container'>
          <div className='oauth-layout-content'>
            <div className='oauth-layout-top'>
              <div className='oauth-layout-header'>
                <Link to="/">
                  {Logo && Logo !== 'none' ? <img alt="logo" className='oauth-layout-logo' src={Logo} /> : ''}
                  <span className='oauth-layout-title'>{Company}</span>
                </Link>
              </div>
              <div className='oauth-layout-desc'>{Company}</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                )
              )}
              <Redirect exact from="/oauth" to="/oauth/login" />
            </Switch>
          </div>
          <GlobalFooter links={links} copyright={Copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default OAuthLayout;
