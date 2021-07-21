import React, { Component } from 'react';
import classNames from 'classnames';
import './index.css';

export default class FooterToolbar extends Component {
  render() {
    const { children, className, layout = 'defaults', extra, ...restProps } = this.props;
	const layoutMap = {
		defaults(){
			return (
				<div>
					<div className='kc-footer-toolbar-left'>{extra}</div>
					<div className='kc-footer-toolbar-right'>{children}</div>
				</div>
			);
		},
		left(){
			return (
				<div>
					<div className='kc-footer-toolbar-left'>{children}</div>
					<div className='kc-footer-toolbar-left'>{extra}</div>
				</div>
			);
		}
	}
    return (
      <div className={classNames(className, 'kc-footer-toolbar')} {...restProps}>
		  { layoutMap[layout]() }
      </div>
    );
  }
}
