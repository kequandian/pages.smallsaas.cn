import React, { Component } from 'react';
import { FlexLayout } from 'kqd-layout-flex';

import SurveyRadio from './SurveyRadio';
import SurveyCheckBox from './SurveyCheckBox';
import './index.css';
const { FlexItem } = FlexLayout;

export default class EditTopic extends Component {
  render() {
    const { data = [], onClick, index, ...restProps } = this.props;
    const typeMap = {
      RADIO: SurveyRadio,
      MULTI: SurveyCheckBox,
    };
    return <div>
      {data.map((item, i) => {
        const MatchType = typeMap[item.type] || typeMap['RADIO'];
        return <div className="kqd-Survey-TopicBox" onClick={onClick.bind(null, i, item)} key={i}>
          <FlexLayout align="flex-start" >
            <FlexItem><h3>{i + 1}. </h3></FlexItem>
            <FlexItem flex={1}>
              <MatchType
                {...item}
                panelVisible={Boolean(index === i)}
                index={ i }
                { ...restProps }
              />
            </FlexItem>
          </FlexLayout>
        </div>
      })}
    </div>
  }
}