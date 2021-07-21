/**
    * @author
    * @editor
    * @updated
    * @desc    antd select 的修改。主要是为了让它引用修改后的 re-select
    * @eg
    <SelectModify>
      mode = ''
      prefixCls = ''
      className = '',
      size = ''
      restProps = {}
      optionLabelProp = {}
    </SelectModify>
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import RcSelect, { Option, OptGroup } from '../components/re-select';
import classNames from 'classnames';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import defaultLocale from 'antd/lib/locale-provider/default';

/**
 * 对 antd select 的修改。主要是为了让它引用修改后的 re-select
 */
class SelectModify extends React.Component {
  static SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

  static defaultProps = {
    prefixCls: 'ant-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  };

  saveSelect = (node) => {
    this.rcSelect = node;
  }

  isCombobox() {
    const { mode } = this.props;
    return mode === 'combobox' || mode === SelectModify.SECRET_COMBOBOX_MODE_DO_NOT_USE;
  }

  renderSelect = () => {
    const {
      prefixCls,
      className = '',
      size,
      mode,
      ...restProps
    } = this.props;
    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    }, className);

    let { optionLabelProp } = this.props;
    if (this.isCombobox()) {
      // children 带 dom 结构时，无法填入输入框
      optionLabelProp = optionLabelProp || 'value';
    }

    const modeConfig = {
      multiple: mode === 'multiple',
      tags: mode === 'tags',
      combobox: this.isCombobox(),
    };

    return (
      <RcSelect
        {...restProps}
        {...modeConfig}
        dropdownMenuExtra={this.props.dropdownMenuExtra}
        prefixCls={prefixCls}
        className={cls}
        optionLabelProp={optionLabelProp || 'children'}
        ref={this.saveSelect}
      />
    );
  }

  render() {
    return (
      <LocaleReceiver
        componentName="Select"
        defaultLocale={defaultLocale.Select}
      >
        {this.renderSelect}
      </LocaleReceiver>
    );
  }
}
SelectModify.Option = RcSelect.Option;
export default SelectModify;
