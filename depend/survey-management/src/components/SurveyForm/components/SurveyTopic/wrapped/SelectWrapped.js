import React, { Component } from 'react';
import { Animation } from 'kako';
import { FlexLayout } from 'kqd-layout-flex';
import { Icon } from 'antd';
import EditTopicPanel from '../EditTopicPanel';

const { FlexItem } = FlexLayout;
const { BaseEnter } = Animation;

export default (GroupComponent,ItemComponent,tipsText) => {
  return class SelectWrapped extends Component {
    handleTopicRemove = (e) => {
      e.preventDefault();
      this.props.onRemoveTopic(this.props.index);
    }

    render() {
      const { panelVisible = false, title, content, itemOptions = [], ...restProps } = this.props;
      const itemStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        marginLeft: 0,
      };
      const titleTipsStyle = {
        color: '#1890ff',
        marginLeft: '1em'
      }
      return <div>
        <FlexLayout>
          <FlexItem flex={1} className="kqd-Survey-EditTopicPanel-title">
            <h3 onClick={this.props.onClose}>{title}<span style={titleTipsStyle}> [{ tipsText }]</span></h3>
          </FlexItem>
          <FlexItem className="kqd-Survey-EditTopicPanel-removeItem">
            <Icon type="delete" theme="outlined" onClick={this.handleTopicRemove} />
          </FlexItem>
        </FlexLayout>

        <div>{content}</div>
        <GroupComponent>
          {itemOptions.map((item, i) => {
            return <ItemComponent style={itemStyle} value={item.optionNum} key={i} >{item.content}</ItemComponent>
          })}
        </GroupComponent>
        {panelVisible ? (
          <BaseEnter>
            <EditTopicPanel
              {...restProps}
              data={{
                type: restProps.type,
                title,
                content,
                itemOptions,
              }}
            />
          </BaseEnter>
        ) : null}
      </div>
    }
  }
}