import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';

import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../components/Exception/404';

import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData, getHeaderMenuData } from '../config/menu';
import { getDefaultRoutePath } from '../config/router';
import { get as getInject } from '../config/inject';
import logo from '../assets/logo.png';

class EmptyPageHeader extends React.PureComponent {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

const { Content } = Layout;
const { AuthorizedRoute } = Authorized;
const PageHeader = getInject('PageHeader') || EmptyPageHeader;
const Company = getInject('Company') || 'DEV';
const Logo = getInject('Logo') || logo;
const Copyright = <div>Copyright <Icon type="copyright" /> {getInject('Copyright') || 'www.muaskin.com'}</div>;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  state = {
    isMobile,
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }
  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
    // this.props.dispatch({
    //   type: 'user/fetchCurrent',
    // });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = Company;
    // if (routerData[pathname] && routerData[pathname].name) {
    //   title = `${routerData[pathname].name} - ${Company}`;
    // }
    return title;
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      return getDefaultRoutePath();
    }
    return redirect;
  }
  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }
  handleNoticeClear = (type) => {
    // message.success(`清空了${type}`);
    // this.props.dispatch({
    //   type: 'global/clearNotices',
    //   payload: type,
    // });
  }
  handleMenuClick = ({ key }) => {
    const menu = getHeaderMenuData().find(menu => key && menu.key && menu.key === key);
    console.log("menu: ", menu);
    if (menu && menu.onClick) {
      menu.onClick(this.props.dispatch);
    }
  }
  handleNoticeVisibleChange = (visible) => {
    // if (visible) {
    //   this.props.dispatch({
    //     type: 'global/fetchNotices',
    //   });
    // }
  }
  render() {
    const {
      currentUser, notices, fetchingNotices, collapsed, routerData, match, location,
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const layout = (
      <Layout>
        <SiderMenu
          logo={Logo}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          Authorized={Authorized}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
          Company={Company}
        />
        <Layout>
          <GlobalHeader
            logo={Logo}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            menus={getHeaderMenuData()}
            collapsed={collapsed}
            isMobile={this.state.isMobile}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <PageHeader>
              <Switch>
                {
                  redirectData.map(item =>
                    <Redirect key={item.from} exact from={item.from} to={item.to} />
                  )
                }
                {
                  getRoutes(match.path, routerData).map(item =>
                    (
                      <AuthorizedRoute
                        key={item.key}
                        path={item.path}
                        component={item.component}
                        exact={item.exact}
                        authority={item.authority}
                        redirectPath="/exception/403"
                      />
                    )
                  )
                }
                <Redirect exact from="/" to={bashRedirect} />
                <Route render={NotFound} />
              </Switch>
            </PageHeader>
          </Content>
          <GlobalFooter
            copyright={
              <div>
                {Copyright}
              </div>
            }
          />
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ global, loading }) => ({
  currentUser: global.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(BasicLayout);
