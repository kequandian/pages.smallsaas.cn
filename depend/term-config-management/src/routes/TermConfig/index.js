import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { injectIntl, FormattedMessage } from 'react-intl';
import Tabs from 'antd/lib/tabs';

import { WhiteSpace } from 'kqd-common';
import { TitledHeader } from 'kqd-page-header';

import { getRoutePath, getConfigTypes } from '../../index';
const { TERM_CONFIG } = getRoutePath();

import AnnouncementConfig from '../../components/AnnouncementConfig';

@connect(({ termConfig, loading }) => ({
  termConfig,
  loading: loading.models.termConfig,
}))
export default class TermConfig extends PureComponent {

  componentDidMount() {
    const types = getConfigTypes();
    types.map(type => {
      this.props.dispatch({
        type: 'termConfig/fetchConfig',
        payload: {
          type
        }
      })
    })
  }

  render() {
    const { dispatch } = this.props;
    const panes = getConfigTypes().map(type => {
      const data = this.props.termConfig.config[type] || {};
      const announcementProps = {
        ...this.props,
        data: { type, ...data },
        onSave(values) {
          dispatch({
            type: 'termConfig/updateConfig',
            payload: values,
          })
        }
      };
      return {
        title: data.title || <FormattedMessage id={type} />,
        content:
          <div>
            <div style={{ marginBottom: 20 }}></div>
            <AnnouncementConfig { ...announcementProps} />
          </div>,
        key: type,
        closable: false
      }
    });

    return (
      <TitledHeader>
        <Tabs
         hideAdd={true}
         type="editable-card"
         >
          {
            panes.map(item => <Tabs.TabPane closable={item.closable} tab={item.title} key={item.key}>{item.content}</Tabs.TabPane>)
          }
        </Tabs>

      </TitledHeader>
    );
  }
}
