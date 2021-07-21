import React, { Component } from 'react';
import { connect } from 'dva';
import { GMApp } from 'kqd-general';
import SkinArea from './components/SkinArea';
import { LRLayout, InlineScrollLayout, InlineScrollItem } from 'kqd-layout-flex';
import { ProgressRing, Radar } from 'kqd-statistic-element';
import LegendText from './components/LegendText';
import TabLayout from '../../components/TabLayout';
import { ImageView } from 'kqd-common';
import { ListItem } from 'kqd-list-item-element';
import ProgressBar from './components/ProgressBar'
import './index.css';
import ReportLayout from './components/ReportLayout';

const { TitleLayout } = GMApp;

const symptomMap = {
  'SensitiveArea': (data, array, indicator, tabsData) => {
    radarFormat('敏感区', 0, 'SensitiveArea', data, array, indicator, tabsData);
  },
  'Acne': (data, array, indicator, tabsData) => {
    radarFormat('粉刺', 1, 'Acne', data, array, indicator, tabsData);
  },
  'HyperPigmentation': (data, array, indicator, tabsData) => {
    radarFormat('深斑', 2, 'HyperPigmentation', data, array, indicator, tabsData);
  },
  'Pore': (data, array, indicator, tabsData) => {
    radarFormat('毛孔', 3, 'Pore', data, array, indicator, tabsData);
  },
  'Wrinkle': (data, array, indicator, tabsData) => {
    radarFormat('皱纹', 4, 'Wrinkle', data, array, indicator, tabsData);
  },
  'Pigmentation': (data, array, indicator, tabsData) => {
    radarFormat('表素', 5, 'Pigmentation', data, array, indicator, tabsData);
  },
}

class SkinRePort extends Component {
  state = {
    skinReport: {},
    radarData: [],
    indicator: [],
    tabsData: {},
    tabIndex: 'SensitiveArea',
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextSkinReport = nextProps.modelStatus.skinReport;
    if (Object.keys(nextSkinReport).length > 0 && nextSkinReport !== prevState.skinReport) {
      const radarData = [];
      const indicator = [];
      const tabsData = {};
      nextSkinReport.resultDatas.forEach(data => {
        if (symptomMap[data.symptom]) {
          symptomMap[data.symptom](data, radarData, indicator, tabsData);
        }
      })
      return {
        skinReport: nextSkinReport,
        radarData,
        indicator,
        tabsData,
      }
    }
    return null;
  }
  handleChangeTabs = (key) => {
    this.setState({ tabIndex: key })
  }
  handleClick(id, data) {
  }

  render() {
    const { skinReport, radarData, indicator, tabsData, tabIndex } = this.state;
    if (skinReport.synScore === undefined) {
      return 'loading';
    }
    const progressPieOne = {
      percent: skinReport.synScore,
      subTitle: `${skinReport.synScore}分`,
      color: '#C28324',
      height: 100
    }

    const progressPieTwo = {
      percent: skinReport.synAge,
      subTitle: `${skinReport.synAge}岁`,
      color: '#FF8D1A',
      height: 100
    }
    const radarProps = {
      indicator: indicator,
      areaBackgroundColor: ['#f5c8b4', '#e2ae97', '#cd937a'],
      dataList: radarData,
      aroundBackColor: '#fadebb'
    }

    const legendProps = {
      list: [
        {
          color: '#cd937a',
          name: '预防护理'
        },
        {
          color: '#e2ae97',
          name: '持续护理'
        },
        {
          color: '#f5c8b4',
          name: '集中护理'
        }
      ]
    }

    const legendButtomProps = {
      list: [{
        color: '#fadebb',
        name: '趋势往内，代表该项肤质越好'
      }]
    }

    const tabsTitleData = [
      { name: '敏感区', id: 'SensitiveArea' },
      { name: '表素', id: 'Pigmentation' },
      { name: '皱纹', id: 'Wrinkle' },
      { name: '毛孔', id: 'Pore' },
      { name: '深斑', id: 'HyperPigmentation' },
      { name: '粉刺', id: 'Acne' },
    ]

    const imageList = tabsData[tabIndex] && tabsData[tabIndex].picUrlsOrigin
      && tabsData[tabIndex].picUrlsOrigin.split('#').map(url => {
        return {
          url,
        }
      });
    const complexionMap = {
      '1': '黝黑',
      '2': '古铜',
      '3': '暗沉',
      '4': '小麦',
      '5': '自然',
      '6': '白皙',
      '7': '透白',
      '8': '绯红',
    }
    const boxStyle = {
      height: '723px',
      background: '#f6f7fb',
      padding: '0 2em',
      minHeight: '683px',
    };

    return <TitleLayout title="测试报告-肌肤测试" router={this.props.history}>
      <InlineScrollLayout>
        <InlineScrollItem style={boxStyle}>
          <div className="report-centerTitle">-综合报告-</div>
          <div className="report-padding">
            <LRLayout>
              <div>
                <ProgressRing {...progressPieOne} />
                <div className="report-centerTitle">综合得分</div>
              </div>
              <div>
                <ProgressRing {...progressPieTwo} />
                <div className="report-centerTitle">肤质年龄</div>
              </div>
            </LRLayout>
            <div className="report-title">肤色：{complexionMap[skinReport.complexion]}</div>
            <SkinArea value={skinReport.complexion} />
            <br />
            <div className="report-title">综合雷达图</div>
            <LegendText {...legendProps} />
            <Radar {...radarProps} />
            <LegendText {...legendButtomProps} />
            <div className="report-title">综合评价</div>
            <div>{skinReport.comment || '-'}</div>
          </div>
        </InlineScrollItem>
        <InlineScrollItem style={boxStyle}>
          <div className="report-centerTitle">-定量分析-</div>
          <div className="report-padding">
            <TabLayout
              defaultActiveKey="SensitiveArea0"
              tabsData={tabsTitleData}
              onChange={this.handleChangeTabs}
              tabPosition="top"
            />
            {imageList && imageList.length > 0 ? (
              <div style={{ textAlign: 'center' }}>
                <ListItem data={imageList}>
                  <ImageView />
                </ListItem>
              </div>
            ) : null}
            <div className="report-title">综合严重程度</div>
            <ProgressBar value={tabsData[tabIndex].ratio} />
            <div className="report-title">症状描述</div>
            <div>{tabsData[tabIndex].message || '-'}</div>
          </div>
          <br />
          <div className="report-padding">
            <div className="report-title">推荐产品</div>
            <ListItem
              data={skinReport.recommendProducts || []}
              style={{ textAlign: 'center' }}
              onClick={this.handleClick}
            >
              <ReportLayout />
            </ListItem>
          </div>
        </InlineScrollItem>
      </InlineScrollLayout>
    </TitleLayout>
  }
}

function radarFormat(name, index, key, data, dataAry, indicatorAry, tabsData) {
  dataAry[index] = data.number;
  indicatorAry[index] = {
    name,
    max: data.number / data.ratio,
  };
  tabsData[key] = data;
}

function mapStateToProps({ report, loading }) {
  return {
    modelStatus: report,
    namespace: 'report',
    loading: loading.models.report,
  };
}
export default connect(mapStateToProps)(SkinRePort);