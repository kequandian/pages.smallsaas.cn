import React, { PureComponent } from 'react';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
import Tag from 'antd/lib/tag';
import Dropdown from 'antd/lib/dropdown';
import Avatar from 'antd/lib/avatar';
import Divider from 'antd/lib/divider';

import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
//import NoticeIcon from '../NoticeIcon';
//import HeaderSearch from '../HeaderSearch';
import './index.css';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = ({
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        })[newNotice.status];
        newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  }

  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  /**
   * menu: { icon: "user", name: "个人中心", type: "menu or divider", key: "thekey" }
   */
  getHeaderMenu() {
    const { menus = [], onMenuClick = () => {} } = this.props;
    return (
      <Menu className='header-menu' selectedKeys={[]} onClick={onMenuClick}>
        {
          menus.map(menu => {
            if (menu.type === 'divider') {
              return <Menu.Divider />
            }
            return <Menu.Item key={menu.key}><Icon type={menu.icon || 'setting'}/>{menu.name}</Menu.Item>
          })
        }
      </Menu>
    )
  }

  render() {
    const {
      currentUser, collapsed, fetchingNotices, isMobile, logo,
      onNoticeVisibleChange, onMenuClick, onNoticeClear,
    } = this.props;
    const menu = this.getHeaderMenu();
    const noticeData = this.getNoticeData();
    return (
      <Header className='header' style={{background: '#fff'}}>
        {isMobile && (
          [
            (
              <Link to="/" className='header-logo' key="logo">
                {logo && logo !== 'none' ? <img src={logo} alt="logo" width="32" /> : '' }
              </Link>
            ),
            <Divider type="vertical" key="line" />,
          ]
        )}
        <Icon
          className='header-trigger'
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className='header-right'>

          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className='header-action header-account'>
                <Avatar size="small" className='header-account-avatar' src={currentUser.avatar} />
                <span className='header-name'>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : <Spin size="small" style={{ marginLeft: 8 }} />}
        </div>
      </Header>
    );
  }
}
