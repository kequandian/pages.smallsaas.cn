/**
    * @author
    * @editor
    * @updated
    * @desc   实现 头部为当前页面为标题，可以收起和显示传入的子组件
    * @eg
    <TitledLayout>
      showCollapse = false     //收起或展示子组件
      isCollapse = false       //控制右边Icon的显示方向，默认向下
      children                //子组件
      title = ''             //标题信息
      extra = ''
      style = {}           //传入style
      headStyle = {}      //headStyle改变头部样式
    </TitledLayout>
 */

import React, { PureComponent } from 'react';
import Icon from 'antd/lib/icon';
import classNames from 'classnames';

import './index.css';

export default class TitledLayout extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      showCollapse: this.props.showCollapse || false,
      isCollapse: this.props.isCollapse || false,
      bodyClsString: 'k-titled-layout-body',
    }
  }

  toggleCollapse = () => {
    const { isCollapse } = this.state;
    const collapseCls = !isCollapse && 'k-titled-layout-body-collapse';
    this.setState({
      isCollapse: !isCollapse,
      bodyClsString: classNames('k-titled-layout-body', collapseCls),
    })
  }

  renderCollapse = () => {
    const { showCollapse, isCollapse } = this.state;
    if (showCollapse) {
      return <Icon style={{ marginLeft: 8 }} type={isCollapse ? 'right' : 'down'} onClick={this.toggleCollapse} />
    }
  }

  renderChildren = () => {
    const { children } = this.props;
    if (Array.isArray(children)) {
      return [ ...children ];
    }
    return children;
  }

  render() {
    const { showCollapse, bodyClsString } = this.state;
    const { title, extra, style = {}, headStyle = {} } = this.props;
    return (
      <div className="k-titled-layout" style={style}>
        {title || extra || showCollapse ? <div className="k-titled-layout-head" style={headStyle}>
          <div className="k-titled-layout-head-wrapper">
            <div className="k-titled-layout-head-title">{title}</div>
            <div className='k-titled-layout-extra'>{extra}{this.renderCollapse()}</div>
          </div>
        </div> : ''}
        <div className={bodyClsString}>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}
